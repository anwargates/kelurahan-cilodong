import React, { useEffect, useState } from "react";
import Pengajuan from "../../assets/icons/pengajuan.svg";
import {
  Anchor,
  Breadcrumbs,
  Group,
  Modal,
  NativeSelect,
  Pagination,
  Progress,
  Select,
} from "@mantine/core";
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { usePagination } from "@mantine/hooks";
import { useStore } from "../../global/store";
import { BiEdit, BiTrash } from "react-icons/bi";

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
  const { setActionLoading } = useStore();
  // const [currentPage, setCurrentPage] = useState(1)

  const userId = auth.currentUser.uid;

  const itemsPerPage = 5;

  const pengajuanRef = collection(db, "users");
  const pengajuanQuery = query(
    pengajuanRef,
    // orderBy("timestamp", "desc"),
    limit(itemsPerPage)
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pagination = usePagination({ total: totalPages });

  const handlePageChange = (page) => {
    pagination.setPage(page);
  };

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
      const resultData = snapshot.docs.map((doc) => ({
        uid: doc.id,
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
        <td className="p-2">{element.NIK}</td>
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
      {/* <div className="mx-auto my-4 grid max-w-fit grid-cols-3 gap-4 py-4">
        <div className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">124</h1>
              <h4 className="text-sm font-medium">Surat Keluar</h4>
            </div>
            <div className="flex items-start">
              <img src={Pengajuan} alt="" />
            </div>
          </div>
          <Progress value={50} color="#2B6777" />
          <small className="text-xs font-medium">124 Surat Keluar</small>
        </div>
        <div className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">2</h1>
              <h4 className="text-sm font-medium">Admin Cilodong</h4>
            </div>
            <div className="flex items-start">
              <img src={Pengajuan} alt="" />
            </div>
          </div>
          <Progress value={50} color="#2B6777" />
          <small className="text-xs font-medium">2 Admin Cilodong</small>
        </div>
        <div className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">43</h1>
              <h4 className="text-sm font-medium">Data Pegawai</h4>
            </div>
            <div className="flex items-start">
              <img src={Pengajuan} alt="" />
            </div>
          </div>
          <Progress value={50} color="#2B6777" />
          <small className="text-xs font-medium">43 Data Pegawai</small>
        </div>
      </div> */}
      <div className="">
        <div className="m-auto my-8 rounded-lg bg-[#C8D8E4] p-4">
          <table className="my-2 w-full bg-white">
            <thead className="w-full bg-cyan-800 text-left text-white">
              <tr>
                <th className="p-2">No.</th>
                <th className="p-2">Nama</th>
                <th className="p-2">NIK</th>
                <th className="p-2">No. HP</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
          <Pagination.Root
            total={totalPages}
            value={pagination.active}
            onChange={handlePageChange}
            styles={{
              control: {
                backgroundColor: "#2B6777",
                '&[type="button"]': {
                  height: "74px",
                },
                "&[data-active]": {
                  backgroundColor: "#2B6777",
                },
              },
            }}
            // color='#88CEEF'
            size="md"
          >
            <Group position="left" spacing={0}>
              <Pagination.Previous />
              <Pagination.Items />
              <Pagination.Next />
            </Group>
          </Pagination.Root>
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
