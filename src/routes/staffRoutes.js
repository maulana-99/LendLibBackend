const express = require("express");
const {
  createStaff,
  getStaff,
  updateStaff,
  getStaffById,
} = require("../controllers/staffController");
const { protect, protectStaff } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect, protectStaff, createStaff);
router.put("/update/:id", protect, protectStaff, updateStaff);
router.get("/", protect, protectStaff, getStaff);
router.get("/:id", protect, protectStaff, getStaffById);

module.exports = router;
