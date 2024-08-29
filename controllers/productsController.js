// productsController.js

import * as productsService from "../services/productsService.js";
import { formatResponse } from "../utils/index.js";

/**
 * Controller for handling product-related operations.
 * Each method corresponds to a specific API endpoint and handles the request and response.
 */

/**
 * Get all products
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.fetchAllProducts(req.supabase);
    const formattedResponse = formatResponse(products);
    res.json(formattedResponse);
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    res.status(500).send("An error occurred while fetching products");
  }
};

/**
 * Add a new product
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const addProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    console.log("New Product:", newProduct);
    await productsService.addNewProduct(req.supabase, newProduct);
    res.status(201).send("Product added successfully");
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).send("An error occurred while adding the product");
  }
};

/**
 * Get a product by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.fetchProductById(req.supabase, id);
    const formattedResponse = formatResponse(product);
    res.json(formattedResponse);
  } catch (error) {
    console.error("Error in getProductById:", error);
    res.status(500).send("An error occurred while fetching the product");
  }
};

/**
 * Update a product by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;
    await productsService.updateProductById(req.supabase, id, updatedProduct);
    res.send("Product updated successfully");
  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).send("An error occurred while updating the product");
  }
};

/**
 * Delete a product by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productsService.deleteProductById(req.supabase, id);
    res.send("Product deleted successfully");
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).send("An error occurred while deleting the product");
  }
};
