import express from "express";
import { addDish, createOrder, deleteDish, getDishes, getOrders, manageDishAvailability, manageOpenHours, updateDish, updateOrderStatus, uploadImage } from "../controllers/vendor.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import upload from "../config/multer.config.js";

// Initialize router
const router = express.Router();    

// Vendor routes
router.get("/dishes", verifyToken, getDishes);
router.post("/add", verifyToken, addDish);
router.put("/update", verifyToken, updateDish);
router.delete("/delete", verifyToken, deleteDish);
router.put('/toggleDishAvailability', verifyToken, manageDishAvailability);
router.put('/toggleOpenHours', verifyToken, manageOpenHours);
router.get("/orders", verifyToken, getOrders);
router.put("/updateOrder", verifyToken, updateOrderStatus);

// Temp route for test image upload
router.post("/upload", upload.single("image"), uploadImage);
router.post("/create", verifyToken, createOrder);

export default router;