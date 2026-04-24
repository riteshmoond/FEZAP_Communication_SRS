import React, { useEffect, useMemo, useState } from "react";
import {
  FaBell,
  FaEnvelope,
  FaInfoCircle,
  FaRedo,
  FaSearch,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { apiRequest } from "../lib/api";

const statusBadge = (status) => {
  if (status === "Open") return "bg-blue-50 text-blue-600";
  if (status === "Delivered") return "bg-em erald-50 text-emerald-600";
  if (status === "Bounce") return "bg-rose-50 text-rose-600";
  return "bg-amber-50 text-amber-700";
};

const ProjectReport = () => {
  const { projectId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [emailFilter, setEmailFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportRows, setReportRows] = useState([]);
  const [summary, setSummary] = useState({
    totalEmails: 0,
    totalSend: 0,
    totalDelivered: 0,
    totalOpen: 0,
    totalBounce: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await apiRequest(`/api/projects/${projectId}/report`);
        setSummary(data.summary);
        setReportRows(data.reports || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [projectId]);

  const sidebarShouldBeOpen = isMobile ? sidebarOpen : true;

  const summaryCards = [
    { label: "Total Emails", value: summary.totalEmails, icon: <FaEnvelope />, tint: "bg-blue-50 text-blue-600" },
    { label: "Total Send", value: summary.totalSend, icon: <FaBell />, tint: "bg-emerald-50 text-emerald-600" },
    { label: "Total Delivered", value: summary.totalDelivered, icon: <FaEnvelope />, tint: "bg-sky-50 text-sky-600" },
    { label: "Total Open", value: summary.totalOpen, icon: <FaEnvelope />, tint: "bg-amber-50 text-amber-600" },
    { label: "Total Bounce", value: summary.totalBounce, icon: <FaEnvelope />, tint: "bg-rose-50 text-rose-600" },
  ];

  const filteredRows = useMemo(() => {
    return reportRows.filter((row) => {
      const matchesEmail = (row.email || "").toLowerCase().includes(emailFilter.toLowerCase());
      const matchesSubject = (row.subject || "").toLowerCase().includes(subjectFilter.toLowerCase());
      const matchesStatus = statusFilter ? row.status === statusFilter : true;
      const rowDate = (row.sentAt || "").slice(0, 10);
      const matchesFromDate = fromDate ? rowDate >= fromDate : true;
      const matchesToDate = toDate ? rowDate <= toDate : true;

      return matchesEmail && matchesSubject && matchesStatus && matchesFromDate && matchesToDate;
    });
  }, [reportRows, emailFilter, subjectFilter, statusFilter, fromDate, toDate]);

  const resetFilters = () => {
    setEmailFilter("");
    setSubjectFilter("");
    setStatusFilter("");
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-[#232946]">
      <Sidebar open={sidebarShouldBeOpen} onClose={() => setSidebarOpen(false)} />

      <main className="min-w-0 flex-1 p-3 sm:p-4 lg:p-8">
        {isMobile && (
          <button
            className="mb-4 rounded-lg bg-white p-2 shadow"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label="Open sidebar"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}

        <div className="mb-6">
          <h1 className="text-2xl font-bold">Project Report</h1>
          <p className="mt-1 text-sm text-gray-500">Showing report data for project #{projectId}</p>
        </div>

        <div className="mb-6 flex gap-4 overflow-x-auto pb-2">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="min-w-220px rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200"
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${card.tint}`}>
                  {card.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold leading-none">{card.value}</div>
                  <div className="mt-1 text-sm font-medium text-gray-500">{card.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200 sm:p-6">
            <div className="mb-5 flex items-center gap-2">
              <h2 className="text-2xl font-bold">Detailed Report</h2>
              <FaInfoCircle className="text-sky-500" />
            </div>

            <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:flex-wrap xl:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                <FaSearch className="text-gray-400" />
                <input
                  value={emailFilter}
                  onChange={(e) => setEmailFilter(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>

              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
                <FaSearch className="text-gray-400" />
                <input
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  placeholder="Subject"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="min-w-40 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 outline-none"
              >
                <option value="">Select Status</option>
                <option value="Send">Send</option>
                <option value="Delivered">Delivered</option>
                <option value="Open">Open</option>
                <option value="Bounce">Bounce</option>
              </select>

              <label className="flex min-w-40 items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="flex min-w-40 items-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500">
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                </label>

                <button
                  onClick={resetFilters}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                >
                  <FaRedo />
                  Reset Filter
                </button>
              </div>
            </div>

            <div className="mb-3 text-sm text-gray-500">
              {filteredRows.length > 0 ? `1 - ${filteredRows.length}` : "0"} of {filteredRows.length}
            </div>

            {loading && (
              <div className="rounded-2xl border border-gray-200 p-6 text-sm text-gray-500">
                Loading report...
              </div>
            )}

            {!loading && error && (
              <div className="rounded-2xl border border-gray-200 p-6 text-sm text-red-600">
                {error}
              </div>
            )}

            {!loading && !error && filteredRows.length === 0 && (
              <div className="rounded-2xl border border-gray-200 p-6 text-sm text-gray-500">
                No report data found.
              </div>
            )}

            {!loading && !error && filteredRows.length > 0 && (
            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-980px w-full text-sm">
                  <thead className="bg-gray-50 text-left text-gray-600">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Subject</th>
                      <th className="px-4 py-3 font-semibold">Email</th>
                      <th className="px-4 py-3 font-semibold">Channel</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Send At (UTC)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredRows.map((row, index) => (
                      <tr key={row.id || index} className="hover:bg-gray-50">
                        <td className="px-4 py-3">{row.subject}</td>
                        <td className="px-4 py-3">{row.email}</td>
                        <td className="px-4 py-3">{row.channel}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">{row.sentAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}
        </section>
      </main>
    </div>
  );
};

export default ProjectReport;
