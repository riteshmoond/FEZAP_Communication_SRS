import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fezapLogo from "../assets/fezap-login-logo.jpeg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok) {
      
      localStorage.setItem("token", result.token);

      
      navigate("/dashboard");
    } else {
      alert(result.message || "Login failed");
    }

  } catch (error) {
    alert("Login error: " + error.message);
  }
};

  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center px-4">

      {/* Card */}
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="rounded-lg px-4 py-3">
            <img
              src={fezapLogo}
              alt="FEZAP Logo"
              className="h-12 object-contain"
            />
          </div>
        </div>

        {/* Title */}
        {/* <h2 className="text-center text-lg font-semibold mb-6 text-gray-700">
          Login to your account
        </h2> */}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-500">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-gray-500">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 pr-10"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-2 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;