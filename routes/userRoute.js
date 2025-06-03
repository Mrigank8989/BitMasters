const express = require('express');
const router = express.Router();

const { fetchAllUsers, createUserController, SignIn } = require("../controller/authController");
const { addQuestion } = require('../controller/questionController');

// ─── Authentication Routes ──────────────────────────────────────────────
router.get('/getAllUsers', fetchAllUsers);                  // Get all users
router.post('/SignUp', createUserController);               // Admin Sign Up
router.post('/SignIn', SignIn);                             // Sign In

router.post('/add-question', addQuestion);

module.exports = router;
