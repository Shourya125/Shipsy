import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateShipment = () => {

    const navigate = useNavigate()
    const user = useSelector(state => state?.user)

    // useEffect(() => {
    //     if (!user || !user.isAdmin) {
    //         navigate('/')
    //     }
    // })

    const [data, setData] = useState({
        name: "",
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

    return (
        <div className='bg-slate-400 flex items-center justify-center w-full'>
            <div className='bg-slate-200 px-10 py-10 w-4/5'>
                <h1 className='text-cyan-900 text-2xl'>Create Shipment</h1>
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



                    <button className="text-lg  px-4 py-1  rounded mt-2 font-bold text-white bg-cyan-800 hover:bg-cyan-600">
                        Create Shipment
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateShipment
