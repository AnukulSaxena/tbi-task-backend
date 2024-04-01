// Import necessary modules
import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

// Middleware function to validate request data
export const validate = (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // Extract validation errors
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  // Throw ApiError with status 422 if validation fails
  throw new ApiError(422, "Received data is not valid", extractedErrors);
};
