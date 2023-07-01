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

const items = [
  { title: "Home", href: "#" },
  { title: "Dashboard", href: "#" },
].map((item, index) => (
  <Anchor color="#2B6777" href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const AdminPengajuanSurat = () => {
  const [pengajuanData, setPengajuanData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [filtered, setFiltered] = useState("NA");
  const [ktpCount, setKtpCount] = useState(0);
  const [kkCount, setKkCount] = useState(0);
  const [naCount, setNaCount] = useState(0);
  const { setActionLoading } = useStore();
  // const [currentPage, setCurrentPage] = useState(1)

  const userId = auth.currentUser.uid;

  const itemsPerPage = 5;

  const pengajuanRef = collection(db, "pengajuan");
  const filters = where("jenisSurat", "==", filtered);
  const pengajuanQuery = query(
    pengajuanRef,
    filters,
    orderBy("timestamp", "desc"),
    limit(itemsPerPage)
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pagination = usePagination({ total: totalPages });

  const handlePageChange = (page) => {
    pagination.setPage(page);
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
    const totalItemQuery = query(pengajuanRef, filters);
    const snapshot = await getCountFromServer(totalItemQuery);
    setTotalItems(snapshot.data().count);
    try {
      let newQuery = pengajuanQuery;

      if (pagination.active > 1) {
        const lastVisiblePayment = pengajuanData[pengajuanData.length - 1];
        const lastVisibleTimestamp = lastVisiblePayment.timestamp;

        newQuery = query(
          pengajuanRef,
          orderBy("timestamp", "desc"),
          startAfter(lastVisibleTimestamp),
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
    getCountAll();
    console.log(pengajuanData);
  }, [pagination.active, filtered]);

  const handleModal = (data) => {
    setSelectedData(data);
    setShowModal(!showModal);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChangeSurat = (category) => {
    setFiltered(category);
    pagination.setPage(1);
  };

  const rows = pengajuanData.map((element, index) => {
    const timestamp = new Date(element.timestamp.seconds * 1000);
    return (
      <tr key={element.uid}>
        <td className="p-2">{index + 1}</td>
        <td className="p-2">{element.uid}</td>
        <td className="p-2">
          {element.nama} ({element.nik})
        </td>
        <td className="p-2">{element.jenisSurat}</td>
        <td className="p-2">{timestamp.toDateString()}</td>
        <td className="p-2">{element.hp}</td>
        <td className="p-2">{element.status}</td>
        <td className="p-2">
          <button
            onClick={() => handleModal(element)}
            className="whitespace-nowrap rounded-3xl bg-green-800 p-2 text-white"
          >
            Update Status
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
      <div className="mx-auto my-4 grid max-w-fit grid-cols-3 gap-4 py-4">
        <div
          onClick={() => handleChangeSurat("KTP")}
          className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg"
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
          className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg"
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
          className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg"
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
          <table className="my-2 w-full bg-white">
            <thead className="w-full bg-cyan-800 text-left text-white">
              <tr>
                <th className="p-2">No.</th>
                <th className="p-2">ID Surat</th>
                <th className="p-2">Nama Pengaju (NIK)</th>
                <th className="p-2">Jenis Surat</th>
                <th className="p-2">Tanggal</th>
                <th className="p-2">No. Hp</th>
                <th className="p-2">Status Pengajuan</th>
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
      <ModalUpdateStatus
        show={showModal}
        close={handleCloseModal}
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
];

const ModalUpdateStatus = ({ show, close, data }) => (
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
          <NativeSelect data={dropdownData} placeholder="Status Pengajuan" />
          <div className="flex justify-evenly">
            <button className="rounded-lg bg-gray-600 px-6 py-2 text-white">
              Batal
            </button>
            <button className="rounded-lg bg-primary px-6 py-2 text-white">
              Update
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal.Content>
  </Modal.Root>
);

export default AdminPengajuanSurat;
