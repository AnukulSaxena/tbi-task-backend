// Define ApiResponse class
class ApiResponse {
  // Constructor function
  constructor(statusCode, data, message = "Success") {
    // Initialize ApiResponse properties
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

// Export ApiResponse class
export { ApiResponse };
