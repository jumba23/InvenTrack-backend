// Centralized error handling
module.exports = function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send("An internal error occurred");
};
