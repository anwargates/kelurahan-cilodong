import {
  Avatar,
  Burger,
  Button,
  Drawer,
  Indicator,
  Loader,
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
import { auth, db } from "../config/firebase";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { BiBell } from "react-icons/bi";
import { BsBell } from "react-icons/bs";

// HEADER NAVBAR COMPONENT
export const Header = () => {
  // const [nav, setNav] = useState(false)
  const [nav, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { isLoggedIn, setLoggedIn, isAdmin } = useStore();
  const [notifications, setNotifications] = useState([]);
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

  useEffect(() => {
    const notificationsQuery = query(
      collection(db, "notifications"),
      where("read", "==", false),
      where(
        "receiver",
        "==",
        isLoggedIn && !isAdmin ? auth.currentUser?.uid : "admin"
      )
    );

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const updatedNotifications = snapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));
      console.log("NOTIFICATIONS", updatedNotifications);
      setNotifications(updatedNotifications);
    });

    return () => {
      isLoggedIn ? unsubscribe() : null;
    };
  }, [isAdmin]);

  // const handleNav = () => {
  //   setNav(!nav)
  // }

  const handleReadNotif = (i) => {
    try {
      const documentRef = doc(db, "notifications", i.uid);
      const newData = {
        read: true,
      };

      updateDoc(documentRef, newData);
      console.log("notification read!");
      close();
    } catch (error) {
      console.error("Error reading notification:", error);
    }

    isAdmin ? navigate(`/admin/pengajuan`) : navigate(`/lacak/${i.idSurat}`);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(setLoggedIn(false))
      .then(() => navigate("/"));
    close();
  };

  return (
    <header className="top-0 z-50 w-full">
      <nav className="shadow-lg">
        <div className="default-container flex h-[10vh] items-center justify-between gap-8 p-6 px-2 md:py-6 lg:px-16">
          {/* LOGO */}
          <Link to="/">
            <img src={LogoCilodong} alt="LogoCilodong" className="h-[6vh]" />
          </Link>

          <div className="flex items-center gap-10">
            {/* NAV LINKS */}
            <div className="font-bold">
              <ul className="hidden justify-between gap-8 md:flex">
                <li className="header-link-button">
                  <Link className="hover:text-gray-200" to="/">
                    Beranda
                  </Link>
                </li>
                {isLoggedIn ? (
                  !isAdmin ? (
                    <>
                      <li className="header-link-button">
                        <Link className="hover:text-gray-200" to="/pengajuan">
                          Pengajuan Surat
                        </Link>
                      </li>
                      <li className="header-link-button">
                        <Link className="hover:text-gray-200" to="/lacak">
                          Lacak Surat
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className="header-link-button">
                      <Link className="hover:text-gray-200" to="/admin">
                        Admin Dashboard
                      </Link>
                    </li>
                  )
                ) : null}
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

            {/* NAV RIGHT BUTTON ON DESKTOP */}
            {/*  check if still refreshing */}
            {false ? (
              <div className="w-30">
                <Loader color={"#2B6777"} size={80} />
              </div>
            ) : // if signed in the show profile picture
            isLoggedIn ? (
              <>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Indicator
                      inline
                      disabled={notifications.length == 0 ? true : false}
                      label={notifications.length}
                      size={16}
                    >
                      <BsBell />
                    </Indicator>
                  </Menu.Target>
                  <Menu.Dropdown className="text-xs font-medium text-black">
                    {notifications.slice(0, 3).map((i) => (
                      <Menu.Item key={i.uid} onClick={() => handleReadNotif(i)}>
                        {i.title}
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu>

                <div className="hidden hover:cursor-pointer md:block">
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
                      {/* <Menu.Item
                        // onClick={""}
                        rightSection={<BsBell />}
                      >
                        Notifications
                      </Menu.Item> */}
                      <Menu.Item
                        onClick={handleLogout}
                        rightSection={<FiLogOut />}
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </div>
              </>
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

            <Burger
              className="block md:hidden"
              color="black"
              opened={nav}
              onClick={toggle}
            />
            <Drawer opened={nav} onClose={close} position="right" size="xs">
              <div className="font-bold">
                <ul className="flex flex-col items-end justify-between gap-8">
                  <li className="header-link-button">
                    <Link
                      onClick={close}
                      className="hover:text-gray-200"
                      to="/"
                    >
                      Beranda
                    </Link>
                  </li>
                  {isLoggedIn ? (
                    !isAdmin ? (
                      <>
                        <li className="header-link-button">
                          <Link
                            onClick={close}
                            className="hover:text-gray-200"
                            to="/pengajuan"
                          >
                            Pengajuan Surat
                          </Link>
                        </li>
                        <li className="header-link-button">
                          <Link
                            onClick={close}
                            className="hover:text-gray-200"
                            to="/lacak"
                          >
                            Lacak Surat
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li className="header-link-button">
                        <Link
                          onClick={close}
                          className="hover:text-gray-200"
                          to="/admin"
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                    )
                  ) : null}
                  {isLoggedIn ? (
                    <li
                      onClick={handleLogout}
                      className="flex items-center gap-4"
                    >
                      Logout
                    </li>
                  ) : (
                    // if not signed in the show login button
                    <li className="flex items-center gap-4">
                      <Link to="/login">Log In</Link>
                    </li>
                  )}
                </ul>
              </div>
            </Drawer>
          </div>
        </div>
      </nav>
    </header>
  );
};
