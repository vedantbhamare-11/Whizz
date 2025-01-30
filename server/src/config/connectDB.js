import mongoose from "mongoose";
import dotenv from "dotenv";
import { Dish } from "../models/vendor.models.js";

dotenv.config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODEV_URI);
        await Dish.syncIndexes();
        console.log(`Connected to MongoDB: ${connection.connection.host}`);      
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
    };
};

export default connectDB;