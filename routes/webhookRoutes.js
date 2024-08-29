/**
 * webhookRoutes.js
 *
 * This module defines the routes for handling incoming webhooks.
 * It sets up a single POST route that is protected by a Moxie webhook token check middleware.
 * The route is handled by the yourWebhookHandler function from the webhookController.
 *
 * This file uses ES6 module syntax. Ensure your package.json has "type": "module".
 */

import express from "express";
import * as webhookController from "../controllers/webhookController.js";
import { checkMoxieWebhookToken } from "../middleware/checkMoxieToken.js";

/**
 * Express router to mount webhook related functions on.
 * @type {object}
 * @const
 * @namespace webhookRoutes
 */
const router = express.Router();

/**
 * Route handling incoming webhooks.
 * @name post/
 * @function
 * @memberof module:routers/webhookRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware (Moxie webhook token check)
 * @param {callback} controller - Express controller function
 */
router.post("/", checkMoxieWebhookToken, webhookController.yourWebhookHandler);

export default router;
