import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FaEllipsisV, FaEdit, FaFileAlt } from "react-icons/fa";
import EditProjectModal from "./EditProjectModal";
import CreateProjectModal from "./CreateProjectModal";

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Angular 2026",
      secret: "5a8d85f6-577f-41bf-8a69-bdae60f29516",
      vendor: "aws",
      via: "Mail",
      status: "Active",
      badge: "Verified",
      badgeType: "verified",
      enabled: true,
    },
    {
      id: 2,
      name: "Summit 2026",
      secret: "f52adb55-3000-4bae-8d48-eb6e5a739bcc",
      vendor: "smtp",
      via: "Mail",
      status: "Active",
      badge: "Verify Webhook",
      badgeType: "webhook",
      enabled: true,
    },
    {
      id: 3,
      name: "Phoenix Cloud",
      secret: "91d5a670-9f8c-43a4-9fc7-2f6f8f36d301",
      vendor: "sendgrid",
      via: "Email",
      status: "Active",
      badge: "Verified",
      badgeType: "verified",
      enabled: true,
    },
    {
      id: 4,
      name: "Retail Sync",
      secret: "2b6d13f4-9e39-4f96-8e6f-b41d0fb3f11a",
      vendor: "aws",
      via: "SMS",
      status: "Active",
      badge: "Verify Webhook",
      badgeType: "webhook",
      enabled: false,
    },
    {
      id: 5,
      name: "Orbit Notify",
      secret: "7c33db25-1243-4cbb-9a0b-7d9b0fd5ae42",
      vendor: "mailgun",
      via: "Mail",
      status: "Active",
      badge: "Domain Linked",
      badgeType: "domain",
      enabled: true,
    },
    {
      id: 6,
      name: "Nova Outreach",
      secret: "dc1fa761-7d84-4d90-9dc2-d70afdd2bb15",
      vendor: "smtp",
      via: "Mail",
      status: "Active",
      badge: "Verified",
      badgeType: "verified",
      enabled: true,
    },
    {
      id: 7,
      name: "Astra Connect",
      secret: "fe38df45-b9b7-4f05-8677-0d2989b4d5c0",
      vendor: "postmark",
      via: "Email",
      status: "Active",
      badge: "Verify Webhook",
      badgeType: "webhook",
      enabled: false,
    },
    {
      id: 8,
      name: "Growth Pulse",
      secret: "68ad7e1a-4a1a-4f53-b73c-c82d315c6ee7",
      vendor: "aws",
      via: "SMS",
      status: "Active",
      badge: "Domain Linked",
      badgeType: "domain",
      enabled: true,
    },
    {
      id: 9,
      name: "Vertex Alerts",
      secret: "51cf23fa-e0d8-4dd9-af0e-3347efbfd27b",
      vendor: "smtp",
      via: "Mail",
      status: "Active",
      badge: "Verified",
      badgeType: "verified",
      enabled: true,
    },
    {
      id: 10,
      name: "Beacon Ops",
      secret: "83b116a3-67db-466c-a2a0-640a3031e6c5",
      vendor: "sendgrid",
      via: "Email",
      status: "Active",
      badge: "Verify Webhook",
      badgeType: "webhook",
      enabled: false,
    },
    {
      id: 11,
      name: "Nimbus Desk",
      secret: "aa9d4daa-5a1b-4924-a9bf-f50c6b4204e2",
      vendor: "mailgun",
      via: "Mail",
      status: "Active",
      badge: "Domain Linked",
      badgeType: "domain",
      enabled: true,
    },
    {
      id: 12,
      name: "Alpha Reach",
      secret: "c5eb4ef1-f0cb-4923-8234-d095d3ef7b9d",
      vendor: "postmark",
      via: "Email",
      status: "Active",
      badge: "Verified",
      badgeType: "verified",
      enabled: true,
    },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [actionMenu, setActionMenu] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (actionMenu !== null) {
      const handleClick = (e) => {
        // If click is outside any .action-menu or .action-menu-btn, close menu
        if (!e.target.closest(".action-menu") && !e.target.closest(".action-menu-btn")) {
          setActionMenu(null);
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [actionMenu]);

  const sidebarShouldBeOpen = isMobile ? sidebarOpen : true;

  const badgeColor = (type) => {
    if (type === "verified") return "bg-green-100 text-green-600";
    if (type === "webhook") return "bg-orange-100 text-orange-600";
    if (type === "domain") return "bg-blue-100 text-blue-600";
    return "bg-gray-100 text-gray-600";
  };

  const handleToggle = (id) => {
    setProjects(projects.map((p) =>
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === updatedProject.id ? { ...p, ...updatedProject } : p
      )
    );
    setEditModalOpen(false);
    setEditProject(null);
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-gray-100">

      <Sidebar open={sidebarShouldBeOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 p-3 sm:p-4 lg:p-8">

        {isMobile && (
          <button
            className="mb-4 p-2 bg-white rounded shadow"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            ☰
          </button>
        )}

        <h2 className="text-2xl font-bold mb-4">
          Ritesh Gupta - Project Lists
        </h2>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 items-stretch sm:items-center mb-4">
          <input
            placeholder="Search by name ,via ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-md w-full sm:w-[200px]"
          />

          <button className="px-3 py-2 border rounded-md bg-white w-full sm:w-auto">
            Credentials
          </button>
          <button className="px-3 py-2 border rounded-md bg-white w-full sm:w-auto">
            Status
          </button>
          <button className="px-3 py-2 border rounded-md bg-white w-full sm:w-auto">
            Email
          </button>
          <button className="px-3 py-2 border rounded-md bg-white w-full sm:w-auto">
            Reset Filter
          </button>

          <button
            className="w-full sm:w-auto sm:ml-auto px-4 py-2 bg-[#232946] text-white rounded-md font-semibold"
            onClick={() => setCreateModalOpen(true)}
          >
            Add
          </button>
        </div>

        {/* ✅ MOBILE + TABLET VIEW */}
        <div className="block lg:hidden space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow border p-4">

              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-sm">{project.name}</div>
                  <span className="text-[10px] px-2 py-[2px] rounded-full bg-green-100 text-green-600">
                    {project.status}
                  </span>
                </div>

                <div className="relative">
                  <button
                    className="action-menu-btn z-50 relative"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActionMenu(actionMenu === project.id ? null : project.id);
                    }}
                  >
                    <FaEllipsisV />
                  </button>

                  {actionMenu === project.id && (
                    <div className="action-menu absolute right-0 top-6 bg-white border rounded-lg shadow-md w-36 z-50">
                      <button
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => {
                          setEditProject(project);
                          setEditModalOpen(true);
                          setActionMenu(null);
                        }}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm">
                        <FaFileAlt /> Reports
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-xs text-gray-500 break-words mb-3">
                {project.secret}
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                <div>
                  <div className="text-gray-400">Vendor</div>
                  <div>{project.vendor}</div>
                </div>
                <div>
                  <div className="text-gray-400">Via</div>
                  <div>{project.via}</div>
                </div>
                <div>
                  <div className="text-gray-400">Status</div>
                  <span className={`px-2 py-[2px] rounded-full text-[10px] ${badgeColor(project.badgeType)}`}>
                    {project.badge}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Enable</span>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={project.enabled}
                    onChange={() => handleToggle(project.id)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-black"></div>
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ DESKTOP TABLE */}
        <div className="hidden lg:block bg-white rounded-xl shadow border border-gray-200 overflow-x-auto max-w-full">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 text-left whitespace-nowrap">Project</th>
                <th className="p-3 text-left whitespace-nowrap">Secret Key</th>
                <th className="p-3 text-left whitespace-nowrap">Vendor</th>
                <th className="p-3 text-left whitespace-nowrap">Via</th>
                <th className="p-3 text-left whitespace-nowrap">Status</th>
                <th className="p-3 text-left whitespace-nowrap">Action</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t hover:bg-gray-50">

                  <td className="p-3 whitespace-nowrap">
                    {project.name}
                    <span className="ml-2 text-[10px] px-2 py-[2px] rounded-full bg-green-100 text-green-600">
                      {project.status}
                    </span>
                  </td>

                  <td className="p-3 font-mono text-xs break-words max-w-[220px]">
                    {project.secret}
                  </td>

                  <td className="p-3 whitespace-nowrap lowercase">{project.vendor}</td>
                  <td className="p-3 whitespace-nowrap">{project.via}</td>

                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-[2px] text-[10px] rounded-full ${badgeColor(project.badgeType)}`}>
                      {project.badge}
                    </span>
                  </td>

                  <td className="p-3 whitespace-nowrap">
                    <div className="flex items-center gap-3 relative">

                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={project.enabled}
                          onChange={() => handleToggle(project.id)}
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-black"></div>
                        <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                      </label>

                      <div className="relative">
                        <button
                          className="action-menu-btn z-50 relative"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActionMenu(actionMenu === project.id ? null : project.id);
                          }}
                        >
                          <FaEllipsisV />
                        </button>

                        {actionMenu === project.id && (
                          <div className="action-menu absolute right-0 top-6 bg-white border rounded-lg shadow-md w-36 z-50">
                            <button
                              className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm"
                              onClick={() => {
                                setEditProject(project);
                                setEditModalOpen(true);
                                setActionMenu(null);
                              }}
                            >
                              <FaEdit /> Edit
                            </button>
                            <button className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm">
                              <FaFileAlt /> Reports
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {editModalOpen && editProject && (
          <EditProjectModal
            project={editProject}
            onClose={() => { setEditModalOpen(false); setEditProject(null); }}
            onUpdate={handleUpdateProject}
          />
        )}

        {/* Create Modal */}
        {createModalOpen && (
          <CreateProjectModal onClose={() => setCreateModalOpen(false)} />
        )}

      </div>
    </div>
  );
};

export default Projects;
