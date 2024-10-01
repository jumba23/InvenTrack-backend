import jwt from "jsonwebtoken";

/**
 * JWT Validation Middleware
 *
 * This middleware is used to validate JWTs sent with HTTP requests to secure endpoints on the server.
 *
 * Operation:
 * 1. Checks for a token in the request's cookies.
 * 2. If no token is present, sends a 200 status response (Access Denied).
 * 3. If a token is present, attempts to verify it using the secret key stored in process.env.JWT_SECRET.
 * 4. If the token is valid, attaches the verified user information to the request object and calls next().
 * 5. If the token is invalid (verification fails), sends a 400 status response (Invalid Token).
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const validateJWT = (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    console.log("No token found");
    return res.status(200).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

export default validateJWT;
