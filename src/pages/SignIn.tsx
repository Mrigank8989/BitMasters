import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/SignIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setShowSuccess(true);

        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
        }

        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        setTimeout(() => {
          navigate("/projects");
        }, 2000);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleForgotClick = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-5xl font-light text-gray-800 mt-10 text-center">LearnLoop</h1>

      <div className="w-full max-w-sm mt-8 p-6 bg-white rounded-3xl shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-bold text-gray-700 mt-3">Email</label>
          <div className="flex items-center border rounded mt-1 px-3 py-2 bg-white">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none text-gray-700 placeholder:text-gray-400 text-sm"
              placeholder="example@email.com"
            />
          </div>

          <label className="block text-sm font-bold text-gray-700 mt-4">Password</label>
          <div className="flex items-center border rounded mt-1 px-3 py-2 bg-white">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none text-gray-700 placeholder:text-gray-400 text-sm"
              placeholder="*******"
            />
          </div>

          <div className="text-right mt-2">
            <button
              type="button"
              onClick={handleForgotClick}
              className="text-xs text-gray-700 hover:underline font-semibold"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#3A3AFF] text-white py-2 rounded hover:bg-[#2F2FFF] transition mt-4"
          >
            Confirm
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md text-sm">
          Login successful!
        </div>
      )}
    </div>
  );
};

export default SignIn;
