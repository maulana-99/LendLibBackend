const express = require("express");
const { createBorrow, getBorrow } = require("../controllers/borrowController");
const { protect, protectStaff } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", protect, protectStaff, getBorrow);
router.post("/", protect, protectStaff, createBorrow);

module.exports = router;
