import React from "react";

const Nikah = () => {
  return (
    <div className="flex flex-col gap-2 px-1 py-6 text-xl font-semibold">
      <div>
        Prasyarat Pembuatan Surat Pengantar Nikah:
        <ul className="list-inside list-disc  text-base font-medium">
          <li>Surat Pengantar RT dan RW</li>
          <li>Fotokopi KK</li>
          <li>Fotokopi KTP</li>
          <li>Data Calon Istri/Suami termasuk orang tua (Bapak /Ibu)</li>
          <li>
            Surat Perceraian dan Putusan Pengadilan Agama/Pengadilan Negeri.
          </li>
          <li>Surat Pernyataan Status di atas materai diketahui RT/RW</li>
        </ul>
      </div>
    </div>
  );
};

export default Nikah;
