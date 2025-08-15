import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout, setUser } from "../store/userSlice";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/user/user-details`;
      const response = await axios.get(URL, {
        withCredentials: true,
      });
      dispatch(setUser(response?.data?.user));

      console.log("user details", response);

      if (response?.data?.logout) {
        dispatch(logout());
        navigate("/email");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="flex flex-row h-screen">
      <div className="md:w-1/5">
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default HomePage;
