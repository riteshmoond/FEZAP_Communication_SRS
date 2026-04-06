import { useState, useEffect } from "react";
import CreateProjectModal from "./CreateProjectModal";
import Sidebar from "../components/Sidebar";
import { FaEllipsisV, FaEdit, FaFileAlt } from 'react-icons/fa';

const Projects = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("");
    const [showCreateModal, setShowCreateModal] = useState(false);

    const [projects, setProjects] = useState([/* SAME DATA */]);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    const [actionMenu, setActionMenu] = useState(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sidebarShouldBeOpen = isMobile ? sidebarOpen : true;

    const badgeColor = (type) => {
        if (type === 'success') return "bg-green-100 text-green-600";
        if (type === 'warning') return "bg-yellow-100 text-yellow-600";
        if (type === 'danger') return "bg-red-100 text-red-600";
        return "bg-gray-100 text-gray-700";
    };

    const filteredProjects = projects.filter((p) => {
        let matches = true;
        if (searchTerm.trim()) {
            matches =
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (p.via && p.via.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if (filter === "Credentials") matches = matches && p.vendor === "aws";
        else if (filter === "Status") matches = matches && p.status === "Active";
        else if (filter === "Email") matches = matches && p.via === "Mail";

        return matches;
    });

    const [page, setPage] = useState(1);
    const pageSize = 20;
    const totalPages = Math.ceil(filteredProjects.length / pageSize);
    const paginatedProjects = filteredProjects.slice((page - 1) * pageSize, page * pageSize);

    const handleToggle = (id) => {
        setProjects(projects.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Sidebar overlays on mobile, static on md+ */}
            <div className="md:block">
                <Sidebar open={sidebarShouldBeOpen} onClose={() => setSidebarOpen(false)} />
            </div>

            <div className="flex-1 p-2 sm:p-4 md:p-8">
                {isMobile && (
                    <button
                        className="mb-4 p-2 bg-white rounded shadow md:hidden"
                        onClick={() => setSidebarOpen((open) => !open)}
                    >
                        ☰
                    </button>
                )}

                <h2 className="text-xl sm:text-2xl font-bold mb-2">
                    Ritesh Gupta - Project Lists
                </h2>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center mb-4">
                    <input
                        placeholder="Search by name ,via ..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                        className="px-3 py-2 border rounded-md w-full sm:w-[200px]"
                    />
                    <button
                        onClick={() => { setFilter(filter === 'Credentials' ? '' : 'Credentials'); setPage(1); }}
                        className={`px-3 py-2 border rounded-md w-full sm:w-auto ${filter === 'Credentials' ? 'bg-[#232946] text-white' : 'bg-white'}`}
                    >Credentials</button>
                    <button
                        onClick={() => { setFilter(filter === 'Status' ? '' : 'Status'); setPage(1); }}
                        className={`px-3 py-2 border rounded-md w-full sm:w-auto ${filter === 'Status' ? 'bg-[#232946] text-white' : 'bg-white'}`}
                    >Status</button>
                    <button
                        onClick={() => { setFilter(filter === 'Email' ? '' : 'Email'); setPage(1); }}
                        className={`px-3 py-2 border rounded-md w-full sm:w-auto ${filter === 'Email' ? 'bg-[#232946] text-white' : 'bg-white'}`}
                    >Email</button>
                    <button
                        onClick={() => { setFilter(''); setSearchTerm(''); setPage(1); }}
                        className="px-3 py-2 border rounded-md bg-white w-full sm:w-auto"
                    >Reset</button>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="sm:ml-auto px-4 py-2 bg-[#232946] text-white rounded-md font-semibold w-full sm:w-auto"
                    >Add</button>
                </div>

                {showCreateModal && (
                    <CreateProjectModal onClose={() => setShowCreateModal(false)} />
                )}

                <div className="text-sm mb-3 overflow-x-scroll">
                    <b>Secret Key:</b> UGFyYWxsZWxfS2V5X2Vzc3RlcnNrbmFsbFhbWU9u3RlZWw=
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white rounded-xl shadow px-2 md:px-4">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-3 whitespace-nowrap">Project</th>
                                <th className="p-3 whitespace-nowrap">Secret Key</th>
                                <th className="p-3 whitespace-nowrap">Vendor</th>
                                <th className="p-3 whitespace-nowrap">Via</th>
                                <th className="p-3 whitespace-nowrap">Status</th>
                                <th className="p-3 whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProjects.map((project) => (
                                <tr key={project.id} className="border-t">
                                    <td className="p-3 font-semibold whitespace-nowrap">
                                        {project.name}
                                        <span className={`ml-2 text-xs px-2 py-1 rounded-full ${project.status === 'Active'
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-red-100 text-red-600'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="p-3 font-mono text-xs break-all whitespace-normal">
                                        {project.secret}
                                    </td>
                                    <td className="p-3 lowercase whitespace-nowrap">{project.vendor}</td>
                                    <td className="p-3 whitespace-nowrap">{project.via}</td>
                                    <td className="p-3 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded ${badgeColor(project.badgeType)}`}>
                                            {project.badge}
                                        </span>
                                    </td>
                                    <td className="p-3 flex items-center gap-3 relative whitespace-nowrap">
                                        {/* Toggle */}
                                        <input
                                            type="checkbox"
                                            checked={project.enabled}
                                            onChange={() => handleToggle(project.id)}
                                            className="w-4 h-4"
                                        />
                                        {/* Menu */}
                                        <button
                                            onClick={() => setActionMenu(actionMenu === project.id ? null : project.id)}
                                        >
                                            <FaEllipsisV />
                                        </button>
                                        {actionMenu === project.id && (
                                            <div className="absolute right-0 top-8 bg-white border rounded-lg shadow-md z-10 w-40">
                                                <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100">
                                                    <FaEdit /> Edit
                                                </button>
                                                <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100">
                                                    <FaFileAlt /> Reports
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-4 py-1 border rounded disabled:opacity-50"
                        >Prev</button>
                        <span className="font-semibold">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-4 py-1 border rounded disabled:opacity-50"
                        >Next</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;