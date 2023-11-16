module.exports = function verifyToken(req, res, next) {
  const incomingToken = req.headers["authorization"];

  console.log("incomingToken", incomingToken);
  console.log("req.session.user", req.session.user);

  if (!req.session.user || req.session.user.token !== incomingToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
