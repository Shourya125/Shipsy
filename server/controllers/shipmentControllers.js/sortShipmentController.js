import Shipment from "../../models/shipmentModel.js";


const sortShipmentController = async (req, res) => {
  try {
    const shipments = await Shipment.find({}).sort({ estimatedDeliveryDate: 1 })
    console.log("shipments",shipments)
    res.status(200).json({
      success: true,
      message: "Shipments sorted list",
      shipments: shipments,
    });
  } catch (error) {
    console.error("Create shipment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get sorted Shipments",
      error: error.message,
    });
  }
};

export default sortShipmentController;
