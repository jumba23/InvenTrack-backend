// suppliersController.js

import {
  fetchAllSuppliers,
  addNewSupplier,
  fetchSupplierById,
  updateSupplierById,
  deleteSupplierById,
} from "../services/suppliersService.js";
// import { formatResponse } from "../utils/index.js";

/**
 * Controller for handling supplier-related operations.
 * Each method corresponds to a specific API endpoint and handles the request and response.
 */

/**
 * Get all suppliers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await fetchAllSuppliers(req.supabase);
    // const formattedResponse = formatResponse(suppliers);
    // res.json(formattedResponse);
    res.json(suppliers);
  } catch (error) {
    console.error("Error in getAllSuppliers:", error);
    res.status(500).send("An error occurred while fetching suppliers");
  }
};

/**
 * Add a new supplier
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const addSupplier = async (req, res) => {
  try {
    const newSupplier = req.body;
    console.log("New Supplier:", newSupplier);
    await addNewSupplier(req.supabase, newSupplier);
    res.status(201).send("Supplier added successfully");
  } catch (error) {
    console.error("Error in addSupplier:", error);
    res.status(500).send("An error occurred while adding the supplier");
  }
};

/**
 * Get a supplier by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await fetchSupplierById(req.supabase, id);
    // const formattedResponse = formatResponse(supplier);
    // res.json(formattedResponse);
    res.json(supplier);
  } catch (error) {
    console.error("Error in getSupplierById:", error);
    res.status(500).send("An error occurred while fetching the supplier");
  }
};

/**
 * Update a supplier by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSupplier = req.body;
    await updateSupplierById(req.supabase, id, updatedSupplier);
    res.send("Supplier updated successfully");
  } catch (error) {
    console.error("Error in updateSupplier:", error);
    res.status(500).send("An error occurred while updating the supplier");
  }
};

/**
 * Delete a supplier by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSupplierById(req.supabase, id);
    res.send("Supplier deleted successfully");
  } catch (error) {
    console.error("Error in deleteSupplier:", error);
    res.status(500).send("An error occurred while deleting the supplier");
  }
};
