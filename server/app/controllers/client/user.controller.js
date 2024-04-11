const ReaderModel = require("../../models/readerModel");
const BorrowModel = require("../../models/borrowModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.register = async (req, res) => {
  const {
    email,
    first_name,
    last_name,
    password,
    password_confirm,
    phone,
    address,
    sex,
  } = req.body;

  // Kiểm tra xem tất cả các trường bắt buộc đã được điền
  if (
    !email ||
    !first_name ||
    !last_name ||
    !password ||
    !password_confirm ||
    !phone ||
    !address ||
    !sex
  ) {
    return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin." });
  }

  // Kiểm tra mật khẩu và xác nhận mật khẩu
  if (password !== password_confirm) {
    return res.status(400).json({ message: "Mật khẩu không khớp." });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPasswd = await bcrypt.hash(password, salt);
    const userExists = await ReaderModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists." });
    }
    const newUser = new ReaderModel({
      email,
      first_name,
      last_name,
      password: hashedPasswd,
      phone,
      address,
      sex,
    });

    const result = await newUser.save();
    const { passwd, ...data } = await result.toJSON();

    console.log(data);
    res.send(data);
  } catch (err) {
    console.error("Error registering user:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await ReaderModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Email not found." });
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match)
    return res.status(401).json({ message: "Email or password is incorrect" });
  //================================================================
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.KEY
  );
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.send({
    message: "succes",
  });
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });

  res.send({
    message: "success",
  });
};

exports.getUser = async (req, res) => {
  try {
    const cookies = req.cookies["jwt"];

    const claims = jwt.verify(cookies, process.env.KEY);

    if (!claims) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await ReaderModel.findOne({ _id: claims._id });
    console.log(user);
    const { password, ...data } = await user.toJSON();
    res.send(data);
  } catch (err) {
    return res.status(403).send({ message: "unauthorized", error: err });
  }
};

/// test
exports.checkBorrowStatus = async (req, res) => {
  try {
    const cookies = req.cookies["jwt"];

    const claims = jwt.verify(cookies, process.env.KEY);
    const userId = claims._id;
    console.log(userId);
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await ReaderModel.findById(userId);
    console.log(user);
    // Kiểm tra nếu người dùng đã mượn sách và chưa trả
    if (user.borrow.length > 0) {
      const borrowedBooks = user.borrow.filter(
        (book) => book.status === "pending"
      );
      if (borrowedBooks.length > 0) {
        // Người dùng đã mượn sách và chưa trả
        res.json({ borrowStatus: true, borrowedBooks });
      } else {
        // Người dùng đã mượn sách nhưng đã trả
        res.json({ borrowStatus: false });
      }
    } else {
      // Người dùng chưa mượn sách
      res.json({ borrowStatus: false });
    }
  } catch (error) {
    console.error("Error checking borrow status:", error);
    res.status(500).json({ error: "Error checking borrow status" });
  }
};

exports.borrow = async (req, res) => {
  try {
    const cookies = req.cookies["jwt"];
    const claims = jwt.verify(cookies, process.env.KEY);
    const userId = claims._id;
    const userBorrow = await BorrowModel.findOne({ userId: userId });
    console.log(JSON.stringify(claims));
  } catch (err) {}
};
