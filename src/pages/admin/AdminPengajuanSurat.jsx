import {
  Anchor,
  Breadcrumbs,
  Image,
  Modal,
  NativeSelect,
  Progress,
} from "@mantine/core";
import { Space, Table } from "antd";
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Pengajuan from "../../assets/icons/pengajuan.svg";
import { auth, db } from "../../config/firebase";
import { useStore } from "../../global/store";

const items = [
  { title: "Home", href: "#" },
  { title: "Pengajuan Surat", href: "#" },
].map((item, index) => (
  <Anchor color="#2B6777" href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const AdminPengajuanSurat = () => {
  const [pengajuanData, setPengajuanData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [filteredData, setFilteredData] = useState(null);
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [filtered, setFiltered] = useState("KTP");
  const [ktpCount, setKtpCount] = useState(0);
  const [kkCount, setKkCount] = useState(0);
  const [naCount, setNaCount] = useState(0);
  const [showModalBukti, setShowModalBukti] = useState(false);
  // TODO: causes loop
  // const { actionLoading, setActionLoading } = useStore();
  const [actionLoading, setActionLoading] = useState(false);

  // const [currentPage, setCurrentPage] = useState(1)

  const userId = auth.currentUser.uid;
  const pengajuanRef = collection(db, "pengajuan");

  const columns = [
    {
      title: "ID Surat",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nama Pengaju",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "NIK",
      dataIndex: "nik",
      key: "nik",
    },
    // {
    //   title: "Jenis Surat",
    //   dataIndex: "jenisSurat",
    //   key: "jenisSurat",
    // },
    {
      title: "Jenis Surat",
      dataIndex: "namaOpsiSurat",
      key: "namaOpsiSurat",
    },
    {
      title: "Tanggal",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (text) => {
        const timestamp = new Date(text.seconds * 1000);
        return <a>{timestamp.toDateString()}</a>;
      },
    },
    {
      title: "No. Hp",
      dataIndex: "hp",
      key: "hp",
    },
    {
      title: "Status Pengajuan",
      dataIndex: "statusPengajuan",
      key: "statusPengajuan",
    },
    {
      title: "Actions",
      key: "action",
      // fixed: "right",
      width: 140,
      onCell: () => ({
        onClick: (event) => {
          event.stopPropagation();
        },
      }),
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => handleModal(record)}
            className="whitespace-nowrap rounded-3xl bg-green-800 p-2 text-white"
          >
            Update Status
          </button>
        </Space>
      ),
    },
  ];

  const handleFilter = (category) => {
    const filteredResults = pengajuanData.filter((data) => {
      const nameMatch = data.jenisSurat
        .toLowerCase()
        .includes(category.toLowerCase());
      const categoryMatch =
        categoryFilter === "All" || data.category === categoryFilter;

      return nameMatch && categoryMatch;
    });

    setFilteredData(filteredResults);
  };

  const handleReset = () => {
    setSearchText("");
    setCategoryFilter("All");
    setFilteredData(null);
  };

  const getCountAll = async () => {
    const totalKtpQuery = query(pengajuanRef, where("jenisSurat", "==", "KTP"));
    const totalKkQuery = query(pengajuanRef, where("jenisSurat", "==", "KK"));
    const totalNaQuery = query(pengajuanRef, where("jenisSurat", "==", "NA"));
    const snapshotKtp = await getCountFromServer(totalKtpQuery);
    const snapshotKk = await getCountFromServer(totalKkQuery);
    const snapshotNa = await getCountFromServer(totalNaQuery);
    setKtpCount(snapshotKtp.data().count);
    setKkCount(snapshotKk.data().count);
    setNaCount(snapshotNa.data().count);
  };

  const fetchData = async () => {
    setActionLoading(true);
    try {
      const pengajuanQuery = query(pengajuanRef, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(pengajuanQuery);
      const resultData = snapshot.docs.map((doc, index) => ({
        uid: doc.id,
        ...doc.data(),
      }));
      setPengajuanData(resultData);
      console.log(resultData);
      setActionLoading(false);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    getCountAll();
  }, []);

  const handleModal = (data) => {
    setSelectedData(data);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    fetchData();
  };

  const handleCloseModalLihatBukti = () => {
    setShowModalBukti(false);
    fetchData();
  };

  const handleChangeSurat = (category) => {
    handleFilter(category);
  };

  const rowProps = (record) => {
    return {
      onClick: () => {
        setSelectedData(record);
        setShowModalBukti(true);
      },
    };
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-primary">Dashboard</h1>
      <Breadcrumbs>{items}</Breadcrumbs>
      <div className="mx-auto my-4 grid max-w-fit gap-4 py-4 lg:grid-cols-3">
        <div
          onClick={() => handleChangeSurat("KTP")}
          className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg hover:cursor-pointer"
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{ktpCount}</h1>
              <h4 className="text-sm font-medium">Pengajuan Surat - KTP</h4>
            </div>
            <div className="flex items-start">
              <img src={Pengajuan} alt="" />
            </div>
          </div>
          <Progress value={50} color="#2B6777" />
          <small className="text-xs font-medium">
            {ktpCount} Pengajuan Surat
          </small>
        </div>
        <div
          onClick={() => handleChangeSurat("KK")}
          className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg hover:cursor-pointer"
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{kkCount}</h1>
              <h4 className="text-sm font-medium">Pengajuan Surat - KK</h4>
            </div>
            <div className="flex items-start">
              <img src={Pengajuan} alt="" />
            </div>
          </div>
          <Progress value={50} color="#2B6777" />
          <small className="text-xs font-medium">
            {kkCount} Pengajuan Surat
          </small>
        </div>
        <div
          onClick={() => handleChangeSurat("NA")}
          className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg hover:cursor-pointer"
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{naCount}</h1>
              <h4 className="text-sm font-medium">Pengajuan Surat - Nikah</h4>
            </div>
            <div className="flex items-start">
              <img src={Pengajuan} alt="" />
            </div>
          </div>
          <Progress value={50} color="#2B6777" />
          <small className="text-xs font-medium">
            {naCount} Pengajuan Surat
          </small>
        </div>
      </div>
      <div className="">
        <div className="m-auto my-8 rounded-lg bg-[#C8D8E4] p-4">
          <Table
            scroll={{ x: "100vw" }}
            loading={actionLoading}
            pagination={{
              position: ["bottomLeft"],
            }}
            dataSource={filteredData ?? pengajuanData}
            columns={columns}
            className="custom-table"
            rowKey="uid"
            onRow={rowProps}
          />
        </div>
      </div>
      <ModalUpdateStatus
        show={showModal}
        close={handleCloseModal}
        data={selectedData}
      />
      <ModalViewBukti
        show={showModalBukti}
        close={handleCloseModalLihatBukti}
        data={selectedData}
      />
    </div>
  );
};

const dropdownData = [
  {
    label: "Pending",
    value: "1",
  },
  {
    label: "Syarat Tidak Terpenuhi",
    value: "2",
  },
  {
    label: "Diterima dan Dilanjutkan",
    value: "3",
  },
  {
    label: "Sudah Diketik dan Diparaf",
    value: "4",
  },
  {
    label: "Ditandatangani Lurah/Selesai",
    value: "5",
  },
  {
    label: "Surat dicetak",
    value: "6",
  },
];

const ModalUpdateStatus = ({ show, close, data }) => {
  const { actionLoading, setActionLoading } = useStore();
  const [selected, setSelected] = useState("");
  console.log(data);

  const getStatus = (status) => {
    console.log(status);
    const found = dropdownData.find((i) => i.value === status);
    return found.label;
  };

  const handleNotify = () => {
    addDoc(collection(db, "notifications"), {
      idSurat: data.uid,
      receiver: data.userID,
      sender: "admin",
      message: `Status pengajuan surat anda sedang ${getStatus(selected)}`,
      title: "Progress Pengajuan Surat",
      read: false,
    })
      .then((res) => {
        console.log("create notification success", res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSuratKeluar = async () => {
    setDoc(doc(db, "suratKeluar", data.uid), {
      idPengaju: data.userID,
      kodeSurat: data.id,
      namaPengaju: data.nama,
      namaSurat: `[${data.nama}-${data.nik}]-${data.jenisSurat}`,
      tanggalTerbit: serverTimestamp(),
    })
      .then((res) => {
        console.log("create doc success", res);
        // handleNotify();
        // setActionLoading(false);
      })
      .catch((e) => {
        console.log(e);
        // setActionLoading(false);
      });
  };

  const handleUpdateStatus = async () => {
    setActionLoading(true);
    try {
      const documentRef = doc(db, "pengajuan", data.uid);
      const newData = {
        idStatus: selected,
        statusPengajuan: getStatus(selected),
      };

      await updateDoc(documentRef, newData);
      if (selected === "6") await handleSuratKeluar();
      console.log("Document updated successfully!");
      handleNotify();
      setActionLoading(false);
      close();
    } catch (error) {
      console.error("Error updating document:", error);
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
            <h1>Update Pengajuan ID : {data.uid}</h1>
            <NativeSelect
              defaultValue={data.idStatus}
              data={dropdownData}
              onChange={(event) => setSelected(event.currentTarget.value)}
              placeholder="Status Pengajuan"
            />
            <div className="flex justify-evenly">
              <button
                onClick={close}
                className="rounded-lg bg-gray-600 px-6 py-2 text-white"
              >
                Batal
              </button>
              <button
                onClick={handleUpdateStatus}
                className="rounded-lg bg-primary px-6 py-2 text-white"
              >
                Update
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

const ModalViewBukti = ({ show, close, data }) => {
  const { actionLoading, setActionLoading } = useStore();
  const [selected, setSelected] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [image, setImage] = useState("");
  const timestamp = new Date(data.timestamp?.seconds * 1000);
  console.log(data);

  const handleModalImage = (url) => {
    setShowImage(true);
    setImage(url);
  };

  const handleCloseImage = (url) => {
    setShowImage(false);
    setImage("");
  };

  return (
    <>
      <Modal.Root size="auto" opened={show} onClose={close} centered>
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
              Detail Pengajuan
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="overflow-scroll py-4">
              <table>
                <tbody>
                  <tr>
                    <td className="font-bold">ID Surat</td>
                    <td>:</td>
                    <td>{data.uid}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Alamat</td>
                    <td>:</td>
                    <td>{data.alamat}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Opsi Surat</td>
                    <td>:</td>
                    <td>{data.namaOpsiSurat}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Timestamp</td>
                    <td>:</td>
                    <td>{timestamp.toDateString()}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">HP</td>
                    <td>:</td>
                    <td>{data.hp}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">ID Status</td>
                    <td>:</td>
                    <td>{data.idStatus}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Jenis Surat</td>
                    <td>:</td>
                    <td>{data.jenisSurat}</td>
                  </tr>
                  {/* <tr>
                    <td className="font-bold">ID</td>
                    <td>:</td>
                    <td>{data.id}</td>
                  </tr> */}
                  <tr>
                    <td className="font-bold">UserID</td>
                    <td>:</td>
                    <td>{data.userID}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Nama</td>
                    <td>:</td>
                    <td>{data.nama}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">NIK</td>
                    <td>:</td>
                    <td>{data.nik}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Status Pengajuan</td>
                    <td>:</td>
                    <td>{data.statusPengajuan}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Doc Tambahan</td>
                    <td>:</td>
                    <td>
                      <a
                        className="hover:cursor-pointer"
                        onClick={() => handleModalImage(data.docTambahan)}
                      >
                        Lihat
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold">Surat Pengantar</td>
                    <td>:</td>
                    <td>
                      <a
                        className="hover:cursor-pointer"
                        onClick={() => handleModalImage(data.suratPengantar)}
                      >
                        Lihat
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold">Scan KK</td>
                    <td>:</td>
                    <td>
                      <a
                        className="hover:cursor-pointer"
                        onClick={() => handleModalImage(data.scanKK)}
                      >
                        Lihat
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <Modal.Root
        size="100%"
        opened={showImage}
        onClose={handleCloseImage}
        centered
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Body>
            <Image src={image} />
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default AdminPengajuanSurat;
