import React from "react";
import { BiCopyright } from "react-icons/bi";
import Logo from "../assets/logo-cilodong.png";
import Email from "../assets/icons/email.png";
import Address from "../assets/icons/address.png";
import Ringer from "../assets/icons/ringer.png";

export const Footer = () => {
  return (
    <footer className="w-full">
      <div className=" flex flex-col bg-third">
        <div className="default-container h-fullpx-20 grid grid-cols-2 gap-8 p-14 text-left text-white">
          <div className="flex flex-col gap-11">
            <img src={Logo} alt="logo" className="w-96" />
            <ul className="flex flex-col gap-4 text-xl font-normal">
              <li className="flex items-center gap-11">
                <img src={Address} alt="location" className="w-14" />
                <span className="align-middle">
                  Jl. M. Nasir No.888, Cilodong, Kota Depok, Jawa Barat 16415,
                  Indonesia
                </span>
              </li>
              <li className="flex items-center gap-11">
                <img src={Email} alt="location" className="w-14" />
                <span className="align-middle">email @cilodong.com</span>
              </li>
              <li className="flex items-center gap-11">
                <img src={Ringer} alt="location" className="w-14" />
                <span className="align-middle">+62 2187909547</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-9">
            <h1 className="text-4xl font-bold">Lokasi</h1>
            <div className="relative h-full overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7523069992108!2d106.84170508456084!3d-6.425861146231156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ea4bfafaa4f1%3A0x55e456f36ace1e98!2sCilodong%20Sub-District%20Office!5e0!3m2!1sen!2sid!4v1685786700663!5m2!1sen!2sid"
                width="100%"
                height="100%"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div className="m-auto h-[6px] min-w-[90%] bg-white" />
        <p className="my-4 text-center text-white">
          Copyright © 2023 Portal Kelurahan Kota Depok
        </p>
      </div>
    </footer>
  );
};
