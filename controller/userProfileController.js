const { insertUserProfileAndSkills } = require("../module/Skill/userProfileModel");

const insertUserProfile = async (req, res) => {
  try {
    const { user_id, industry, skills, website_link, location, contact_number } = req.body;

    if (!user_id || !skills || !Array.isArray(skills)) {
      return res.status(400).json({ message: "Missing or invalid fields" });
    }

    await insertUserProfileAndSkills({
      user_id,
      industry,
      skills,
      website_link,
      location,
      contact_number,
    });

    res.status(200).json({ message: "Profile inserted successfully" });
  } catch (err) {
    console.error("Insert error (controller):", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { insertUserProfile };
