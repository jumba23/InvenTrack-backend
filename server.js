const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

// Import supabase
const { createClient } = require("@supabase/supabase-js");

// Import middleware
const authenticationToken = require("./middleware/authenticationToken");

// Test connection to Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

//In the context of a full-stack application with different domains for the frontend and backend (like this one)
// you need to enable CORS (Cross-Origin Resource Sharing) to allow the frontend to access the backend.
const cors = require("cors");
app.use(cors());

// async function testConnection() {
//   const { data, error } = await supabase.from("Product").select("*");

//   if (error) {
//     console.error("Error connecting to Supabase:", error);
//   } else {
//     console.log("Connected to Supabase, fetched data:", data);
//   }
// }

// // Call the function to test the connection
// testConnection();

//Middleware
app.use(bodyParser.json());
// attach supabase client
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

//Import routes
const authRoute = require("./routes/authRoutes");
const productsRoutes = require("./routes/productsRoutes");
const suppliersRoutes = require("./routes/suppliersRoutes");
const webhookRoutes = require("./routes/webhookRoutes");

// API Routes
app.use("/api/user", authRoute);
app.use("/api/products", authenticationToken, productsRoutes);
app.use("/api/suppliers", authenticationToken, suppliersRoutes);
app.use("/api/webhook", webhookRoutes);

// Error handling
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
