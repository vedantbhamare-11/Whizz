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

// Customer model
const customerSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
        unique: true
    },
});   

// Agent model
const agentSchema = new mongoose.Schema({
    agentName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    coveredArea: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true
    },
    currentStatus: {
        type: String,   
        enum: ["unassigned", "assigned"],
        default: "unassigned"
    },
    profilePic: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
}, {timestamps: true});

const Admin = mongoose.model("Admin", adminSchema);
const Customer = mongoose.model("Customer", customerSchema);
const Agent = mongoose.model("Agent", agentSchema);

export { Admin, Customer, Agent };

