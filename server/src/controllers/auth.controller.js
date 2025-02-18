import { generateTokenAndSetCookie, removeTokenAndCookie } from "../utils/tokenHandler.js";
import { comparePassword, hashPassword } from "../utils/passwordHandler.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import { Vendor } from "../models/vendor.models.js";
import { convertToAmPm, isValid24HourTime } from "../utils/convertTime.js";

// Signup controller
const signUp = async (req, res, next) => {
    // Extract credentials
    const {vendorEmail, vendorPassword} = req.body; 

    const password = vendorPassword;
    try {
        // Check user existance
        const isUserExist = await Vendor.findOne({ vendorEmail });
        if (isUserExist) {
            return errorResponse(res, 400, null, "User already exist");
        };

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create new user
        const newVendor = new Vendor({
            vendorEmail,
            vendorPassword: hashedPassword,
        });

        // Save new user
        await newVendor.save();

        // Generate JWT token
        generateTokenAndSetCookie(res, newVendor._id);

        // Remove password
        const { vendorPassword, ...rest } = newVendor.toObject();

        return successResponse(res, 200, rest, "User created successfully");

    } catch (error) {
        next(error);
    };
}; 

// Signin controller
const signIn = async (req, res, next) => {
    // Extract credentials
    const { email, password } = req.body;

    try {
        // Check user existance
        const isUserExist = await Vendor.findOne({ vendorEmail: email });
        if (!isUserExist) {
            return errorResponse(res, 400, null, "User does not exist");
        };

        // Check password
        const isPasswordMatch = await comparePassword(password, isUserExist.vendorPassword);
        if (!isPasswordMatch) {
            return errorResponse(res, 400, null, "Invalid password");
        };

        // Generate JWT token and set cookie
        generateTokenAndSetCookie(res, isUserExist._id);

        const userData = isUserExist.toObject ? isUserExist.toObject() : isUserExist;

        const logoUrl = isUserExist.vendorLogo
        ? `${req.protocol}://${req.get("host")}/${isUserExist.vendorLogo}`
        : null;

        userData.vendorLogo = logoUrl;

        if (userData.startTime && userData.endTime) {
            userData.startTime = isValid24HourTime(userData.startTime) 
              ? convertToAmPm(userData.startTime)
              : userData.startTime; 
        };
          
        // Remove vendorPassword from response
        const { vendorPassword, ...rest } = userData;

        // Send success response with user data (without password)
        return successResponse(res, 200, rest, "User signed in successfully");
    } catch (error) {
        next(error);
    };
};

// Signout controller
const signOut = (req, res, next) => {
    try {
        // Clear cookie
        removeTokenAndCookie(res);

        // Send success response
        return successResponse(res, 200, null, "User signed out successfully");
    } catch (error) {
        next(error);
    }
};

export {
    signUp,
    signIn,
    signOut
}