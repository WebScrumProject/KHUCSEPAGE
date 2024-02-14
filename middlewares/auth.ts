import * as jwt from "jsonwebtoken";

function isLoggedIn(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({
      error: "No authorization header defined",
    });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        error: err.message,
      });
    }
    req.user = next();
  });
}

module.exports = {
  isLoggedIn,
};
