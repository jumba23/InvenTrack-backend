const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const validateJWT = require("../middleware/validateJWT");

router.get("/", validateJWT, productsController.getAllProducts);
router.post("/", validateJWT, productsController.addProduct);
router.get("/:id", validateJWT, productsController.getProductById);
router.put("/:id", validateJWT, productsController.updateProduct);
router.delete("/:id", validateJWT, productsController.deleteProduct);

module.exports = router;
