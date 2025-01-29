// Success response handler
export const successResponse = (res, statusCode, data, message = "Success") => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

// Error response handler
export const errorResponse = (res, statusCode, error, message = "Error") => {
    return res.status(statusCode).json({
        success: false,
        message,
        error
    });
};

