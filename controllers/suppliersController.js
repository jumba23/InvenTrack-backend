// controllers/suppliersController.js

import {
  fetchAllSuppliers,
  addNewSupplier,
  fetchSupplierById,
  updateSupplierById,
  deleteSupplierById,
} from "../services/suppliersService.js";
import ApiError from "../utils/apiError.js";

/**
 * Controller for handling supplier-related operations.
 * Each method corresponds to a specific API endpoint and handles the request and response.
 */

/**
 * Get all suppliers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await fetchAllSuppliers(req.supabase);
    res.json(suppliers);
  } catch (error) {
    console.error("Error in getAllSuppliers:", error);
    next(new ApiError(500, "An error occurred while fetching suppliers"));
  }
};

/**
 * Add a new supplier
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const addSupplier = async (req, res, next) => {
  try {
    const newSupplier = req.body;
    const addedSupplier = await addNewSupplier(req.supabase, newSupplier);
    res.status(201).json({
      message: "Supplier added successfully",
      supplier: addedSupplier,
    });
  } catch (error) {
    console.error("Error in addSupplier:", error);
    next(new ApiError(500, "An error occurred while adding the supplier"));
  }
};

/**
 * Get a supplier by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await fetchSupplierById(req.supabase, id);
    if (!supplier) {
      throw new ApiError(404, "Supplier not found");
    }
    res.json(supplier);
  } catch (error) {
    console.error("Error in getSupplierById:", error);
    if (error instanceof ApiError) {
      next(error);
    } else {
      next(new ApiError(500, "An error occurred while fetching the supplier"));
    }
  }
};

/**
 * Update a supplier by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedSupplier = req.body;
    const result = await updateSupplierById(req.supabase, id, updatedSupplier);
    if (!result) {
      throw new ApiError(404, "Supplier not found");
    }
    res.json({ message: "Supplier updated successfully", supplier: result });
  } catch (error) {
    console.error("Error in updateSupplier:", error);
    if (error instanceof ApiError) {
      next(error);
    } else {
      next(new ApiError(500, "An error occurred while updating the supplier"));
    }
  }
};

/**
 * Delete a supplier by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const deleteSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteSupplierById(req.supabase, id);
    if (!result) {
      throw new ApiError(404, "Supplier not found");
    }
    res.json({ message: "Supplier deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSupplier:", error);
    if (error instanceof ApiError) {
      next(error);
    } else {
      next(new ApiError(500, "An error occurred while deleting the supplier"));
    }
  }
};
