const Product = require("../../models/bookModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.getProduct = async (req, res, next) => {
  const id = req.params.id;
  console.log("chon san pham - ", id);

  const product = await Product.findOne({
    _id: id,
    deleted: false,
  });

  console.log(product);
  res.send(product);
};
