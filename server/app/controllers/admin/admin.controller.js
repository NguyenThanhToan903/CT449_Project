const AdminModel = require("../../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.register = async (req, res) => {
  const {
    email,
    first_name,
    last_name,
    position,
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
    !position ||
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
    const adminExists = await AdminModel.findOne({ email });
    if (adminExists) {
      return res
        .status(400)
        .json({ message: "Email already exists.", user: adminExists });
    }
    const newAdmin = new AdminModel({
      email,
      first_name,
      last_name,
      position,
      password: hashedPasswd,
      phone,
      address,
      sex,
    });

    const result = await newAdmin.save();
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
  const admin = await AdminModel.findOne({ email });
  if (!admin) {
    return res.status(400).json({ message: "Email not found." });
  }
  const match = await bcrypt.compare(password, admin.password);

  if (!match)
    return res
      .status(401)
      .json({ message: "Email or password is incorrect", user: admin });
  //================================================================
  const token = jwt.sign(
    {
      _id: admin._id,
    },
    process.env.KEY
  );
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.send({
    message: "succes",
    user: admin,
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

exports.getAdmin = async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];
    console.log(cookie);
    const claim = jwt.verify(cookie, process.env.KEY);
    if (!claim) {
      return res.status(401).send({
        message: "unauthenticated",
      });
    }
    const admin = await AdminModel.findOne({
      _id: claim._id,
    });
    const { passwd, ...data } = await admin.toJSON();
    console.log(JSON.stringify(data));
    res.send(data);
  } catch (error) {
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
};

exports.accountManagement = async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];
    const claim = jwt.verify(cookie, process.env.KEY);
    if (!claim) {
      return res.status(401).send({
        message: "unauthenticated",
      });
    }
    // Kiểm tra xem người dùng có quyền truy cập thông tin tất cả người dùng hay không
    // if (!claim.isAdmin) {
    //     return res.status(403).send({
    //         message: 'unauthorized'
    //     });
    // }
    // Nếu có quyền truy cập, lấy thông tin tất cả người dùng
    const user = await AdminModel.find({}, "-passwd"); // Lấy tất cả người dùng, loại bỏ trường 'passwd'
    res.send(user);
  } catch (error) {
    return res.status(401).send({
      message: "unauthenticated",
    });
  }
};
