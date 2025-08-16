import Shipment from "../../models/shipmentModel.js";
import { GoogleGenAI } from "@google/genai";

const updateShipmentDetailController= async (req, res) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API });
    try {
        const {sid} = req.params

        const shipment = await Shipment.findById(sid); // Find existing
        if (!shipment) {
            return res.status(404).json({ message: "Shipment not found" });
        }

                const date = new Date().toDateString()

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `if ${req.body.estimatedDeliveryDate} < ${date} give yes else no just yes or no`,
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
            contents: `${req.body.value} is less than or equal to 0 give no else yes`,
        });

        const text_val = response_val.text.toString().trim().toLowerCase()
        console.log("text_val",text_val)
        if (text_val === "yes") {
            return res.status(400).json({
                message: "Value must be greater than zero",
                success: false
            });
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
