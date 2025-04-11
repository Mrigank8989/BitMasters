const sql = require("mssql");
const config = require("../../config/db");

const insertUserProfileAndSkills = async ({
  user_id,
  industry,
  skills,
  website_link,
  location,
  contact_number,
}) => {
  try {
    const pool = await sql.connect(config);

    // Insert into Profile table
    await pool.request()
      .input("user_id", sql.VarChar, user_id)
      .input("industry", sql.VarChar, industry)
      .input("website_link", sql.VarChar, website_link)
      .input("location", sql.VarChar, location)
      .input("contact_number", sql.VarChar, contact_number)
      .query(`
        INSERT INTO Profile (user_id, industry, website_link, location, contact_number)
        VALUES (@user_id, @industry, @website_link, @location, @contact_number)
      `);

    // Insert skills one by one
    for (const skillName of skills) {
      await pool.request()
        .input("user_id", sql.VarChar, user_id)
        .input("skill_name", sql.VarChar, skillName)
        .query(`
          INSERT INTO Skill (user_id, skill_name)
          VALUES (@user_id, @skill_name)
        `);
    }

  } catch (err) {
    console.error("DB error (insertUserProfileAndSkills):", err);
    throw err;
  }
};

module.exports = {
  insertUserProfileAndSkills,
};
