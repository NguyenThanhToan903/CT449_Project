const UserModel = require("../../models/UserModel");

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
    // Kiểm tra xem email đã được sử dụng chưa
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng." });
    }

    // Tạo người dùng mới
    const newUser = new UserModel({
      email,
      first_name,
      last_name,
      password,
      phone,
      address,
      sex,
    });

    // Lưu người dùng vào cơ sở dữ liệu
    await newUser.save();

    // Trả về phản hồi thành công
    res.status(201).json({ message: "Đăng ký thành công." });
  } catch (error) {
    console.error("Đăng ký thất bại:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi đăng ký." });
  }
};
