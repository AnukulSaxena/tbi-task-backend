// Define asyncHandler function
const asyncHandler = (requestHandler) => {
  // Return middleware function
  return (req, res, next) => {
    // Resolve promise returned by requestHandler and catch any errors
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

// Export asyncHandler function
export { asyncHandler };
