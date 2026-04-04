import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fezapLogo from '../assets/fezap-logo.png';
import loginphoto from '../assets/illustration character login.png';
import { FaUser, FaLock } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa';



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
    <div className="login-2col-container">
      <div className="login-illustration">
        <img
          src={loginphoto}
          alt="Login Illustration"
          style={{ width: '100%', maxWidth: 420, objectFit: 'contain' }}
        />
      </div>
      <div className="login-form-col">
        <div className="login-form-card">
          <div style={{
            width: 110,
            height: 110,
            background: '#181818',
            borderRadius: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px auto',
            boxShadow: '0 4px 18px rgba(44,62,80,0.13)',
          }}>
            <img
              src={fezapLogo}
              alt="FEZAP Logo"
              style={{
                width: 82,
                height: 82,
                objectFit: 'contain',
                borderRadius: 16,
                background: 'transparent',
                display: 'block',
              }}
            />
          </div>
          <h2 className="login-title">Login</h2>
          <form className="login-form-modern" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-modern"
                autoComplete="username"
              />
              <span className="input-icon"><FaUser /></span>
            </div>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-modern"
                autoComplete="current-password"
              />
              <span className="input-icon"><FaLock /></span>
              <span className="input-icon input-eye" onClick={() => setShowPassword(s => !s)} style={{ cursor: 'pointer' }}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div style={{ textAlign: 'right', marginBottom: 18 }}>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>
            {error && <div className="login-error-modern">{error}</div>}
            <button type="submit" className="login-btn-modern">Login</button>
          </form>
          {/* <div className="login-bottom-text">
            Don't have account? <a href="#" className="signup-link">Get Started For Free</a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
