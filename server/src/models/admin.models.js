import mongoose from "mongoose";

// Admin model
const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: true
    },
    adminEmail: {
        type: String,
        required: true,
        unique: true
    },
    adminPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin"],
        default: "admin",
        required: true
    },
}, {timestamps: true});

export default mongoose.model("Admin", adminSchema);