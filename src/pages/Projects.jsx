import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FaEllipsisV, FaEdit, FaFileAlt } from "react-icons/fa";
import EditProjectModal from "./EditProjectModal";
import CreateProjectModal from "./CreateProjectModal";
import { apiRequest, mapProjectFromApi, toProjectPayload } from "../lib/api";

const Projects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [vendorFilter, setVendorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viaFilter, setViaFilter] = useState("");

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await apiRequest("/api/projects?limit=100");
      setProjects((data.projects || []).map(mapProjectFromApi));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
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
    if (type === "inactive") return "bg-gray-100 text-gray-600";
    return "bg-gray-100 text-gray-600";
  };

  const handleToggle = async (id) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;

    try {
      const nextStatus = project.enabled ? "inactive" : "active";
      await apiRequest(`/api/projects/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });
      setProjects(projects.map((p) =>
        p.id === id
          ? {
              ...p,
              enabled: !p.enabled,
              status: nextStatus === "active" ? "Active" : "Deactive",
              badge: nextStatus === "active" ? "Verified" : "Inactive",
              badgeType: nextStatus === "active" ? "verified" : "inactive",
            }
          : p
      ));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateProject = async (updatedProject) => {
    await apiRequest(`/api/projects/${updatedProject.id}`, {
      method: "PUT",
      body: JSON.stringify(toProjectPayload(updatedProject)),
    });
    await fetchProjects();
    setEditModalOpen(false);
    setEditProject(null);
  };

  const handleCreateProject = async (project) => {
    await apiRequest("/api/projects", {
      method: "POST",
      body: JSON.stringify(toProjectPayload(project)),
    });
    await fetchProjects();
    setCreateModalOpen(false);
  };

  const openProjectReport = (projectId) => {
    navigate(`/project-report/${projectId}`);
  };

  const vendorOptions = useMemo(
    () => [...new Set(projects.map((project) => project.vendor))],
    [projects]
  );

  const viaOptions = ["Mail", "WhatsApp"];

  const statusOptions = useMemo(
    () => [...new Set(projects.map((project) => project.status))],
    [projects]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch = query
        ? [project.name, project.via, project.vendor, project.secret, project.badge]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(query))
        : true;
      const matchesVendor = vendorFilter ? project.vendor === vendorFilter : true;
      const matchesStatus = statusFilter ? project.status === statusFilter : true;
      const matchesVia = viaFilter ? project.via === viaFilter : true;

      return matchesSearch && matchesVendor && matchesStatus && matchesVia;
    });
  }, [projects, searchTerm, vendorFilter, statusFilter, viaFilter]);

  const resetFilters = () => {
    setSearchTerm("");
    setVendorFilter("");
    setStatusFilter("");
    setViaFilter("");
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
            className="px-3 py-2 border rounded-md w-full sm:w-50"
          />

          <select
            value={vendorFilter}
            onChange={(e) => setVendorFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white w-full sm:w-auto"
          >
            <option value="">Credentials</option>
            {vendorOptions.map((vendor) => (
              <option key={vendor} value={vendor}>
                {vendor}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white w-full sm:w-auto"
          >
            <option value="">Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <select
            value={viaFilter}
            onChange={(e) => setViaFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white w-full sm:w-auto"
          >
            <option value="">Email</option>
            {viaOptions.map((via) => (
              <option key={via} value={via}>
                {via}
              </option>
            ))}
          </select>

          <button
            className="px-3 py-2 border rounded-md bg-white w-full sm:w-auto"
            onClick={resetFilters}
            type="button"
          >
            Reset Filter
          </button>

          <button
            className="w-full sm:w-auto sm:ml-auto px-4 py-2 bg-[#232946] text-white rounded-md font-semibold"
            onClick={() => setCreateModalOpen(true)}
          >
            Add
          </button>
        </div>

        {loading && (
          <div className="bg-white rounded-xl shadow border p-6 text-sm text-gray-500">
            Loading projects...
          </div>
        )}

        {!loading && error && (
          <div className="bg-white rounded-xl shadow border p-6 text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && filteredProjects.length === 0 && (
          <div className="bg-white rounded-xl shadow border p-6 text-sm text-gray-500">
            No projects found.
          </div>
        )}

        {/* ✅ MOBILE + TABLET VIEW */}
        {!loading && !error && filteredProjects.length > 0 && (
        <div className="block lg:hidden space-y-3">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow border p-4">

              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-sm">{project.name}</div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-600">
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
                      <button
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm"
                        onClick={() => {
                          openProjectReport(project.id);
                          setActionMenu(null);
                        }}
                      >
                        <FaFileAlt /> Reports
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-xs text-gray-500 wrap-break-word mb-3">
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
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${badgeColor(project.badgeType)}`}>
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
        )}

        {/* ✅ DESKTOP TABLE */}
        {!loading && !error && filteredProjects.length > 0 && (
        <div className="hidden lg:block bg-white rounded-xl shadow border border-gray-200 overflow-x-auto max-w-full">
          <table className="min-w-225 w-full text-sm">
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
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-t hover:bg-gray-50">

                  <td className="p-3 whitespace-nowrap">
                    {project.name}
                    <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-600">
                      {project.status}
                    </span>
                  </td>

                  <td className="p-3 font-mono text-xs wrap-break-word max-w-55">
                    {project.secret}
                  </td>

                  <td className="p-3 whitespace-nowrap lowercase">{project.vendor}</td>
                  <td className="p-3 whitespace-nowrap">{project.via}</td>

                  <td className="p-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 text-[10px] rounded-full ${badgeColor(project.badgeType)}`}>
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
                            <button
                              className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-sm"
                              onClick={() => {
                                openProjectReport(project.id);
                                setActionMenu(null);
                              }}
                            >
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
        )}

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
          <CreateProjectModal
            onClose={() => setCreateModalOpen(false)}
            onCreate={handleCreateProject}
          />
        )}

      </div>
    </div>
  );
};

export default Projects;
