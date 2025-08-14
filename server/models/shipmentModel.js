import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false 
    },
    photoUrl: {
        type: String,
        default: ""
    },

}, { timestamps: true })

const Shipment = mongoose.model("Shipment", shipmentSchema)

export default Shipment