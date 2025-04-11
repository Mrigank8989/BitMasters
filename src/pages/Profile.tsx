import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";

const profileFields = [
  { id: "industry", label: "Industry" },
  { id: "skills", label: "Skills (comma-separated)" },
  { id: "website_link", label: "Website" },
  { id: "location", label: "Location" },
  { id: "contact_number", label: "Contact Details" },
];

const roleColors = {
  Mentor: "bg-purple-200 text-purple-800",
  Collaborator: "bg-green-200 text-green-800",
  Student: "bg-blue-200 text-blue-800",
};

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    industry: "",
    skills: "",
    website_link: "",
    location: "",
    contact_number: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.user_id;

        if (!userId) {
          console.warn("No user_id found in localStorage");
          return;
        }

        const res = await fetch(`http://localhost:5000/api/userProfile/${userId}`);
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    navigate("/signin");
  };

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.user_id;

      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }

      const body = {
        ...formData,
        user_id: userId,
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== ""),
      };

      const res = await fetch("http://localhost:5000/api/insertProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to insert profile");

      const updated = await res.json();

      // Refresh profile display (if needed, re-fetch the profile)
      const fetchRes = await fetch(`http://localhost:5000/api/userProfile/${userId}`);
      const freshData = await fetchRes.json();
      setProfile(freshData);

      setShowForm(false);
      setFormData({
        industry: "",
        skills: "",
        website_link: "",
        location: "",
        contact_number: "",
      });
    } catch (err) {
      console.error("Insert profile failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative font-poppins px-1">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-5 left-5 z-50 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>

      {/* Profile Content */}
      <div className="flex justify-center items-center h-full pt-20">
        <div className="relative w-full max-w-md bg-white p-6 rounded-xl shadow-md">
          {/* Role Tag & Add Button */}
          <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
            {profile?.role && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                  roleColors[profile.role] || "bg-gray-200 text-gray-600"
                }`}
              >
                {profile.role}
              </span>
            )}
            <button
              onClick={handleToggleForm}
              className="p-1 bg-blue-100 rounded-full hover:bg-blue-200 transition"
              title="Add/Edit Info"
            >
              <Plus className="w-4 h-4 text-blue-600" />
            </button>
          </div>

          {/* Profile Header */}
          <div className="flex flex-col items-center text-center mb-6 mt-2">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                profile?.name || "User"
              )}&background=random&color=fff&size=128`}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500"
            />
            <h2 className="text-lg font-semibold text-gray-800 mt-2">
              {profile?.name || "Loading..."}
            </h2>
            <p className="text-gray-500 text-sm">{profile?.email}</p>
          </div>

          {/* Form or Info Display */}
          {showForm ? (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {profileFields.map((field) => (
                <div key={field.id}>
                  <label className="text-sm text-gray-600 font-medium mb-1 block">
                    {field.label}
                  </label>
                  <input
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                    placeholder={field.label}
                    required
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full mt-2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
              >
                Save
              </button>
            </form>
          ) : (
            <div className="space-y-4 mt-4">
              {profileFields.map((field) => (
                <div key={field.id}>
                  <p className="text-sm text-gray-600 font-medium mb-1">
                    {field.label}
                  </p>
                  <div className="w-full px-3 py-2 bg-gray-100 rounded-md text-sm text-gray-800">
                    {field.id === "skills" ? (
                      Array.isArray(profile?.skills) && profile.skills.length > 0 ? (
                        profile.skills.map((skill, index) => (
                          <span key={index}>
                            {skill.skill_name || skill}
                            {index !== profile.skills.length - 1 ? ", " : ""}
                          </span>
                        ))
                      ) : (
                        "—"
                      )
                    ) : (
                      profile?.[field.id] || "—"
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Logout */}
          <div className="mt-8 text-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-full shadow hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
