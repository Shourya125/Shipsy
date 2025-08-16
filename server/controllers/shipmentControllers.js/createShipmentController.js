import Shipment from "../../models/shipmentModel.js";
import { GoogleGenAI } from "@google/genai";

const createShipmentController = async (req, res) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API });
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

            const date = new Date().toDateString()

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `if ${estimatedDeliveryDate} < ${date} give yes else no just yes or no`,
        });
        

        const text = response.text.toString().trim().toLowerCase()
        console.log("text",text)
        if (text == "yes") {
            return res.status(400).json({
                message: "Estimated delivery date must be greater than or equal to present date",
                success: false
            })
        }

        const response_val = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `${value} <=0 give yes else no just yes or no`,
        });

        const text_val = response_val.text.toString().trim().toLowerCase()
        console.log("text_val",text_val)
        if (text_val === "yes") {
            return res.status(400).json({
                message: "Value must be greater than zero",
                success: false
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
