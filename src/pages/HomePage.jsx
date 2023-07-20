import React from "react";
import Hero from "../assets/hero.jpeg";
import { Accordion } from "@mantine/core";

export const HomePage = () => {
  return (
    <div className="">
      <section className="bg-primary">
        <div className="default-container grid h-[90vh] grid-flow-col gap-28 px-4 py-44 xl:px-48">
          <div className="flex items-center justify-center">
            <img className="rounded-full" src={Hero} alt="" />
          </div>
          <div className="flex flex-col justify-center gap-1 text-white">
            <h1 className="text-5xl font-bold">Kelurahan Cilodong</h1>
            <h2 className="text-3xl font-bold">Layanan Informasi</h2>
            <p className="py-7">
              Pemberdayaan dan pelayanan masyarakat serta ketenteraman dan
              ketertiban umum serta lingkungan hidup dalam satu wilayah
              Kelurahan Cilangkap
            </p>
            <div className="flex h-14 w-40 items-center justify-center rounded-xl bg-[#C8D8E4] font-bold hover:cursor-pointer hover:text-gray-500">
              Selengkapnya
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="default-container mx-auto p-4">
          <h2 className="mb-4 text-2xl font-bold">Sejarah</h2>
          <p>
            Berdasarkan Peraturan Daerah Kota Depok Nomor 08 Tahun 2007, tentang
            Pembentukan Kecamatan di Kota Depok, Sebelumnya Kelurahan Cilodong
            termasuk dalam Wilayah Kecamatan Sukmajaya. Kelurahan Kalibaru pada
            Tahun 1996 dimekarkan menjadi Kecamatan Sukmajaya Kelurahan Cilodong
            dan pada tahun 2010 Menjadi Kecamatan Cilodong Kelurahan Cilodong.
          </p>

          <p>
            Setelah dimekarkan Kelurahan Cilodong di Kecamatan Cilodong
            mempunyai wilayah kerja meliputi :
          </p>

          <ul className="ml-8 list-none">
            <li>43 (empat puluh tiga) Rukun Tetangga (RT)</li>
            <li>8 (delapan) Rukun Warga (RW)</li>
          </ul>

          <p>3 (tiga) Rukun warga diantaranya:</p>

          <ul className="ml-8 list-none">
            <li>RW 003 (terdapat 5 RT)</li>
            <li>RW 004 (terdapat 4 RT)</li>
            <li>
              RW 007 (terdapat 3 RT) merupakan Wilayah Angkatan Darat (Asrama
              Divif 1 Kostrad).
            </li>
          </ul>

          <p>
            Dan pada Wilayah RW 001 terdapat Rutan Kelas IIB Depok, yang
            berlokasi di Jalan M. Nasir Nomor 52 RT 007 RW 001 Kelurahan
            Cilodong, Kec. Cilodong, Kota Depok.
          </p>
        </div>
      </section>
      <section>
        <div className="default-container mx-auto p-4">
          <h2 className="mb-4 text-2xl font-bold">
            Susunan Organisasi dan Fungsi Kelurahan Cilodong
          </h2>
          <Accordion variant="filled" radius="md" defaultValue="1">
            <Accordion.Item value="1">
              <Accordion.Control>
                <h3 className="mb-2 text-xl font-semibold">1. Lurah</h3>
              </Accordion.Control>
              <Accordion.Panel>
                <ul className="ml-8 list-none">
                  <li>
                    a. Memimpin dan melaksanakan tugas dan fungsinya sebagaimana
                    tugas dan fungsi Kelurahan
                  </li>
                  <li>
                    b. Memimpin dan memberdayakan bawahannya dalam rangka
                    pelaksanaan tugas dan pencapaian tujuan organisasi
                  </li>
                  <li>
                    c. Melaksanakan tugas-tugas lain yang diberikan Walikota
                    sesuai dengan tugas dan fungsinya.
                  </li>
                </ul>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="2">
              <Accordion.Control>
                <h3 className="mb-2 text-xl font-semibold">
                  2. Sekretaris Kelurahan
                </h3>
              </Accordion.Control>
              <Accordion.Panel>
                <ul className="ml-8 list-none">
                  <li>
                    a. Membantu Lurah dibidang administratif dan memberikan
                    pelayanan teknis administratif kepada seluruh perangkat
                    kelurahan
                  </li>
                  <li>
                    b. Penyelenggaraan koordinasi terhadap kegiatan yang
                    dilakukan oleh perangkat kelurahan
                  </li>
                  <li>
                    c. Pemberian pelayanan administrasi kepada masyarakat
                    dibidang pemerintahan dan pembinaan kesejahteraan rakyat
                  </li>
                  <li>
                    d. Pelaksanaan urusan Surat menyurat, kearsipan, rums
                    tangga, perlengkapan, menyusun laporan serta memberikan
                    pelayanan tehnis administratif kepada seluruh perangkat
                    kelurahan
                  </li>
                </ul>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="3">
              <Accordion.Control>
                <h3 className="mb-2 text-xl font-semibold">
                  3. Kasie Pemerintah & Trantib
                </h3>
              </Accordion.Control>
              <Accordion.Panel>
                <ul className="ml-8 list-none">
                  <li>a. Menyusun rencana kegiatan bidang pemerintahan</li>
                  <li>
                    b. Mengumpulkan, mengolah dan mengevaluasi data dibidang
                    pemerintahan
                  </li>
                  <li>
                    c. Mengumpulkan bahan dan menyusun laporan dibidang
                    pemerintahan dalam rangka pembinaan wilayah dan masyarakat
                  </li>
                  <li>
                    d. Melakukan pelayanan kepada masyarakat dibidang
                    pemerintahan dan kependudukan
                  </li>
                  <li>
                    e. Membantu pelaksanaan tugas-tugas dibidang pertanahan
                    sesuai dengan peraturan perundang-undangan
                  </li>
                  <li>f. Menyusun Rencana Kegiatan bidang trantib</li>
                  <li>
                    g. Mengumpulkan, mengolah dan mengevaluasi data di bidang
                    ketentraman dan ketertiban.
                  </li>
                  <li>
                    h. Melakukan pembinaan, ketentraman, ketertiban dan
                    perlindungan masyarakat
                  </li>
                  <li>
                    i. Membantu pelaksanaan pengawasan terhadap penyaluran
                    bantuan kepada masyarakat, serta melakukan kegiatan
                    pengumuman akibat bencana alam dan bencana lainnya
                  </li>
                  <li>
                    j. Membantu pengawasan pelaksanaan peraturan – peraturan
                    Daerah.
                  </li>
                  <li>k. Membantu pelayanan perizinan keramaian.</li>
                </ul>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="4">
              <Accordion.Control>
                <h3 className="mb-2 text-xl font-semibold">
                  4. Kasie Kemasyarakatan & Pelayanan
                </h3>
              </Accordion.Control>
              <Accordion.Panel>
                <ul className="ml-8 list-none">
                  <li>a. Menyusun Rencana Kegiatan bidang Kesra</li>
                  <li>
                    b. Melakukan pelayanan kepada masyarakat di bidang sosial
                    dan kesejahteraan rakyat
                  </li>
                  <li>
                    c. Melakukan pembinaan ritual keagamaan, kesehatan, keluarga
                    berencana, dan pendidikan masyarakat.
                  </li>
                  <li>
                    d. Membantu / memberikan pelayanan pengurusan administrasi
                    untuk perkawinan dan pelaksanaaan akad nikah.
                  </li>
                  <li>
                    e. Membantu/Memberikan pelayanan kepada masyarakat dalam
                    pengurusan surat keterangan sebagai persyaratan penerbitan
                    akta yang berkaitan dengan kelahiran, kematian, perkawinan,
                    perceraian, dan surat keterangan persyaratan haji
                  </li>
                  <li>
                    f. Membantu mengumpulkan dan menyalurkan dana / bantuan
                    terhadap korban bencana alam dan bencana lainnya
                  </li>
                  <li>
                    g. Membantu pelaksanaan kegiatan Lembaga Kemasyarakatan
                    Kelurahan yang meliputi Kader Pemberdayaan Masyarakat (LPMK,
                    PKK, RT/RW, Karang Taruna, Lembaga Adat serta kemasyarakatan
                    lainnya)
                  </li>
                  <li>
                    h. Membantu kegiatan pengumpulan dan penyaluran zakat, infaq
                    dan shodaqoh
                  </li>
                  <li>
                    i. Membantu pelaksanaan pemungutan dana bantuan yang sah
                  </li>
                  <li>
                    j. Mengumpulkan bahan dan menyusun laporan di bidang sosial
                    dan kesejahteraan rakyat
                  </li>
                </ul>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="5">
              <Accordion.Control>
                <h3 className="mb-2 text-xl font-semibold">
                  5. Kasie Pembangunan & Perekonomian
                </h3>
              </Accordion.Control>
              <Accordion.Panel>
                <ul className="ml-8 list-none">
                  <li>a. Menyusun Rencana Kegiatan bidang Ekbang</li>
                  <li>
                    b. Mengumpulkan, mengolah dan mengevaluasi data dibidang
                    perekonomian dan pembangunan
                  </li>
                  <li>
                    c. Melakukan kegiatan pembinaan terhadap perkoperasian,
                    pengusaha ekonomi lemah dan kegiatan perekonomian lainnya
                  </li>
                  <li>
                    d. Melakukan pelayanan kepada masyarakat dibidang
                    perekonomian dan pembangunan.
                  </li>
                  <li>
                    e. Melakukan kegiatan dalam rangka meningkatkan swadaya dan
                    partisipasi masyarakat dalam meningkatkan perekonomian dan
                    pelaksanaan pembangunan.
                  </li>
                  <li>
                    f. Membantu pembinaan koordinasi pelaksanaan pembangunan
                    serta menjaga dan memelihara prasarana dan sarana fisik
                    dilingkungan kelurahan.
                  </li>
                  <li>
                    g. Melakukan administrasi perekonomian dan pembangunan di
                    Kelurahan.
                  </li>
                  <li>
                    h. Mengumpulkan bahan dan menyusun laporan di bidang
                    perekonomian dan pembangunan
                  </li>
                  <li>
                    i. Melakukan kegiatan dalam rangka meningkatkan
                    produktifitas pertanian yang meliputi pengaturan sarana dan
                    prasarana pengairan dan koordinasi dengan dinas teknis
                    terkait.
                  </li>
                  <li>
                    j. Membantu pelayanan perizinan di bidang pembangunan dan
                    perekonomian
                  </li>
                  <li>
                    k. Melaksanakan tugas-tugas lain yang diberikan oleh Lurah
                    sesuai dengan bidang tugasnya.
                  </li>
                </ul>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </section>
    </div>
  );
};
