import User from "../../models/userModel.js"
import bcrypt from "bcryptjs"


const registerController = async (req,res) => {
    try{
        const {name ,email, password, profile_pic} = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const existingUser = await User.findOne({email:email})

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            profile_pic
        })

        return res.status(201).json({
            success: true,
            message: "Account Created Successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to register"
        })
    }

}

export default registerController
