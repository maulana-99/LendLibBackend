const express = require("express");
const {
    createBook,
    getBooks,
    updateBook,
    getBooksByCategoryId,
} = require("../controllers/bookController");
const router = express.Router();

router.post("/create", createBook);
router.put("/update/:id", updateBook);
router.get("/", getBooks);
router.get("/category/id/:categoryId", getBooksByCategoryId);

module.exports = router;
