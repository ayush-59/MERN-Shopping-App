const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  imgUrl1: {
    type: String,
    required: false
  },
  imgUrl2: {
    type: String,
    required: false
  },
  imgUrl3: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false
  },
  reviews: {
    type: Number,
    required: false
  },
  countInStock: {
    type: Number,
    required: false
  }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
