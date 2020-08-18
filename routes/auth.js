const express = require("express");
const router = express.Router();

const { signup, signin, signout } = require("../controllers/auth");
const { userSignupValidator } = require("../validator");
const userauth = require("../middlewares/userauth");

router.post("/signin", signin);
router.get("/signout", signout);
router.post("/signup", userSignupValidator, signup);

module.exports = router;
