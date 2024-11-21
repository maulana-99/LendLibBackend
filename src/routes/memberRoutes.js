const express = require('express');
const { createMember, getMember, updateMember } = require('../controllers/memberController');
const { protect, } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', protect, createMember);
router.put('/update/:id', protect, updateMember);
router.get('/', getMember);

module.exports = router;
