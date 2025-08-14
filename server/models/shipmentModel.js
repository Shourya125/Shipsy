import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending","In Transit","Delivered","Cancelled"],
        required: true
    },
    isFragile: {
        type: Boolean,
        default: false
    },
    value: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    estimatedDeliveryDate: {
        type: Date,
        required: true
    },
    shippedDate:{
        type: Date,
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: true })

const Shipment = mongoose.model("Shipment", shipmentSchema)

export default Shipment