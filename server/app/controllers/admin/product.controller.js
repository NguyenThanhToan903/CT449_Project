const Product = require("../../models/bookModel");
const ApiError = require("../../api-error");
const Date = require("../../models/data");
const Borrow = require("../../models/borrowModel");

module.exports.create = async (req, res, next) => {
  try {
    const {
      title,
      author,
      stock,
      price,
      description,
      priceNew,
      discountPercentage,
      image,
      namePublish,
      addressPublish,
      yearPublish,
    } = req.body;

    if (
      !title ||
      !author ||
      !stock ||
      !price ||
      !description ||
      !image ||
      !namePublish ||
      !addressPublish ||
      !yearPublish
    ) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const parsedPrice = parseInt(price);
    const parsedStock = parseInt(stock);

    let calculatedPriceNew = priceNew;
    if (!calculatedPriceNew || isNaN(calculatedPriceNew)) {
      calculatedPriceNew = (
        (parsedPrice * (100 - discountPercentage)) /
        100
      ).toFixed(0);
    }
    console.log(calculatedPriceNew);

    const book = new Product({
      title,
      author,
      stock: parsedStock,
      price: parsedPrice,
      description,
      priceNew: calculatedPriceNew,
      discountPercentage,
      image,
      namePublish,
      addressPublish,
      yearPublish,
    });

    await book.save();

    res.status(201).json({ success: true, book });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// module.exports.createDayBorrow = async (req, res, next) => {
//   const time = req.body;
//   console.log(time);
//   const rangeTime = new Date({
//     name: time.name,
//     timeBorrow: time.rangeTime,
//   });
//   await rangeTime.save();
//   res.status(201).json(rangeTime);
// };

// module.exports.update = async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     req.body.discountPercentage = parseInt(req.body.discountPercentage);
//     req.body.stock = parseInt(req.body.stock);

//     req.body.deleted = req.body.deleted;

//     await Product.updateOne(
//       {
//         _id: id,
//       },
//       req.bodyres,
//       res.send("Cap nhat thanh cong")
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

module.exports.delete = async (req, res) => {
  const id = req.body.id;
  console.log(req.body.id);
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

module.exports.getBorrow = async (req, res, next) => {
  console.log("getBorrow");
  const { type } = req.body;
  console.log("type: " + type);
  let borrows = null;
  if (type === "all") borrows = await Borrow.find({});
  else borrows = await Borrow.find({ status: type });
  console.log("borrows");
  res.json(borrows);
};

module.exports.editProduct = async (req, res, next) => {
  const id = req.params.id;

  try {
    const {
      title,
      author,
      stock,
      price,
      description,
      priceNew,
      discountPercentage,
      image,
      namePublish,
      addressPublish,
      yearPublish,
    } = req.body;

    if (
      !title ||
      !author ||
      !stock ||
      !price ||
      !description ||
      !image ||
      !namePublish ||
      !addressPublish ||
      !yearPublish
    ) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const parsedPrice = parseInt(price);
    const parsedStock = parseInt(stock);

    let calculatedPriceNew = priceNew;
    if (!calculatedPriceNew || isNaN(calculatedPriceNew)) {
      calculatedPriceNew = (
        (parsedPrice * (100 - discountPercentage)) /
        100
      ).toFixed(0);
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.title = title;
    product.author = author;
    product.stock = parsedStock;
    product.price = parsedPrice;
    product.description = description;
    product.priceNew = calculatedPriceNew;
    product.discountPercentage = discountPercentage;
    product.image = image;
    product.namePublish = namePublish;
    product.addressPublish = addressPublish;
    product.yearPublish = yearPublish;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error("Error editing product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.confirm = async (req, res, next) => {
  // try {
  const { bookId, userId } = req.body;
  console.log(bookId, userId);
  data = {
    bookId: bookId,
    userId: userId,
  };
  console.log(data);
  const borrow = await Borrow.findOne(data);
  console.log(borrow);
  if (!borrow) {
    return res.status(404).json({ message: "Borrow record not found" });
  }

  borrow.status = "borrowing";

  await borrow.save();
  console.log(borrow);
  res.status(200).json(borrow);
};
