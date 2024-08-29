// productsRoutes.js

import express from "express";
import * as productsController from "../controllers/productsController.js";
import validateJWT from "../middleware/validateJWT.js";

/**
 * Express router to mount product related functions on.
 * @type {object}
 * @const
 * @namespace productsRoutes
 */
const router = express.Router();

/**
 * Route serving list of all products.
 * @name get/
 * @function
 * @memberof module:routers/productsRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (JWT validation)
 * @param {callback} controller - Express controller function
 */
router.get("/", validateJWT, productsController.getAllProducts);

/**
 * Route serving product creation.
 * @name post/
 * @function
 * @memberof module:routers/productsRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (JWT validation)
 * @param {callback} controller - Express controller function
 */
router.post("/", validateJWT, productsController.addProduct);

/**
 * Route serving single product by ID.
 * @name get/:id
 * @function
 * @memberof module:routers/productsRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (JWT validation)
 * @param {callback} controller - Express controller function
 */
router.get("/:id", validateJWT, productsController.getProductById);

/**
 * Route serving product update.
 * @name put/:id
 * @function
 * @memberof module:routers/productsRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (JWT validation)
 * @param {callback} controller - Express controller function
 */
router.put("/:id", validateJWT, productsController.updateProduct);

/**
 * Route serving product deletion.
 * @name delete/:id
 * @function
 * @memberof module:routers/productsRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (JWT validation)
 * @param {callback} controller - Express controller function
 */
router.delete("/:id", validateJWT, productsController.deleteProduct);

export default router;
