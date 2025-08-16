import Shipment from "../../models/shipmentModel.js";


const getShipmentsController = async (req, res) => {
  try {
    const shipments = await Shipment.find({})
    console.log("shipments",shipments)
    res.status(200).json({
      success: true,
      message: "Shipments list",
      shipments: shipments,
    });
  } catch (error) {
    console.error("Get shipment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get Shipments",
      error: error.message,
    });
  }
};

export default getShipmentsController;
