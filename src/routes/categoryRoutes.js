const express = require("express");
const {
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} = require("../controllers/categoryController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect, createCategory);
router.put("/update/:id", protect, updateCategory);
router.get("/", getCategory);

module.exports = router;
