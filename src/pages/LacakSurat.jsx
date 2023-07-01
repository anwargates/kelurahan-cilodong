import { Group, Pagination, Table } from "@mantine/core";
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

const LacakSurat = () => {
  const [pengajuanData, setPengajuanData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const { setActionLoading } = useStore();
  // const [currentPage, setCurrentPage] = useState(1)

  const userId = auth.currentUser.uid;

  const itemsPerPage = 5;

  const pengajuanRef = collection(db, "pengajuan");
  const filter = where("userID", "==", userId);
  const pengajuanQuery = query(
    pengajuanRef,
    filter,
    orderBy("timestamp", "desc"),
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
    const totalItemQuery = query(pengajuanRef, filter);
    const snapshot = await getCountFromServer(totalItemQuery);
    setTotalItems(snapshot.data().count);
    try {
      let newQuery = pengajuanQuery;

      if (pagination.active > 1) {
        const lastVisiblePayment = pengajuanData[pengajuanData.length - 1];
        const lastVisibleTimestamp = lastVisiblePayment.timestamp;

        newQuery = query(
          pengajuanRef,
          where("userID", "==", userId),
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
    console.log(pengajuanData);
  }, [pagination.active]);

  const rows = pengajuanData.map((element, index) => {
    const timestamp = new Date(element.timestamp.seconds * 1000);
    return (
      <tr key={element.id}>
        <td className="p-2">{index + 1}</td>
        <td className="p-2">{element.nama}</td>
        <td className="p-2">{element.jenisSurat}</td>
        <td className="p-2">{timestamp.toDateString()}</td>
      </tr>
    );
  });

  const tableRows = pengajuanData.length ? rows : null;

  return (
    <div className="min-h-[800px] pt-[10vh]">
      <h1 className="my-8 text-center text-5xl font-bold text-primary">
        Data Table Pengajuan Surat
      </h1>
      <div className="m-auto my-8 w-[1024px] rounded-lg bg-[#C8D8E4] p-4">
        <table className="my-2 w-full bg-white">
          <thead className="w-full bg-cyan-800 text-left text-white">
            <tr>
              <th className="p-2">No.</th>
              <th className="p-2">Nama Pengaju</th>
              <th className="p-2">Jenis Surat</th>
              <th className="p-2">Tanggal</th>
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
  );
};

export default LacakSurat;
