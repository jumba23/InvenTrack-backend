// middleware/errorHandler.js

import { logger } from "../server.js";
import * as Sentry from "@sentry/node";
import ApiError from "../utils/apiError.js";

export default function errorHandler(err, req, res, next) {
  let error = err;

  // If the error is not an instance of ApiError, create a new one
  if (!(err instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, false, err.stack);
  }

  // Log the error
  logger.error("Error:", {
    name: err.name,
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userId: req.user ? req.user.id : "unauthenticated",
  });

  // Capture exception with Sentry
  Sentry.captureException(err);

  // Prepare the response
  const response = {
    error: {
      status: error.statusCode,
      message: error.message,
      timestamp: error.timestamp,
    },
  };

  if (process.env.NODE_ENV === "development") {
    response.error.stack = error.stack;
    response.error.details = {
      query: req.query,
      body: req.body,
    };
  }

  res.status(error.statusCode).json(response);
}
