import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODEV_URI);
        console.log(`Connected to MongoDB: ${connection.connection.host}`);      
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
    };
};

export default connectDB;