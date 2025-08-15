import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const CreateShipment = () => {

    const navigate = useNavigate()
    const user = useSelector(state => state?.user)

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/')
        }
    })

    const [formData, setFormData] = useState({
        customer: "",
        status: "Pending",
        isFragile: false,
        value: "",
        description: "",
        estimatedDeliveryDate: "",
        origin: "",
        destination: "",
        userId: user?._id
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const URL = `${import.meta.env.VITE_BACKEND_URL}/shipment/create-shipment`;

        try {
            const response = await axios.post(URL, formData);
            console.log("response", response);

            if (response.data.success) {
                toast.success(response.data.message);
                setFormData({
                    customer: "",
                    status: "Pending",
                    isFragile: false,
                    value: "",
                    description: "",
                    estimatedDeliveryDate: "",
                    origin: "",
                    destination: "",
                    userId: user?._id
                });

                navigate("/");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
        console.log("formData", formData)
    };

    return (
        <div className='bg-slate-300 flex items-center justify-center w-full overflow-scroll h-screen'>
            <div className='bg-slate-100 px-10 py-10 w-4/5 my-auto'>
                <h1 className='text-cyan-900 text-2xl'>Create Shipment</h1>
                <form
                    onSubmit={handleSubmit}
                    className="max-w-4xl mx-auto p-6 rounded shadow space-y-6"
                >

                    {/* Customer */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="customer">
                            Customer Name
                        </label>
                        <input
                            type="text"
                            id="customer"
                            name="customer"
                            value={formData.customer}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            placeholder="Customer name"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="status">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Is Fragile */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="isFragile"
                            name="isFragile"
                            checked={formData.isFragile}
                            onChange={handleChange}
                            className="h-5 w-5 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                        />
                        <label htmlFor="isFragile" className="text-gray-700 font-medium">
                            Fragile Item
                        </label>
                    </div>

                    {/* Value */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="value">
                            Shipment Value
                        </label>
                        <input
                            type="number"
                            id="value"
                            name="value"
                            value={formData.value}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            placeholder="Enter shipment value"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="3"
                            placeholder="Shipment description"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    {/* Estimated Delivery Date */}
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="estimatedDeliveryDate"
                        >
                            Estimated Delivery Date
                        </label>
                        <input
                            type="date"
                            id="estimatedDeliveryDate"
                            name="estimatedDeliveryDate"
                            value={formData.estimatedDeliveryDate}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>




                    {/* Origin */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="origin">
                            Origin
                        </label>
                        <input
                            type="text"
                            id="origin"
                            name="origin"
                            value={formData.origin}
                            onChange={handleChange}
                            required
                            placeholder="Shipment origin address"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    {/* Destination */}
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="destination"
                        >
                            Destination
                        </label>
                        <input
                            type="text"
                            id="destination"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            required
                            placeholder="Shipment destination address"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded"
                        >
                            Create Shipment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateShipment
