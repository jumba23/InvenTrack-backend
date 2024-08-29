import express from "express";
import * as authController from "../controllers/authController.js";
import validateJWT from "../middleware/validateJWT.js";

/**
 * Express router for authentication routes
 * This router handles user authentication operations including signup, login, logout, and token validation.
 */
const router = express.Router();

/**
 * JWT validation route
 * GET /validate-token
 * Validates the JWT token in the request
 */
router.get("/validate-token", validateJWT, (req, res) => {
  res.status(200).send("Authenticated");
});

/**
 * User signup route
 * POST /signup
 * Registers a new user
 */
router.post("/signup", authController.signup);

/**
 * User login route
 * POST /login
 * Authenticates a user and returns a JWT
 */
router.post("/login", authController.login);

/**
 * User logout route
 * POST /logout
 * Logs out the current user
 */
router.post("/logout", authController.logout);

export default router;
