const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  registerSchema,
  loginSchema,
} = require("../validations/authValidation");
const { v4: uuidv4 } = require("uuid");

exports.register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: 400, data: { message: error.details[0].message } });

  const { fullName, email, phone, password, isBusiness } = req.body;

  try {
    var existingUser = await db("users").where({ email }).first();
    if (existingUser)
      return res
        .status(400)
        .json({ status: 400, data: { message: "Email đã tồn tại" } });

    existingUser = await db("users").where({ phone }).first();
    if (existingUser)
      return res
        .status(400)
        .json({ status: 400, data: { message: "Số điện thoại đã tồn tại" } });

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();
    await db("users").insert({
      id: id,
      name: fullName,
      email,
      password: hashedPassword,
      phone,
      role_id: isBusiness ? 2 : 1,
    });
    res
      .status(201)
      .json({ status: 201, data: { message: "Đăng ký thành công", id } });
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, data: { message: "Lỗi server", error: err } });
  }
};

exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: 400, data: { message: error.details[0].message } });

  const { emailOrPhoneNumber, password } = req.body;

  try {
    const user = await db("users")
      .where({ email: emailOrPhoneNumber })
      .orWhere({ phone: emailOrPhoneNumber })
      .first();
    if (!user)
      return res.status(400).json({
        status: 400,
        data: { message: "Email hoặc số điện thoại không tồn tại" },
      });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(400).json({
        status: 400,
        data: {
          message: "Sai mật khẩu",
        },
      });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({
      status: 200,
      data: {
        message: "Đăng nhập thành công",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avt: user.avt,
          country: user.country,
          address: user.address,
          phone: user.phone,
          birthday: user.birthday,
          role: user.role,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      data: {
        message: "Lỗi server",
        error: err,
      },
    });
  }
};
