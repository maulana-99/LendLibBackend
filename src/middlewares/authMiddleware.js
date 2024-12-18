const jwt = require("jsonwebtoken");
const Staff = require("../models/Staff");

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ message: "Token expired" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

const protectStaff = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const staff = await Staff.findOne({ user: req.user.id });

    if (!staff) {
      return res.status(403).json({ message: "Access denied, not a Staff" });
    }

    req.staff = staff;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { protect, protectStaff };
