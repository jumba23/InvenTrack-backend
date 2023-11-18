const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

// Import supabase
const { createClient } = require("@supabase/supabase-js");

// Test connection to Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

//In the context of a full-stack application with different domains for the frontend and backend (like this one)
// you need to enable CORS (Cross-Origin Resource Sharing) to allow the frontend to access the backend.
const corsOptions = {
  origin: "http://localhost:3000", // Frontend's origin
  credentials: true, // To accept cookies via cross-origin requests
};

app.use(cors(corsOptions));
app.use(cookieParser());

//Middleware
app.use(bodyParser.json());
// attach supabase client
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});
//Configure the Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

//Import routes
const authRoute = require("./routes/authRoutes");
const productsRoutes = require("./routes/productsRoutes");
const suppliersRoutes = require("./routes/suppliersRoutes");
const webhookRoutes = require("./routes/webhookRoutes");

// API Routes
app.use("/api/user", authRoute);
app.use("/api/products", productsRoutes);
app.use("/api/suppliers", suppliersRoutes);
app.use("/api/webhook", webhookRoutes);

// Error handling
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
