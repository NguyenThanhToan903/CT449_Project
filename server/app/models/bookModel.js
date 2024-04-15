const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priceNew: Number,
    discountPercentage: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    yearPublish: {
      type: Number,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const BookModel = mongoose.model("books", bookSchema, "books");

module.exports = BookModel;
