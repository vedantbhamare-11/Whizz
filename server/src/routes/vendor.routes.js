import express from "express";
import { addDish, completeProfile, createOrder, deleteDish, getDashboardData, getDishes, getOrders, manageCategory, manageDishAvailability, manageOpenHours, updateDish, updateOrderStatus} from "../controllers/vendor.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import upload from "../config/multer.config.js";

// Initialize router
const router = express.Router();    

// // Vendor routes
// router.post('/completeProfile', verifyToken, upload.single("vendorLogo"), completeProfile);
// router.get("/", verifyToken, getDashboardData);
// router.get("/dishes", verifyToken, getDishes);
// router.post("/add", verifyToken, addDish);
// router.put("/update", verifyToken, updateDish);
// router.delete("/delete", verifyToken, deleteDish);
// router.put('/toggleDishAvailability', verifyToken, manageDishAvailability);
// router.put('/toggleOpenHours', verifyToken, manageOpenHours);
// router.get("/orders", verifyToken, getOrders);
// router.put("/updateOrder", verifyToken, updateOrderStatus);

// // Temp route for test image upload
// router.post("/upload", upload.single("image"), uploadImage);
// router.post("/create", verifyToken, createOrder);


// Temp Vendor routes
router.post('/completeProfile',upload.single("vendorLogo"), completeProfile);
router.get("/", getDashboardData);
router.get("/dishes", getDishes);
router.post("/add", upload.single("image"), addDish);
router.put("/update", updateDish);
router.delete("/delete", deleteDish);
router.put('/toggleDishAvailability', manageDishAvailability);
router.put('/manageCategory', manageCategory);
router.put('/toggleOpenHours', manageOpenHours);
router.get("/orders", getOrders);
router.put("/updateOrder", updateOrderStatus);

// Temp route for test image upload
// router.post("/upload", upload.single("image"), uploadImage);
router.post("/create", createOrder);

export default router;