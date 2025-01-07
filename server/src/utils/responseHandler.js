// Success response handler
export const successResponse = (res, statusCode, data, message = "Success") => {
    res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

// Error response handler
export const errorResponse = (res, statusCode, error, message = "Error") => {
    res.status(statusCode).json({
        success: false,
        message,
        error
    });
};

