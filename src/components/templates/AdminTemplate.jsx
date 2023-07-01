import { AppShell, Navbar } from "@mantine/core";
import React from "react";
import AdminSidebar from "./AdminSidebar";
import { AdminHeader } from "../AdminHeader";
import Dashboard from "../../pages/admin/Dashboard";
import { Outlet } from "react-router-dom";

const AdminTemplate = () => {
  return (
    <div>
      <AppShell
        navbar={<AdminSidebar />}
        header={<AdminHeader />}
        children={<Outlet />}
      />
    </div>
  );
};

export default AdminTemplate;
