import { GoogleGenAI } from "@google/genai";

const getSloganController = async (req,res) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API });
    try{
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Give a slogan for shipments app a short and crisp slogan of 8-10 words give just slogan nothing else`,
        });


        const text = response.text.toString().trim()
        console.log("text", text)



        res.status(200).json({
            success: true,
            message: "AI responded successfully",
            slogan: text,
        });
    }
    catch(error){
        console.error("Get slogan error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get slogan",
      error: error.message,
    });
    }
}

export default getSloganController
