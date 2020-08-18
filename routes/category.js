const express = require("express");
const router = express.Router();

const userauth = require("../middlewares/userauth");
const isCurrentUser = require("../middlewares/isCurrentUser");
const isAdmin = require("../middlewares/admin");

const { userById } = require("../controllers/user");
const {
  create,
  categoryById,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");

router.get("/categories", list);
router.get("/category/:categoryId", read);
router.put(
  "/category/:categoryId/:userId",
  userauth,
  isCurrentUser,
  isAdmin,
  update
);
router.delete(
  "/category/:categoryId/:userId",
  userauth,
  isCurrentUser,
  isAdmin,
  remove
);

router.post(
  "/category/create/:userId",
  userauth,
  isCurrentUser,
  isAdmin,
  create
);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
