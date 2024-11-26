const express = require("express");
const {
  registerUser,
  loginUser,
  testUsers,
  getUserById,
  getUserFromToken
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", testUsers);
router.get("/:id", getUserById);
router.get("/test/token", getUserFromToken);

module.exports = router;
