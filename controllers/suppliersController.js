const suppliersService = require("../services/suppliersService");
const { formatResponse } = require("../utils/index");

const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await suppliersService.fetchAllSuppliers(req.supabase);
    console.log(suppliers);
    const formattedResponse = formatResponse(suppliers);
    res.json(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching suppliers");
  }
};

const addSupplier = async (req, res) => {
  try {
    const newSupplier = req.body;
    console.log("New Supplier:", newSupplier);
    await suppliersService.addNewSupplier(req.supabase, newSupplier);
    res.send("Supplier added");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding the supplier");
  }
};

const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await suppliersService.fetchSupplierById(req.supabase, id);
    const formattedResponse = formatResponse(supplier);
    res.json(formattedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the supplier");
  }
};

const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSupplier = req.body;
    await suppliersService.updateSupplierById(
      req.supabase,
      id,
      updatedSupplier
    );
    res.send("Supplier updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the supplier");
  }
};

const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    await suppliersService.deleteSupplierById(req.supabase, id);
    res.send("Supplier deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the supplier");
  }
};

module.exports = {
  getAllSuppliers,
  addSupplier,
  getSupplierById,
  updateSupplier,
  deleteSupplier,
};
