const Product = require("../../models/bookModel");
const BorrowedBook = require("../../models/borrowModel");
const Book = require("../../models/bookModel");
const dataDate = require("../../models/data");
const User = require("../../models/readerModel");
const { ObjectId } = require("mongodb");

module.exports.getProduct = async (req, res, next) => {
  const id = req.params.id;
  console.log("chon san pham - ", id);

  const product = await Product.findOne({
    _id: id,
    deleted: false,
  });

  res.send(product);
};

module.exports.getAll = async (req, res, next) => {
  const product = await Product.find({});
  res.send(product);
};

module.exports.checkBorrowBook = async (req, res, next) => {
  const bookId = req.params.id;
  const userId = req.body._id;
  console.log("checkBook", bookId, userId);
  const check = await BorrowedBook.findOne({
    bookId: bookId,
    status: { $ne: "cancelled" },
  });
  if (!check) return res.send({ message: "false" });
  if (check["userId"].toHexString() === userId) {
    const status = check["status"].toString();
    return res.send({ message: status });
  }
  return res.send({ message: "false" });
};

module.exports.borrowBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const { email } = req.body;
    // const { date } = req.body;
    console.log(bookId, email);
    const user = await User.findOne({ email });
    const book = await Book.findById(bookId);
    // const rangReturn = await dataDate.findOne({ name: date });
    // console.log("range: ", rangReturn);
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
      // borrowedAt: new Date(),
      // returnBy: new Date(Date.now() + rangReturn.timeBorrow), // 1 tháng, // 1 tháng
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

module.exports.borrowed = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const borrowedBooks = await BorrowedBook.find({ userId: userId });
    res.json(borrowedBooks);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sách đã mượn:", error);
    res
      .status(500)
      .json({ message: "Đã có lỗi xảy ra khi lấy danh sách sách đã mượn" });
  }
};

module.exports.cancelBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const userId = req.body;
    console.log(bookId, userId);
    const borrowedBook = await BorrowedBook.findOne({
      bookId,
      status: "pending",
    });
    if (!borrowedBook) {
      return res
        .status(404)
        .json({ message: "Borrowed book not found", book: bookId });
    }
    console.log(borrowedBook);
    if (borrowedBook.status === "returned") {
      return res.status(400).json({ message: "Book already returned" });
    }

    borrowedBook.status = "cancelled";

    await borrowedBook.save();
    res.status(200).json({ message: "Book borrow cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling book borrow:", error);
    res.status(500).json({ message: "Error cancelling book borrow" });
  }
};

module.exports.deleteBorrow = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const userId = req.body;
    console.log(bookId, userId);
    const borrowedBook = await BorrowedBook.findOne({
      bookId,
      userId: userId.userId,
      status: userId.status,
    });
    if (!borrowedBook) {
      return res.json({ message: "Borrowed book not found", book: bookId });
    }

    borrowedBook.status = "0";

    await borrowedBook.save();
    res.status(200).json({ message: "Book borrow cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling book borrow:", error);
    res.status(500).json({ message: "Error cancelling book borrow" });
  }
};

module.exports.returnBook = async (req, res, next) => {
  try {
    const bookId = req.body.bookId;
    const userId = req.body.userId;
    console.log(bookId, userId);
    const borrowedBook = await BorrowedBook.findOne({
      bookId,
      userId,
      status: "borrowing",
    });
    if (!borrowedBook) {
      return res
        .status(404)
        .json({ message: "Borrowed book not found", book: bookId });
    }
    console.log(borrowedBook);
    if (borrowedBook.status === "returned") {
      return res.status(400).json({ message: "Book already returned" });
    }

    borrowedBook.status = "returned";
    borrowedBook.returnedAt = new Date();
    borrowedBook.quatity += 1;

    await borrowedBook.save();
    res.status(200).json({ message: "Book borrow cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling book borrow:", error);
    res.status(500).json({ message: "Error cancelling book borrow" });
  }
};

module.exports.checkBorrowStatus = async (req, res, next) => {
  const userId = req.body.userId;
  const productId = req.body.bookId;
  // console.log("userId check:", userId, productId);
  try {
    const borrow = await BorrowedBook.findOne({
      bookId: productId,
      userId: userId,
    });
    if (!borrow) {
      return res.json({ borrowed: false });
    }
    if (borrow.status === "pending") {
      res.json({ borrowed: "pending" });
    } else if (borrow.status === "borrowing") {
      res.json({ borrowed: "borrowing" });
    } else if (borrow.status === "returned") {
      res.json({ borrowed: "returned" });
    } else if (borrow.status === "cancelled") {
      res.json({ borrowed: "cancelled" });
    } else {
      res.json({ borrowed: "0" });
    }
  } catch (error) {
    console.error("Error checking borrow status:", error);
    next(new ApiError("Error checking borrow status", 500));
  }
};
