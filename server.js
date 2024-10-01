/**
 * Server Configuration for Serverless Environment
 *
 * This file sets up and configures the Express server for the application,
 * optimized for a serverless environment like Vercel. It includes middleware
 * for logging, CORS, body parsing, and cookie parsing. It also sets up routing
 * for different API endpoints and establishes a connection to Supabase for
 * database interactions.
 *
 * Key changes for serverless deployment:
 * - Removed file-based logging
 * - Adjusted logger configuration for console-only output
 * - Removed explicit server start (app.listen)
 * - Modified export to use a handler function for serverless invocation
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
import * as Sentry from "@sentry/node";

// Import route modules
import authRoute from "./routes/authRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import suppliersRoutes from "./routes/suppliersRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import storageRoutes from "./routes/storageRoutes.js";

/**
 * Sentry initialization
 *
 * This initializes the Sentry SDK with your DSN and enables the ProfilingIntegration.
 * The tracesSampleRate and profilesSampleRate are set to 1.0 to capture all traces and profiles.
 *
 */

Sentry.init({
  dsn: "https://ee33fed96d649b64d39ee0d661e22990@o4508049798135808.ingest.us.sentry.io/4508049802199040",
  integrations: [new ProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

/**
 * Winston logger configuration
 *
 * This creates a logger instance optimized for serverless environments:
 * - Log format includes timestamp and is in JSON format for easy parsing
 * - Logs are output to the console for cloud logging services to capture
 */
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return `[${timestamp}] ${level}: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
      }`;
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Adds color to the logs
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          return `[${timestamp}] ${level}: ${message} ${
            Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
          }`;
        })
      ),
    }),
  ],
});

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

// Root route
app.get("/", (req, res) => {
  res.send("InvenTrack Server is running!");
});

// API Routes
app.use("/api/user", authRoute);
app.use("/api/products", productsRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/webhook", webhookRoutes);
app.use("/api/storage", storageRoutes);

// Sentry debug route
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

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

/**
 * Serverless function handler
 *
 * This function wraps the Express app for serverless environments.
 * It's the entry point for handling requests in platforms like Vercel.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
export default async function handler(req, res) {
  await app(req, res);
}

// Development server startup (will not be used in production)
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () =>
    logger.info(`Development server started on port ${port}`)
  );
}
