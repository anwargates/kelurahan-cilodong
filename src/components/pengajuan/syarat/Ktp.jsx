import React from "react";

const Ktp = () => {
  return (
    <div className="    flex flex-col gap-2 px-1 py-6 text-xl font-semibold">
      <div>
        Prasyarat Pembuatan KTP Baru :
        <ul className="list-inside list-disc  text-base font-medium">
          <li>Berusia minimal 17 tahun</li>
          <li>
            Ada surat pengantar dari pihak Rukun Tetangga (RT) dan Rukun Warga
            (RW) setempat
          </li>
          <li>
            Bila bukan warga asli setempat, harus dilengkapi dengan surat
            keterangan pindah dari kota asal
          </li>
          <li>Scan Kartu Keluarga (KK)</li>
        </ul>
      </div>
      <div>
        Prasyarat Pembuatan KTP Baru :
        <ul className="list-inside list-disc text-base font-medium">
          <li>Scan Kartu Tanda Penduduk (KTP) yang rusak</li>
          <li>Scan Kartu Keluarga (KK)</li>
        </ul>
      </div>
      <div>
        Prasyarat Pembuatan KTP Hilang :
        <ul className="list-inside list-disc text-base font-medium">
          <li>Surat Kehilangan E-KTP dari kantor polisi </li>
          <li>
            Surat Pengantar dari pihak Rukun Tetangga (RT) dan Rukuun Warga (RW)
            setempat
          </li>
          <li>Scan Kartu Tanda Penduduk (KTP) Hilang Jika Ada</li>
        </ul>
      </div>
    </div>
  );
};

export default Ktp;
