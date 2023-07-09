import { Loader, LoadingOverlay } from "@mantine/core";
import React, { useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MainTemplate } from "./components/templates/MainTemplate";
import { useStore } from "./global/store";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./config/firebase";
import PengajuanSurat from "./pages/PengajuanSurat";
import LacakSurat from "./pages/LacakSurat";
import AdminTemplate from "./components/templates/AdminTemplate";
import Dashboard from "./pages/admin/Dashboard";
import AdminPengajuanSurat from "./pages/admin/AdminPengajuanSurat";
import AdminSuratKeluar from "./pages/admin/AdminSuratKeluar";
import AdminArsipPenduduk from "./pages/admin/AdminArsipPenduduk";
import LacakSuratDetail from "./pages/LacakSuratDetail";

function App() {
  const {
    authRefreshing,
    setAuthRefreshing,
    setActionLoading,
    actionLoading,
    isLoggedIn,
    setLoggedIn,
    setUserData,
    setAdmin,
    isAdmin,
  } = useStore();

  useEffect(() => {
    console.log(auth);
    console.log("Login State", isLoggedIn);
    // setAuthRefreshing(true)
    onAuthStateChanged(auth, (user) => {
      const checkAdmin = async () => {
        if (user) {
          console.log(user.uid);
          const docRef = doc(db, "users", user.uid);
          console.log(docRef);
          await getDoc(docRef).then((docSnap) => {
            console.log(docSnap);
            if (docSnap) {
              console.log(docSnap.data());
              // TODO: enable this later
              setAdmin(docSnap.data().isAdmin);
              // console.log(isAdmin)
              setUserData(docSnap.data());
            }
            setLoggedIn(true);
            setAuthRefreshing(false);
          });
        } else {
          console.log(user);
          setAuthRefreshing(false);
        }
      };
      checkAdmin();
    });
  }, []);

  const LoginCheck = () =>
    auth.currentUser !== null ? <Navigate to={"/"} /> : <Outlet />;
  const UserCheck = () =>
    auth.currentUser === null ? <Navigate to={"/"} /> : <Outlet />;
  const AdminCheck = () => (isAdmin ? <Outlet /> : <Navigate to={"/"} />);

  return authRefreshing ? (
    <div className="flex h-screen w-full items-center justify-center">
      {/* <BeatLoader color='#88ceef' /> */}
      <LoadingOverlay
        loader={<Loader size={80} />}
        visible={true}
        overlayBlur={2}
      />
    </div>
  ) : (
    <div className="relative">
      <LoadingOverlay
        loader={<Loader size={80} />}
        visible={actionLoading}
        overlayBlur={2}
      />
      <Routes>
        {/* main */}
        <Route path="/" element={<MainTemplate />}>
          <Route index element={<HomePage />} />
          <Route element={<UserCheck />}>
            <Route path="/pengajuan" element={<PengajuanSurat />} />
            <Route path="/lacak" element={<LacakSurat />} />
            <Route path="/lacak/:id" element={<LacakSuratDetail />} />
          </Route>
        </Route>
        <Route element={<LoginCheck />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/admin-signin" element={<AdminSignIn />} /> */}
        </Route>
        {/* <Route element={<UserCheck />}>
        <Route
          path='/edit-profile'
          element={<EditProfile />}
        />
      </Route> */}
        <Route element={<UserCheck />}>
          {/* <Route path="/pengajuan" element={<PengajuanSurat />} /> */}
          {/* <Route path="/profile" element={<ProfileTemplate />}>
            <Route index element={<EditProfile />} />
            <Route path="/profile/notifikasi" element={<UserNotification />} />
            <Route path="/profile/pesanan" element={<Orders />} />
          </Route> */}
        </Route>
        /* CHECK IF USER ISADMIN
        <Route element={<AdminCheck />}>
          <Route path="/admin" element={<AdminTemplate />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/pengajuan" element={<AdminPengajuanSurat />} />
            <Route path="/admin/surat-keluar" element={<AdminSuratKeluar />} />
            <Route
              path="/admin/arsip-penduduk"
              element={<AdminArsipPenduduk />}
            />
          </Route>
        </Route>
        {/* <Route element={<AdminCheck />}>
          <Route path="/admin" element={<AdminTemplate />}>
            <Route index element={<DashPayments />} />
          </Route>
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
