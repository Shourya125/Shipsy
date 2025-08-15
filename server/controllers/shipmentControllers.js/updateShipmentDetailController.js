import Shipment from "../../models/shipmentModel.js";


const updateShipmentDetailController= async (req, res) => {
    try {
        const {sid} = req.params

        const shipment = await Shipment.findById(sid); // Find existing
        if (!shipment) {
            return res.status(404).json({ message: "Shipment not found" });
        }

        // Update only fields from request body
        shipment.customer = req.body.customer ?? shipment.customer;
        shipment.status = req.body.status ?? shipment.status;
        shipment.isFragile = req.body.isFragile ?? shipment.isFragile;
        shipment.value = req.body.value ?? shipment.value;
        shipment.description = req.body.description ?? shipment.description;
        shipment.estimatedDeliveryDate = req.body.estimatedDeliveryDate ?? shipment.estimatedDeliveryDate;
        shipment.shippedDate = req.body.shippedDate ?? shipment.shippedDate;
        shipment.origin = req.body.origin ?? shipment.origin;
        shipment.destination = req.body.destination ?? shipment.destination;

        const updatedShipment = await shipment.save();

        return res.status(200).json({
      success: true,
      message: "Shipment updated successfully",
      shipment: updatedShipment,
    });

    } catch (error) {
        console.error("Update shipment error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update shipment",
            error: error.message,
        });
    }
};

export default updateShipmentDetailController;
