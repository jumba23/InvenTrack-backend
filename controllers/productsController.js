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
    const newProduct = req.body;
    console.log("New Product:", newProduct);
    await productsService.addNewProduct(req.supabase, newProduct);
    res.send("Product added");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding the product");
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.fetchProductById(req.supabase, id);
    const formattedResponse = formatResponse(product);
    res.json(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the product");
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;
    await productsService.updateProductById(req.supabase, id, updatedProduct);
    res.send("Product updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the product");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productsService.deleteProductById(req.supabase, id);
    res.send("Product deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the product");
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
