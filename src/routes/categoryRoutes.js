const express = require("express");
const {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryById,
  updateCategory,
} = require("../controllers/categoryController");
const { protect, protectStaff } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect, protectStaff, createCategory);
router.put("/update/:id", protect, protectStaff, updateCategory);
router.get("/", getCategory);
router.get("/:id", getCategoryById);
router.delete("/:id", protect, protectStaff, deleteCategory);

module.exports = router;
