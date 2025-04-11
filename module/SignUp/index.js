const config = require('../../config/db');
const sql = require('mssql');
const bcrypt = require('bcrypt');

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

const createUser = async (name, email, password) => {
  try {
    console.log("Admin Data Received:", name, email, password);

    let pool = await sql.connect(config);
    const role = 'admin';

    // Check if email already exists
    const emailCheck = await pool.request()
      .input('Email', sql.VarChar, email)
      .query('SELECT * FROM Users WHERE email = @Email');

    if (emailCheck.recordset.length > 0) {
      console.log("Email already exists");
      return { success: false, message: "Email already exists. Please use a different email." };
    }

    // Generate user_id like admin001
    const result = await pool.request().query(`
      SELECT MAX(CAST(SUBSTRING(user_id, 6, LEN(user_id)) AS INT)) AS maxId
      FROM Users
      WHERE user_id LIKE 'admin%'
    `);
    const maxId = result.recordset[0].maxId || 0;
    const newUserId = 'admin' + (maxId + 1).toString().padStart(3, '0');

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

    console.log("Admin successfully added.");
    return { success: true, message: "Admin registered successfully." };
  } catch (error) {
    console.error("Error inserting admin:", error);
    return { success: false, message: "Failed to register admin." };
  }
};

module.exports = {
  getAllUsers,
  createUser
};
