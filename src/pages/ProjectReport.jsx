import React, { useEffect, useMemo, useState } from "react";
import {
  FaBell,
  FaCalendarAlt,
  FaEnvelope,
  FaInfoCircle,
  FaRedo,
  FaSearch,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const reportRows = [
  {
    id: 1,
    subject: "Registration Confirmation for Amazon Fee Drop - Bengaluru Edition",
    email: "ferricforgegroupinfo@gmail.com",
    channel: "Aws",
    status: "Send",
    sentAt: "2026-03-13-10:24:06",
  },
  {
    id: 2,
    subject: "Registration Confirmation for Amazon Fee Drop - Bengaluru Edition",
    email: "ij.sooraj@yahoo.com",
    channel: "Aws",
    status: "Delivered",
    sentAt: "2026-03-13-10:24:06",
  },
  {
    id: 3,
    subject: "Registration Confirmation for Amazon Fee Drop - Bengaluru Edition",
    email: "dilip.kumar@tgspl.in",
    channel: "Aws",
    status: "Delivered",
    sentAt: "2026-03-13-08:04:06",
  },
  {
    id: 4,
    subject: "Registration Confirmation for Amazon Fee Drop - Bengaluru Edition",
    email: "jainimpex092019@gmail.com",
    channel: "Aws",
    status: "Delivered",
    sentAt: "2026-03-13-05:31:04",
  },
  {
    id: 5,
    subject: "Registration Confirmation for Amazon Fee Drop - Bengaluru Edition",
    email: "rajesh@kiratech.in",
    channel: "Aws",
    status: "Delivered",
    sentAt: "2026-03-13-05:23:06",
  },
  {
    id: 6,
    subject: "Registration Confirmation for Amazon Fee Drop - Bengaluru Edition",
    email: "anuradharajesh@totztouch.com",
    channel: "Aws",
    status: "Delivered",
    sentAt: "2026-03-13-05:21:05",
  },
  {
    id: 7,
    subject: "Registration Confirmation for Amazon Fee Drop - Bengaluru Edition",
    email: "dm@medopharmwellness.com",
    channel: "Aws",
    status: "Delivered",
    sentAt: "2026-03-13-04:58:09",
  },
  {
    id: 8,
    subject: "Registration Confirmation for Amazon Fee Drop - Bengaluru Edition",
    email: "prrraveen@gmail.com",
    channel: "Aws",
    status: "Open",
    sentAt: "2026-03-13-10:18:08",
  },
  {
    id: 9,
    subject: "Registration Confirmation for Amazon Fee Drop - Bengaluru Edition",
    email: "ferricforgegroup@gmail.com",
    channel: "Aws",
    status: "Open",
    sentAt: "2026-03-13-10:11:31",
  },
  {
    id: 10,
    subject: "Registration Confirmation for Amazon Fee Drop - Bengaluru Edition",
    email: "yuvin.bangalore@gmail.com",
    channel: "Aws",
    status: "Open",
    sentAt: "2026-03-13-10:08:06",
  },
  {
    id: 11,
    subject: "Registration Confirmation for Amazon Fee Drop - Bengaluru Edition",
    email: "contact@startupcircle.in",
    channel: "Aws",
    status: "Bounce",
    sentAt: "2026-03-13-09:46:22",
  },
  {
    id: 12,
    subject: "Registration Confirmation for Amazon Fee Drop - Bengaluru Edition",
    email: "support@marketnode.ai",
    channel: "Aws",
    status: "Open",
    sentAt: "2026-03-13-09:12:14",
  },
];

const summaryCards = [
  { label: "Total Emails", value: 92, icon: <FaEnvelope />, tint: "bg-blue-50 text-blue-600" },
  { label: "Total Send", value: 92, icon: <FaBell />, tint: "bg-emerald-50 text-emerald-600" },
  { label: "Total Delivered", value: 92, icon: <FaEnvelope />, tint: "bg-sky-50 text-sky-600" },
  { label: "Total Open", value: 67, icon: <FaEnvelope />, tint: "bg-amber-50 text-amber-600" },
  { label: "Total Bounce", value: 5, icon: <FaEnvelope />, tint: "bg-rose-50 text-rose-600" },
];

const statusBadge = (status) => {
  if (status === "Open") return "bg-blue-50 text-blue-600";
  if (status === "Delivered") return "bg-emerald-50 text-emerald-600";
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
  const [fromDate, setFromDate] = useState("2026-03-13");
  const [toDate, setToDate] = useState("2026-03-13");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarShouldBeOpen = isMobile ? sidebarOpen : true;

  const filteredRows = useMemo(() => {
    return reportRows.filter((row) => {
      const matchesEmail = row.email.toLowerCase().includes(emailFilter.toLowerCase());
      const matchesSubject = row.subject.toLowerCase().includes(subjectFilter.toLowerCase());
      const matchesStatus = statusFilter ? row.status === statusFilter : true;
      return matchesEmail && matchesSubject && matchesStatus;
    });
  }, [emailFilter, subjectFilter, statusFilter]);

  const resetFilters = () => {
    setEmailFilter("");
    setSubjectFilter("");
    setStatusFilter("");
    setFromDate("2026-03-13");
    setToDate("2026-03-13");
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
              className="min-w-[220px] rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200"
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

            <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
                <FaSearch className="text-gray-400" />
                <input
                  value={emailFilter}
                  onChange={(e) => setEmailFilter(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
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
                className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none"
              >
                <option value="">Select Status</option>
                <option value="Send">Send</option>
                <option value="Delivered">Delivered</option>
                <option value="Open">Open</option>
                <option value="Bounce">Bounce</option>
              </select>

              <label className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500">
                <FaCalendarAlt />
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              </label>

              <div className="flex gap-3">
                <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500">
                  <FaCalendarAlt />
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                </label>

                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
                >
                  <FaRedo />
                  Reset Filter
                </button>
              </div>
            </div>

            <div className="mb-3 text-sm text-gray-500">
              1 - {filteredRows.length} of {filteredRows.length}
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-[980px] w-full text-sm">
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
                    {filteredRows.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50">
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
        </section>
      </main>
    </div>
  );
};

export default ProjectReport;
