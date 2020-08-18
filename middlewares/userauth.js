const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/user");

async function userauth(req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Token Not Provided");
  try {
    let user = jwt.verify(token, config.get("JWT_SECRET"));

    req.user = await User.findById(user._id);
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
  next();
}

module.exports = userauth;
