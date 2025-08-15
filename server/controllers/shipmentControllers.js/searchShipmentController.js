import Shipment from "../../models/shipmentModel.js";


const searchShipmentController = async (req, res) => {
    try {
        const {
            search
        } = req.body;

        // Basic validation
        // if (
        //     !search
        // ) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "No search input",
        //     });
        // }

        const filter = search
            ? { customer: { $regex: search, $options: "i" } } // "i" = case-insensitive
            : {};

        const shipments = await Shipment.find(filter)


        res.status(200).json({
            success: true,
            message: "Shipment searched successfully",
            shipments: shipments
        });
    } catch (error) {
        console.error("Search shipment error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to search shipment",
            error: error.message,
        });
    }
};

export default searchShipmentController;
