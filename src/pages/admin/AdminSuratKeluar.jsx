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
  deleteDoc,
  doc,
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
import { BiTrash } from "react-icons/bi";
import { Space, Table } from "antd";

const items = [
  { title: "Home", href: "/admin" },
  { title: "Surat Keluar" },
].map((item, index) => (
  <Anchor color="#2B6777" href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const AdminSuratKeluar = () => {
  const [pengajuanData, setPengajuanData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  // const { actionLoading, setActionLoading } = useStore();
  const [actionLoading, setActionLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1)

  const userId = auth.currentUser.uid;
  const columns = [
    {
      title: "Nama Surat",
      dataIndex: "namaSurat",
      key: "namaSurat",
    },
    {
      title: "Tanggal",
      dataIndex: "tanggalTerbit",
      key: "tanggalTerbit",
      render: (text) => {
        const timestamp = new Date(text.seconds * 1000);
        return <a>{timestamp.toDateString()}</a>;
      },
    },
    {
      title: "ID Surat",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => handleModal(record)}
            className="rounded-full bg-red-800 p-2 text-white"
          >
            <BiTrash />
          </button>
        </Space>
      ),
    },
  ];

  const fetchData = async () => {
    setActionLoading(true);
    try {
      const pengajuanRef = collection(db, "suratKeluar");
      const pengajuanQuery = query(
        pengajuanRef,
        orderBy("tanggalTerbit", "desc")
      );
      const snapshot = await getDocs(pengajuanQuery);
      const resultData = snapshot.docs.map((doc, index) => ({
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
  }, []);

  const handleModal = (data) => {
    setSelectedData(data);
    setShowModal(!showModal);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

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
      <ModalDeleteConfirm
        show={showModal}
        close={handleCloseModal}
        data={selectedData}
      />
    </div>
  );
};

const ModalDeleteConfirm = ({ show, close, data }) => {
  const { actionLoading, setActionLoading } = useStore();
  const [selected, setSelected] = useState("");
  console.log(data);

  const handleDeleteSurat = async () => {
    setActionLoading(true);
    try {
      await deleteDoc(doc(db, "suratKeluar", data.uid));
      setActionLoading(false);
      close();
    } catch (error) {
      console.error("Error deleting document:", error);
      setActionLoading(false);
    }
  };

  return (
    <Modal.Root opened={show} onClose={close} centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header
          style={{
            background: "#2B6777",
            justifyContent: "center",
          }}
        >
          <Modal.Title
            style={{
              color: "white",
              textAlign: "center",
              fontSize: "32px",
              fontWeight: "700",
            }}
          >
            Update Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-2 flex flex-col gap-4">
            <h1>Hapus ID : {data.uid}</h1>
            <div className="flex justify-evenly">
              <button
                onClick={close}
                className="rounded-lg bg-gray-600 px-6 py-2 text-white"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteSurat}
                className="rounded-lg bg-primary px-6 py-2 text-white"
              >
                Hapus
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default AdminSuratKeluar;
