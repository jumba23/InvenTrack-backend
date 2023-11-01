const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, productsController.getAllProducts);
router.post("/", verifyToken, productsController.addProduct);
router.get("/:id", verifyToken, productsController.getProductById);
router.put("/:id", verifyToken, productsController.updateProduct);
router.delete("/:id", verifyToken, productsController.deleteProduct);

module.exports = router;
