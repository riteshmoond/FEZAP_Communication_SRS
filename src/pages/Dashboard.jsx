import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { apiRequest } from '../lib/api';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [userInfo, setUserInfo] = useState(null);
  const [summary, setSummary] = useState({
    totalEmails: 0,
    failedEmails: 0,
    activeProjects: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch user info from backend
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [userData, dashboardData] = await Promise.all([
          apiRequest("/api/auth/me"),
          apiRequest("/api/projects/dashboard/summary"),
        ]);
        setUserInfo(userData.user);
        setSummary(dashboardData.summary);
        setRecentActivity(dashboardData.recentActivity || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarShouldBeOpen = isMobile ? sidebarOpen : true;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar open={sidebarShouldBeOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 p-3 sm:p-4 lg:p-8">

        {/* Mobile Toggle */}
        {isMobile && (
          <button
            className="mb-4 rounded-lg bg-white p-2 shadow"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label="Open sidebar"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        )}

        {/* Title */}
        <h1 className="mb-4 text-2xl font-bold md:text-3xl">Dashboard</h1>

        {/* Welcome */}
        <div className="mb-6">
          <p className="text-gray-700">
            Welcome,{' '}
            <span className="font-semibold text-blue-600">
              {userInfo?.name || userInfo?.email || localStorage.getItem('userEmail') || 'User'}
            </span>{' '}
            ! You are now logged in.
          </p>
        </div>

        {/* Overview */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-5">Overview</h2>

          {/* Cards */}
          <div className="flex flex-wrap gap-6 mb-8">

            {/* Emails Sent */}
            <div className="flex-1 min-w-180px bg-[#232946] text-white rounded-xl p-6">
              <div className="text-3xl font-bold">{summary.totalEmails.toLocaleString()}</div>
              <div className="text-sm opacity-80">Total emails sent</div>
            </div>

            {/* Failed Emails */}
            <div className="flex-1 min-w-180px bg-[#ffd369] text-[#232946] rounded-xl p-6">
              <div className="text-3xl font-bold">{summary.failedEmails}</div>
              <div className="text-sm opacity-80">Failed emails</div>
            </div>

            {/* Active Projects */}
            <div className="flex-1 min-w-180px bg-white text-[#232946] rounded-xl p-6 shadow">
              <div className="text-3xl font-bold">{summary.activeProjects}</div>
              <div className="text-sm opacity-80">Active projects</div>
            </div>

          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-semibold text-lg mb-3">Recent activity</div>

            {loading ? (
              <div className="text-gray-500 text-sm">Loading activity...</div>
            ) : recentActivity.length > 0 ? (
              <ul className="text-gray-700 text-sm space-y-2">
                {recentActivity.map((activity) => (
                  <li key={activity.id || activity.createdAt}>{activity.message}</li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500 text-sm">No recent activity found.</div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;







