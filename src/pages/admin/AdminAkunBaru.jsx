import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { useStore } from "../../global/store";

const AdminAkunBaru = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const { setActionLoading, setLoggedIn } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(getValues());
    console.log(errors);
  }, [getValues()]);

  const onSubmit = (data) => {
    setActionLoading(true);
    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        handleCreateDoc(userCredential.user.uid, data);
        console.log(userCredential);
        setActionLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setActionLoading(false);
      });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(setLoggedIn(false))
      .then(() => navigate("/"));
  };

  const handleCreateDoc = async (id, data) => {
    await setDoc(doc(db, "users", id), {
      nama: data.nama,
      isAdmin: true,
    })
      .then((res) => {
        console.log("create doc success", res);
        setActionLoading(false);
        handleLogout();
      })
      .catch((e) => {
        setActionLoading(false);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="">
        <div className="">
          <div className="flex flex-col gap-10 bg-primary px-4 py-12 text-white md:px-14">
            <div>
              <h1 className="text-3xl font-bold">Buat Akun Admin Baru</h1>
            </div>
            <form
              className="flex w-full flex-col gap-8 text-left"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="input-field flex">
                <input
                  className="inner-input"
                  type="email"
                  placeholder="Masukkan Email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
              </div>
              <div className="flex flex-col gap-7 sm:flex-row">
                <div className="input-field flex">
                  <input
                    className="inner-input pr-0"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan Password"
                    {...register("password", { required: true, minLength: 6 })}
                  />
                  <div className="flex items-center justify-center px-2">
                    {showPassword ? (
                      <BsEyeSlash onClick={togglePasswordVisibility} />
                    ) : (
                      <BsEye onClick={togglePasswordVisibility} />
                    )}
                  </div>
                </div>
                <div className="input-field flex">
                  <input
                    className="inner-input pr-0"
                    type={showPassword ? "text" : "password"}
                    placeholder="Konfirmasi Password"
                    {...register("confirmPassword", {
                      required: true,
                      minLength: 6,
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                  />
                  <div className="flex items-center justify-center px-2">
                    {showPassword ? (
                      <BsEyeSlash onClick={togglePasswordVisibility} />
                    ) : (
                      <BsEye onClick={togglePasswordVisibility} />
                    )}
                  </div>
                </div>
              </div>
              {errors.root?.confirmPassword && (
                <span>{errors.root?.confirmPassword?.message}</span>
              )}
              <div className="input-field flex">
                <input
                  className="inner-input"
                  type="text"
                  placeholder="Masukkan Nama"
                  {...register("nama", {
                    required: true,
                  })}
                />
              </div>
              <input className="btn-submit" type="submit" value="Daftar" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAkunBaru;
