const express = require("express");
const router = express.Router();

const { userById, read, update } = require("../controllers/user");
const userauth = require("../middlewares/userauth");
const isadmin = require("../middlewares/admin");
const isCurrentUser = require("../middlewares/isCurrentUser");

router.param("userId", userById);

router.get("/secret/:userId", userauth, isCurrentUser, isadmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});
router.get("/user/:userId", userauth, isCurrentUser, read);
router.put("/user/:userId", userauth, isCurrentUser, update);

module.exports = router;
