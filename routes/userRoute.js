const express = require('express');
const router = express.Router();

const { fetchAllUsers, createUserController, SignIn } = require("../controller/authController");

router.get('/getAllUsers', fetchAllUsers);                  // Get all users
router.post('/createAdminSignUp', createUserController);    // Admin Sign Up
router.post('/SignIn', SignIn);                             // Sign In


module.exports = router;
