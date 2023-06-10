import { Avatar, Burger, Button, Loader, Menu } from "@mantine/core";
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
export const Header = () => {
  // const [nav, setNav] = useState(false)
  const [nav, { toggle }] = useDisclosure(false);
  const navigate = useNavigate()
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
      .then(() => navigate('/'))
  }

  return (
    <header className="absolute top-0 z-50 w-full">
      <nav className="bg-secondary">
        <div className="default-container flex h-[10vh] items-center justify-between gap-8 p-6 sm:px-16 sm:py-6">
          {/* LOGO */}
          <Link to="/">
            <img src={LogoCilodong} alt="orcalogo" className="h-[6vh] w-auto" />
          </Link>

          <div className="flex items-center gap-10">
            {/* NAV LINKS */}
            <div className="font-bold">
              <ul className="hidden justify-between gap-8 lg:flex">
                <li className="header-link-button">
                  <Link className="hover:text-gray-200" to="/">
                    Beranda
                  </Link>
                </li>
                <li className="header-link-button">
                  <Link className="hover:text-gray-200" to="/photo-category">
                    Pengajuan Surat
                  </Link>
                </li>
                <li className="header-link-button">
                  <Link className="hover:text-gray-200" to="/gallery">
                    Lacak Surat
                  </Link>
                </li>
              </ul>
            </div>

            {/* NAV RIGHT BUTTON ON MOBILE */}
            {/* <div
              onClick={handleNav}
              className='block text-white lg:hidden'>
              {!nav ? (
                <AiOutlineMenu size={20} />
              ) : (
                <AiOutlineClose size={20} />
              )}
            </div> */}

            <Burger
              className="block lg:hidden"
              color="white"
              opened={nav}
              onClick={toggle}
            />

            {/* NAV RIGHT BUTTON ON DESKTOP */}
            {/*  check if still refreshing */}
            {false ? (
              <div className="w-30">
                <Loader color={"#2B6777"} size={80} />
              </div>
            ) : // if signed in the show profile picture
            isLoggedIn ? (
              <div className="hover:cursor-pointer">
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Avatar
                      src={auth?.currentUser?.photoURL ?? ""}
                      // src={""}
                      alt="profile"
                      radius="xl"
                      size="6vh"
                    />
                  </Menu.Target>
                  <Menu.Dropdown className="text-xs font-medium text-black">
                    <Menu.Item rightSection={<IoSettingsOutline />}>
                      Settings
                    </Menu.Item>
                    <Menu.Item onClick={handleLogout} rightSection={<FiLogOut />}>Logout</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            ) : (
              // if not signed in the show login button
              <div className="hidden items-center gap-4 lg:flex">
                {/* <Link to='/signup'>
                  <button className='w-28 h-12 bg-blue text-white font-bold'>SignUp</button>
                </Link> */}
                <Link to="/login">
                  <button className="h-12 w-28 rounded-md bg-white font-bold text-primary">
                    Log In
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
