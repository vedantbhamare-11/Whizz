import { Dish, Order, Vendor } from "../models/vendor.models.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";

// Manage open hours (Restaurant)
const manageOpenHours = async (req, res, next) => {
    const vendorId = req.userId;
    const { availability } = req.body;

    if (!vendorId) {
        return errorResponse(res, 400, null, "Vendor ID is required");
    }

    try {
        const vendor = await Vendor.findById(vendorId);

        if (!vendor) {
            return errorResponse(res, 404, null, "Vendor not found");
        };

        const updatedVendor = await Vendor.findByIdAndUpdate(vendorId, { isOpen: availability }, {
            new: true,
            runValidators: true
        });

        return successResponse(res, 200, updatedVendor, "Availability updated successfully");
    } catch (error) {
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

    if (!vendorId) {
        return errorResponse(res, 400, null, "Vendor ID is required");
    };

    try {

        // Create new dish
        const newDish = new Dish({
            vendorId,
            ...req.body
        });

        // Save new dish
        await newDish.save();

        return successResponse(res, 200, newDish, "Dish added successfully");

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
    }
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
        });
        
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
    const { offset = 0, limit = 10, sort = "-createdAt" } = req.query;

    try {
        // Build query object
        const query = { vendorId };
        
        // Fetch dishes with offset and limit
        const dishes = await Dish.find(query)
            .sort(sort)
            .skip(Number(offset))
            .limit(Number(limit))

        // Count total dishes for client-side scroll optimization
        const totalDishes = await Dish.countDocuments(query);

        return successResponse(res, 200, { dishes, totalDishes }, "Dishes fetched successfully");
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
        const orders = await Order.find({ vendorId });

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
        const updatedOrder = await Order.findOneAndUpdate({whizzOrderId}, { status }, {
            new: true,
            runValidators: true
        });

        // Check if order was updated
        if (!updatedOrder) {
            return errorResponse(res, 404, null, "Order not found");
        };

        return successResponse(res, 200, updatedOrder, "Order status updated successfully");
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
    manageOpenHours,
    addDish,
    updateDish,
    manageDishAvailability,
    getDishes,
    getOrders,
    updateOrderStatus,
    deleteDish,

    /* Temp controllers */
    uploadImage, 
    createOrder
}