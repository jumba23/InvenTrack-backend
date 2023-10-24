const redis = require("redis");
const client = redis.createClient();

const authenticationToken = async (req, res, next) => {
  const userId = req.user.id; // get user id from request
  client.get(`user:${userId}:token`, function (err, token) {
    if (err || !token) {
      res.status(403).send("Unauthorized");
      return;
    }
    req.token = token; // set the token into the request object
    next();
  });
};

module.exports = authenticationToken;
