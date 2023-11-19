const express = require("express");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const attachMiddleware = require("./middleware");
const errorHandler = require("./middleware/errorHandler");

// ------------------------------------------------------
// This file configures and initializes the Express server for the application.
// It includes middleware for CORS, body parsing, cookie parsing, and session management,
// and sets up routing for different API endpoints. It also establishes a connection
// to Supabase for database interactions and initializes error handling.
// The server listens on a specified port, ready to handle incoming requests.
// ------------------------------------------------------

// Supabase client configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Express app initialization
const app = express();

// Use morgan for logging in development mode
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// Attach middlewares to the Express application
attachMiddleware(app, supabase);

// API Routes
// -----------------------------
const authRoute = require("./routes/authRoutes");
const productsRoutes = require("./routes/productsRoutes");
const suppliersRoutes = require("./routes/suppliersRoutes");
const webhookRoutes = require("./routes/webhookRoutes");

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
