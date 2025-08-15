
import Shipment from "../../models/shipmentModel.js";


const shipmentDetailController = async (req, res) => {
  try {
    const { sid } = req.params;

    const shipment = await Shipment.findById(sid);

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    return res.status(200).json({
      success: true,
      shipment,
    });
  } catch (error) {
    console.error("Create shipment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get Shipment detail",
      error: error.message,
    });
  }
};

export default shipmentDetailController;
