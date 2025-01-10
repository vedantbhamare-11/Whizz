import express from "express";
import { changeCategory, getDashboardData, getDeliveryAgents, getOrders, getVendors, manageOpenings } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/", getDashboardData);
router.get("/orders", getOrders);
router.get("/agents", getDeliveryAgents);
router.get("/vendors", getVendors);
router.put("/manageOpenings", manageOpenings);
router.put("/changeCategory", changeCategory);

export default router;