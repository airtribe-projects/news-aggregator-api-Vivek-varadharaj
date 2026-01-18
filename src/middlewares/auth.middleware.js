const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config/jwt");
const { status } = require("http-status");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(status.UNAUTHORIZED)
      .json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, jwtConfig.secret, (err, user) => {
    if (err) {
      return res.status(status.UNAUTHORIZED).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
