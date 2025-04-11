import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    navigate("/reset-password");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
      <form onSubmit={handleReset} className="w-full max-w-sm p-6 bg-white rounded-xl shadow">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Enter your email address
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm text-gray-700 mb-4"
          placeholder="example@email.com"
        />
        <button
          type="submit"
          className="w-full bg-[#3A3AFF] text-white py-2 rounded hover:bg-[#2F2FFF] transition"
        >
          confirm 
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
