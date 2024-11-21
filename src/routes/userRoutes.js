const express = require('express');
const { registerUser, loginUser, testUsers } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', testUsers);

module.exports = router;
