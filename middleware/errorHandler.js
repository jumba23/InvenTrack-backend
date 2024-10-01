// middleware/errorHandler.js

import { logger } from "../server.js";
import {
  NotFoundError,
  ValidationError,
  ConflictError,
  AuthorizationError,
} from "../utils/customErrors.js";
import * as Sentry from "@sentry/node";

export default function errorHandler(err, req, res, next) {
  // Capture exception with Sentry
  Sentry.captureException(err);

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

  // Determine the status code
  let statusCode = err.status || 500;
  if (err instanceof NotFoundError) statusCode = 404;
  else if (err instanceof ValidationError) statusCode = 400;
  else if (err instanceof ConflictError) statusCode = 409;
  else if (err instanceof AuthorizationError) statusCode = 403;

  // Prepare the response
  const response = {
    error: {
      message: err.message || "An unexpected error occurred",
      status: statusCode,
    },
  };

  // Include stack trace only in development environment
  if (process.env.NODE_ENV === "development") {
    response.error.stack = err.stack;
  }

  // Send the response
  res.status(statusCode).json(response);
}
