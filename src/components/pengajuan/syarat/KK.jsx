import React from "react";

const KK = () => {
  return (
    <div className="flex flex-col gap-2 px-1 py-6 text-xl font-semibold">
      <div>
        Ketentuan Penerbitan KK
        <ul className="ml-5 list-outside list-decimal  text-base font-medium">
          <li>
            Setiap Keluarga hanya memiliki 1 (satu) Kartu Keluarga dan setiap
            penduduk dicatat hanya pada 1 (satu) Kartu Keluarga
          </li>
          <li>
            Setiap Kartu Keluarga harus ada Nama Kepala Keluarga, alamat dan
            memiliki Nomor Induk Keluarga
          </li>
          <li>
            Kartu Keluarga (KK) wajib diganti / diperbaharui apabila rusak,
            hilang, terjadi perubahan data dan jumlah anggota keluarga.
          </li>
        </ul>
      </div>
      <div>
        Persyaratan pembuatan KK:
        <ul className="ml-5 list-outside list-decimal text-base font-medium">
          <li>Permohonan KK Baru</li>
          <ul className="ml-5 list-outside list-disc text-base font-medium">
            <li>Pengantar dari Desa/Kelurahan</li>
            <li>Izin Tinggal Tetap bagi orang asing (WNA)</li>
            <li>
              Fotocopy/menunjukan Kutipan Akta Nikah/Kutipan Akta Perkawinan
            </li>
            <li>
              Surat Keterangan Pindah/surat keterangan pindah datang bagi
              penduduk yang pindah dalam wilayah NKRI
            </li>
            <li>
              Surat Keterangan Datang dari LN yang diterbitkan oleh Dinas
              Kependudukan dan Pencatatan Sipil bagi WNI yang datang dari
              LN karena pindah.
            </li>
          </ul>
          <li>Pembetulan Data KK</li>
          <ul className="ml-5 list-outside list-disc text-base font-medium">
            <li>Surat Pengatar dari Desa/Kelurahan</li>
            <li>KK Lama</li>
            <li>
              Fotocopy Bukti Pendukung sesuai dengan permohonan pembetulan data
              dalam KK.
            </li>
          </ul>
          <li>Penerbitan KK karena Hilang atau Rusak</li>
          <ul className="ml-5 list-outside list-disc  text-base font-medium">
            <li>Surat Keterangan kehilangan dari kepala desa/lurah</li>
            <li>KK yang rusak</li>
            <li>
              Fotocopy atau menunjukan dokumen kependudukan dari salah satu
              anggota keluarga atau dokumen keimigrasian bagi orang asing.
            </li>
          </ul>
          {/* <li>
            Perubahan KK karena pengurangan anggota keluarga baik yang meninggal
            atau pindah
          </li>
          <ul className="ml-5 list-outside list-disc  text-base font-medium">
            <li>Surat Pengantar dari Desa/Kelurahan</li>
            <li>KK lama</li>
            <li>
              Fotocopy Surat Keterangan Kematian dan atau Surat
              Keterangan Pindah.
            </li>
          </ul>
          <li>
            Perubahan KK Karena Penambahan anggota yang mengalami kelahiran:
          </li>
          <ul className="ml-5 list-outside list-disc  text-base font-medium">
            <li>Pengantar dari Desa/Kelurahan</li>
            <li>KK lama</li>
            <li>Fotocopy Kutipan akta kelahiran/ surat keterangan lahir.</li>
          </ul>
          <li>
            Perubahan KK karena penambahan anggota yang menumpang ke dalam KK
          </li>
          <ul className="ml-5 list-outside list-disc  text-base font-medium">
            <li>Pengantar dari Desa/Kelurahan KK lama</li>
            <li>KK yang ditumpangi</li>
            <li>
              Surat Keterangan Pindah Datang bagi penduduk yang pindah dalam
              wilayah NKRI atau
            </li>
            <li>
              Surat Keterangan Datang dari LN bagi WNI yang datang dari
              LN karena Pindah.
            </li>
          </ul> */}
        </ul>
      </div>
    </div>
  );
};

export default KK;
