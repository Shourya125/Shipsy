import Shipment from "../../models/shipmentModel.js";


const deleteShipmentController = async (req, res) => {
    try {
        const { sid } = req.params

        const deletedShipment = await Shipment.findByIdAndDelete(sid)

        if (!deletedShipment) {
            return res.status(404).json({
                success: false,
                message: "Shipment not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Shipment deleted successfully",
            shipment: deletedShipment,
        });

    } catch (error) {
        console.error("Create shipment error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get Shipments",
            error: error.message,
        });
    }
};

export default deleteShipmentController;
