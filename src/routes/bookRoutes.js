const express = require("express");
const {
    createBook,
    getBooks,
    updateBook,
    getBooksByCategoryId,
} = require("../controllers/bookController");
const { protect, protectStaff } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect, protectStaff, createBook);
router.put("/update/:id", protect, protectStaff, updateBook);
router.get("/", getBooks);
router.get("/category/id/:categoryId", protect, protectStaff, getBooksByCategoryId);

module.exports = router;
