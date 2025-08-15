import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ShipmentDetails from "../pages/ShipmentDetails";
import CreateShipment from "../pages/CreateShipment";
import ShipmentsList from "../pages/ShipmentsList";
import UpdateShipmentDetails from "../pages/UpdateShipmentDetails";
import Welcome from "../pages/Welcome";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        children: [
            {
                path: "shipment/:sid",
                element: <ShipmentDetails />,
            },
            {
                path: "",
                element: <Welcome />
            },
            {
                path: "create-shipment",
                element: <CreateShipment />
            },
            {
                path: "shipments-list",
                element: <ShipmentsList />
            },
            {
                path: "update-shipment/:sid",
                element: <UpdateShipmentDetails />
            }

        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]);

export default router;
