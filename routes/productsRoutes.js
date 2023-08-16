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
  try {
    const { data, error } = await req.supabase
      .from("Products")
      .insert({
        product_id: 31,
        name: "SPF 80 Sunscreen",
        description: "Test Insert Product",
        quantity: 1,
        price: 23,
        threshold_quantity: 1,
        price_per_unit: 23,
        supplier_id: "Mercer Group",
        last_order_date: "2021-05-01",
      })
      .select();
    if (error) throw error;
    res.send("Product added");
    console.log("data", data);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching products");
  }
  // const retVal = await updateProduct(req.body.product, req.supabase);
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
