const express = require("express");
const {
    createBook,
    getBooks,
    updateBook,
    getBooksByCategoryId,
} = require("../controllers/bookController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect, createBook);
router.put("/update/:id", protect, updateBook);
router.get("/", getBooks);
router.get("/category/id/:categoryId", getBooksByCategoryId);

module.exports = router;
