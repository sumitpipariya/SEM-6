"use client";
import React, { useEffect, useState } from 'react';
import styles from '../staff.module.css';

const stats = [
  { label: 'Total Mentees', value: '42', icon: 'groups', color: '#4f46e5', trend: '+2 this month', percentage: 75 },
  { label: 'Pending Feedback', value: '08', icon: 'pending_actions', color: '#f59e0b', trend: 'Needs attention', percentage: 40 },
  { label: 'Avg. Attendance', value: '88%', icon: 'leaderboard', color: '#10b981', trend: 'Above target', percentage: 88 },
  { label: 'High Stress Alert', value: '03', icon: 'priority_high', color: '#ef4444', trend: 'Immediate action', percentage: 15 },
];

export default function StaffDashboard() {
  const [isGenerating, setIsGenerating] = useState(false);

  // 1. Generate Report Logic (CSV)
  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate server processing time
    await new Promise(resolve => setTimeout(resolve, 1200));

    const reportData = [
      ["Student Name", "Roll No", "Last Meeting", "Stress Status", "Attendance"],
      ["John Doe", "102", "24 Oct 2026", "Moderate", "85%"],
      ["Sarah Smith", "045", "22 Oct 2026", "High", "72%"],
      ["Mike Ross", "089", "21 Oct 2026", "Low", "94%"]
    ];

    const csvContent = "data:text/csv;charset=utf-8," 
      + reportData.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Mentoring_Report_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsGenerating(false);
  };

  return (
    <div className="container-fluid py-4 animate-fade-in">
      {/* HEADER SECTION */}
      <div className="d-flex align-items-center mb-5 p-4 rounded-5 bg-card-custom shadow-sm border-start border-primary border-5">
        <div className="bg-primary-soft p-3 rounded-4 me-4">
          <span className="material-symbols-rounded fs-1 text-primary">analytics</span>
        </div>
        <div>
          <h2 className="fw-black text-dark-main mb-1">Faculty Overview</h2>
          <p className="text-muted mb-0 fw-medium">Managing 42 mentees across 3 departments</p>
        </div>
        <button 
          onClick={handleGenerateReport}
          disabled={isGenerating}
          className={`${styles.btnStaffPrimary} ms-auto d-none d-md-flex align-items-center gap-2`}
        >
          {isGenerating ? (
            <span className="spinner-border spinner-border-sm" role="status"></span>
          ) : (
            <span className="material-symbols-rounded fs-5">download</span>
          )}
          {isGenerating ? "Generating..." : "Generate Report"}
        </button>
      </div>

      {/* METRICS GRID */}
      <div className="row g-4 mb-5">
        {stats.map((s) => (
          <div key={s.label} className="col-12 col-md-6 col-lg-3">
            <div className={`${styles.managementCard} h-100 position-relative`}>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="p-2 rounded-3 shadow-sm" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                  <span className="material-symbols-rounded">{s.icon}</span>
                </div>
                <span className="extra-small-text fw-bold px-2 py-1 rounded-pill" style={{ backgroundColor: `${s.color}10`, color: s.color }}>
                  {s.trend}
                </span>
              </div>
              <h6 className="text-uppercase text-muted extra-small-text fw-bold ls-1 mb-1">{s.label}</h6>
              <h3 className="fw-black mb-2 text-dark-main">{s.value}</h3>
              <div className="progress mt-3" style={{ height: '4px', backgroundColor: 'var(--border-light)' }}>
                <div className="progress-bar" style={{ width: `${s.percentage}%`, backgroundColor: s.color }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* RECENT ACTIVITY TABLE */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-card-custom">
            <div className="card-header bg-transparent py-4 px-4 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold text-dark-main">Recent Mentee Activity</h5>
              <button className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-bold extra-small-text">View All</button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light-soft">
                    <tr>
                      <th className="extra-small-text border-0 ps-4 py-3 text-muted">STUDENT</th>
                      <th className="extra-small-text border-0 py-3 text-muted">LAST MEETING</th>
                      <th className="extra-small-text border-0 py-3 text-muted">STATUS</th>
                      <th className="extra-small-text border-0 text-end pe-4 py-3 text-muted">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'John Doe', roll: '102', date: '24 Oct, 2026', status: 'Moderate', color: 'warning' },
                      { name: 'Sarah Smith', roll: '045', date: '22 Oct, 2026', status: 'High', color: 'danger' },
                    ].map((student, i) => (
                      <tr key={i}>
                        <td className="ps-4">
                          <div className="d-flex align-items-center py-2">
                            <div className={`avatar-initials-sm bg-${student.color}-soft text-${student.color} me-3`}>
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <p className="mb-0 fw-bold small text-dark-main">{student.name}</p>
                              <p className="mb-0 extra-small-text text-muted">ID: {student.roll}</p>
                            </div>
                          </div>
                        </td>
                        <td className="small text-muted">{student.date}</td>
                        <td>
                          <span className={`${styles.statusBadge} ${styles['status' + student.status]}`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          <button className="btn btn-sm btn-light rounded-pill px-3 fw-bold extra-small-text text-dark-main">Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS SIDE-CARD */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-lg rounded-4 bg-indigo text-white h-100 position-relative overflow-hidden">
            <div className="card-body p-4 z-1 position-relative">
              <h5 className="fw-bold mb-4">Quick Management</h5>
              <div className="d-grid gap-3">
                <button className={styles.actionButtonGlass}>
                  <span className="material-symbols-rounded me-2">person_add</span> Add New Mentee
                </button>
                <button className={styles.actionButtonGlass}>
                  <span className="material-symbols-rounded me-2">mail</span> Send Notifications
                </button>
              </div>
            </div>
            <div className="position-absolute bottom-0 end-0 p-3 opacity-10">
              <span className="material-symbols-rounded" style={{ fontSize: '150px' }}>psychology</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}