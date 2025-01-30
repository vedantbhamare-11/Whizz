import { errorResponse } from "./responseHandler.js";

// Error handler middleware
export const errorHandler = (error, req, res, next) => {
    if (error.name === "MulterError") {
        errorResponse(res, 400, error.errors, error.message);
    }
    errorResponse(res, 500, error, "Internal server error");

    next();
};