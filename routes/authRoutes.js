const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateJWT = require("../middleware/validateJWT");

// New JWT validation route
router.get("/validate-token", validateJWT, (req, res) => {
  res.status(200).send("Authenticated");
});

//POST auth routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
