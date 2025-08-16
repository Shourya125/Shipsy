import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import uploadFile from "../helpers/uploadFile.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Spinner from "../components/Spinner.jsx";

const RegisterPage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [uploadPhoto, setUploadPhoto] = useState("");
  const [rp, setrp] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file);
    console.log("uploadPhoto", uploadPhoto);

    setUploadPhoto(uploadPhoto);

    setData((preve) => {
      return {
        ...preve,
        profile_pic: uploadPhoto?.url,
      };
    });
  };

  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${import.meta.env.VITE_BACKEND_URL}/user/register`;

    try {
      const response = await axios.post(URL, data);
      console.log("response", response);

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });

        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    console.log("data", data);
  };

  const suggestPassword = async () => {
    const URL = `${import.meta.env.VITE_BACKEND_URL}/user/suggest`;

    try {
      setIsLoading(true)
      const response = await axios.get(URL)
      setIsLoading(false)
      setrp(response?.data?.pass)
      console.log("response", response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    suggestPassword()
  }, [])

  return (
    <div className="h-screen flex flex-row">
      <div className=" w-3/5 hidden md:block">
        <img
          src="https://etimg.etb2bimg.com/photo/118316548.cms"
          alt="Image"
          className="w-full h-full"
        />
      </div>
      <div className="bg w-full md:w-2/5 h-screen bg-slate-300 flex items-center justify-center overflow-scroll p-2">
        <div className="bg-slate-200 py-5 px-10 w-3/4">
          <h3 className="text-cyan-800 text-2xl mt-2">
            Welcome to Shipment app!
          </h3>

          <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-cyan-800">
                Name :
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="enter your name"
                className="bg-slate-100 px-2 py-1 focus:outline-cyan-800"
                value={data.name}
                onChange={handleOnChange}
                required
              />
            </div>

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

            <p className="text-slate-700">Recommended Password :
              {
                isLoading ? <Spinner /> : <p className="text-cyan-800">{rp}</p>
              }
            </p>

            <div className="flex flex-col gap-1">
              <label htmlFor="profile_pic" className="text-cyan-800">
                Photo :
                <div className="h-14 bg-cyan-800 flex justify-center items-center border rounded cursor-pointer hover:bg-cyan-600">
                  <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1 text-slate-100">
                    {uploadPhoto?.original_filename
                      ? uploadPhoto?.original_filename
                      : "Upload profile photo"}
                  </p>
                  {uploadPhoto?.original_filename && (
                    <button
                      className="text-lg text-slate-100 ml-2 hover:text-red-600"
                      onClick={handleClearUploadPhoto}
                    >
                      <IoClose size={20} />
                    </button>
                  )}
                </div>
              </label>

              <input
                type="file"
                id="profile_pic"
                name="profile_pic"
                className="bg-slate-100 px-2 py-1 hidden"
                onChange={handleUploadPhoto}
                accept="image/*"
              />
            </div>

            <button className="text-lg  px-4 py-1  rounded mt-2 font-bold text-white bg-cyan-800 hover:bg-cyan-600">
              Register
            </button>
          </form>

          <p className="my-3 text-center">
            Already have an account ?{" "}
            <Link
              to={"/login"}
              className="hover:text-cyan-600 text-cyan-800 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
