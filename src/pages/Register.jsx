import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Logo from "../assets/logo-cilodong.png";
import LoginArt from "../assets/login-art.png";
import { useStore } from "../global/store";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
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
        // updateProfile(auth.currentUser, {
        //   displayName: data.name,
        // }).catch((e) => {
        //   console.log(e)
        //   setActionLoading(false)
        //   // setErrorMessage(e.message)
        //   // toggleNotify.open()
        // })
        setActionLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setActionLoading(false);
        // setErrorMessage(e.message)
        // toggleNotify.open()
      });
  };

  const handleCreateDoc = async (id, data) => {
    await setDoc(doc(db, "users", id), {
      alamat: data.alamat,
      hp: data.hp,
      nama: data.nama,
      nik: data.nik,
      isAdmin: false,
    })
      .then((res) => {
        console.log("create doc success", res);
        setLoggedIn(true);
        setActionLoading(false);
        navigate("/");
      })
      .catch((e) => {
        setActionLoading(false);
        // setErrorMessage(e.message)
        // toggleNotify.open()
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="custom-background min-h-[100vh] px-2 py-10">
        <div className="bottom-8 left-0 right-0 top-8 m-auto grid h-[90%] w-full max-w-5xl rounded-lg border-[10px] border-primary md:grid-cols-2">
          <div className="relative hidden md:block">
            <img className="absolute left-7 top-7 w-32" src={Logo} alt="" />
            <img
              className="absolute bottom-0 left-0 right-0 top-0 m-auto"
              src={LoginArt}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-10 bg-primary py-12 text-white sm:px-14">
            <div>
              <h1 className="text-3xl font-bold">Register</h1>
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
              <div className="input-field flex">
                <input
                  className="inner-input"
                  type="text"
                  placeholder="Masukkan NIK"
                  {...register("nik", {
                    required: true,
                  })}
                />
              </div>
              <div className="input-field flex">
                <input
                  className="inner-input"
                  type="tel"
                  placeholder="Masukkan No HP"
                  {...register("hp", {
                    required: true,
                  })}
                />
              </div>
              <div className="input-field flex">
                <input
                  className="inner-input"
                  type="text"
                  placeholder="Masukkan Alamat"
                  {...register("alamat", {
                    required: true,
                  })}
                />
              </div>
              <input className="btn-submit" type="submit" value="Daftar" />
            </form>
            <span className="text-center">
              Sudah mempunyai akun ? <Link to={"/login"}>Masuk</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
