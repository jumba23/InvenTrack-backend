const express = require("express");
const router = express.Router();
const { formatResponse } = require("../utils");
const { updateProduct } = require("../services/productService");

// GET all products

router.get("/", async (req, res) => {
  try {
    // TODO it takes in user ID and returns all products for that user
    const { data, error } = await req.supabase.from("Product").select("*");
    if (error) throw error;
    console.log("Fetched products:", data);
    const formattedResponse = formatResponse(data);
    res.json(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching products");
  }
});

// ADD a new product
router.post("/", async (req, res) => {
  // Logic for adding a new product
  const retVal = await updateProduct(req.body.product, req.supabase);
  console.log("retVal", retVal);
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
