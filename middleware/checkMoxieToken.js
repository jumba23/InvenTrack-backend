/**
 * checkMoxieToken.js
 *
 * This module exports a middleware function for validating Moxie webhook tokens.
 * It compares the token in the request headers with a secret token stored in the environment variables.
 *
 * This file uses ES6 module syntax. Ensure your package.json has "type": "module".
 */

/**
 * Middleware to check the validity of the Moxie webhook token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const checkMoxieWebhookToken = (req, res, next) => {
  // Read the secret token from the environment variables
  const secretToken = process.env.MOXIE_WEBHOOK_SECRET_TOKEN;

  // Read the token from the request headers
  const webhookToken = req.headers["x-webhook-token"];

  // Verify the token
  if (webhookToken && webhookToken === secretToken) {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.status(403).json({ error: "Invalid or missing webhook token" }); // Forbidden
  }
};

// If you need to export multiple middlewares in the future, you can use this syntax:
// export { checkMoxieWebhookToken, anotherMiddleware, yetAnotherMiddleware };
