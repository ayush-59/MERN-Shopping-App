const express = require("express");
const {
  getAllProducts,
  getProductById
} = require("../controller/productController");

const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

module.exports = router;
