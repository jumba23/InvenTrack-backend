// profileRoutes.js

import express from "express";
import * as profileController from "../controllers/profileController.js";
import validateJWT from "../middleware/validateJWT.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { profileSchema, profileUpdateSchema } from "../models/profileModel.js";

/**
 * Express router to mount profile related functions on.
 * @type {object}
 * @const
 * @namespace profileRoutes
 */
const router = express.Router();

/**
 * Route serving list of all profiles.
 * @name get/
 * @function
 * @memberof module:routers/profileRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (JWT validation)
 * @param {callback} controller - Express controller function
 */
router.get("/", validateJWT, profileController.getAllProfiles);

/**
 * Route serving profile creation.
 * @name post/
 * @function
 * @memberof module:routers/profileRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback[]} middleware - Express middlewares (JWT validation, request body validation)
 * @param {callback} controller - Express controller function
 */
router.post(
  "/",
  [validateJWT, validateRequest(profileSchema)],
  profileController.createProfile
);

/**
 * Route serving single profile by user ID.
 * @name get/:userId
 * @function
 * @memberof module:routers/profileRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (JWT validation)
 * @param {callback} controller - Express controller function
 */
router.get("/:id", validateJWT, profileController.getProfileById);

/**
 * Route serving profile update.
 * @name put/:userId
 * @function
 * @memberof module:routers/profileRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback[]} middleware - Express middlewares (JWT validation, request body validation)
 * @param {callback} controller - Express controller function
 */
router.put(
  "/:id",
  [validateJWT, validateRequest(profileUpdateSchema)],
  profileController.updateProfile
);

/**
 * Route serving profile deletion.
 * @name delete/:userId
 * @function
 * @memberof module:routers/profileRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (JWT validation)
 * @param {callback} controller - Express controller function
 */
router.delete("/:id", validateJWT, profileController.deleteProfile);

export default router;
