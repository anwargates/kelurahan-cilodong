import { Loader, LoadingOverlay, Stepper, rem } from "@mantine/core";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { BsX } from "react-icons/bs";

const LacakSuratDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docRef = doc(db, "pengajuan", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setItem(data);
          console.log(data);
        } else {
          console.log("Document not found");
          setItem([]);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchDocument();
  }, [id]);

  return !item ? (
    <LoadingOverlay
      loader={<Loader size={80} />}
      visible={true}
      overlayBlur={2}
    />
  ) : (
    <div>
      {console.log(item)}
      <div className="default-container my-10 flex flex-col gap-4">
        <h1 className="mb-20 text-center text-4xl font-bold text-primary">
          Lacak Surat
        </h1>
        <h2 className="text-center">Detail Data:</h2>
        <div className="m-auto max-w-[640px] rounded-2xl bg-[#C8D8E4] p-4 sm:px-20">
          <table className="w-full">
            <tbody>
              <tr className="flex flex-col text-2xl text-gray-600 sm:table-row">
                <td>ID Surat</td>
                <td className="hidden sm:block">:</td>
                <td className="font-bold">{item.id}</td>
              </tr>
              <tr className=" flex flex-col text-2xl text-gray-600 sm:table-row">
                <td>Nama</td>
                <td className="hidden sm:block">:</td>
                <td className="font-bold">{item.nama}</td>
              </tr>
              <tr className=" flex flex-col text-2xl text-gray-600 sm:table-row">
                <td>NIK</td>
                <td className="hidden sm:block">:</td>
                <td className="font-bold">{item.nik}</td>
              </tr>
              <tr className=" flex flex-col text-2xl text-gray-600 sm:table-row">
                <td>No. HP</td>
                <td className="hidden sm:block">:</td>
                <td className="font-bold">{item.hp}</td>
              </tr>
              <tr className=" flex flex-col text-2xl text-gray-600 sm:table-row">
                <td>Jenis Surat</td>
                <td className="hidden sm:block">:</td>
                <td className="font-bold">{item.namaOpsiSurat}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="m-auto mb-24 mt-10 px-2 md:w-[700px]">
          <Stepper
            active={item.idStatus == 2 ? 1 : item.idStatus}
            color="#2B6777"
            breakpoint="sm"
            styles={{
              root: {
                "@media (min-width: 48em)": {
                  position: "relative",
                },
              },
              stepBody: {
                "@media (min-width: 48em)": {
                  width: 100,
                  position: "absolute",
                  top: 50,
                },
              },
              step: {
                "@media (min-width: 48em)": {
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                },
              },
              stepIcon: {
                "@media (min-width: 48em)": {
                  borderWidth: rem(4),
                  borderColor: "white",
                },
              },
              separator: {
                "@media (min-width: 48em)": {
                  marginLeft: rem(-3),
                  marginRight: rem(-3),
                  height: rem(20),
                },
              },
            }}
          >
            <Stepper.Step
              color={item.idStatus == 2 ? "red" : "#2B6777"}
              label={
                item.idStatus == 2
                  ? "Pengajuan Surat Ditolak"
                  : "Pengajuan Surat Pending"
              }
              completedIcon={item.idStatus == 2 ? <BsX size="2rem" /> : null}
            />
            <Stepper.Step label="Dokumen Diterima" />
            <Stepper.Step label="Verifikasi Berkas / Persyaratan Dilanjutkan" />
            <Stepper.Step label="Sudah Diketik Dan Diparaf" />
            <Stepper.Step label="Sudah Ditandatangani Lurah" />
            <Stepper.Step label="Selesai / Dapat Diambil" />
          </Stepper>
        </div>
        {item.idStatus === "3" && item.opsiSurat === "KTP1" ? (
          <h1 className="text-center">
            Pengajuan anda telah diterima, silakan ke kelurahan untuk melakukan
            foto dan melengkapi berkas lainnya
          </h1>
        ) : null}
        {item.idStatus === "2" ? (
          <h1 className="text-center">
            Pengajuan surat anda ditolak, silakan klik di{" "}
            <Link
              to="/pengajuan"
              state={{ ...item }}
              className="text-green-400"
            >
              sini
            </Link>{" "}
            untuk memperbaiki.
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default LacakSuratDetail;
