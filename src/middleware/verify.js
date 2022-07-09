const jwt = require("jsonwebtoken");
const handleStatus = require("../utils/handleStatus");

const verify = {
  async verifyToken(req, res, next) {
    const token = req.headers?.token.split(" ")[1];
    await jwt.verify(token, process.env.KEY_JWT, async (error, user) => {
      if (error) {
        handleStatus(0, res, error);
      } else {
        req.user = user;
        next();
      }
    });
  },
  verifyRoleAdmin(req, res, next) {
    if (req.user.isAdmin) {
      next();
    } else handleStatus(0, res, "YOU NOT ALLOW");
  },
};

module.exports = verify;
