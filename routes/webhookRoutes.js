const express = require("express");
const router = express.Router();

const webhookController = require("../controllers/webhookController");
const { checkMoxieWebhookToken } = require("../middleware/checkMoxieToken");

router.post("/", checkMoxieWebhookToken, webhookController.yourWebhookHandler);

module.exports = router;
