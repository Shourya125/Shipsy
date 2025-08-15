import User from "../../models/userModel.js"
import jwt from "jsonwebtoken"


const getUserDetailsController = async (req,res) => {
    
    try{
        
        const token = req.cookies.token || ""

        if(!token){
            return {
                message : "session out",
                logout : true,
            }
        }
        
        const decode = await jwt.verify(token,process.env.SECRET_KEY)

        const user = await User.findById(decode.userId).select('-password')

        return res.status(200).json({
            message: "Details fetched successfully.",
            success: true,
            user
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user details."
        })
    }
}

export default getUserDetailsController
