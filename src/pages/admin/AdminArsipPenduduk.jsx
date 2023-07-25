import { Anchor, Breadcrumbs } from "@mantine/core";
import { usePagination } from "@mantine/hooks";
import { Space, Table } from "antd";
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { auth, db } from "../../config/firebase";

const items = [
  { title: "Home", href: "/admin" },
  { title: "Arsip Penduduk" },
].map((item, index) => (
  <Anchor color="#2B6777" href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const AdminArsipPenduduk = () => {
  const [pengajuanData, setPengajuanData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  // const { actionLoading, setActionLoading } = useStore();
  const [actionLoading, setActionLoading] = useState(false);

  // const [currentPage, setCurrentPage] = useState(1)

  const userId = auth.currentUser.uid;

  const itemsPerPage = 5;

  const pengajuanRef = collection(db, "users");
  const pengajuanQuery = query(
    pengajuanRef,
    // orderBy("timestamp", "desc"),
    where("isAdmin", "==", false)
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pagination = usePagination({ total: totalPages });

  const handlePageChange = (page) => {
    pagination.setPage(page);
  };

  const columns = [
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "NIK",
      dataIndex: "nik",
      key: "nik",
    },
    {
      title: "No HP",
      dataIndex: "hp",
      key: "hp",
    },
    // {
    //   title: "Actions",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <button
    //         onClick={() => handleModal(record)}
    //         className="mx-1 rounded-full bg-green-800 p-2 text-white"
    //       >
    //         <BiEdit />
    //       </button>
    //       <button
    //         onClick={() => handleModal(record)}
    //         className="mx-1 rounded-full bg-red-800 p-2 text-white"
    //       >
    //         <BiTrash />
    //       </button>
    //     </Space>
    //   ),
    // },
  ];

  const fetchData = async () => {
    setActionLoading(true);
    const snapshot = await getCountFromServer(pengajuanRef);
    setTotalItems(snapshot.data().count);
    try {
      let newQuery = pengajuanQuery;

      if (pagination.active > 1) {
        const lastVisiblePayment = pengajuanData[pengajuanData.length - 1];
        const lastVisibleUid = lastVisiblePayment.uid;

        newQuery = query(
          pengajuanRef,
          //   orderBy("timestamp", "desc"),
          startAfter(lastVisibleUid),
          limit(itemsPerPage)
        );
      }

      const snapshot = await getDocs(newQuery);
      const resultData = snapshot.docs.map((doc, index) => ({
        uid: doc.id,
        number: (pagination.active - 1) * itemsPerPage + index + 1,
        ...doc.data(),
      }));
      setPengajuanData(resultData);
      setActionLoading(false);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setActionLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    console.log(pengajuanData);
  }, [pagination.active]);

  const handleModal = (data) => {
    setSelectedData(data);
    setShowModal(!showModal);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const rows = pengajuanData.map((element, index) => {
    // const timestamp = new Date(element.timestamp.seconds * 1000);
    return (
      <tr key={element.uid}>
        <td className="p-2">{index + 1}</td>
        <td className="p-2">{element.nama}</td>
        <td className="p-2">{element.nik}</td>
        <td className="p-2">{element.hp}</td>
        <td className="p-2">
          <button
            onClick={() => handleModal(element)}
            className="mx-1 rounded-full bg-green-800 p-2 text-white"
          >
            <BiEdit />
          </button>
          <button
            onClick={() => handleModal(element)}
            className="mx-1 rounded-full bg-red-800 p-2 text-white"
          >
            <BiTrash />
          </button>
        </td>
      </tr>
    );
  });

  const tableRows = pengajuanData.length ? rows : null;

  return (
    <div>
      <h1 className="text-xl font-bold text-primary">Dashboard</h1>
      <Breadcrumbs>{items}</Breadcrumbs>
      <div className="">
        <div className="m-auto my-8 rounded-lg bg-[#C8D8E4] p-4">
          <Table
            scroll={{ x: "100vw" }}
            loading={actionLoading}
            pagination={{
              position: ["bottomLeft"],
            }}
            dataSource={pengajuanData}
            columns={columns}
            className="custom-table"
          />
        </div>
      </div>
      {/* <ModalUpdateStatus
        show={showModal}
        close={handleCloseModal}
        data={selectedData}
      /> */}
    </div>
  );
};

export default AdminArsipPenduduk;
