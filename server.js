import express from "express";
import { createClient } from "@supabase/supabase-js";
import attachMiddleware from "./middleware/index.js";
import errorHandler from "./middleware/errorHandler.js";

// ------------------------------------------------------
// This file configures and initializes the Express server for the application.
// It includes middleware for CORS, body parsing, cookie parsing, and session management,
// and sets up routing for different API endpoints. It also establishes a connection
// to Supabase for database interactions and initializes error handling.
// The server listens on a specified port, ready to handle incoming requests.
//
// Note: This file uses ES6 module syntax. Make sure your package.json has "type": "module".
// ------------------------------------------------------

// Supabase client configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Express app initialization
const app = express();

// Use morgan for logging in development mode
if (process.env.NODE_ENV === "development") {
  // Using dynamic import for morgan as it's only needed in development
  const morgan = await import("morgan");
  app.use(morgan.default("dev"));
}

// Attach middlewares to the Express application
attachMiddleware(app, supabase);

// API Routes
// -----------------------------
import authRoute from "./routes/authRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import suppliersRoutes from "./routes/suppliersRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";

app.use("/api/user", authRoute);
app.use("/api/products", productsRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/webhook", webhookRoutes);

// Error Handling Middleware
// -----------------------------
app.use(errorHandler); // Centralized error handling

// Start the server on a specified port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
