// Default error handling middleware function
export default function errorHandler(err, req, res, next) {
  let statusCode = 500;

  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  console.error("ErrorHandler: Error", err);

  // Send response with status code, error name, and message
  res.status(statusCode).json({
    status: statusCode,
    error: err.name || "ServerError",
    message: err.message || "Internal Server Error",
  });
}
