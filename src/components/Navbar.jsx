
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fezapLogo from '../assets/fezap-login-logo.jpeg';

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const userEmail = localStorage.getItem('userEmail') || 'guest@fezap.com';
  const userName = userEmail.split('@')[0]
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ') || 'Guest User';
  const userInitials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

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
     <nav className="w-full md:fixed md:top-0 md:left-0 md:right-0 bg-gray-200 text-[#232946] flex items-center justify-between px-6 h-16 shadow-md z-1000">
      <div className="flex items-center gap-5">
        <img src={fezapLogo} alt="FEZAP Logo" className="h-10 w-auto rounded-md object-cover "/>
        {/* <div className="hidden sm:block">
          <div className="text-sm font-semibold tracking-wide text-slate-800">FEZAP Communication</div>
          <div className="text-xs text-slate-500">Project notifications workspace</div>
        </div> */}
      </div>

      <div className="flex items-center" ref={menuRef}>
        <button
          className="group flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-2 shadow-sm transition hover:border-slate-300 hover:shadow-md focus:outline-none"
          onClick={() => setOpen((v) => !v)}
          aria-label="Profile menu"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#232946] text-sm font-bold text-white shadow-sm">
            {userInitials}
          </div>
          <svg
            className={`h-4 w-4 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {open && (
          <div className="fixed right-4 top-16 z-50 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white text-[#232946] shadow-2xl md:right-6">
            <div className="bg-gradient-to-r from-[#232946] to-slate-700 px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-base font-bold backdrop-blur-sm">
                  {userInitials}
                </div>
                <div className="min-w-0">   
                  <div className="truncate text-base font-semibold">{userName}</div>
                  <div className="truncate text-xs text-slate-200">{userEmail}</div>
                </div>
              </div>
            </div>

            <div className="px-3 py-3">
              <div className="mb-3 rounded-xl bg-slate-50 px-4 py-3">
                <div className="text-xs font-medium uppercase tracking-wide text-slate-400">Account</div>
                <div className="mt-1 text-sm font-semibold text-slate-700">Active Session</div>
                <div className="text-xs text-slate-500">You are signed in to manage projects and reports.</div>
              </div>

              <button className="mb-2 flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                <span>Profile</span>
                <span className="text-xs text-slate-400">View</span>
              </button>

              <button
                className="flex w-full items-center justify-between rounded-xl bg-rose-50 px-4 py-3 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
                onClick={async () => {
                  try {
                    await fetch("/api/auth/logout", {
                      method: "POST",
                      credentials: "include",
                      body: "",
                      redirect: "follow"
                    });
                  } catch (error) {
                    // Optionally handle error
                    console.log(error);
                    
                  }
                  localStorage.removeItem('userEmail');
                  navigate('/');
                }}
              >
                <span>Logout</span>
                <span className="text-xs text-rose-400">Exit</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
