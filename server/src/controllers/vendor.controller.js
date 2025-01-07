import { Dish } from "../models/vendor.models.js";
import { successResponse } from "../utils/responseHandler.js";

// Manage open hours
const manageOpenHours = async (req, res, next) => {
    try {

    } catch (error) {

    }
};

// Add new dishes
const addDish = async (req, res, next) => {
    const vendorId = req.userId;
    const { dishName, price, description, image, category, subcategory, startTime, endTime, availableDays } = req.body;
    try {
        const newDish = new Dish({
            vendorId,
            dishName,
            price,
            description,
            image,
            category,
            subcategory,
            startTime,
            endTime,
            availableDays
        });
        await newDish.save();

        if (newDish) {
            return successResponse(res, 200, newDish, "Dish added successfully");
        }
    } catch (error) {
        next(error);
    }
};

// Update dishes
const updateDish = async (req, res, next) => {
    try {

    } catch (error) {

    }
};

// Manage dish availability
const manageDishAvailability = async (req, res, next) => {
    try {

    } catch (error) {

    }
};

// Get all dishes
const getDishes = async (req, res, next) => {
    try {

    } catch (error) {

    }
};

// Get all orders
const getOrders = async (req, res, next) => {
    try {

    } catch (error) {

    }
};

// Update order status
const updateOrderStatus = async (req, res, next) => {
    try {

    } catch (error) {

    }
};

// Delete dishes
const deleteDish = async (req, res, next) => {
    try {
       
    } catch (error) {

    }
};

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

    export {
        manageOpenHours,
        addDish,
        updateDish,
        manageDishAvailability,
        getDishes,
        getOrders,
        updateOrderStatus,
        deleteDish,
        uploadImage
    }