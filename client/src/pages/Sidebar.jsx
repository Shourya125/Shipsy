import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const user = useSelector(state => state?.user)

    return (
        <div className="bg-slate-500 h-full hidden md:block pr-2">
            <div className="flex flex-col gap-2 py-2">
                {
                    user?.isAdmin && (
                        <Link to={"/create-shipment"} className="p-3 bg-slate-200 text-lg hover:bg-cyan-800 hover:text-white w-full block">
                            Create Shipment
                        </Link>
                    )
                }
                {
                    user && (
                        <Link to={"/shipments-list"} className="p-3 bg-slate-200 text-lg hover:bg-cyan-800 hover:text-white w-full block">
                            Shipments
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Sidebar;
