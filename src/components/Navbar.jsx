
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fezapLogo from '../assets/fezap-login-logo.jpeg';

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <nav className="w-full md:fixed md:top-0 md:left-0 md:right-0 bg-gray-200 text-[#232946] flex items-center justify-between px-6 h-16 shadow-md z-[1000]">
      <img src={fezapLogo} alt="FEZAP Logo" className="h-10" />
      <div className="flex items-center" ref={menuRef}>
        {/* Profile Icon (SVG) with arrow */}
        <button
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md focus:outline-none relative group"
          onClick={() => setOpen((v) => !v)}
          aria-label="Profile menu"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#232946"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
          </svg>
          <svg className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white group-hover:text-gray-200 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        {open && (
          <div className="fixed right-6 top-16 w-56 bg-white text-[#232946] rounded-xl shadow-2xl py-3 z-50 border border-gray-100 transition-all duration-200 ease-out">
            <div className="flex items-center gap-3 px-5 pb-3 border-b border-gray-100 mb-2">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#232946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-7 8-7s8 3 8 7" /></svg>
              </div>
              <div>
                <div className="font-semibold">User Name</div>
                <div className="text-xs text-gray-500">user@email.com</div>
              </div>
            </div>
            <button className="w-full text-left px-5 py-2 hover:bg-gray-50 transition rounded-none">Profile</button>
            <button
              className="w-full text-left px-5 py-2 hover:bg-gray-50 transition rounded-none"
              onClick={() => {
                localStorage.removeItem('userEmail');
                navigate('/');
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
