import { errorResponse } from "./responseHandler.js";

// Error handler middleware
export const errorHandler = (error, req, res, next) => {
    console.error(error);
    errorResponse(res, 500, error, "Internal server error");

    next();
};