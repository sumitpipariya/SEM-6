"use client";
import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function StudentDashboard() {
  const [showAgenda, setShowAgenda] = useState(false);

  const metrics = [
    { label: 'Attendance', value: '94%', icon: 'task_alt', color: '#10b981', trend: 'Above avg' },
    { label: 'Stress Level', value: 'Moderate', icon: 'psychology', color: '#6366f1', trend: 'Latest' },
    { label: 'Learner Type', value: 'Visual', icon: 'visibility', color: '#f59e0b', trend: 'Profile' },
    { label: 'Next Session', value: '24 Oct', icon: 'event_upcoming', color: '#3b82f6', trend: 'Scheduled' },
  ];

  // Chart Data Configuration
  const chartData = {
    labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        fill: true,
        label: 'Attendance %',
        data: [85, 88, 92, 94, 94],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        pointBackgroundColor: '#10b981',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { min: 0, max: 100, grid: { display: false } },
      x: { grid: { display: false } }
    },
  };

  return (
    <div className="container-fluid py-4 animate-fade-in">
      
      {/* 1. AGENDA POPUP (MODAL) */}
      {showAgenda && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3" style={{ zIndex: 1060, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)' }}>
          <div className="card-main border-0 shadow-lg bg-white overflow-hidden animate-zoom-in" style={{ maxWidth: '550px', width: '100%' }}>
            <div className="p-4 bg-indigo text-white d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <span className="material-symbols-rounded">description</span>
                <h5 className="fw-bold mb-0">Meeting Agenda</h5>
              </div>
              <button className="btn btn-white-glass btn-sm rounded-circle" onClick={() => setShowAgenda(false)}>
                <span className="material-symbols-rounded fs-6">close</span>
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="extra-small text-uppercase fw-bold text-muted ls-1 d-block mb-2">Subject</label>
                <div className="p-3 bg-light rounded-4 fw-bold text-dark fs-5">Mid-Semester Performance Review</div>
              </div>
              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="p-3 border rounded-4">
                    <div className="extra-small text-muted fw-bold text-uppercase mb-1">Duration</div>
                    <div className="fw-bold">45 Minutes</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 border rounded-4">
                    <div className="extra-small text-muted fw-bold text-uppercase mb-1">Location</div>
                    <div className="fw-bold">Cabin 402, Block B</div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="extra-small text-uppercase fw-bold text-muted ls-1 d-block mb-2">Talking Points</label>
                <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                  {['Review of Internal Lab Exam scores', 'Project documentation status update', 'Discussion on elective subject selection', 'Addressing stress management queries'].map((item, i) => (
                    <li key={i} className="d-flex gap-2 small text-secondary align-items-start">
                      <span className="material-symbols-rounded text-indigo fs-6">check_circle</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="btn btn-indigo-glow w-100 py-3 rounded-pill fw-bold" onClick={() => setShowAgenda(false)}>
                Acknowledge Agenda
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Welcome Header */}
      <div className="d-flex align-items-center gap-4 mb-4">
        <div className="welcome-icon-box bg-indigo">
          <span className="material-symbols-rounded text-white fs-2">school</span>
        </div>
        <div>
          <h2 className="fw-black text-dark mb-1">Academic Overview</h2>
          <p className="text-secondary fw-medium mb-0">Track your mentoring progress and session outcomes.</p>
        </div>
      </div>

      {/* 3. Metrics Grid */}
      <div className="row g-4 mb-4">
        {metrics.map((m) => (
          <div key={m.label} className="col-12 col-md-6 col-lg-3">
            <div className="card-stat shadow-sm bg-white border-0 h-100">
              <div className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="stat-icon-wrapper" style={{ backgroundColor: `${m.color}10`, color: m.color }}>
                    <span className="material-symbols-rounded fs-5">{m.icon}</span>
                  </div>
                  <div className="extra-small-text fw-bold" style={{ color: m.color }}>{m.trend}</div>
                </div>
                <h6 className="text-uppercase text-secondary fw-bold extra-small-text ls-1 mb-1">{m.label}</h6>
                <h4 className="fw-black mb-0 text-dark fs-4">{m.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* 4. Attendance Chart (NEW) */}
        <div className="col-12 col-xl-5">
          <div className="card-main border-0 shadow-sm h-100 bg-white p-4">
            <h5 className="fw-bold mb-1 text-dark">Attendance Trend</h5>
            <p className="small text-muted mb-4">Monthly participation percentage</p>
            <div style={{ height: '220px' }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* 5. Upcoming Session */}
        <div className="col-12 col-xl-7">
          <div className="card-main border-0 shadow-sm h-100 bg-white overflow-hidden">
            <div className="card-header-glass d-flex justify-content-between align-items-center p-4 border-bottom">
              <h5 className="fw-bold mb-0 text-indigo">Next Mentoring Session</h5>
              <span className="badge-live">UPCOMING</span>
            </div>
            <div className="p-4">
              <div className="session-highlight-box border p-4 rounded-4 bg-light-soft">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <div className="d-flex align-items-center mb-3 text-indigo fw-bold">
                      <span className="material-symbols-rounded me-2">calendar_month</span>
                      Thursday, 24th Oct • 10:30 AM
                    </div>
                    <h4 className="fw-bold text-dark mb-2">Mid-Semester Review</h4>
                    <p className="text-muted small mb-0">Discussion on lab internals and project documentation.</p>
                  </div>
                  <div className="col-md-4 text-md-end mt-3">
                    <button 
                      className="btn btn-indigo-glow px-4 py-2 rounded-pill fw-bold"
                      onClick={() => setShowAgenda(true)}
                    >
                      View Agenda
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}