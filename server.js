const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Import supabase
const { createClient } = require("@supabase/supabase-js");

// Import dotenv
require("dotenv").config();

// Test connection to Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  const { data, error } = await supabase.from("Product").select("*");

  if (error) {
    console.error("Error connecting to Supabase:", error);
  } else {
    console.log("Connected to Supabase, fetched data:", data);
  }
}

// Call the function to test the connection
testConnection();

//Import routes
const authRoute = require("./routes/auth");
const productsRoute = require("./routes/products");

//Middleware
app.use(bodyParser.json());

// API Routes
app.use("/api/user", authRoute);
app.use("/api/products", productsRoute);

// Error handling
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
