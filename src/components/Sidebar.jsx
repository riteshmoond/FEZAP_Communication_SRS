import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaProjectDiagram, FaTachometerAlt } from "react-icons/fa";

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
  ];

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white text-[#232946] z-50 shadow-lg md:shadow-none transform transition-transform duration-500 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Menu */}
        <div className="flex flex-col mt-4">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-5 py-3 text-sm rounded-lg transition-all duration-200
                ${isActive
                    ? "bg-[#232946] text-white font-semibold shadow"
                    : "hover:bg-gray-100"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;