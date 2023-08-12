import {
  Avatar,
  Burger,
  Button,
  Header,
  Loader,
  MediaQuery,
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
// import { auth } from "../config/firebase";
import { useStore } from "../global/store";
import { Link, useNavigate } from "react-router-dom";
import LogoCilodong from "../assets/logo-cilodong.png";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { auth } from "../config/firebase";

// HEADER NAVBAR COMPONENT
export const AdminHeader = ({ opened, handleOpen }) => {
  // const [nav, setNav] = useState(false)
  const [nav, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();
  const { isLoggedIn, setLoggedIn, isAdmin } = useStore();
  // const pending = useStore((state) => state.authRefreshing)
  // const isLoggedIn = useStore((state) => state.isLoggedIn)
  // const setPending = useStore((state) => state.setAuthRefreshing)
  const [pending, setPending] = useState(true);

  // TODO: Implement Later
  // useEffect(() => {
  //   // setPending(true)
  //   // console.log(auth)
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // user signed out
  //       console.log(user);
  //       setLoggedIn(true);
  //       setPending(false);
  //     } else {
  //       // user logged out
  //       console.log(user);
  //       setLoggedIn(false);
  //       setPending(false);
  //     }
  //   });
  // }, [auth]);

  // const handleNav = () => {
  //   setNav(!nav)
  // }

  const handleLogout = () => {
    signOut(auth)
      .then(setLoggedIn(false))
      .then(() => navigate("/"));
  };

  return (
    <Header height={"10vh"} withBorder={false}>
      <div className="flex items-center justify-between gap-8 p-6 sm:py-6">
        {/* LOGO */}
        <Link to="/">
          <img
            src={LogoCilodong}
            alt="LogoCilodong"
            className="h-[6vh] w-auto"
          />
        </Link>
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => handleOpen()}
            size="sm"
            color="black"
          />
        </MediaQuery>
      </div>
    </Header>
  );
};
