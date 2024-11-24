const express = require("express");
const {
  createMember,
  getMember,
  updateMember,
} = require("../controllers/memberController");
const { protect, protectStaff } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect, protectStaff, createMember);
router.put("/update/:id", protect, protectStaff, updateMember);
router.get("/", protect, getMember);

module.exports = router;
