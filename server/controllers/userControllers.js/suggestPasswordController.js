import { GoogleGenAI } from "@google/genai";

const suggestPasswordController = async (req,res) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API });
      try{
          const response = await ai.models.generateContent({
              model: "gemini-2.0-flash",
              contents: `Suggest a strong password and give only password nothing else`,
          });
  
  
          const text = response.text.toString().trim()
          console.log("text", text)
  
  
  
          res.status(200).json({
              success: true,
              message: "Password suggested successfully",
              pass: text,
          });
      }
      catch{
          console.error("Get slogan error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to suggest password",
        error: error.message,
      });
      }
}

export default suggestPasswordController
