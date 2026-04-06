import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarShouldBeOpen = isMobile ? sidebarOpen : true;

  const [emailsSent, setEmailsSent] = useState(0);
  const [failedEmails, setFailedEmails] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);

  useEffect(() => {
    let sentTarget = 1250;
    let failedTarget = 23;
    let projectsTarget = 5;
    let sent = 0, failed = 0, projects = 0;
    const duration = 1200;
    const steps = 40;
    const sentStep = Math.ceil(sentTarget / steps);
    const failedStep = Math.ceil(failedTarget / steps);
    const projectsStep = Math.ceil(projectsTarget / steps);
    let count = 0;

    const interval = setInterval(() => {
      count++;
      sent = Math.min(sent + sentStep, sentTarget);
      failed = Math.min(failed + failedStep, failedTarget);
      projects = Math.min(projects + projectsStep, projectsTarget);

      setEmailsSent(sent);
      setFailedEmails(failed);
      setActiveProjects(projects);

      if (count >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

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
            Welcome,{" "}
            <span className="font-semibold text-blue-600">
              {localStorage.getItem('userEmail') || 'User'}
            </span>{" "}
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
              <div className="text-3xl font-bold">{emailsSent.toLocaleString()}</div>
              <div className="text-sm opacity-80">Total emails sent</div>
            </div>

            {/* Failed Emails */}
            <div className="flex-1 min-w-180px bg-[#ffd369] text-[#232946] rounded-xl p-6">
              <div className="text-3xl font-bold">{failedEmails}</div>
              <div className="text-sm opacity-80">Failed emails</div>
            </div>

            {/* Active Projects */}
            <div className="flex-1 min-w-180px bg-white text-[#232946] rounded-xl p-6 shadow">
              <div className="text-3xl font-bold">{activeProjects}</div>
              <div className="text-sm opacity-80">Active projects</div>
            </div>

          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-semibold text-lg mb-3">Recent activity</div>

            <ul className="text-gray-700 text-sm space-y-2">
              <li>• Email sent to <b>client1@example.com</b></li>
              <li>• Project <b>Alpha</b> marked as active</li>
              <li>• Failed to send email to <b>client2@example.com</b></li>
              <li>• New project <b>Beta</b> created</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
