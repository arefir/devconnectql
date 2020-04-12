const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  //Get token from header
  const token = req.header("x-auth-token");

  //Check token existence
  if (!token) req.isAuth = false;

  //Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    req.isAuth = true;
    next();
  } catch (err) {
    req.isAuth = false;
    next();
  }
};
