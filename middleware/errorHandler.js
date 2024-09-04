// Centralized error handling
import { logger } from "../server.js";

export default function errorHandler(err, req, res, next) {
  // Log the error
  logger.error("Error:", {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userId: req.user ? req.user.id : "unauthenticated",
  });

  // Set a default status code and message
  let statusCode = 500;
  let message = "An unexpected error occurred";

  // Handle specific error types
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Invalid input data";
  } else if (err.name === "UnauthorizedError") {
    statusCode = 401;
    message = "Authentication required";
  } else if (err.message === "Not found") {
    statusCode = 404;
    message = "Resource not found";
  } else if (err.name === "ForbiddenError") {
    statusCode = 403;
    message = "Access denied";
  }

  // Prepare the response
  const response = {
    error: {
      message,
      status: statusCode,
    },
  };

  // Include stack trace in development environment
  if (process.env.NODE_ENV === "development") {
    response.error.stack = err.stack;
  }

  // Send the response
  res.status(statusCode).json(response);
}
