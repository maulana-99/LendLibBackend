const express = require("express");
const {
  createStaff,
  getStaff,
  updateStaff,
} = require("../controllers/staffController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect, createStaff);
router.put("/update/:id", protect, updateStaff);
router.get("/", getStaff);

module.exports = router;
``;
