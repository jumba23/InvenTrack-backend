/**
 * suppliersService.js
 * This module contains functions for interacting with the suppliers table in the Supabase database.
 */

/**
 * Fetches all suppliers from the database.
 * @param {object} supabase - The Supabase client instance.
 * @returns {Promise<Array>} A promise that resolves to an array of supplier objects.
 * @throws {Error} If there's an error fetching the suppliers.
 */
export const fetchAllSuppliers = async (supabase) => {
  try {
    const { data, error } = await supabase.from("suppliers").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching all suppliers:", error.message);
    throw error;
  }
};

/**
 * Adds a new supplier to the database.
 * @param {object} supabase - The Supabase client instance.
 * @param {object} supplier - The supplier object to be added.
 * @returns {Promise<object>} A promise that resolves to the newly created supplier object.
 * @throws {Error} If there's an error adding the supplier.
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
    throw error;
  }
};

/**
 * Fetches a single supplier by its ID.
 * @param {object} supabase - The Supabase client instance.
 * @param {number|string} id - The ID of the supplier to fetch.
 * @returns {Promise<object>} A promise that resolves to the supplier object.
 * @throws {Error} If there's an error fetching the supplier or if it's not found.
 */
export const fetchSupplierById = async (supabase, id) => {
  try {
    const { data, error } = await supabase
      .from("suppliers")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    if (!data) throw new Error("Supplier not found");
    return data;
  } catch (error) {
    console.error(`Error fetching supplier with id ${id}:`, error.message);
    throw error;
  }
};

/**
 * Updates a supplier by its ID.
 * @param {object} supabase - The Supabase client instance.
 * @param {number|string} id - The ID of the supplier to update.
 * @param {object} supplier - The updated supplier data.
 * @returns {Promise<object>} A promise that resolves to the updated supplier object.
 * @throws {Error} If there's an error updating the supplier or if it's not found.
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
    if (!data) throw new Error("Supplier not found");
    return data;
  } catch (error) {
    console.error(`Error updating supplier with id ${id}:`, error.message);
    throw error;
  }
};

/**
 * Deletes a supplier by its ID.
 * @param {object} supabase - The Supabase client instance.
 * @param {number|string} id - The ID of the supplier to delete.
 * @returns {Promise<object>} A promise that resolves to the deleted supplier object.
 * @throws {Error} If there's an error deleting the supplier or if it's not found.
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
    if (!data) throw new Error("Supplier not found");
    return data;
  } catch (error) {
    console.error(`Error deleting supplier with id ${id}:`, error.message);
    throw error;
  }
};
