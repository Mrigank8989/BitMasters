const config = require('../../config/db');
const sql = require("mssql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require('dotenv').config();
const loginUser = async (email, password) => {
    try {
      const pool = await sql.connect(config);
  
      const userQuery = await pool.request()
        .input("email", sql.VarChar, email)
        .query(`
          SELECT 
              user_id,
              name,
              email,
              role,
              password
          FROM Users
          WHERE email = @email
        `);
  
      if (userQuery.recordset.length === 0) {
        return { success: false, message: "User not found." };
      }
  
      const user = userQuery.recordset[0];
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { success: false, message: "Invalid credentials." };
      }
  
      const validRoles = ["admin", "staff", "student"];
      if (!validRoles.includes(user.role?.toLowerCase())) {
        return { success: false, message: "Unauthorized role." };
      }
  
      return {
        success: true,
        message: "Login successful!",
        user: {
          user_id: user.user_id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      };
    } catch (error) {
      console.error("Error logging in user:", error);
      return { success: false, message: "Login failed.", error: error.message };
    }
  };

module.exports = {
    loginUser
};
