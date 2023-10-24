require("dotenv").config();

// middleware.js

exports.checkMoxieWebhookToken = (req, res, next) => {
  // Read the secret token from the .env file
  const secretToken = process.env.MOXIE_WEBHOOK_SECRET_TOKEN;

  // Read the token from the request headers
  const webhookToken = req.headers["x-webhook-token"];

  // Verify the token
  if (webhookToken && webhookToken === secretToken) {
    next(); // proceed to the next middleware or route handler
  } else {
    res.sendStatus(403); // Forbidden
  }
};
