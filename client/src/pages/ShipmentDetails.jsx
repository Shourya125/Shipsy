import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ShipmentDetails = () => {
    const user = useSelector((state) => state?.user);
    console.log("userState", user);
    return (
        <div className="bg-orange-400 w-full">
            Shipment
        </div>
    );
};

export default ShipmentDetails;
