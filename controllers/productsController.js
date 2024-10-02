// productsController.js

import {
  fetchAllProducts,
  addNewProduct,
  fetchProductById,
  updateProductById,
  deleteProductById,
} from "../services/productsService.js";
import ApiError from "../utils/apiError.js";

/**
 * Controller for handling product-related operations.
 * Each method corresponds to a specific API endpoint and handles the request and response.
 */

/**
 * Get all products
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await fetchAllProducts(req.supabase);
    res.json(products);
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    next(new ApiError(500, "An error occurred while fetching products"));
  }
};

/**
 * Add a new product
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const addProduct = async (req, res, next) => {
  try {
    const newProduct = req.body;
    const addedProduct = await addNewProduct(req.supabase, newProduct);
    res
      .status(201)
      .json({ message: "Product added successfully", product: addedProduct });
  } catch (error) {
    console.error("Error in addProduct:", error);
    next(new ApiError(500, "An error occurred while adding the product"));
  }
};

/**
 * Get a product by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await fetchProductById(req.supabase, id);
    if (!product) {
      throw new ApiError(404, "Product not found");
    }
    res.json(product);
  } catch (error) {
    console.error("Error in getProductById:", error);
    if (error instanceof ApiError) {
      next(error);
    } else {
      next(new ApiError(500, "An error occurred while fetching the product"));
    }
  }
};

/**
 * Update a product by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;
    const result = await updateProductById(req.supabase, id, updatedProduct);
    if (!result) {
      throw new ApiError(404, "Product not found");
    }
    res.json({ message: "Product updated successfully", product: result });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    if (error instanceof ApiError) {
      next(error);
    } else {
      next(new ApiError(500, "An error occurred while updating the product"));
    }
  }
};

/**
 * Delete a product by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductById(req.supabase, id);
    if (!result) {
      throw new ApiError(404, "Product not found");
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    if (error instanceof ApiError) {
      next(error);
    } else {
      next(new ApiError(500, "An error occurred while deleting the product"));
    }
  }
};
