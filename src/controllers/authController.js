const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Member = require("../models/Member");
const Staff = require("../models/Staff");

exports.registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log("Request body:", req.body);

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
};


exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Cari pengguna berdasarkan email
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Cari apakah pengguna terkait dengan Member atau Staff
    let role = null;
    let roleData = null;

    // Check for Member role
    const member = await Member.findOne({ user: user._id });
    if (member) {
      role = "member";
      roleData = member;
    }

    // Check for Staff role
    const staff = await Staff.findOne({ user: user._id });
    if (staff) {
      role = "staff";
      roleData = staff;
    }

    // Buat token JWT yang menyertakan email dan role
    const token = jwt.sign(
      { id: user._id, email: user.email, role, roleData },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRED_TOKEN }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role,
        roleData, // Data tambahan terkait dengan member atau staff
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.testUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

exports.getUserFromToken = (req, res) => {
  // Ambil token dari header Authorization
  const token = req.headers.authorization?.split(" ")[1];

  // Jika token tidak ada
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verifikasi dan decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kembalikan data yang ada di dalam token
    res.json({
      message: "Token successfully decoded",
      user: decoded, // Data pengguna dari token (misalnya id, email, dll)
    });
  } catch (error) {
    // Jika token tidak valid
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};