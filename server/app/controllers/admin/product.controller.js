const Product = require("../../models/bookModel");
const Search = require("../../Helper/Search");

module.exports.index = async (req, res) => {
  //Search
  let search = Search(req.query);

  const searchObj = {
    deleted: false,
  };

  //Search
  if (req.query.name) {
    searchObj.name = search.regex;
  }
  // console.log("req.query.title", req.query.title);

  //filterStatus
  if (req.query.status) {
    searchObj.status = req.query.status;
  }

  //filterCate
  // if (req.query.category) {
  //   searchObj.category = req.query.category;
  // }

  //sort
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }

  const products = await Product.find(searchObj).sort(sort);
  res.send(products);
};

module.exports.create = async (req, res, next) => {
  let { name, author, price, stock, description, image, yearPublish } =
    req.body;

  if (
    !name ||
    !author ||
    !price ||
    !stock ||
    !description ||
    !image ||
    !yearPublish
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  price = parseInt(price);
  stock = parseInt(stock);

  // if (req.body.position === "" || isNaN(req.body.position)) {
  //   const countProducts = await Product.countDocuments();
  //   req.body.position = countProducts + 1;
  // } else {
  //   req.body.position = parseInt(req.body.position);
  // }

  if (req.body.priceNew === "" || isNaN(req.body.priceNew)) {
    req.body.priceNew = (
      (req.body.price * (100 - req.body.discountPercentage)) /
      100
    ).toFixed(0);
  }

  const product = new Product({
    name,
    author,
    price,
    stock,
    description,
    image,
    yearPublish,
  });
  await product.save();
  // console.log(name, author, price, stock, description, image, yearPublish);
  res.send(product);
};

module.exports.update = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    // req.body.position = parseInt(req.body.position);
    req.body.deleted = req.body.deleted;
    // req.body.priceNew =
    //   (req.body.priceNew * (100 - req.body.discountPercentage)) / 100;

    // console.log("new", req.body.priceNew);

    await Product.updateOne(
      {
        _id: id,
      },
      req.bodyres,
      res.send("Cap nhat thanh cong")
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.updateOne(
      {
        _id: id,
      },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );
    res.send("Xóa thành công!");
  } catch (error) {
    console.error(error);
  }
};

module.exports.changeStatus = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);

    if (product.status === "Hoạt động") {
      product.status = "Ngừng hoạt động";
    } else if (product.status === "Ngừng hoạt động") {
      product.status = "Hoạt động";
    }
    await product.save();
    res.send("Changstatus thành công!");
  } catch (error) {
    console.error(error);
  }
};
module.exports.editPrint = async (req, res, next) => {
  const id = req.params.id;
  console.log("chon san pham - ", id);

  const product = await Product.findOne({
    _id: id,
    deleted: false,
  });

  // console.log(product);
  res.send(product);
};
module.exports.detail = async (req, res) => {
  // try{
  const id = req.params.id;

  const product = await Product.find({
    _id: id,
    deleted: false,
  });

  res.send(product);
  console.log(product);
};
