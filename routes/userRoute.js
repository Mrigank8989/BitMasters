const express = require('express');
const router = express.Router();

const { fetchAllUsers, createUserController, SignIn } = require("../controller/authController");
const {  getUserSkills } = require('../controller/skillController');
const{insertUserProfile}=require("../controller/userProfileController");
// const { SearchController } = require('../controller/SearchController');
// const { searchMiddleware } = require('../module/search/searchMiddleware');

// ─── Authentication Routes ──────────────────────────────────────────────
router.get('/getAllUsers', fetchAllUsers);                  // Get all users
router.post('/SignUp', createUserController);               // Admin Sign Up
router.post('/SignIn', SignIn);                             // Sign In

// ─── Skill Routes ───────────────────────────────────────────────────────
router.get("/userProfile/:user_id", getUserSkills);

router.post('/insertProfile',insertUserProfile);

// router.get('/search', searchMiddleware, SearchController);



module.exports = router;
