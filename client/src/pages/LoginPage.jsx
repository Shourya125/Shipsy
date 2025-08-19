import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../store/userSlice";
import { useEffect } from "react";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${import.meta.env.VITE_BACKEND_URL}/user/login`;

    try {
      const response = await axios({
        method: "post",
        url: URL,
        data: data,
        withCredentials: true,
      });
      console.log("response", response);

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setToken(response?.data?.token));
        dispatch(setUser(response?.data?.user))
        localStorage.setItem("token", response?.data?.token);

        setData({
          email: "",
          password: "",
        });

        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    console.log("data", data);
  };

  return (
    <div className="h-screen flex flex-row">
      <div className=" w-3/5 hidden md:block">
        <img
          src="https://etimg.etb2bimg.com/photo/118316548.cms"
          alt="Image"
          className="w-full h-full"
        />
      </div>
      <div className="bg w-full md:w-2/5 h-screen bg-slate-300 flex items-center justify-center">
        <div className="bg-slate-200 py-5 px-10 w-3/4">
          <h3 className="text-cyan-800 text-2xl mt-2">
            Welcome to Shipment app!
          </h3>

          <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-cyan-800">
                Email :
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="enter your email"
                className="bg-slate-100 px-2 py-1 focus:outline-cyan-800"
                value={data.email}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-cyan-800">
                Password :
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="enter your password"
                className="bg-slate-100 px-2 py-1 focus:outline-cyan-800"
                value={data.password}
                onChange={handleOnChange}
                required
              />
            </div>

            <button className="text-lg  px-4 py-1  rounded mt-2 font-bold text-white bg-cyan-800 hover:bg-cyan-600">
              Login
            </button>
          </form>

          <p className="my-3 text-center">
            Don't have an account ?{" "}
            <Link
              to={"/register"}
              className="hover:text-cyan-600 text-cyan-800 font-semibold"
            >
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
