// suppliersRoutes.js

import express from "express";
import * as suppliersController from "../controllers/suppliersController.js";
import validateJWT from "../middleware/validateJWT.js";

/**
 * Express router to mount supplier related functions on.
 * @type {object}
 * @const
 * @namespace suppliersRoutes
 */
const router = express.Router();

/**
 * Route serving list of all suppliers.
 * @name get/
 * @function
 * @memberof module:routers/suppliersRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (JWT validation)
 * @param {callback} controller - Express controller function
 */
router.get("/", validateJWT, suppliersController.getAllSuppliers);

/**
 * Route serving supplier creation.
 * @name post/
 * @function
 * @memberof module:routers/suppliersRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (JWT validation)
 * @param {callback} controller - Express controller function
 */
router.post("/", validateJWT, suppliersController.addSupplier);

/**
 * Route serving single supplier by ID.
 * @name get/:id
 * @function
 * @memberof module:routers/suppliersRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (JWT validation)
 * @param {callback} controller - Express controller function
 */
router.get("/:id", validateJWT, suppliersController.getSupplierById);

/**
 * Route serving supplier update.
 * @name put/:id
 * @function
 * @memberof module:routers/suppliersRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (JWT validation)
 * @param {callback} controller - Express controller function
 */
router.put("/:id", validateJWT, suppliersController.updateSupplier);

/**
 * Route serving supplier deletion.
 * @name delete/:id
 * @function
 * @memberof module:routers/suppliersRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (JWT validation)
 * @param {callback} controller - Express controller function
 */
router.delete("/:id", validateJWT, suppliersController.deleteSupplier);

export default router;
