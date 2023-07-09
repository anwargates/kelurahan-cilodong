import React from "react";
import Hero from "../assets/hero.jpeg";

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
      ?
    </div>
  );
};
