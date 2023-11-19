// CORS configuration to allow requests from the frontend domain
module.exports = {
  // origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  origin: "http://localhost:3000", // Specify the frontend's origin.
  credentials: true, // Accept cookies via cross-origin requests.
};
