import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        console.log("URI",process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        
        console.log("MongoDB connected successfully")
    }
    catch(error){
        console.log("MongoDB Connection error",error)
    }
}

export default connectDB