import { useState, useEffect } from "react";
import CreateProjectModal from "./CreateProjectModal";
import Sidebar from "../components/Sidebar";
import { FaEllipsisV, FaEdit, FaFileAlt } from 'react-icons/fa';

const Projects = () => {
    // State for search and filters
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("");
    // Modal state for create project
    const [showCreateModal, setShowCreateModal] = useState(false);
    // Dummy data for table
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: 'Bengaluru 2026',
            status: 'Active',
            secret: '5a8d85f6-577f-41bf-8a69-bdae60f29516',
            vendor: 'aws',
            via: 'Mail',
            badge: 'Verify Webhook',
            badgeType: 'warning',
            verified: false,
            enabled: true,
        },
        {
            id: 2,
            name: 'Summit 2026',
            status: 'Active',
            secret: 'f52abd55-b000-48ae-8d48-eb6e5a739bce',
            vendor: 'smtp',
            via: 'Mail',
            badge: 'Verified',
            badgeType: 'success',
            verified: true,
            enabled: false,
        },
        {
            id: 3,
            name: 'Wedding',
            status: 'Active',
            secret: '64d68873-81d0-41f9-a946-37340d35d2d',
            vendor: 'aws',
            via: 'Mail',
            badge: 'Verified',
            badgeType: 'success',
            verified: true,
            enabled: true,
        },
        {
            id: 4,
            name: 'Infinite',
            status: 'Active',
            secret: '30bedd55-40a4-4a14-9f6d-d9b5084785a',
            vendor: 'smtp',
            via: 'Mail',
            badge: 'Verified',
            badgeType: 'success',
            verified: true,
            enabled: true,
        },
        {
            id: 5,
            name: 'Summit & LSA 2026',
            status: 'Dormant',
            secret: 'ca5e205a-e858-4ec1-b9ae-1430f498e4d4',
            vendor: 'aws',
            via: 'Mail',
            badge: 'Verify Webhook',
            badgeType: 'warning',
            verified: false,
            enabled: false,
        },
        {
            id: 6,
            name: 'Bengaluru 2025',
            status: 'Dormant',
            secret: 'd1c9e5b8-3c9a-4f0b-9c3e-2a7f5e6d8c9f',
            vendor: 'smtp',
            via: 'Mail',
            badge: 'Webhook Failed',
            badgeType: 'danger',
            verified: false,
            enabled: false,
        },
        {
            id: 7,
            name: 'LSA 2025',
            status: 'Active',
            secret: 'e7f8a9c0-1b2d-4c3e-8f9a-5d6e7f8a9b0c',
            vendor: 'aws',
            via: 'Mail',
            badge: 'Verified',
            badgeType: 'success',
            verified: true,
            enabled: true,
        },
        {
            id: 8,
            name: 'LSA 2024',
            status: 'Dormant',
            secret: 'd1c9e5b8-3c9a-4f0b-9c3e-2a7f5e6d8c9f',
            vendor: 'smtp',
            via: 'Mail',
            badge: 'Webhook Failed',
            badgeType: 'danger',
            verified: false,
            enabled: false,
        },
        {
            id: 9,
            name: 'LSA 2023',
            status: 'Dormant',
            secret: 'e7f8a9c0-1b2d-4c3e-8f9a-5d6e7f8a9b0c',
            vendor: 'aws',
            via: 'Mail',
            badge: 'Verified',
            badgeType: 'success',
            verified: true, enabled: true,
        },
        {
            id: 10,
            name: 'LSA 2022',
            status: 'Dormant',
            secret: 'd1c9e5b8-3c9a-4f0b-9c3e-2a7f5e6d8c9f',
            vendor: 'smtp',
            via: 'Mail',
            badge: 'Webhook Failed',
            badgeType: 'danger',
            verified: false,
            enabled: false,
        },
        {
            id: 11,
            name: 'LSA 2021',
            status: 'Dormant',
            secret: 'e7f8a9c0-1b2d-4c3e-8f9a-5d6e7f8a9b0c',
            vendor: 'aws',
            via: 'Mail',
            badge: 'Verified',
            badgeType: 'success',
            verified: true,
            enabled: true,
        },



    ]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    const [actionMenu, setActionMenu] = useState(null); // project id for open menu

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const sidebarShouldBeOpen = isMobile ? sidebarOpen : true;

    // Helper for badge color
    const badgeColor = (type) => {
        if (type === 'success') return { background: '#e6f4ea', color: '#219653' };
        if (type === 'warning') return { background: '#fff4e5', color: '#e67e22' };
        if (type === 'danger') return { background: '#fdecea', color: '#e74c3c' };
        return { background: '#eee', color: '#232946' };
    };

    // Filtered projects (single definition)
    const filteredProjects = projects.filter((p) => {
        let matches = true;
        if (searchTerm.trim()) {
            matches = (
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (p.via && p.via.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        if (filter === "Credentials") {
            matches = matches && p.vendor === "aws";
        } else if (filter === "Status") {
            matches = matches && p.status === "Active";
        } else if (filter === "Email") {
            matches = matches && p.via === "Mail";
        }
        return matches;
    });

    // Pagination state and logic
    const [page, setPage] = useState(1);
    const pageSize = 20;
    const totalPages = Math.ceil(filteredProjects.length / pageSize);
    const paginatedProjects = filteredProjects.slice((page - 1) * pageSize, page * pageSize);

    // Toggle project enabled state
    const handleToggle = (id) => {
        setProjects(projects.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));
    };

    // (Removed duplicate sidebarOpen, isMobile, sidebarShouldBeOpen)

    return (
        <div className="dashboard-container">
            <Sidebar open={sidebarShouldBeOpen} onClose={() => setSidebarOpen(false)} />
            <div className="main-content" style={{ padding: isMobile ? 12 : 32 }}>
                {isMobile && (
                    <button
                        className="sidebar-toggle-btn"
                        onClick={() => setSidebarOpen((open) => !open)}
                        aria-label="Open sidebar"
                        style={{ marginBottom: 16 }}
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                    </button>
                )}
                <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 8 }}>Ritesh Gupta - Project Lists</h2>
                <div className="project-filters">
                    <input
                        placeholder="Search by name ,via ..."
                        style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 180 }}
                        value={searchTerm}
                        onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
                    />
                    <button
                        style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', background: filter === 'Credentials' ? '#232946' : '#fff', color: filter === 'Credentials' ? '#fff' : '#232946', fontWeight: 500 }}
                        onClick={() => { setFilter(filter === 'Credentials' ? '' : 'Credentials'); setPage(1); }}
                    >Credentials</button>
                    <button
                        style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', background: filter === 'Status' ? '#232946' : '#fff', color: filter === 'Status' ? '#fff' : '#232946', fontWeight: 500 }}
                        onClick={() => { setFilter(filter === 'Status' ? '' : 'Status'); setPage(1); }}
                    >Status</button>
                    <button
                        style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', background: filter === 'Email' ? '#232946' : '#fff', color: filter === 'Email' ? '#fff' : '#232946', fontWeight: 500 }}
                        onClick={() => { setFilter(filter === 'Email' ? '' : 'Email'); setPage(1); }}
                    >Email</button>
                    <button
                        style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', background: '#fff', fontWeight: 500 }}
                        onClick={() => { setFilter(''); setSearchTerm(''); setPage(1); }}
                    >Reset Filter</button>
                    <button
                        style={{ marginLeft: 'auto', padding: '8px 18px', borderRadius: 6, background: '#232946', color: '#fff', border: 'none', fontWeight: 600 }}
                        onClick={() => setShowCreateModal(true)}
                    >Add</button>
                </div>
                {/* Modal for Create Project */}
                {showCreateModal && (
                    <CreateProjectModal onClose={() => setShowCreateModal(false)} />
                )}
                <div style={{ fontSize: 14, marginBottom: 8 }}>
                    <b>Secret Key:</b> UGFyYWxsZWxfS2V5X2Vzc3RlcnNrbmFsbFhbWU9u3RlZWw=
                </div>
                <div className="project-table-container">
                    <table className="project-table">
                        <thead>
                            <tr style={{ background: '#f7f7fa', color: '#232946', fontWeight: 700, fontSize: 15 }}>
                                <th style={{ padding: '12px 8px', textAlign: 'left' }}>Project</th>
                                <th style={{ padding: '12px 8px', textAlign: 'left' }}>Secret Key</th>
                                <th style={{ padding: '12px 8px', textAlign: 'left' }}>Vendor</th>
                                <th style={{ padding: '12px 8px', textAlign: 'left' }}>Via</th>
                                <th style={{ padding: '12px 8px', textAlign: 'left' }}>Status</th>
                                <th style={{ padding: '12px 8px', textAlign: 'left' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProjects.map((project) => (
                                <tr key={project.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px 8px', fontWeight: 600 }}>
                                        {project.name} {' '}
                                        <span style={{
                                            background: project.status === 'Active' ? '#e6f4ea' : '#fdecea',
                                            color: project.status === 'Active' ? '#219653' : '#e74c3c',
                                            borderRadius: 8,
                                            fontSize: 12,
                                            fontWeight: 700,
                                            padding: '2px 10px',
                                            marginLeft: 6,
                                        }}>{project.status}</span>
                                    </td>
                                    <td style={{ padding: '12px 8px', fontFamily: 'monospace', fontSize: 13 }}>{project.secret}</td>
                                    <td style={{ padding: '12px 8px', textTransform: 'lowercase' }}>{project.vendor}</td>
                                    <td style={{ padding: '12px 8px' }}>{project.via}</td>
                                    <td style={{ padding: '12px 8px' }}>
                                        <span style={{ ...badgeColor(project.badgeType), borderRadius: 8, fontSize: 12, fontWeight: 600, padding: '2px 10px', marginRight: 6 }}>{project.badge}</span>
                                    </td>
                                    <td style={{ padding: '12px 8px', minWidth: 120 }}>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={project.enabled}
                                                onChange={() => handleToggle(project.id)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                        <span style={{ position: 'relative', marginLeft: 8 }}>
                                            <button
                                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                                                onClick={() => setActionMenu(actionMenu === project.id ? null : project.id)}
                                                aria-label="Actions"
                                            >
                                                <FaEllipsisV size={18} color="#232946" />
                                            </button>
                                            {actionMenu === project.id && (
                                                <div style={{ position: 'absolute', right: 0, top: 28, background: '#fff', border: '1px solid #eee', borderRadius: 8, boxShadow: '0 2px 8px rgba(44,62,80,0.12)', zIndex: 10, minWidth: 140 }}>
                                                    <button style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', background: 'none', border: 'none', padding: '10px 16px', cursor: 'pointer', fontSize: 15 }}>
                                                        <FaEdit size={15} /> Edit
                                                    </button>
                                                    <button style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', background: 'none', border: 'none', padding: '10px 16px', cursor: 'pointer', fontSize: 15 }}>
                                                        <FaFileAlt size={15} /> Project Reports
                                                    </button>
                                                </div>
                                            )}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, margin: '18px 0' }}>
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            style={{ padding: '6px 16px', borderRadius: 6, border: '1px solid #ccc', background: page === 1 ? '#eee' : '#fff', color: '#232946', fontWeight: 500, cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                        >Prev</button>
                        <span style={{ fontWeight: 600, fontSize: 15 }}>Page {page} of {totalPages}</span>
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            style={{ padding: '6px 16px', borderRadius: 6, border: '1px solid #ccc', background: page === totalPages ? '#eee' : '#fff', color: '#232946', fontWeight: 500, cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
                        >Next</button>
                    </div>
                )}
            </div>
        </div>
    );

}
export default Projects;

