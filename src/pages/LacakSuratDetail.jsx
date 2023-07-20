import { Loader, LoadingOverlay, Stepper, rem } from "@mantine/core";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";

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
        <div className="m-auto w-[640px] rounded-2xl bg-[#C8D8E4] p-6">
          <table className="w-full">
            <tbody>
              <tr className="text-2xl text-gray-600">
                <td>ID Surat</td>
                <td>:</td>
                <td className="font-bold">{item.id}</td>
              </tr>
              <tr className="text-2xl text-gray-600">
                <td>Nama</td>
                <td>:</td>
                <td className="font-bold">{item.nama}</td>
              </tr>
              <tr className="text-2xl text-gray-600">
                <td>NIK</td>
                <td>:</td>
                <td className="font-bold">{item.nik}</td>
              </tr>
              <tr className="text-2xl text-gray-600">
                <td>No. HP</td>
                <td>:</td>
                <td className="font-bold">{item.hp}</td>
              </tr>
              <tr className="text-2xl text-gray-600">
                <td>Jenis Surat</td>
                <td>:</td>
                <td className="font-bold">{item.jenisSurat}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="m-auto mb-24 mt-10 min-w-[800px] max-w-7xl">
          <Stepper
            active={item.idStatus}
            color="#2B6777"
            styles={{
              root: {
                position: "relative",
              },
              stepBody: {
                width: 100,
                position: "absolute",
                top: 50,
              },
              step: {
                padding: 0,
                display: "flex",
                flexDirection: "column",
              },
              stepIcon: {
                borderWidth: rem(4),
                borderColor: "white",
              },
              separator: {
                marginLeft: rem(-3),
                marginRight: rem(-3),
                height: rem(20),
              },
            }}
          >
            <Stepper.Step label="Pengajuan Surat Pending" />
            <Stepper.Step label="Dokumen Diterima" />
            <Stepper.Step label="Verifikasi Berkas / Persyaratan Dilanjutkan" />
            <Stepper.Step label="Sudah Diketik Dan Diparaf" />
            <Stepper.Step label="Sudah Ditandatangani Lurah" />
            <Stepper.Step label="Selesai / Dapat Diambil" />
          </Stepper>
        </div>
        {item.IdStatus === "3" && item.opsiSurat === "KTP1" ? (
          <h1 className="text-center">
            Pengajuan anda telah diterima, silakan ke kelurahan untuk melakukan
            foto dan melengkapi berkas lainnya
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default LacakSuratDetail;
