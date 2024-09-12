/**
 * Storage Routes
 *
 * This file defines the routes for storage-related operations,
 * specifically for handling user profile images.
 *
 * @module routes/storageRoutes
 */

import express from "express";
import * as storageController from "../controllers/storageController.js";
import validateJWT from "../middleware/validateJWT.js";

const router = express.Router();

/**
 * Route for uploading a profile image.
 * @name post/:userId/inventrack-profile-images
 * @function
 * @memberof module:routes/storageRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (JWT validation)
 * @param {callback} controller - Express controller function
 */
router.post(
  "/:userId/inventrack-profile-images",
  validateJWT,
  storageController.handleProfileImageUpload
);

/**
 * Route for retrieving a profile image URL.
 * @name get/:userId/profile-images
 * @function
 * @memberof module:routes/storageRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (JWT validation)
 * @param {callback} controller - Express controller function
 */
router.get(
  "/:userId/inventrack-profile-images",
  validateJWT,
  storageController.getProfileImage
);

export default router;
