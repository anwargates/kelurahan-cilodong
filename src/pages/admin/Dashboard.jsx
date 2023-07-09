import React, { useEffect, useState } from "react";
import Pengajuan from "../../assets/icons/pengajuan.svg";
import { Anchor, Breadcrumbs, Progress } from "@mantine/core";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const items = [
  { title: "Home", href: "#" },
  { title: "Dashboard", href: "#" },
].map((item, index) => (
  <Anchor color="#2B6777" href={item.href} key={index}>
    {item.title}
  </Anchor>
));

const Dashboard = () => {
  const [pengajuanCount, setPengajuanCount] = useState(0);
  const [suratKeluarCount, setSuratKeluarCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [arsipCount, setArsipCount] = useState(0);

  const getCountAll = async () => {
    const pengajuanSurat = query(collection(db, "pengajuan"));
    const suratKeluar = query(collection(db, "suratKeluar"));
    const adminCilodong = query(
      collection(db, "users"),
      where("isAdmin", "==", true)
    );
    const arsipPenduduk = query(
      collection(db, "users"),
      where("isAdmin", "==", false)
    );
    const pengajuanResult = await getCountFromServer(pengajuanSurat);
    const suratKeluarResult = await getCountFromServer(suratKeluar);
    const adminResult = await getCountFromServer(adminCilodong);
    const arsipResult = await getCountFromServer(arsipPenduduk);
    setPengajuanCount(pengajuanResult.data().count);
    setSuratKeluarCount(suratKeluarResult.data().count);
    setAdminCount(adminResult.data().count);
    setArsipCount(arsipResult.data().count);
  };

  useEffect(() => {
    getCountAll();
  }, []);
  return (
    <div>
      <h1 className="text-xl font-bold text-primary">Dashboard</h1>
      <Breadcrumbs>{items}</Breadcrumbs>
      <div className="grid gap-4 py-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{pengajuanCount}</h1>
              <h4 className="text-sm font-medium">Pengajuan Surat</h4>
            </div>
            <div className="flex items-start">
              <img src={Pengajuan} alt="" />
            </div>
          </div>
          <Progress value={50} color="#2B6777" />
          <small className="text-xs font-medium">
            {pengajuanCount} Pengajuan Surat
          </small>
        </div>
        <div className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{suratKeluarCount}</h1>
              <h4 className="text-sm font-medium">Surat Keluar</h4>
            </div>
            <div className="flex items-start">
              <img src={Pengajuan} alt="" />
            </div>
          </div>
          <Progress value={50} color="#2B6777" />
          <small className="text-xs font-medium">
            {suratKeluarCount} Surat Keluar
          </small>
        </div>
        <div className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{adminCount}</h1>
              <h4 className="text-sm font-medium">Admin Cilodong</h4>
            </div>
            <div className="flex items-start">
              <img src={Pengajuan} alt="" />
            </div>
          </div>
          <Progress value={50} color="#2B6777" />
          <small className="text-xs font-medium">
            {adminCount} Admin Cilodong
          </small>
        </div>
        <div className="flex h-[133px] w-[249px] flex-col justify-between bg-white p-4 text-primary shadow-lg">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{arsipCount}</h1>
              <h4 className="text-sm font-medium">Arsip Penduduk</h4>
            </div>
            <div className="flex items-start">
              <img src={Pengajuan} alt="" />
            </div>
          </div>
          <Progress value={50} color="#2B6777" />
          <small className="text-xs font-medium">
            {arsipCount} Arsip Penduduk
          </small>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
