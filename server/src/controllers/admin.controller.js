import { Agent, Customer } from "../models/admin.models.js";
import { Order, Vendor } from "../models/vendor.models.js";
import { successResponse } from "../utils/responseHandler.js";

// Fetch dashboard data
const getDashboardData = async (req, res, next) => {
  try {
    // Count dashboard data
    const [totalVendors, deliveryPersonnel, totalCustomers, activeOrders] =
      await Promise.all([
        // Vendor count
        Vendor.countDocuments(),

        // Agent count
        Agent.countDocuments(),

        // Customer count
        Customer.countDocuments(),

        // Active order count
        Order.countDocuments({ status: { $nin: ["delivered", "rejected"] } }),
      ]);

    // Set dashboard data
    const dashboardData = {
      totalVendors,
      deliveryPersonnel,
      totalCustomers,
      activeOrders,
    };

    return successResponse(
      res,
      200,
      dashboardData,
      "Dashboard data fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

// Get all orders
const getOrders = async (req, res, next) => {
  try {
    // Fetch orders
    const orders = await Order.find();

    if (orders.length === 0) {
      return successResponse(res, 200, [], "No orders found");
    }

    return successResponse(res, 200, orders, "Orders fetched successfully");
  } catch (error) {
    next(error);
  }
};

// Get all delivery agents
const getDeliveryAgents = async (req, res, next) => {
  try {
    // Fetch delivery agents
    const deliveryAgents = await Agent.find();

    if (deliveryAgents.length === 0) {
      return successResponse(res, 200, [], "No delivery agents found");
    }

    return successResponse(
      res,
      200,
      deliveryAgents,
      "Delivery agents fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

// Get all vendors
const getVendors = async (req, res, next) => {
  try {
    // Fetch vendors
    const vendors = await Vendor.find();

    if (vendors.length === 0) {
      return successResponse(res, 200, [], "No vendors found");
    }

    return successResponse(res, 200, vendors, "Vendors fetched successfully");
  } catch (error) {
    next(error);
  }
};

export { getDashboardData, getOrders, getDeliveryAgents, getVendors };
