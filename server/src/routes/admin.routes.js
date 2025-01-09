import express from "express";
import { getDashboardData, getDeliveryAgents, getOrders, getVendors, manageOpenings } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/", getDashboardData);
router.get("/orders", getOrders);
router.get("/agents", getDeliveryAgents);
router.get("/vendors", getVendors);
router.put("/manageOpenings", manageOpenings)

export default router;