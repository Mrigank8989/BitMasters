const { getUserProfileWithSkills } = require("../module/Skill");

const getUserSkills = async (req, res) => {
  const { user_id } = req.params;
  try {
    const userData = await getUserProfileWithSkills(user_id);
    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(userData);
  } catch (error) {
    console.error("Error in getUserSkills:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { getUserSkills };
