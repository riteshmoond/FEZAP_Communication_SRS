
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';



const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sidebar is always open on desktop/tablet, toggled on mobile
  const sidebarShouldBeOpen = isMobile ? sidebarOpen : true;

  // Animated counters
  const [emailsSent, setEmailsSent] = useState(0);
  const [failedEmails, setFailedEmails] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);

  useEffect(() => {
    let sentTarget = 1250;
    let failedTarget = 23;
    let projectsTarget = 5;
    let sent = 0, failed = 0, projects = 0;
    const duration = 1200; // ms
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
    <div className="dashboard-container">
      <Sidebar open={sidebarShouldBeOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        {isMobile && (
          <button
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label="Open sidebar"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        )}
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="dashboard-welcome">
          <p>
            Welcome, <span className="dashboard-admin">{localStorage.getItem('userEmail') || 'User'}</span>! You are now logged in.
          </p>
        </div>
        <div className="dashboard-overview" style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 20 }}>Overview</h2>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
            <div style={{ background: '#232946', color: '#fff', borderRadius: 12, padding: 24, minWidth: 180, flex: 1 }}>
              <div style={{ fontSize: 32, fontWeight: 700 }}>{emailsSent.toLocaleString()}</div>
              <div style={{ fontSize: 16, opacity: 0.85 }}>Total emails sent</div>
            </div>
            <div style={{ background: '#ffd369', color: '#232946', borderRadius: 12, padding: 24, minWidth: 180, flex: 1 }}>
              <div style={{ fontSize: 32, fontWeight: 700 }}>{failedEmails}</div>
              <div style={{ fontSize: 16, opacity: 0.85 }}>Failed emails</div>
            </div>
            <div style={{ background: '#fff', color: '#232946', borderRadius: 12, padding: 24, minWidth: 180, flex: 1, boxShadow: '0 2px 12px rgba(44,62,80,0.07)' }}>
              <div style={{ fontSize: 32, fontWeight: 700 }}>{activeProjects}</div>
              <div style={{ fontSize: 16, opacity: 0.85 }}>Active projects</div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(44,62,80,0.07)', padding: 24 }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12 }}>Recent activity</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', color: '#232946', fontSize: 15 }}>
              <li style={{ marginBottom: 8 }}>• Email sent to <b>client1@example.com</b></li>
              <li style={{ marginBottom: 8 }}>• Project <b>Alpha</b> marked as active</li>
              <li style={{ marginBottom: 8 }}>• Failed to send email to <b>client2@example.com</b></li>
              <li>• New project <b>Beta</b> created</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
