import mongoose from "mongoose";

// Vendor model
const vendorSchema = new mongoose.Schema({
    vendorName: {
        type: String,
        required: true
    },
    vendorEmail: {
        type: String,
        required: true,
        unique: true
    },
    vendorPassword: {
        type: String,
        required: true
    },
    vendorPhone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["vendor"],
        default: "vendor",
        required: true
    },
    isOpen: {
        type: Boolean,
        default: true,
        required: true
    },
}, {timestamps: true});

// Dish model 
const dishSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    dishName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    availableDays: {
        type: [String],
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
        required: true
    }
}, {timestamps: true});

// Order model
const orderSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true,
    },  
    whizzOrderId: {
        type: String,
        required: true,
        unique: true
    },
    dishName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMethod:{
        type: String,
        required: true,
        enum: ["COD", "Online"],
    },
    createdTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    acceptOrRejectTime: {
        type: Date,
    },
    pickupTime: {
        type: Date,
    },
    deliveredTime: {
        type: Date,
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "accepted", "rejected", "inProgress", "delivered"],
    },
});

// Creating models
const Vendor = mongoose.model("Vendor", vendorSchema);
const Dish = mongoose.model("Dish", dishSchema);
const Order = mongoose.model("Order", orderSchema);

// Exporting models
export { 
    Vendor,
    Dish,
    Order,
};