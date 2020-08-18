const User = require("../models/user");
const jwt = require("jsonwebtoken"); //To generate signed token
const expressjwt = require("express-jwt"); //For authorization check
const config = require("config");
const userauth = require("../middlewares/userauth");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ error: "User with this email doesn't exist" });
    }

    //If user found authenticate user
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Email and password dont match" });
    }

    //Generate signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, config.get("JWT_SECRET"));

    //Set token as 't' in cookies. Expire after 1 hour
    //res.cookie("t", token, { expire: new Date() + 3600 });
    res.cookie("t", token);

    //return response
    const { _id, email, name, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");

  return res.json({ message: "Signout successful." });
};
