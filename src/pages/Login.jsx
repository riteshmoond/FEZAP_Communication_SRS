import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fezapLogo from '../assets/fezap-logo.png';
import loginphoto from '../assets/illustration character login.png';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    localStorage.setItem('userEmail', email);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Illustration */}
        <div className="flex justify-center">
          <img
            src={loginphoto}
            alt="Login Illustration"
            className="w-full max-w-md object-contain"
          />
        </div>

        {/* Form */}
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

            {/* Logo */}
            <div className="w-[110px] h-[110px] bg-[#181818] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
              <img
                src={fezapLogo}
                alt="FEZAP Logo"
                className="w-[82px] h-[82px] object-contain rounded-xl"
              />
            </div>

            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="username"
                  className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaUser />
                </span>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full px-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaLock />
                </span>

                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(s => !s)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {/* Forgot */}
              <div className="text-right">
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </div>

              {/* Error */}
              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Login
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;