import Shipment from "../../models/shipmentModel.js";
import { GoogleGenAI } from "@google/genai";

const botController = async (req, res) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API });
    try {
        const { prompt } = req.body
        

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `you are a user bot and can fulfil user's logistics or shipment needs nothing else
                give answer to ${prompt} just answer as a bot without mentioning yourself as bot remember user bot that fulfils 
                logistics and shipments need`
        });


        const text = response.text.toString().trim()
        console.log("text", text)



        res.status(200).json({
            success: true,
            message: "Bot responded successfully",
            data: text,
        });
    } catch (error) {
        console.error("Bot response error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get Bot response",
            error: error.message,
        });
    }
};

export default botController;
