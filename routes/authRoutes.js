const express = require("express");
const router = express.Router();

// Signup route
router.post("/signup", (req, res) => {
  // Logic for signing up a user
  res.send("User signed up");
});

// Login route
router.post("/login", (req, res) => {
  // Logic for logging in a user
  res.send("User logged in");
});

module.exports = router;
