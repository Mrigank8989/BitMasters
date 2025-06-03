const { getAllUsers, createUser } = require("../module/SignUp/index");
const { loginUser } = require("../module/LogIn/index");
const jwt = require("jsonwebtoken");


// Fetch all users
const fetchAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching all users" });
  }
};

// Create user (Sign Up)
const createUserController = async (req, res) => {
  try {
    const { username, full_name, password, is_admin } = req.body;

    // Validate required fields
    if (!username || !full_name || !password) {
      return res.status(400).json({
        message: "Username, full name, and password are required.",
      });
    }

    // Create user using model function
    const result = await createUser(
      username,
      full_name,
      password,
      is_admin || false // default false
    );

    if (result.success) {
      return res.status(201).json({ message: result.message });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Error creating user" });
  }
};

const SignIn = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required.",
    });
  }

  try {
    const result = await loginUser(username, password);

    if (!result.success) {
      return res.status(401).json({ success: false, message: result.message });
    }

    const user = result.user;

    const accessToken = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        is_admin: user.is_admin,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
    );

    const refreshToken = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d" }
    );

    // Set HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log(" Access Token:", accessToken);

    return res.status(200).json({
      success: true,
      message: "Login successful. Token created.",
      accessToken,
      user,
    });
  } catch (error) {
    console.error("Login Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};


module.exports = {
  fetchAllUsers,
  createUserController,
  SignIn,
};