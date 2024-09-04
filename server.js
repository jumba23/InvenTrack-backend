/**
 * Server Configuration
 *
 * This file sets up and configures the Express server for the application.
 * It includes middleware for logging, CORS, body parsing, cookie parsing,
 * and session management. It also sets up routing for different API endpoints
 * and establishes a connection to Supabase for database interactions.
 *
 * @module server
 */

import express from "express";
import winston from "winston";
import expressWinston from "express-winston";
import attachMiddleware from "./middleware/index.js";
import errorHandler from "./middleware/errorHandler.js";
import supabase from "./config/supabaseClient.js";
import "express-async-errors"; // This package allows Express to handle async errors automatically

// Import route modules
import authRoute from "./routes/authRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import suppliersRoutes from "./routes/suppliersRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";

/**
 * Winston logger configuration
 *
 * This creates a logger instance with the following characteristics:
 * - Logs are written to 'error.log' (for error level) and 'combined.log' (for all levels)
 * - Log format includes timestamp and is in JSON format for easy parsing
 * - Console logging is added in non-production environments
 */
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize({ all: true })
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Add console logging in non-production environments
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// Initialize Express application
const app = express();

/**
 * HTTP request logging middleware
 *
 * This middleware logs all HTTP requests. It uses the Winston instance
 * we created earlier, ensuring consistent log format across the application.
 */
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: true,
  })
);

// Attach middlewares (CORS, body-parser, etc.) to the Express application
attachMiddleware(app, supabase);

// API Routes
app.use("/api/user", authRoute);
app.use("/api/products", productsRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/webhook", webhookRoutes);

// Catch 404 errors and forward them to the error handler
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Centralized error handling middleware
app.use(errorHandler);

/**
 * Error logging middleware
 *
 * This middleware logs all errors that occur in the application.
 * It's placed after the routes and the custom error handler to catch any
 * errors that might have slipped through.
 */
app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  })
);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => logger.info(`Server started on port ${port}`));
