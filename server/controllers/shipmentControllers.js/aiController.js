import Shipment from "../../models/shipmentModel.js";
import { GoogleGenAI } from "@google/genai";

const aiController = async (req, res) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API });
    try {
        const { prompt } = req.body
        const shipments = await Shipment.find({}).select("-password").select("-user").select("-_id");

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `${shipments} is data for refrence and question is ${prompt} just give answer to prompt in 10 to 20 words not print the entire refrence data `,
        });


        const text = response.text.toString().trim()
        console.log("text", text)



        res.status(200).json({
            success: true,
            message: "AI responded successfully",
            data: text,
        });
    } catch (error) {
        console.error("AI response error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get AI response",
            error: error.message,
        });
    }
};

export default aiController;
