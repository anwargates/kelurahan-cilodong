import React from "react";

const ThirdStep = ({ handler, form }) => {
  return (
    <div>
      <h1>Selamat : Anda Berhasil Mengajukan Surat. Berikut ID Surat Anda </h1>
      <h2>{form.values.id}</h2>
      <span>
        * setelah anda menekan tombol selesai, anda akan dialihkan ke beranda
        portal website cilodong
      </span>
      <button className="w-full rounded-  lg bg-primary py-4 text-2xl font-bold text-white">
        Selesai
      </button>
    </div>
  );
};

export default ThirdStep;
