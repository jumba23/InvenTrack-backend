/**
 * productService.js
 * This module contains functions for interacting with the products table in the Supabase database.
 */

import ApiError from "../utils/apiError.js";

/**
 * Fetches all products from the database.
 * @param {object} supabase - The Supabase client instance.
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 * @throws {ApiError} If there's an error fetching the products.
 */
export const fetchAllProducts = async (supabase) => {
  try {
    const { data, error } = await supabase.from("products").select("*");
    if (error) throw new ApiError(500, "Failed to fetch products");
    return data;
  } catch (error) {
    console.error("Error fetching all products:", error.message);
    throw error;
  }
};

/**
 * Adds a new product to the database.
 * @param {object} supabase - The Supabase client instance.
 * @param {object} product - The product object to be added.
 * @returns {Promise<object>} A promise that resolves to the newly created product object.
 * @throws {ApiError} If there's an error adding the product.
 */
export const addNewProduct = async (supabase, product) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert(product)
      .select();
    if (error) throw new ApiError(500, "Failed to add new product");
    return data[0]; // Return the first (and only) inserted product
  } catch (error) {
    console.error("Error adding new product:", error.message);
    throw error;
  }
};

/**
 * Fetches a single product by its ID.
 * @param {object} supabase - The Supabase client instance.
 * @param {number|string} id - The ID of the product to fetch.
 * @returns {Promise<object>} A promise that resolves to the product object.
 * @throws {ApiError} If there's an error fetching the product or if it's not found.
 */
export const fetchProductById = async (supabase, id) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new ApiError(500, "Failed to fetch product");
    if (!data) throw new ApiError(404, "Product not found");
    return data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error.message);
    throw error;
  }
};

/**
 * Updates a product by its ID.
 * @param {object} supabase - The Supabase client instance.
 * @param {number|string} id - The ID of the product to update.
 * @param {object} product - The updated product data.
 * @returns {Promise<object>} A promise that resolves to the updated product object.
 * @throws {ApiError} If there's an error updating the product or if it's not found.
 */
export const updateProductById = async (supabase, id, product) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .update(product)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new ApiError(500, "Failed to update product");
    if (!data) throw new ApiError(404, "Product not found");
    return data;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error.message);
    throw error;
  }
};

/**
 * Deletes a product by its ID.
 * @param {object} supabase - The Supabase client instance.
 * @param {number|string} id - The ID of the product to delete.
 * @returns {Promise<object>} A promise that resolves to the deleted product object.
 * @throws {ApiError} If there's an error deleting the product or if it's not found.
 */
export const deleteProductById = async (supabase, id) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) throw new ApiError(500, "Failed to delete product");
    if (!data) throw new ApiError(404, "Product not found");
    return data;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error.message);
    throw error;
  }
};
