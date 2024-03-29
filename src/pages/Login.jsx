import React, { useState } from "react";
import Logo from "../assets/logo-cilodong.png";
import LoginArt from "../assets/login-art.png";
import { Input } from "@mantine/core";
import { useForm } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useStore } from "../global/store";
import { auth } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setActionLoading, setLoggedIn } = useStore();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setActionLoading(true);
    // console.log(data);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setLoggedIn(true);
        setActionLoading(false);
        navigate("/");
        // ...
      })
      .catch((e) => {
        console.log(e);
        setActionLoading(false);
        // setErrorMessage(e.message);
        // toggleNotify.open();
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
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
        <div className="flex flex-col gap-10 bg-primary px-14 py-12 text-white">
          <div>
            <h1 className="text-3xl font-bold">Login</h1>
            <span className="text-xl font-normal">
              Selamat Datang di Website Kelurahan Cilodong
            </span>
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
            <div className="input-field flex">
              <input
                className="inner-input"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Password"
                {...register("password", { required: true })}
              />
              <div className="flex items-center justify-center px-4">
                {showPassword ? (
                  <BsEyeSlash onClick={togglePasswordVisibility} />
                ) : (
                  <BsEye onClick={togglePasswordVisibility} />
                )}
              </div>
            </div>
            <input className="btn-submit" type="submit" value="Login" />
          </form>
          <span className="text-center">
            Belum mempunyai akun ? <Link to={"/register"}>Daftar</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
