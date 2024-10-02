// services/suppliersService.js

import { handleSupabaseError } from "../utils/supabaseErrorHandler.js";
import ApiError from "../utils/apiError.js";

/**
 * suppliersService.js
 * This module contains functions for interacting with the suppliers table in the Supabase database.
 * and calculating additional supplier-related metrics.
 */

/**
 * Fetches all suppliers from the database.
 * @param {object} supabase - The Supabase client instance.
 * @returns {Promise<Array>} A promise that resolves to an array of supplier objects.
 * @throws {ApiError} If there's an error fetching the suppliers.
 */
export const fetchAllSuppliers = async (supabase) => {
  try {
    // Fetch suppliers
    const { data: suppliers, error } = await supabase
      .from("suppliers")
      .select("*");
    if (error) throw error;

    // Fetch all products
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select(
        "supplier_id, total_quantity, retail_price_per_unit, wholesale_price_per_unit"
      );
    if (productsError) throw productsError;

    // Calculate additional metrics for each supplier
    const enhancedSuppliers = suppliers.map((supplier) => {
      const supplierProducts = products.filter(
        (product) => product.supplier_id === supplier.id
      );

      const stock_wholesale_value = supplierProducts.reduce(
        (sum, product) =>
          sum + product.wholesale_price_per_unit * product.total_quantity,
        0
      );

      const stock_retail_value = supplierProducts.reduce(
        (sum, product) =>
          sum + product.retail_price_per_unit * product.total_quantity,
        0
      );

      const total_quantity = supplierProducts.reduce(
        (sum, product) => sum + product.total_quantity,
        0
      );

      return {
        ...supplier,
        stock_wholesale_value,
        stock_retail_value,
        total_quantity,
      };
    });

    return enhancedSuppliers;
  } catch (error) {
    console.error("Error fetching all suppliers:", error.message);
    throw new ApiError(500, "Failed to fetch suppliers");
  }
};

/**
 * Adds a new supplier to the database.
 * @param {object} supabase - The Supabase client instance.
 * @param {object} supplier - The supplier object to be added.
 * @returns {Promise<object>} A promise that resolves to the newly created supplier object.
 * @throws {ApiError} If there's an error adding the supplier.
 */
export const addNewSupplier = async (supabase, supplier) => {
  try {
    const { data, error } = await supabase
      .from("suppliers")
      .insert(supplier)
      .select();
    if (error) throw error;
    return data[0]; // Return the first (and only) inserted supplier
  } catch (error) {
    console.error("Error adding new supplier:", error.message);
    throw new ApiError(500, "Failed to add new supplier");
  }
};

/**
 * Fetches a single supplier by its ID with additional calculated metrics.
 * @param {object} supabase - The Supabase client instance.
 * @param {number|string} id - The ID of the supplier to fetch.
 * @returns {Promise<object>} A promise that resolves to the supplier object.
 * @throws {ApiError} If there's an error fetching the supplier or if it's not found.
 */
export const fetchSupplierById = async (supabase, id) => {
  try {
    const { data: supplier, error: supplierError } = await supabase
      .from("suppliers")
      .select("*")
      .eq("id", id)
      .single();

    if (supplierError) {
      console.log(
        "Supabase error details:",
        JSON.stringify(supplierError, null, 2)
      );
      throw handleSupabaseError(supplierError, "Supplier");
    }

    if (!supplier) {
      throw new ApiError(404, "Supplier not found");
    }

    // Fetch products for this supplier
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("total_quantity, retail_price_per_unit, wholesale_price_per_unit")
      .eq("supplier_id", id);

    if (productsError) {
      console.log(
        "Supabase products error details:",
        JSON.stringify(productsError, null, 2)
      );
      throw handleSupabaseError(productsError, "Product");
    }

    // Calculate additional metrics
    const stock_wholesale_value = products.reduce(
      (sum, product) =>
        sum + product.wholesale_price_per_unit * product.total_quantity,
      0
    );

    const stock_retail_value = products.reduce(
      (sum, product) =>
        sum + product.retail_price_per_unit * product.total_quantity,
      0
    );

    const total_quantity = products.reduce(
      (sum, product) => sum + product.total_quantity,
      0
    );

    return {
      ...supplier,
      stock_wholesale_value,
      stock_retail_value,
      total_quantity,
    };
  } catch (error) {
    console.error(`Error in fetchSupplierById for id ${id}:`, error);
    if (error instanceof ApiError) {
      throw error;
    } else {
      throw new ApiError(500, "Failed to fetch supplier");
    }
  }
};

/**
 * Updates a supplier by its ID.
 * @param {object} supabase - The Supabase client instance.
 * @param {number|string} id - The ID of the supplier to update.
 * @param {object} supplier - The updated supplier data.
 * @returns {Promise<object>} A promise that resolves to the updated supplier object.
 * @throws {ApiError} If there's an error updating the supplier or if it's not found.
 */
export const updateSupplierById = async (supabase, id, supplier) => {
  try {
    const { data, error } = await supabase
      .from("suppliers")
      .update(supplier)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    if (!data) throw new ApiError(404, "Supplier not found");
    return data;
  } catch (error) {
    console.error(`Error updating supplier with id ${id}:`, error.message);
    if (error instanceof ApiError) {
      throw error;
    } else {
      throw new ApiError(500, "Failed to update supplier");
    }
  }
};

/**
 * Deletes a supplier by its ID.
 * @param {object} supabase - The Supabase client instance.
 * @param {number|string} id - The ID of the supplier to delete.
 * @returns {Promise<object>} A promise that resolves to the deleted supplier object.
 * @throws {ApiError} If there's an error deleting the supplier or if it's not found.
 */
export const deleteSupplierById = async (supabase, id) => {
  try {
    const { data, error } = await supabase
      .from("suppliers")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    if (!data) throw new ApiError(404, "Supplier not found");
    return data;
  } catch (error) {
    console.error(`Error deleting supplier with id ${id}:`, error.message);
    if (error instanceof ApiError) {
      throw error;
    } else {
      throw new ApiError(500, "Failed to delete supplier");
    }
  }
};
