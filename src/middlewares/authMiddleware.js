const jwt = require('jsonwebtoken');
const Staff = require('../models/Staff');

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

const protectStaff = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const staff = await Staff.findOne({ user: req.user.id });

    if (!staff) {
      return res.status(403).json({ message: 'Access denied, not a Staff' });
    }

    req.staff = staff;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { protect, protectStaff };
