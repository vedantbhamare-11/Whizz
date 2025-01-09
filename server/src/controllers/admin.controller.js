import { Agent, Customer } from "../models/admin.models.js";
import { Dish, Order, Vendor } from "../models/vendor.models.js";
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
      // Fetch vendors along with their dish counts
      const vendors = await Vendor.aggregate([
        {
          $lookup: {
            from: "dishes", // The collection name for dishes
            localField: "_id", // Vendor's ID field
            foreignField: "vendorId", // Field in dishes collection that refers to the vendor's ID
            as: "dish",
          },
        },
        {
          $addFields: {
            dishes: { $size: "$dish" }, // Count the number of dishes
          },
        },
        {
          $project: {
            dish: 0, // Exclude the dishes array to reduce payload size
          },
        },
      ]);
  
      if (vendors.length === 0) {
        return successResponse(res, 200, [], "No vendors found");
      }
  
      return successResponse(res, 200, vendors, "Vendors fetched successfully");
    } catch (error) {
      next(error);
    }
  };

  // Manage open hours (Restaurant)
  const manageOpenings = async (req, res, next) => {
      // Extract vendorId
      const {vendorId, isOpen} = req.body;
  
      // Check if vendorId is provided
      if (!vendorId) {
          return errorResponse(res, 400, null, "Vendor ID is required");
      }
  
      try {
          // Check if the vendor exists
          const vendor = await Vendor.findById(vendorId);
          if (!vendor) {
              return errorResponse(res, 404, null, "Vendor not found");
          };
  
          // Update vendor
          const updatedVendor = await Vendor.findByIdAndUpdate(vendorId, { isOpen }, {
              new: true,
              runValidators: true
          });
  
          return successResponse(res, 200, updatedVendor, "Availability updated successfully");
      } catch (error) {
          // Check if the error is a CastError
          if (error.name === "CastError") {
              return errorResponse(res, 400, null, "Invalid vendor ID");
          }
          next(error);
      }
  };
  
  
export { getDashboardData, getOrders, getDeliveryAgents, getVendors, manageOpenings };
