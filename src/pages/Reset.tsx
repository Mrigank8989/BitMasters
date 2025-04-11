import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-3xl font-bold mb-6">Reset Your Password</h1>
      <form onSubmit={handleResetPassword} className="w-full max-w-sm p-6 bg-white rounded-xl shadow">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          New Password
        </label>
        <input
          type="password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm text-gray-700 mb-4"
          placeholder="Enter new password"
        />

        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm text-gray-700 mb-4"
          placeholder="Confirm your password"
        />

        <button
          type="submit"
          className="w-full bg-[#3A3AFF] text-white py-2 rounded hover:bg-[#2F2FFF] transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
