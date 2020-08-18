const express = require("express");
const router = express.Router();

const userauth = require("../middlewares/userauth");
const isCurrentUser = require("../middlewares/isCurrentUser");
const isAdmin = require("../middlewares/admin");

const { userById } = require("../controllers/user");
const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
  listSearch,
} = require("../controllers/product");

router.get("/product/:productId", read);
router.delete(
  "/product/:productId/:userId",
  userauth,
  isCurrentUser,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  userauth,
  isCurrentUser,
  isAdmin,
  update
);

router.post(
  "/product/create/:userId",
  userauth,
  isCurrentUser,
  isAdmin,
  create
);

router.param("userId", userById);
router.param("productId", productById);
router.get("/products", list);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/products/search", listSearch);
router.get("/product/photo/:productId", photo);

module.exports = router;
