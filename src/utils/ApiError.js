// Define custom error class
class ApiError extends Error {
  // Constructor function
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    // Call parent class constructor
    super(message);

    // Initialize error properties
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    // Assign stack trace if provided, otherwise capture stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Export custom error class
export { ApiError };
