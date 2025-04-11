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

// Create user (SignUp)
const createUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const result = await createUser(name, email, password);

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
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  try {
    const result = await loginUser(email, password);

    if (!result.success) {
      return res.status(401).json({ success: false, message: result.message });
    }

    const user = result.user;

    const accessToken = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "15m" }
    );

    const refreshToken = jwt.sign(
      {
        user_id: user.user_id,
        email: user.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d" }
    );

    // 🍪 Set cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("✅ Access Token:", accessToken);
    console.log("✅ Refresh Token:", refreshToken);

    return res.status(200).json({
      success: true,
      message: "Login successful. New token created.",
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