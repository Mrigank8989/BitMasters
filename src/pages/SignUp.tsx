import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-5xl font-light text-gray-800 mt-10 text-center">
        LearnLoop
      </h1>

      <div className="w-full max-w-sm mt-8 p-6 bg-white rounded-3xl shadow-md">
        <h2 className="text-2xl font-semibold mb-2 text-center">Create Account</h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Already have an account?{' '}
          <Link to="/signin" className="text-indigo-600 hover:underline font-medium">
            Sign In
          </Link>
        </p>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <label className="block text-sm font-bold text-gray-700 mt-3">
            Full Name
          </label>
          <div className="flex items-center border rounded mt-1 px-3 py-2 bg-white">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full outline-none text-gray-700 placeholder:text-gray-400 text-sm"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <label className="block text-sm font-bold text-gray-700 mt-4">
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

          {/* Password */}
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
              placeholder="********"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-6 bg-[#3A3AFF] text-white py-2 rounded hover:bg-[#2F2FFF] transition"
          >
            Create Account
          </button>
        </form>
      </div>

      {/* Success message */}
      {showSuccess && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md text-sm">
          Account created successfully!
        </div>
      )}
    </div>
  );
}
