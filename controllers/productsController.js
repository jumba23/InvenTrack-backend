const productsService = require("../services/productsService");
const { formatResponse } = require("../utils/index");

const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.fetchAllProducts(req.supabase);
    console.log(products);
    const formattedResponse = formatResponse(products);
    res.json(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching products");
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = req.body; // Get the body payload from the incoming HTTP request
    console.log("New Product:", newProduct);
    await productsService.addNewProduct(req.supabase, newProduct);
    res.send("Product added");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding the product");
  }
};

module.exports = {
  getAllProducts,
  addProduct,
};
