import Shipment from "../../models/shipmentModel.js";


const createShipmentController = async (req, res) => {
  try {
    const {
      customer,
      status,
      isFragile,
      value,
      description,
      estimatedDeliveryDate,
      origin,
      destination,
      userId
    } = req.body;

    // Basic validation
    if (
      !customer ||
      !status ||
      value === undefined ||
      !description ||
      !estimatedDeliveryDate ||
      !origin ||
      !destination
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const newShipment = new Shipment({
      customer,
      status,
      isFragile: isFragile || false,
      value,
      description,
      estimatedDeliveryDate,
      shippedDate: null,
      origin,
      destination,
      user: userId // assuming user attached via auth middleware
    });

    await newShipment.save();

    res.status(201).json({
      success: true,
      message: "Shipment created successfully",
      shipment: newShipment,
    });
  } catch (error) {
    console.error("Create shipment error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create shipment",
      error: error.message,
    });
  }
};

export default createShipmentController;
