import { Group, Loader, LoadingOverlay, Pagination } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
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
import { usePagination } from "@mantine/hooks";
import { useStore } from "../global/store";
import { Space, Table } from "antd";
import { useNavigate } from "react-router-dom";

const LacakSurat = () => {
  const [pengajuanData, setPengajuanData] = useState([]);
  const [pending, setPending] = useState(false);
  const { actionLoading, setActionLoading } = useStore();
  const navigate = useNavigate();
  // const [currentPage, setCurrentPage] = useState(1)

  const userId = auth.currentUser.uid;

  const itemsPerPage = 5;

  const pengajuanRef = collection(db, "pengajuan");
  const filter = where("userID", "==", userId);
  const pengajuanQuery = query(
    pengajuanRef,
    filter,
    orderBy("timestamp", "desc")
  );

  const columns = [
    //  {
    //    title: "ID Surat",
    //    dataIndex: "id",
    //    key: "id",
    //  },
    {
      title: "Nama Pengaju",
      dataIndex: "nama",
      key: "nama",
    },
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
    // {
    //   title: "Actions",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <button
    //         //  onClick={() => handleModal(record)}
    //         className="whitespace-nowrap rounded-3xl bg-green-800 p-2 text-white"
    //       >
    //         Update Status
    //       </button>
    //     </Space>
    //   ),
    // },
  ];

  const fetchData = async () => {
    setPending(true);
    try {
      const snapshot = await getDocs(pengajuanQuery);
      const resultData = snapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));
      setPengajuanData(resultData);
      setPending(false);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setPending(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const rowProps = (record) => {
    return {
      onClick: () => {
        navigate(`/lacak/${record.id}`);
      },
    };
  };

  return (
    <>
      <div className="relative min-h-[800px] pt-4 md:px-10">
        <LoadingOverlay
          loader={<Loader size={80} />}
          visible={pending}
          overlayBlur={1}
        />
        <h1 className="my-8 text-center text-5xl font-bold text-primary">
          Data Table Pengajuan Surat
        </h1>
        <div className="m-auto my-8 w-full rounded-lg bg-[#C8D8E4] p-4">
          <Table
            scroll={{ x: "100vw" }}
            loading={actionLoading}
            pagination={{
              position: ["bottomLeft"],
            }}
            dataSource={pengajuanData}
            columns={columns}
            className="custom-table"
            onRow={rowProps}
          />
        </div>
      </div>
    </>
  );
};

export default LacakSurat;
