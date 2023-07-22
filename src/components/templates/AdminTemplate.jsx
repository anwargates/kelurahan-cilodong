import { AppShell, Aside, MediaQuery, Navbar, Text } from "@mantine/core";
import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { AdminHeader } from "../AdminHeader";
import Dashboard from "../../pages/admin/Dashboard";
import { Outlet } from "react-router-dom";

const AdminTemplate = () => {
  const [opened, setOpened] = useState(false);
  const handleOpen = () => {
    setOpened(!opened);
  };

  return (
    <div>
      <AppShell
        navbar={<AdminSidebar opened={opened} />}
        header={<AdminHeader opened={opened} handleOpen={handleOpen} />}
        children={<Outlet />}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
      />
    </div>
  );
};

export default AdminTemplate;
