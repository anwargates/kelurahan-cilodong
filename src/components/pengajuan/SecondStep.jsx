import {
  Button,
  FileButton,
  Group,
  Loader,
  LoadingOverlay,
  NativeSelect,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import Ktp from "./syarat/Ktp";
import { useStore } from "../../global/store";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../config/firebase";
import { v4 } from "uuid";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const dropdownData = (jenis) => {
  switch (jenis) {
    case "KTP":
      return [
        { label: "Pilih...", value: "1" },
        { label: "Kartu Tanda Pengenal (KTP) - Baru", value: "KTP1" },
        { label: "Kartu Tanda Pengenal (KTP) - Hilang", value: "KTP2" },
        { label: "Kartu Tanda Pengenal (KTP) - Rusak", value: "KTP3" },
      ];
    case "KK":
      return [
        { label: "Pilih...", value: "1" },
        { label: "Kartu Keluarga (KK) - Baru", value: "KK1" },
        { label: "Kartu Keluarga (KK) - Pindah", value: "KK2" },
      ];
    case "NA":
      return [
        { label: "Pilih...", value: "1" },
        { label: "Nikah (N.A)", value: "NA" },
      ];
    default:
      return;
  }
};

const SecondStep = ({ handler, form }) => {
  // const { actionLoading, setActionLoading } = useStore();
  const [pending, setPending] = useState(false);
  const [nextStep, prevStep] = handler;

  const handleDropdownChange = (event) => {
    form.setFieldValue("opsiSurat", event.currentTarget.value);
    // setSelectedValue(event.currentTarget.value);
  };

  const uploadFile = async (file) => {
    const imageRef = ref(storage, `lampiran/${v4()}`);
    let url;

    try {
      const snapshot = await uploadBytes(imageRef, file);
      url = await getDownloadURL(snapshot.ref);
      console.log("url", url);
    } catch (error) {
      console.error(error);
    }
    return url;
  };

  const handleNotify = () => {
    addDoc(collection(db, "notifications"), {
      idSurat: form.values.id,
      receiver: "admin",
      sender: auth.currentUser.uid,
      message: `Pengajuan surat baru dari ${auth.currentUser.displayName}`,
      title: "Pengajuan Surat Baru",
      read: false,
    })
      .then((res) => {
        console.log("create notification success", res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getStatus = (jenis) => {
    console.log(jenis);
    const found = dropdownData(form.values.jenisSurat).find(
      (i) => i.value === jenis
    );
    console.log(found);
    return found.label;
  };

  const handleSubmit = async () => {
    let urlSuratPengantar = "",
      urlScanKK = "",
      urlDocTambahan = "";

    setPending(true);
    if (form.values.suratPengantar) {
      urlSuratPengantar = await uploadFile(form.values.suratPengantar);
    }
    if (form.values.scanKK) {
      urlScanKK = await uploadFile(form.values.scanKK);
    }
    if (form.values.docTambahan) {
      urlDocTambahan = await uploadFile(form.values.docTambahan);
    }

    console.log("urlSuratPengantar", urlSuratPengantar);

    // const { id, ...rest } = form.values;
    setDoc(doc(db, "pengajuan", form.values.id), {
      ...form.values,
      namaOpsiSurat: getStatus(form.values.opsiSurat),
      suratPengantar: urlSuratPengantar,
      scanKK: urlScanKK,
      docTambahan: urlDocTambahan,
      userID: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    })
      .then((res) => {
        console.log("create doc success", res);
        handleNotify();
        setPending(false);
        nextStep();
      })
      .catch((e) => {
        console.log(e);
        setPending(false);
      });
  };

  const handleNext = () => {
    // form.setFieldValue("jenisSurat", selectedValue);
    handleSubmit();
    // nextStep();
  };

  return (
    <>
      {console.log(form.values)}
      <LoadingOverlay
        loader={<Loader size={80} />}
        visible={pending}
        overlayBlur={2}
      />
      <NativeSelect
        defaultChecked={false}
        value={form.values.opsiSurat}
        onChange={handleDropdownChange}
        data={dropdownData(form.values.jenisSurat)}
      />
      {/* <h1>{Content(selectedValue)}</h1> */}
      {/* {dynamicComponent} */}
      <form className="my-4 flex flex-col gap-4" action="">
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="flex-1 text-2xl font-bold text-primary">
            Nama <span className="text-red-500">*</span>
          </label>
          <input
            className="flex-[3] rounded-md px-2 "
            type="text"
            {...form.getInputProps("nama")}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="flex-1 text-2xl font-bold text-primary">
            NIK <span className="text-red-500">*</span>
          </label>
          <input
            className="flex-[3] rounded-md px-2 "
            type="text"
            {...form.getInputProps("nik")}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="flex-1 text-2xl font-bold text-primary">
            No. HP <span className="text-red-500">*</span>
          </label>
          <input
            className="flex-[3] rounded-md px-2 "
            type="tel"
            {...form.getInputProps("hp")}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="flex-1 text-2xl font-bold text-primary">
            Alamat <span className="text-red-500">*</span>
          </label>
          <input
            className="flex-[3] rounded-md px-2 "
            type="text"
            {...form.getInputProps("alamat")}
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="flex-1 text-2xl font-bold text-primary">
            Surat Pengantar <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-[3] gap-2">
            <FileButton
              onChange={(value) => form.setFieldValue("suratPengantar", value)}
              accept="image/png,image/jpeg,application/pdf"
            >
              {(props) => (
                <Button
                  className="bg-white text-black hover:bg-slate-300"
                  {...props}
                >
                  Pilih File
                </Button>
              )}
            </FileButton>
            <Text size="sm" align="center" mt="sm">
              {form.values.suratPengantar
                ? form.values.suratPengantar.name
                : ""}
            </Text>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="flex-1 text-2xl font-bold text-primary">
            Scan KK <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-[3] gap-2">
            <FileButton
              onChange={(value) => form.setFieldValue("scanKK", value)}
              accept="image/png,image/jpeg,application/pdf"
            >
              {(props) => (
                <Button
                  className="bg-white text-black hover:bg-slate-300"
                  {...props}
                >
                  Pilih File
                </Button>
              )}
            </FileButton>
            <Text size="sm" align="center" mt="sm">
              {form.values.scanKK ? form.values.scanKK.name : ""}
            </Text>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="flex-1 text-2xl font-bold text-primary">
            Dok Tambahan <span className="text-red-500"></span>
          </label>
          <div className="flex flex-[3] gap-2">
            <FileButton
              onChange={(value) => form.setFieldValue("docTambahan", value)}
              accept="image/png,image/jpeg,application/pdf"
            >
              {(props) => (
                <Button
                  className="bg-white text-black hover:bg-slate-300"
                  {...props}
                >
                  Pilih File
                </Button>
              )}
            </FileButton>
            <Text size="sm" align="center" mt="sm">
              {form.values.docTambahan ? form.values.docTambahan.name : ""}
            </Text>
          </div>
        </div>
      </form>
      <button
        onClick={handleNext}
        className="w-full rounded-lg bg-primary py-4 text-2xl font-bold text-white"
      >
        Selanjutnya
      </button>
      <div className="my-2 flex flex-col gap-2 sm:flex-row">
        <div>Note : </div>
        <ul className="list-inside">
          <li>- Form dengan tanda wajib diisi</li>
          <li>
            - Isi dokumen tambahan sesuai dengan ketentuan diberitahukan
            sebelumnya
          </li>
        </ul>
      </div>
    </>
  );
};

export default SecondStep;
