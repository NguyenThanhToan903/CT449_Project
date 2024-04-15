const Product = require("../../models/bookModel");
const ApiError = require("../../api-error");
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
  res.send(product);
  // res.json({ message: "success" });
};

module.exports.update = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    req.body.deleted = req.body.deleted;

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

  res.send(product);
};
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const product = await Product.find({
    _id: id,
    deleted: false,
  });
  res.send(product);
  console.log(product);
};

module.exports.getAll = async (req, res, next) => {
  try {
    const books = await Product.find({});
    res.json(books);
  } catch (error) {
    console.error("Error finding books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
