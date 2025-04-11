const sql = require("mssql");
const config = require("../../config/db");

const getUserProfileWithSkills = async (user_id) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input("user_id", sql.VarChar, user_id)
      .query(`
        SELECT 
          u.user_id,
          u.name,
          u.email,
          u.role,
          p.location,
          p.website_link,
          p.contact_number,
          p.bio,
          p.industry, 
          s.skill_name,
          s.proficiency_level,
          s.years_of_experience
        FROM Users u
        LEFT JOIN Profile p ON u.user_id = p.user_id
        LEFT JOIN Skill s ON u.user_id = s.user_id
        WHERE u.user_id = @user_id
      `);

    const rows = result.recordset;

    if (rows.length === 0) return null;

    const user = {
      user_id: rows[0].user_id,
      name: rows[0].name,
      email: rows[0].email,
      role: rows[0].role,
      location: rows[0].location,
      website_link: rows[0].website_link,
      contact_number: rows[0].contact_number,
      bio: rows[0].bio,
      industry: rows[0].industry, // ✅ Added to response object
      skills: rows
        .filter(row => row.skill_name !== null)
        .map(row => ({
          skill_name: row.skill_name,
          proficiency_level: row.proficiency_level,
          years_of_experience: row.years_of_experience,
        })),
    };

    return user;

  } catch (err) {
    console.error("DB error (getUserProfileWithSkills):", err);
    throw err;
  }
};

module.exports = { getUserProfileWithSkills };
