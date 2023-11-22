const jwt = require("jsonwebtoken");

//---------------------------------------------------------------------------------------------------------------
// This middleware is used to validate JWTs sent with HTTP requests to secure endpoints on the server.
// The middleware checks for a token in the request's cookies.
// If a token is not present, it sends a 401 status response (Access Denied).
// If a token is present, it attempts to verify the token using the secret key stored in process.env.JWT_SECRET.
// If the token is valid, it attaches the verified user information to the request object and calls next() to pass
// control to the next middleware or route handler.
// If the token is invalid (verification fails), it sends a 400 status response (Invalid Token).
// ---------------------------------------------------------------------------------------------

// Middleware to validate JWT
module.exports = function validateJWT(req, res, next) {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
