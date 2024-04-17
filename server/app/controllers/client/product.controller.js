const Product = require("../../models/bookModel");
const BorrowedBook = require("../../models/borrowModel");
const Book = require("../../models/bookModel");
// const UserF = require("../../controllers/client/user.controller");
const User = require("../../models/readerModel");
const { ObjectId } = require("mongodb");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

module.exports.getProduct = async (req, res, next) => {
  const id = req.params.id;
  console.log("chon san pham - ", id);

  const product = await Product.findOne({
    _id: id,
    deleted: false,
  });

  // console.log(product);
  res.send(product);
};

module.exports.getAll = async (req, res, next) => {
  // const id = req.params.id;
  // console.log("chon san pham - ", id);

  const product = await Product.find({
    // _id: id,
    // deleted: false,
  });

  // console.log(product);
  res.send(product);
};

module.exports.borrowBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const { email } = req.body;
    const user = await User.findOne({ email });
    const book = await Book.findById(bookId);
    if (!book) {
      return res.json({ message: "User-Not-Found" });
    }
    if (!user) return res.json({ message: "Book-Not-Found" });

    if (book.stock <= 0) {
      return res.json({ message: "Stock" });
    }

    const borrowedBook = new BorrowedBook({
      bookId,
      userId: user._id,
      borrowedAt: new Date(),
      returnBy: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 tháng
    });

    book.stock -= 1;
    await book.save();
    await borrowedBook.save();
    console.log(borrowedBook);
    res.status(201).json({ message: "Borrow-Success" });
  } catch (error) {
    console.error("Lỗi khi mượn sách:", error);
    res.status(500).json({ message: "Đã có lỗi xảy ra khi mượn sách" });
  }
};
