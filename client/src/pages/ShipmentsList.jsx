import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoCheckmark, IoClose, IoEye, IoPencil, IoTrash } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { IoSearchOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';

const ShipmentsList = () => {
    const user = useSelector(state => state?.user);
    const [shipments, setShipments] = useState([]);
    const [ai, setAi] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Change this to control rows per page
    const [search, setSearch] = useState("")
    const [answer, setAnswer] = useState("")
    const [isloading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const getShipments = async () => {
        try {
            const URL = `${import.meta.env.VITE_BACKEND_URL}/shipment/shipments-list`;
            const response = await axios.get(URL);
            setShipments(response?.data?.shipments || []);
            console.log("shipments", response?.data?.shipments)
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        getShipments();
    }, []);

    const handleDeleteShipment = async (e, sid) => {
        e.stopPropagation();
        e.preventDefault();

        const URL = `${import.meta.env.VITE_BACKEND_URL}/shipment/delete-shipment/${sid}`;

        try {
            const response = await axios.delete(URL)
            console.log("response", response)
            if (response?.data?.success) {
                toast.success(response?.data?.message)
                getShipments()
            }
        }
        catch (error) {
            console.log("Error in deleting shipment", error)
        }


    }

    const handleSearch = async () => {
        const URL = `${import.meta.env.VITE_BACKEND_URL}/shipment/search`;
        try {
            const response = await axios.post(URL, {
                search: search
            })
            setShipments(response?.data?.shipments)
            console.log("response", response)
        }
        catch (error) {
            console.log("Search error", error)
        }
    }

    useEffect(() => {
        handleSearch()
    }, [search])

    const handleSort = async () => {
        const URL = `${import.meta.env.VITE_BACKEND_URL}/shipment/sort`;
        try {
            const response = await axios.get(URL);
            setShipments(response?.data?.shipments)
            console.log("response", response)
        }
        catch (error) {
            console.log("Sort error", error)
        }
    }

    const handleAi = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const URL = `${import.meta.env.VITE_BACKEND_URL}/shipment/ai`;
        try {
            setIsLoading(true)
            const response = await axios.post(URL, {
                prompt: ai
            })
            setIsLoading(false)
            console.log("response ai", response)
            if (response?.data?.success) {
                setAnswer(response?.data?.data)
                setAi("")
            }
        }
        catch (error) {
            console.log("AI error", error)
        }
    }

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = shipments.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(shipments.length / itemsPerPage);

    return (
        <div className="bg-slate-300 w-full p-3 overflow-auto">
            <div className='flex flex-row justify-between'>
                <h1 className='text-2xl text-cyan-800 ml-2 mb-5 mt-2'>Shipments</h1>

                <div className='flex flex-row items-center gap-3'>
                    <div className='bg-white text-slate-700 p-2 rounded' >
                        <button onClick={handleSort} className='cursor-pointer hover:text-cyan-700'>Sort by Delivery date</button>
                    </div>
                    <div className='bg-white rounded h-14 overflow-hidden flex '>
                        <input
                            type='text'
                            placeholder='Search by customer...'
                            className='w-full outline-none py-1 h-full px-4'
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <div className='h-14 w-14 flex justify-center items-center'>
                            <IoSearchOutline size={25} />
                        </div>
                    </div>
                </div>
            </div>
            <table className="table-auto w-full border border-gray-300 mt-5">
                <thead>
                    <tr className="bg-slate-200">
                        <th className="border px-2 py-1 text-center"></th>
                        <th className="border px-2 py-1 text-center">Customer</th>
                        <th className="border px-2 py-1 text-center">Status</th>
                        <th className="border px-2 py-1 text-center">Delivery Date</th>
                        <th className="border px-2 py-1 text-center">Days Left</th>
                        <th className="border px-2 py-1 text-center">Fragile</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((s) => (
                        <tr key={s._id} className="bg-slate-50">
                            <td className="border px-2 py-1 text-center flex flex-row items-center justify-center gap-3">
                                <Link to={`/shipment/${s._id}`}><IoEye size={25} color="blue" style={{ cursor: "pointer" }} /></Link>
                                {
                                    user?.isAdmin && (
                                        <>
                                            <Link to={`/update-shipment/${s._id}`}><IoPencil size={25} color="green" style={{ cursor: "pointer" }} /></Link>
                                            <button onClick={(e) => handleDeleteShipment(e, s._id)}><IoTrash size={25} color="red" style={{ cursor: "pointer" }} /></button>
                                        </>
                                    )
                                }
                            </td>
                            <td className="border px-2 py-1 text-center">{s.customer}</td>
                            <td className="border px-3 py-2 text-center">
                                {(() => {
                                    const status = s.status?.trim().toLowerCase();
                                    if (status === "pending") {
                                        return <span className="bg-yellow-500 text-white p-2">{s.status}</span>;
                                    } else if (status === "delivered") {
                                        return <span className="bg-green-500 text-white p-2">{s.status}</span>;
                                    } else if (status === "cancelled") {
                                        return <span className="bg-red-500 text-white p-2">{s.status}</span>;
                                    } else {
                                        return <span className="bg-cyan-500 text-white p-2">{s.status}</span>;
                                    }
                                })()}
                            </td>
                            <td className="border px-2 py-1 text-center">
                                {new Date(s.estimatedDeliveryDate).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                })}
                            </td>
                            <td className="border px-2 py-1 text-center">
                                {(() => {
                                    const today = new Date();
                                    const deliveryDate = new Date(s.estimatedDeliveryDate);
                                    const diffTime = deliveryDate - today;
                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                                    let bgColor = diffDays === 0
                                        ? "bg-yellow-500 text-white"
                                        : diffDays < 0
                                            ? "bg-red-500 text-white"
                                            : "bg-green-500 text-white";

                                    return (
                                        <span className={`px-2 py-1 rounded ${bgColor}`}>
                                            {diffDays === 0
                                                ? "Today"
                                                : diffDays < 0
                                                    ? `${Math.abs(diffDays)} days ago`
                                                    : `${diffDays} days left`}
                                        </span>
                                    );
                                })()}
                            </td>
                            <td className="border px-2 py-1 text-center">
                                {Boolean(s.isFragile) ? (
                                    <span className="inline-flex items-center justify-center rounded-full bg-green-100 text-green-600 p-1">
                                        <IoCheckmark size={18} />
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center justify-center rounded-full bg-red-100 text-red-600 p-1">
                                        <IoClose size={18} />
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 gap-2">
                <button
                    className="px-3 py-1 bg-cyan-700 rounded disabled:opacity-70 text-slate-100"
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-slate-100 text-gray-700' : 'bg-gray-300'}`}
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    className="px-3 py-1 bg-cyan-700 rounded disabled:opacity-70 text-slate-100"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            <div className='flex flex-col gap-10'>
                <div className='flex items-center justify-center h-[150px] mt-15 w-lg mx-auto'>
                    <form onSubmit={handleAi} className='w-full relative '>
                        <textarea
                            value={ai}
                            placeholder="Ask anything about shipments..."
                            onChange={(e) => setAi(e.target.value)}
                            className="bg-white text-slate-900 p-1 w-full resize-none overflow-y-auto overflow-x-visible break-words h-[150px] mt-20"
                            rows={1} // start with one row
                        ></textarea>
                        <button type='submit' className='ml-1 absolute bottom-0 right-0 cursor-pointer'><span className='text-3xl text-black hover:text-4xl hover:text-cyan-600'>ᗔ</span></button>
                    </form>

                </div>
                <div className='bg-green-200 mt-5 w-fit mx-auto'>

                    {
                        isloading ? <Spinner /> : <p>{answer}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default ShipmentsList;
