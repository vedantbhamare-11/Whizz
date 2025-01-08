// Import libraries
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Import local modules
import connectDB from "./config/connectDB.js";
import authRoute from "./routes/auth.routes.js";
import apiRoute from "./routes/api.routes.js";
import { errorHandler } from "./utils/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for cross-origin requests
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// primary routes
app.use("/auth", authRoute);
app.use("/api", apiRoute);
// app.use()

app.use(errorHandler);
// start the server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});