import mongoose from "mongoose";

// Vendor model
const vendorSchema = new mongoose.Schema({
    vendorName: {
        type: String,
    },
    address: {
        type: String,
    },
    restaurantType: {
        type: String,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    gst: {
        type: String,
    },
    area: {
        type: String,
    },
    vendorEmail: {
        type: String,
        required: true, //TODO: Change to true
        unique: true
    },
    vendorPassword: {
        type: String,
        required: true
    },
    vendorPhone: {
        type: String,
    },
    vendorLogo: {
        type: String,
    },
    role: {
        type: String,
        enum: ["vendor"],
        default: "vendor",
        required: true
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,        required: false
    },
    availableDays: {
        type: [String],
        default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    },
    isOpen: {
        type: Boolean,
        default: true,
        required: true
    },
    isProfileCompleted: {
        type: Boolean,
        default: false,
        required: true
    }
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
    category: {
        type: String,
        required: true,
        enum: ["VEG", "NON-VEG"],
    },
    subcategory: {
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
    dishes: [
        {
            dishName: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
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
    readyForPickupTime: {
        type: Date,
    },
    outForDelivery: {
        type: Date,
    },
    deliveredTime: {
        type: Date,
    },
    status: {
        type: String,
        required: true,
        default: "orderQueue",
        enum: ["orderQueue", "inProgress", "rejected", "readyForPickup", "outForDelivery", "delivered"],
    },
    rejectionReason: {
        type: String,
    }
}, {timestamps: true});

const subcategorySchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
        required: true
    },
    subcategory: {
        type: String,
        required: false
    }
});

dishSchema.index({ vendorId: 1 });

// Creating models
const Vendor = mongoose.model("Vendor", vendorSchema);
const Dish = mongoose.model("Dish", dishSchema);
const Order = mongoose.model("Order", orderSchema);
const Subcategory = mongoose.model("Subcategory", subcategorySchema);

// Exporting models
export { 
    Vendor,
    Dish,
    Order,
    Subcategory
};