import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./database/dbconfig.js"


const app = express()



dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))
connectDB()

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`)
})
