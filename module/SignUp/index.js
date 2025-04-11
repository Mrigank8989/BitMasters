const config = require('../../config/db');
const sql = require('mssql');
const bcrypt = require('bcrypt');

// Get all users
const getAllUsers = async () => {
  try {
    let pool = await sql.connect(config);
    let Users = await pool.request().query("SELECT * FROM Users");
    return Users.recordset;
  } catch (error) {
    console.error('Error fetching all users:', error);
    return { success: false, message: "Failed to fetch users." };
  }
};

// Create a new student user
const createUser = async (name, email, password) => {
  try {
    console.log("Student Data Received:", name, email, password);

    let pool = await sql.connect(config);
    const role = 'student'; // <-- Now registering a student

    // Check if email already exists
    const emailCheck = await pool.request()
      .input('Email', sql.VarChar, email)
      .query('SELECT * FROM Users WHERE email = @Email');

    if (emailCheck.recordset.length > 0) {
      console.log("Email already exists");
      return { success: false, message: "Email already exists. Please use a different email." };
    }

    // Generate user_id like student001
    const result = await pool.request().query(`
      SELECT MAX(CAST(SUBSTRING(user_id, 8, LEN(user_id)) AS INT)) AS maxId
      FROM Users
      WHERE user_id LIKE 'student%'
    `);
    const maxId = result.recordset[0].maxId || 0;
    const newUserId = 'student' + (maxId + 1).toString().padStart(3, '0');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await pool.request()
      .input('UserId', sql.VarChar, newUserId)
      .input('Name', sql.VarChar, name)
      .input('Email', sql.VarChar, email)
      .input('Password', sql.VarChar, hashedPassword)
      .input('Role', sql.VarChar, role)
      .query(`
        INSERT INTO Users (user_id, name, email, password, role)
        VALUES (@UserId, @Name, @Email, @Password, @Role)
      `);

    console.log("Student successfully registered.");
    return { success: true, message: "Student registered successfully." };
  } catch (error) {
    console.error("Error inserting student:", error);
    return { success: false, message: "Failed to register student." };
  }
};

module.exports = {
  getAllUsers,
  createUser
};
