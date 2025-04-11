import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setShowSuccess(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  const handleForgotClick = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-5xl font-light text-gray-800 mt-10 text-center">
        LearnLoop
      </h1>

      <div className="w-full max-w-sm mt-8 p-6 bg-white rounded-3xl shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Sign In</h2>
      
        <form onSubmit={handleSubmit}>

          <label className="block text-sm font-bold text-gray-700 mt-3">
            Email
          </label>
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

          <label className="block text-sm font-bold text-gray-700 mt-4">
            Password
          </label>
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
          className="w-full bg-[#3A3AFF] text-white py-2 rounded hover:bg-[#2F2FFF] transition"
        >
          confirm 
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
