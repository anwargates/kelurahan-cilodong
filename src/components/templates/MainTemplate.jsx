import React from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Outlet } from "react-router-dom";

export const MainTemplate = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
