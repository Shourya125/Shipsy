import User from "../../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const loginController = async (req,res) => {
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Incorrect email or password"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid Credentials" 
            })
        }

        const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY, { expiresIn: '1d' })

        const cookieOptions = {
            httpOnly : true,
            secure : false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        }

        return res.cookie("token", token, cookieOptions).status(200).json({
            success:true,
            message:`Welcome back ${user.name}`,
            token: token,
            user
        })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to login"
        })
    }

}

export default loginController
