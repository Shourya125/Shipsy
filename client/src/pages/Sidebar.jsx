import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, setToken } from "../store/userSlice";
import toast from "react-hot-toast";
import { PiUserCircle } from "react-icons/pi";

const Sidebar = () => {
    const user = useSelector(state => state?.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    console.log("user state", user)

    const handleLogout = async () => {
        try {
            const URL = `${import.meta.env.VITE_BACKEND_URL}/user/logout`;
            const response = await axios.get(URL, { withCredentials: true })
            console.log("response", response)
            if (response?.data?.success) {
                toast.success(response?.data?.message)
                dispatch(logout())
                dispatch(setToken(null))
                localStorage.clear()
                navigate("/login")
            }

        } catch (error) {
            console.log("error", error)
        }
    }

    return (
        <div className="bg-slate-500 h-full hidden md:block pr-2">
            <div className="flex flex-col gap-2 py-2">
                <div className="flex flex-row items-center justify-center gap-3 mt-3 mb-3">
                    {
                        user?.profile_pic ? (
                            <img src={user?.profile_pic} height={40} width={40} alt="image" />
                        ) : (
                            <span className="text-slate-100"><PiUserCircle size={40} /></span>
                        )
                    }
                    {
                        user?.name && (
                            <span className="text-slate-100 text-2xl">{user.name}</span>
                        )
                    }
                </div>
                <Link to={"/"} className="p-3 bg-slate-200 text-lg hover:bg-cyan-800 hover:text-white w-full block">
                    Home
                </Link>
                {
                    user?.isAdmin && (
                        <Link to={"/create-shipment"} className="p-3 bg-slate-200 text-lg hover:bg-cyan-800 hover:text-white w-full block">
                            Create Shipment
                        </Link>
                    )
                }
                {
                    token && (
                        <Link to={"/shipments-list"} className="p-3 bg-slate-200 text-lg hover:bg-cyan-800 hover:text-white w-full block">
                            Shipments
                        </Link>
                    )
                }
                {
                    token && (
                        <button onClick={handleLogout} className="p-3 bg-slate-200 text-lg hover:bg-cyan-800 hover:text-white w-full block">
                            Logout
                        </button>
                    )
                }
                {
                    !token && (
                        <>
                            <Link to={"/login"} className="p-3 bg-slate-200 text-lg hover:bg-cyan-800 hover:text-white w-full block">
                                Login
                            </Link>
                            <Link to={"/register"} className="p-3 bg-slate-200 text-lg hover:bg-cyan-800 hover:text-white w-full block">
                                Sign Up
                            </Link>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Sidebar;
