const express = require("express");
const router = express.Router();
const suppliersController = require("../controllers/suppliersController");
const validateJWT = require("../middleware/validateJWT");

router.get("/", validateJWT, suppliersController.getAllSuppliers);
router.post("/", validateJWT, suppliersController.addSupplier);
router.get("/:id", validateJWT, suppliersController.getSupplierById);
router.put("/:id", validateJWT, suppliersController.updateSupplier);
router.delete("/:id", validateJWT, suppliersController.deleteSupplier);

module.exports = router;
