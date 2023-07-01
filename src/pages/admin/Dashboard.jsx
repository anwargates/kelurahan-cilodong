import React from "react";
import Pengajuan from "../../assets/icons/pengajuan.svg";
import { Anchor, Breadcrumbs, Progress } from "@mantine/core";

const items = [
  { title: "Home", href: "#" },
  { title: "Dashboard", href: "#" },
].map((item, index) => (
  <Anchor color="#2B6777" href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-xl font-bold text-primary">Dashboard</h1>
      <Breadcrumbs>{items}</Breadcrumbs>
      <div className="grid grid-cols-4 py-4">
        <div className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">218</h1>
              <h4 className="text-sm font-medium">Pengajuan Surat</h4>
            </div>
            <div className="flex items-start">
              <img src={Pengajuan} alt="" />
            </div>
          </div>
          <Progress value={50} color="#2B6777" />
          <small className="text-xs font-medium">218 Pengajuan Surat</small>
        </div>
        <div className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">124</h1>
              <h4 className="text-sm font-medium">Surat Keluar</h4>
            </div>
            <div className="flex items-start">
              <img src={Pengajuan} alt="" />
            </div>
          </div>
          <Progress value={50} color="#2B6777" />
          <small className="text-xs font-medium">124 Surat Keluar</small>
        </div>
        <div className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">2</h1>
              <h4 className="text-sm font-medium">Admin Cilodong</h4>
            </div>
            <div className="flex items-start">
              <img src={Pengajuan} alt="" />
            </div>
          </div>
          <Progress value={50} color="#2B6777" />
          <small className="text-xs font-medium">2 Admin Cilodong</small>
        </div>
        <div className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">43</h1>
              <h4 className="text-sm font-medium">Data Pegawai</h4>
            </div>
            <div className="flex items-start">
              <img src={Pengajuan} alt="" />
            </div>
          </div>
          <Progress value={50} color="#2B6777" />
          <small className="text-xs font-medium">43 Data Pegawai</small>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
