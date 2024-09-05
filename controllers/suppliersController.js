// controllers/suppliersController.js

import {
  fetchAllSuppliers,
  addNewSupplier,
  fetchSupplierById,
  updateSupplierById,
  deleteSupplierById,
} from "../services/suppliersService.js";

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
    res.json(suppliers);
  } catch (error) {
    console.error("Error in getAllSuppliers:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching suppliers" });
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
    const addedSupplier = await addNewSupplier(req.supabase, newSupplier);
    res.status(201).json({
      message: "Supplier added successfully",
      supplier: addedSupplier,
    });
  } catch (error) {
    console.error("Error in addSupplier:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the supplier" });
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
    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.json(supplier);
  } catch (error) {
    console.error("Error in getSupplierById:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the supplier" });
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
    const result = await updateSupplierById(req.supabase, id, updatedSupplier);
    if (!result) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.json({ message: "Supplier updated successfully", supplier: result });
  } catch (error) {
    console.error("Error in updateSupplier:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the supplier" });
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
    const result = await deleteSupplierById(req.supabase, id);
    if (!result) {
      return res.status(404).json({ error: "Supplier not found" });
    }
    res.json({ message: "Supplier deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSupplier:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the supplier" });
  }
};
