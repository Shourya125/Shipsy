import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoCheckmark, IoClose } from "react-icons/io5";
import { useSelector } from 'react-redux';

const ShipmentsList = () => {
    const user = useSelector(state => state?.user);
    const [shipments, setShipments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Change this to control rows per page

    const getShipments = async () => {
        try {
            const URL = `${import.meta.env.VITE_BACKEND_URL}/shipment/shipments-list`;
            const response = await axios.get(URL);
            setShipments(response?.data?.shipments || []);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        getShipments();
    }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = shipments.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(shipments.length / itemsPerPage);

    return (
        <div className="bg-slate-300 w-full p-3">
            <h1 className='text-2xl text-cyan-800 ml-2 mb-5 mt-2'>Shipments</h1>
            <table className="table-auto w-full border border-gray-300">
                <thead>
                    <tr className="bg-slate-200">
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
                            <td className="border px-2 py-1 text-center">{s.customer}</td>
                            <td className="border px-3 py-2 text-center">
                                {
                                    s.status === "Pending" ? (
                                        <span className='bg-yellow-500 text-white p-2'>{s.status}</span>
                                    ) : s.status === "Completed" ? (
                                        <span className='bg-green-500 text-white p-2'>{s.status}</span>
                                    ) : s.status === "Cancelled" ? (
                                        <span className='bg-red-500 text-white p-2'>{s.status}</span>
                                    ) : (
                                        <span className='bg-cyan-500 text-white p-2'>{s.status}</span>
                                    )
                                }
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
        </div>
    );
};

export default ShipmentsList;
