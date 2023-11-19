const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

// ------------------------------------------------------
// This file configures and initializes the Express server for the application.
// It includes middleware for CORS, body parsing, cookie parsing, and session management,
// and sets up routing for different API endpoints. It also establishes a connection
// to Supabase for database interactions and initializes error handling.
// The server listens on a specified port, ready to handle incoming requests.
// ------------------------------------------------------

// Import and configure Supabase client
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// CORS configuration to allow requests from the frontend domain
const corsOptions = {
  // origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  origin: "http://localhost:3000", // Specify the frontend's origin.
  credentials: true, // Accept cookies via cross-origin requests.
};
app.use(cors(corsOptions));

// Parse HTTP request cookies
app.use(cookieParser());

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Middleware to attach the Supabase client to requests
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Secret for signing the session ID cookie.
    resave: false,
    saveUninitialized: true,
    // In a production environment, it's best practice to use "true" to
    //ensure cookies are transmitted over secure protocols only.
    cookie: { secure: process.env.NODE_ENV === "production" }, //currently set to false for development
  })
);

// Import and use API routes
const authRoute = require("./routes/authRoutes");
const productsRoutes = require("./routes/productsRoutes");
const suppliersRoutes = require("./routes/suppliersRoutes");
const webhookRoutes = require("./routes/webhookRoutes");

app.use("/api/user", authRoute);
app.use("/api/products", productsRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/webhook", webhookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

// Start the server on a specified port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
