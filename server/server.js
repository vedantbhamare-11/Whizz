// Import libraries
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import local modules
import connectDB from "./src/config/connectDB.js";
import authRoute from "./src/routes/auth.routes.js";
import vendorRoute from "./src/routes/vendor.routes.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import upload from "./src/config/multer.config.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS for cross-origin requests
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Serve static files (save images)
app.use('/dishImages', express.static(path.join(__dirname, 'src', 'dishImages')));

// primary routes
app.use("/auth", authRoute);
app.use("/vendor", vendorRoute);

app.use(errorHandler); 

// start the server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});