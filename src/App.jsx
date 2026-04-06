import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Navbar from './components/Navbar';
import ProjectReport from './pages/ProjectReport';
import './App.css'


function RequireAuth({ children }) {
  const isLoggedIn = !!localStorage.getItem('userEmail');
  const location = useLocation();
  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}



const App = () => {
  const isLoggedIn = !!localStorage.getItem('userEmail');
  const location = useLocation();
  const isProjectReportRoute = location.pathname.startsWith('/project-report/');
  // Only show Navbar on protected routes
  const showNavbar = location.pathname !== '/' && (isLoggedIn || isProjectReportRoute);
  return (
    <>
      {showNavbar && <Navbar />}
      <div className={showNavbar ? 'md:pt-16' : ''}>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/projects" element={<RequireAuth><Projects /></RequireAuth>} />
          <Route path="/project-report/:projectId" element={<ProjectReport />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
