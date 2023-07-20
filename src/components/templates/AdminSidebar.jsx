import { Navbar } from "@mantine/core";
import Dashboard from "../../assets/icons/dashboard.svg";
import Pengajuan from "../../assets/icons/pengajuan.svg";
import DataPegawai from "../../assets/icons/data_pegawai.svg";
import AkunAdmin from "../../assets/icons/akun_admin.svg";
import Arsip from "../../assets/icons/arsip.svg";
import SuratKeluar from "../../assets/icons/surat_keluar.svg";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <Navbar
      height={"100%"}
      withBorder={false}
      bg={"#FFFFFF"}
      p="md"
      width={{ base: 250 }}
      zIndex={1}
    >
      <Navbar.Section>
        <div
          onClick={() => navigate("/admin")}
          className="flex h-[42px] w-[188px] items-center justify-evenly rounded-lg bg-primary text-lg font-bold text-white"
        >
          <img src={Dashboard} />
          Dashboard
        </div>
      </Navbar.Section>
      <Navbar.Section mt="md">
        <div className="text-primary">
          <h3 className="my-4 text-lg font-semibold">Kelola Surat</h3>
          <ul className="flex flex-col gap-6 text-sm font-bold">
            <li
              onClick={() => navigate("/admin/pengajuan")}
              className="flex items-center justify-start gap-2 hover:cursor-pointer"
            >
              <img src={Pengajuan} alt="" />
              <span>Pengajuan Surat</span>
            </li>
            <li
              onClick={() => navigate("/admin/surat-keluar")}
              className="flex items-center justify-start gap-2 hover:cursor-pointer"
            >
              <img src={SuratKeluar} alt="" />
              <span>Surat Keluar</span>
            </li>
            <li
              onClick={() => navigate("/admin/arsip-penduduk")}
              className="flex items-center justify-start gap-2 hover:cursor-pointer"
            >
              <img src={Arsip} alt="" />
              <span>Arsip Penduduk</span>
            </li>
          </ul>
        </div>
      </Navbar.Section>
      <Navbar.Section grow mt="md">
        <div className="text-primary">
          <h3 className="my-4 text-lg font-semibold">Kelola Akun</h3>
          <ul className="flex flex-col gap-6 text-sm font-bold">
            <li className="flex items-center justify-start gap-2 hover:cursor-pointer">
              <img src={AkunAdmin} alt="" />
              <span>Akun Admin</span>
            </li>
            {/* <li className="flex items-center justify-start gap-2 hover:cursor-pointer">
              <img src={DataPegawai} alt="" />
              <span>Data Pegawai</span>
            </li> */}
          </ul>
        </div>
      </Navbar.Section>
      <Navbar.Section>
        <div className="flex h-[42px] w-[188px] items-center justify-evenly rounded-lg bg-primary text-lg font-bold text-white">
          Logout
        </div>
      </Navbar.Section>
    </Navbar>
  );
};

export default AdminSidebar;
