import React from "react";
import { Link } from "react-router-dom";

const ThirdStep = ({ handler, form }) => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-10">
      <h1 className="text-2xl font-bold">
        Selamat : Anda Berhasil Mengajukan Surat. Berikut ID Surat Anda
      </h1>
      <h2 className="text-xl font-bold md:text-4xl">{form.values.id}</h2>
      <span>
        * setelah anda menekan tombol selesai, anda akan dialihkan ke beranda
        portal website cilodong. Dimohon untuk melakukan pengecekan secara
        berkala di web ini.
      </span>
      <Link
        to="/"
        className="flex w-full items-center justify-center rounded-lg bg-primary py-4 text-2xl font-bold text-white"
      >
        Selesai
      </Link>
    </div>
  );
};

export default ThirdStep;
