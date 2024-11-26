const express = require("express");
const { createReturn, getReturned } = require("../controllers/returnController");
const { protect, protectStaff } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", protect, protectStaff, createReturn);
router.get("/", protect, protectStaff, getReturned);
module.exports = router;
