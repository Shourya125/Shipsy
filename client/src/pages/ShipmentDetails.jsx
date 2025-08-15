import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShipmentDetails = () => {
    const user = useSelector((state) => state?.user);
    const [shipment, setShipment] = useState(null);
    const { sid } = useParams()

    const fetchShipmentDetail = async () => {
        try {
            const URL = `${import.meta.env.VITE_BACKEND_URL}/shipment/shipment-details/${sid}`;
            const response = await axios.get(URL)
            setShipment(response?.data?.shipment);
            console.log("response", response)
        }
        catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        fetchShipmentDetail()
    }, [])


    return (
        <div className="bg-slate-200 w-full">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-6">
                <h2 className="text-2xl font-semibold mb-4 text-cyan-800">Shipment Details</h2>

                <div className="space-y-4 text-gray-700">
                    <div>
                        <strong>Customer:</strong> {shipment?.customer}
                    </div>
                    <div>
                        <strong>Status:</strong>{" "}
                        <span
                            className={`px-2 py-1 rounded text-white ${shipment?.status === "Pending"
                                ? "bg-yellow-500"
                                : shipment?.status === "Delivered"
                                    ? "bg-green-600"
                                    : shipment?.status === "Cancelled"
                                        ? "bg-red-600"
                                        : "bg-cyan-600"
                                }`}
                        >
                            {shipment?.status}
                        </span>
                    </div>

                    <div>
                        <strong>Is Fragile:</strong>{" "}
                        {shipment?.isFragile ? (
                            <IoCheckmark className="inline text-green-600" size={20} />
                        ) : (
                            <IoClose className="inline text-red-600" size={20} />
                        )}
                    </div>

                    <div>
                        <strong>Value:</strong> ₹{shipment?.value?.toFixed(2) ?? "N/A"}
                    </div>

                    <div>
                        <strong>Description:</strong> {shipment?.description}
                    </div>

                    <div>
                        <strong>Estimated Delivery Date:</strong>{" "}
                        {new Date(shipment?.estimatedDeliveryDate).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </div>

                    <div>
                        <strong>Shipped Date:</strong>{" "}
                        {shipment?.shippedDate
                            ? new Date(shipment?.shippedDate).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })
                            : "Not shipped yet"}
                    </div>

                    <div>
                        <strong>Origin:</strong> {shipment?.origin}
                    </div>

                    <div>
                        <strong>Destination:</strong> {shipment?.destination}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShipmentDetails;
