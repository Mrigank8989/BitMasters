const sql = require("mssql");
const config = require("../../config/db");

const searchUsers = async (searchTerm) => {
  try {
    const pool = await sql.connect(config);

    let query = `
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
    `;

    // Filter by name, role, or skill matching the search term
    if (searchTerm) {
      query += `
        WHERE 
          LOWER(u.name) LIKE LOWER(@searchTerm) OR
          LOWER(u.role) LIKE LOWER(@searchTerm) OR
          LOWER(s.skill_name) LIKE LOWER(@searchTerm)
      `;
    }

    const result = await pool.request()
      .input("searchTerm", sql.VarChar, `%${searchTerm}%`)
      .query(query);

    const rows = result.recordset;

    if (rows.length === 0) return null;

    const users = rows.map(row => ({
      user_id: row.user_id,
      name: row.name,
      email: row.email,
      role: row.role,
      location: row.location,
      website_link: row.website_link,
      contact_number: row.contact_number,
      bio: row.bio,
      industry: row.industry,
      skills: rows.filter(r => r.skill_name !== null).map(r => ({
        skill_name: r.skill_name,
        proficiency_level: r.proficiency_level,
        years_of_experience: r.years_of_experience,
      })),
    }));

    return users;

  } catch (err) {
    console.error("DB error (searchUsers):", err);
    throw err;
  }
};

module.exports = { searchUsers };
