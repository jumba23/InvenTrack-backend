const express = require("express");
const router = express.Router();

// GET all products
router.get("/", (req, res) => {
  // Logic for fetching all products
  res.send("All products");
});

// ADD a new product
router.post("/", (req, res) => {
  // Logic for adding a new product
  res.send("Product added");
});

// UPDATE a product
router.put("/:id", (req, res) => {
  // Logic for updating a product with a specific ID
  res.send("Product updated");
});

// DELETE a product
router.delete("/:id", (req, res) => {
  // Logic for deleting a product with a specific ID
  res.send("Product deleted");
});

module.exports = router;
