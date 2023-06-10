import { Loader, LoadingOverlay } from "@mantine/core";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MainTemplate } from "./components/templates/MainTemplate";
import { useStore } from "./global/store";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { authRefreshing, setAuthRefreshing, setActionLoading, actionLoading } =
    useStore();

  return !authRefreshing ? (
    <div className="flex h-screen w-full items-center justify-center">
      {/* <BeatLoader color='#88ceef' /> */}
      <LoadingOverlay
        loader={<Loader size={80} />}
        visible={true}
        overlayBlur={2}
      />
    </div>
  ) : (
    <>
      <LoadingOverlay
        loader={<Loader size={80} />}
        visible={actionLoading}
        overlayBlur={2}
      />
      <Routes>
        {/* main */}
        <Route path="/" element={<MainTemplate />}>
          <Route index element={<HomePage />} />
        </Route>
        {/* <Route element={<LoginCheck />}> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/admin-signin" element={<AdminSignIn />} /> */}
        {/* </Route> */}

        {/* <Route element={<UserCheck />}>
        <Route
          path='/edit-profile'
          element={<EditProfile />}
        />
      </Route>
        {/* <Route element={<UserCheck />}>
          <Route path="/profile" element={<ProfileTemplate />}>
            <Route index element={<EditProfile />} />
            <Route path="/profile/notifikasi" element={<UserNotification />} />
            <Route path="/profile/pesanan" element={<Orders />} />
          </Route>
        </Route>
        {/* CHECK IF USER ISADMIN */}
        {/* <Route element={<AdminCheck />}>
          <Route path="/admin" element={<AdminTemplate />}>
            <Route index element={<DashPayments />} />
          </Route>
        </Route>{" "}
        */}
      </Routes>
    </>
  );
}

export default App;
