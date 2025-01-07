import express from "express";
import { addDish, uploadImage } from "../controllers/vendor.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import upload from "../config/multer.config.js";

const router = express.Router();    

router.post("/add", verifyToken, addDish);

// Temp route for test image upload
router.post("/upload", upload.single("image"), uploadImage);

export default router;