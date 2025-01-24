import mongoose from "mongoose";
import { Dish, Order, Vendor } from "../models/vendor.models.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";

// Complete Profile 
const completeProfile = async (req, res, next) => {
    // Check if vendorId is provided
    const vendorId = req.userId;

     if (!vendorId) {
        return errorResponse(res, 400, null, "Vendor ID is required");
    };

    // Extract vendor details
    const { vendorName, address, restaurantType, gst, area, vendorPhone, startTime, endTime, availableDays } = req.body;
    
    if (!vendorName || !address || !restaurantType || !area || !vendorPhone || !startTime || !endTime ) {
        return errorResponse(res, 400, null, "All fields are required");
    };

    try {
        // Extract vendor logo
        const vendorLogo = req.fileRelativePath || null;

        // Update vendor
        const updatedVendor = await Vendor.findByIdAndUpdate(vendorId, {
            ...req.body,
            ...(vendorLogo && { vendorLogo })
        }, {
            new: true,
            runValidators: true
        });

        // Create the url for the locally stored image
        const logoUrl = vendorLogo ? `${req.protocol}://${req.get("host")}/${updatedVendor.vendorLogo}` : null;

        // Update vendor with the image url
        const vendor = {
            ...updatedVendor._doc,
            ...( logoUrl !== null && {vendorLogo: logoUrl})
        };

        // remove password

        return successResponse(res, 200, vendor, "Profile completed successfully");
    } catch (error) {
        if (error.name === "CastError") {
            return errorResponse(res, 400, null, "Invalid vendor ID");
        }
        next(error);
    };
};

const getDashboardData = async (req, res, next) => {
    // Extract vendorId
    const vendorId = req.userId;

    // Check if vendorId is provided
    if (!vendorId) {
        return errorResponse(res, 400, null, "Vendor ID is required");
    };
    try {
        // Check if the vendor exists
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return errorResponse(res, 404, null, "Vendor not found");
        };

        // Set start and end of day
        const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
        const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));
        const vendorObjectId = new mongoose.Types.ObjectId(vendorId);

        // Fetch dashboard data
        const [todayOrders, activeMenuItems, totalRevenue] = await Promise.all([
            // Count today's orders
            Order.countDocuments({
                vendorId,
                createdTime: {
                    $gte: startOfDay,
                    $lt: endOfDay
                }
            }),
            // Count active menu items
            Dish.countDocuments({
                vendorId,
                isAvailable: true
            }),
            // Calculate total revenue
            Order.aggregate([
                { $match: { vendorId: vendorObjectId } },
                { $group: { _id: null, total: { $sum: "$totalPrice" } } }
            ])
        ]);

        // Construct dashboard data
        const dashboardData = {
            todayOrders,
            activeMenuItems,
            revenue: totalRevenue[0]?.total || 0
        };

        return successResponse(res, 200, dashboardData, "Dashboard data fetched successfully");

    } catch (error) {
        next(error);
    }
};

// Manage open hours (Restaurant)
const manageOpening = async (req, res, next) => {
    // Extract vendorId
    const vendorId = req.userId;

    // Extract availability
    const { isOpen } = req.body;

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
        }).select("isOpen");

        return successResponse(res, 200, updatedVendor, "Availability updated successfully");
    } catch (error) {
        // Check if the error is a CastError
        if (error.name === "CastError") {
            return errorResponse(res, 400, null, "Invalid vendor ID");
        }
        next(error);
    }
};

// Add new dishes
const addDish = async (req, res, next) => {
    // Extract vendorId
    const vendorId = req.userId;

    // Check if vendorId is provided
    if (!vendorId) {
        return errorResponse(res, 400, null, "Vendor ID is required");
    };

    try {
        const image = req.fileRelativePath || null;

        // Create new dish
        const newDish = new Dish({
            vendorId,
            image,
            ...req.body
        });

        // Save new dish
        await newDish.save();

        // Create url for the locally stored image
        const imageUrl = image ? `${req.protocol}://${req.get("host")}/${newDish.image}` : null;

        // Construct dish
        const dish = {
            ...newDish._doc,
            image: imageUrl
        }

        return successResponse(res, 200, dish, "Dish added successfully");

    } catch (error) {
        if (error.name === "CastError") {
            return errorResponse(res, 400, null, "Invalid vendor ID");
        }
        next(error);
    }
};

// Update dishes
const updateDish = async (req, res, next) => {
    // Extract dish details
    const { dishId, dishName, price, description, image, category, subcategory, startTime, endTime, availableDays } = req.body;

    if (!dishId) {
        return errorResponse(res, 400, null, "Dish ID is required");
    };

    try {
        // Prepare updated data
        const updatedData = {};
        if (dishName) updatedData.dishName = dishName;
        if (price) updatedData.price = price;
        if (description) updatedData.description = description;
        if (image) updatedData.image = image;
        if (category) updatedData.category = category;
        if (subcategory) updatedData.subcategory = subcategory;
        if (startTime) updatedData.startTime = startTime;
        if (endTime) updatedData.endTime = endTime;
        if (availableDays) updatedData.availableDays = availableDays;

        // Check if there are fields to update
        if (Object.keys(updatedData).length === 0) {
            return errorResponse(res, 400, null, "No fields provided for update");
        };

        // Update dish
        const updatedDish = await Dish.findByIdAndUpdate(dishId, updatedData, {
            new: true,
            runValidators: true
        });

        // Check if dish was updated
        if (!updatedDish) {
            return errorResponse(res, 404, null, "Dish not found");
        };

        return successResponse(res, 200, updatedDish, "Dish updated successfully");
    } catch (error) {
        if (error.name === "CastError") {
            return errorResponse(res, 400, null, "Invalid dish ID format");
        }
        next(error);
    };
};

// Manage dish availability
const manageDishAvailability = async (req, res, next) => {
    // Extract dishId
    const { dishId, availability } = req.body;

    // Check if dishId is provided
    if (!dishId) {
        return errorResponse(res, 400, null, "Dish ID is required");
    };
    try {
        // Update dish
        const updatedDish = await Dish.findByIdAndUpdate(dishId, { isAvailable: availability }, {
            new: true,
            runValidators: true
        }).select("isAvailable");

        // Check if dish was updated
        if (!updatedDish) {
            return errorResponse(res, 404, null, "Dish not found");
        };


        return successResponse(res, 200, updatedDish, "Dish availability updated successfully");
    } catch (error) {
        if (error.name === "CastError") {
            return errorResponse(res, 400, null, "Invalid dish ID");
        }
        next(error);
    }
};

const manageCategory = async (req, res, next) => {
    const { dishId, category } = req.body;

    // Check if dishId is provided
    if (!dishId) {
        return errorResponse(res, 400, null, "Dish ID is required");
    };
    try {
        // Update dish
        const updatedDish = await Dish.findByIdAndUpdate(dishId, { category }, {
            new: true,
            runValidators: true
        }).select("category");

        // Check if dish was updated
        if (!updatedDish) {
            return errorResponse(res, 404, null, "Dish not found");
        };

        return successResponse(res, 200, updatedDish, "Dish category updated successfully");
    } catch (error) {
        if (error.name === "CastError") {
            return errorResponse(res, 400, null, "Invalid dish ID");
        }
        next(error);
    }
}

// Delete dishe
const deleteDish = async (req, res, next) => {
    // Extract dishId from request body
    const { dishId } = req.body;

    // Check if dishId is provided
    if (!dishId) {
        return errorResponse(res, 400, null, "Dish ID is required");
    }

    try {
        // Check if the dish exists
        const dish = await Dish.findById(dishId);
        if (!dish) {
            return errorResponse(res, 404, null, "Dish not found");
        }

        // Delete the dish
        await Dish.findByIdAndDelete(dishId);

        return successResponse(res, 200, null, "Dish deleted successfully");
    } catch (error) {
        if (error.name === "CastError") {
            return errorResponse(res, 400, null, "Invalid dish ID");
        }
        next(error);
    }
};


// Get all dishes
const getDishes = async (req, res, next) => {
    const vendorId = req.userId;

    // Extract query parameters for offset-based fetching and sorting
    const { offset = 0, limit = 30, sort = "-createdAt" } = req.query;

    try {
        // Build query object
        const query = { vendorId };

        // Fetch dishes with offset and limit
        const dishes = await Dish.find(query)
            .sort(sort)
            .skip(Number(offset))
            .limit(Number(limit))

        const updatedDishes = dishes.map(dish => {
            return {
                ...dish._doc,
                image: dish.image ? `${req.protocol}://${req.get("host")}/${dish.image}` : null
            }
        });
        // Count total dishes for client-side scroll optimization
        const totalDishes = await Dish.countDocuments(query);

        return successResponse(res, 200, { dishes: updatedDishes, totalDishes }, "Dishes fetched successfully");
    } catch (error) {
        if (error.name === "CastError") {
            return errorResponse(res, 400, null, "Invalid vendor ID format");
        }
        next(error);
    }
};

// Get all orders
const getOrders = async (req, res, next) => {
    // Extract vendorId
    const vendorId = req.userId;

    // Check if vendorId is provided
    if (!vendorId) {
        return errorResponse(res, 400, null, "Vendor ID is required");
    }

    try {
        // Fetch orders for the vendor
        const orders = await Order.find({ vendorId }).sort({ createdAt: -1 });


        // Check if there are no orders
        if (orders.length === 0) {
            return successResponse(res, 200, [], "No orders found for this vendor");
        }

        return successResponse(res, 200, orders, "Orders fetched successfully");
    } catch (error) {
        if (error.name === "CastError") {
            return errorResponse(res, 400, null, "Invalid vendor ID format");
        }

        next(error);
    }
};

// Update order status
const updateOrderStatus = async (req, res, next) => {
    // Extract orderId and status
    const { whizzOrderId, status } = req.body;

    // Check if orderId and status are provided
    if (!whizzOrderId || !status) {
        return errorResponse(res, 400, null, "Order ID and status are required");
    };

    try {
        // Update order status
        const order = await Order.findOneAndUpdate(
            { whizzOrderId },
            {
                status,
                ...(status === "inProgress" || status === "rejected"
                    ? { acceptOrRejectTime: new Date() }
                    : {}),
                ...(status === "readyForPickup" ? { readyForPickupTime: new Date() } : {}),
                ...(status === "outForDelivery" ? { outForDeliveryTime: new Date() } : {}),
                ...(status === "delivered" ? { deliveredTime: new Date() } : {}),
            },
            {
                new: true,
                runValidators: true,
            }
        );

        // Check if order was updated
        if (!order) {
            return errorResponse(res, 404, null, "Order not found");
        };

        return successResponse(res, 200, order, "Order status updated successfully");
    } catch (error) {
        next(error);
    }
};


// Temp controller to check image uploads
const uploadImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        // File is successfully uploaded
        res.status(200).send({
            message: 'Image uploaded successfully!',
            imagePath: `/dishImages/${req.file.filename}` // Send back the relative image path
        });
    } catch (error) {
        next(error);
    }
}

// Temp controller to create order manually
const createOrder = async (req, res, next) => {
    try {
        const order = new Order({
            ...req.body
        });
        await order.save();
        res.send(order);
    } catch (error) {
        next(error);
    }
}

export {
    completeProfile,
    getDashboardData,
    manageOpening,
    addDish,
    updateDish,
    manageDishAvailability,
    manageCategory,
    getDishes,
    getOrders,
    updateOrderStatus,
    deleteDish,

    /* Temp controllers */
    uploadImage,
    createOrder
}