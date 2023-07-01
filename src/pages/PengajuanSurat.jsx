import { Stepper } from "@mantine/core";
import React, { useEffect, useState } from "react";
import FirstStep from "../components/pengajuan/FirstStep";
import { useForm } from "@mantine/form";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import SecondStep from "../components/pengajuan/SecondStep";
import ThirdStep from "../components/pengajuan/ThirdStep";
import { auth, db } from "../config/firebase";
import { useStore } from "../global/store";

const generateId = () => {
  const timestamp = Date.now().toString(); // Generate a unique timestamp
  const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string

  return `${randomString}${timestamp}`;
};

const PengajuanSurat = () => {
  const [active, setActive] = useState(0);
  const { userData } = useStore();

  const form = useForm({
    initialValues: {
      id: generateId(),
      jenisSurat: "",
      opsiSurat: "",
      nik: userData.nik || "",
      nama: userData.nama || "",
      hp: userData.hp || "",
      alamat: userData.alamat || "",
      suratPengantar: "",
      scanKK: "",
      docTambahan: "",
    },
    // validate: {
    //   lokasi: (value) => (!value ? "Mohon Diisi" : null),
    //   tanggal: (value) =>
    //     value.some((element) => element === null) ? "Mohon Diisi" : null,
    //   metode: (value) => (!value ? "Mohon Diisi" : null),
    //   bukti: (value) => (!value ? 'Mohon Diisi' : null),
    // },
  });

  // useEffect(() => {
  //   console.log(form.values);
  // }, [form.values]);

  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  //   const StepContent = ({ step }) => {
  //     const contentProps = {
  //       form: form,
  //       selected: currentCategory,
  //       handler: [nextStep, prevStep],
  //     }
  //     switch (step) {
  //       case 0:
  //         return <FirstStep {...contentProps} />
  //       case 1:
  //         return <SecondStep {...contentProps} />
  //       case 2:
  //         return <ThirdStep {...contentProps} />
  //       default:
  //         return null
  //     }
  //   }

  return (
    <div className="mt-[10vh] pt-16">
      <h1 className="text-center text-4xl font-bold">
        <span className="text-[#2B6777]">Pengajuan</span> Surat
      </h1>
      <div className="m-auto my-9 max-w-5xl rounded-xl bg-[#C8D8E499] p-9">
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          color="#2B6777"
          size="xl"
        >
          <Stepper.Step label="Pilih Jenis Surat">
            <FirstStep handler={[nextStep, prevStep]} form={form} />
          </Stepper.Step>
          <Stepper.Step label="Isi Formulir">
            <SecondStep handler={[nextStep, prevStep]} form={form} />
          </Stepper.Step>
          <Stepper.Step label="Selesai">
            <ThirdStep handler={[nextStep, prevStep]} form={form} />
          </Stepper.Step>
        </Stepper>
      </div>
    </div>
  );
};

export default PengajuanSurat;
