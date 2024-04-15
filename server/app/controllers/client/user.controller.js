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
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.send({
    message: "succes",
  });
};

exports.checkAuthentication = async (req, res) => {
  try {
    // Lấy token từ cookie
    const token = req.cookies["jwt"];
    if (!token) {
      return res.json({ authenticated: false, message: "Unauthorized" });
    }

    // Xác minh token
    const decodedToken = jwt.verify(token, process.env.KEY);
    if (!decodedToken) {
      return res.json({ authenticated: false, message: "Unauthorized" });
    }

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await ReaderModel.findById(decodedToken._id);
    if (!user) {
      return res.json({ authenticated: false, message: "User not found" });
    }

    // Trả về dữ liệu người dùng nếu muốn
    return res.json({ authenticated: true, user });
  } catch (err) {
    console.error("Error checking authentication:", err);
    return { authenticated: false, message: "Internal server error" };
  }
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.send({
    message: "Logout success",
  });
};

exports.findByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await ReaderModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error finding user by email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const token = req.cookies["jwt"];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.KEY);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await ReaderModel.findById(decodedToken._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userData } = user.toObject();
    res.json(userData);
  } catch (err) {
    console.error("Error getting user:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/// test
exports.checkBorrowStatus = async (req, res) => {
  try {
    const token = req.cookies["jwt"];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.KEY);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await ReaderModel.findById(decodedToken._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Logic kiểm tra trạng thái mượn sách
  } catch (error) {
    console.error("Error checking borrow status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.borrow = async (req, res) => {
  try {
    const token = req.cookies["jwt"];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.KEY);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = decodedToken._id;
    // Logic xử lý mượn sách
  } catch (error) {
    console.error("Error borrowing:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
