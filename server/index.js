import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./database/dbconfig.js"
import userRoutes from "./routes/userRoutes.js"
import shipmentRoutes from "./routes/shipmentRoutes.js"

const app = express()



dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))
connectDB()

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/shipment",shipmentRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`)
})
