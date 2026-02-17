"use client";
import React, { useEffect } from 'react';

// Records mapped to StudentMentoring Table
const SESSIONS_HISTORY = [
  { id: 1, date: "2025-12-10", mentor: "Dr. Rajesh Kumar", agenda: "Semester Project Review", status: "Present", stress: "Low", learner: "Fast" },
  { id: 2, date: "2025-11-15", mentor: "Dr. Rajesh Kumar", agenda: "Exam Preparation", status: "Present", stress: "Moderate", learner: "Fast" },
  { id: 3, date: "2025-10-20", mentor: "Dr. Rajesh Kumar", agenda: "Skill Development", status: "Present", stress: "Low", learner: "Kinesthetic" },
  { id: 4, date: "2025-09-05", mentor: "Dr. Rajesh Kumar", agenda: "Attendance Shortage Warning", status: "Absent", stress: "High", learner: "Slow" },
  { id: 6, date: "2025-05-20", mentor: "Prof. Anita Sharma", agenda: "Previous Sem Backlog", status: "Present", stress: "High", learner: "Auditory" },
  { id: 9, date: "2025-02-15", mentor: "Prof. Anita Sharma", agenda: "Internship Discussion", status: "Present", stress: "Low", learner: "Kinesthetic" },
];

export default function MeetingHistoryPage() {
  
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="container-fluid py-4 animate-fade-in">
      {/* Header & Stats Summary */}
      <div className="row mb-4 align-items-end">
        <div className="col-md-6">
          <h2 className="fw-black text-dark mb-1">Meeting History</h2>
          <p className="text-secondary fw-medium mb-0">Review your past mentoring sessions and feedback.</p>
        </div>
        <div className="col-md-6 text-md-end mt-3">
          <div className="d-inline-flex gap-3">
             <div className="text-center">
                <div className="fw-bold fs-4 text-primary">06</div>
                <div className="extra-small text-muted text-uppercase fw-bold">Total</div>
             </div>
             <div className="vr opacity-25"></div>
             <div className="text-center">
                <div className="fw-bold fs-4 text-success">05</div>
                <div className="extra-small text-muted text-uppercase fw-bold">Attended</div>
             </div>
             <div className="vr opacity-25"></div>
             <div className="text-center">
                <div className="fw-bold fs-4 text-danger">01</div>
                <div className="extra-small text-muted text-uppercase fw-bold">Absent</div>
             </div>
          </div>
        </div>
      </div>

      {/* History Table Card */}
      <div className="card-main border-0 shadow-sm overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4 py-3 text-uppercase extra-small fw-bold text-secondary">Date</th>
                <th className="py-3 text-uppercase extra-small fw-bold text-secondary">Mentor</th>
                <th className="py-3 text-uppercase extra-small fw-bold text-secondary">Agenda</th>
                <th className="py-3 text-uppercase extra-small fw-bold text-secondary text-center">Status</th>
                <th className="pe-4 py-3 text-uppercase extra-small fw-bold text-secondary text-center">Stress / Learner</th>
              </tr>
            </thead>
            <tbody>
              {SESSIONS_HISTORY.map((session) => (
                <tr key={session.id} className="border-bottom">
                  <td className="ps-4">
                    <div className="fw-bold text-dark">
                      {new Date(session.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                    <div className="extra-small text-muted">Sess #{session.id}</div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-sm-circle me-2 bg-primary-soft text-primary fw-bold">
                        {session.mentor.split(' ').filter(n => !n.includes('.')).map(n => n[0]).join('')}
                      </div>
                      <span className="small fw-semibold">{session.mentor}</span>
                    </div>
                  </td>
                  <td>
                    <div className="small text-dark fw-medium text-truncate" style={{ maxWidth: '250px' }}>
                      {session.agenda}
                    </div>
                  </td>
                  <td className="text-center">
                    <span className={`badge rounded-pill ${session.status === 'Present' ? 'bg-success-soft' : 'bg-danger-soft'}`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="pe-4 text-center">
                    <div className="d-flex justify-content-center gap-1">
                      <span className="badge-outline-pill">{session.stress}</span>
                      <span className="badge-outline-pill">{session.learner}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Simplified Footer */}
        <div className="p-3 bg-light d-flex justify-content-between align-items-center">
          <div className="extra-small text-muted fw-bold">Showing {SESSIONS_HISTORY.length} sessions</div>
          <div className="pagination-minimal d-flex gap-2">
             <button className="btn btn-sm btn-white border disabled"><span className="material-symbols-rounded fs-6">chevron_left</span></button>
             <button className="btn btn-sm btn-primary shadow-sm px-3">1</button>
             <button className="btn btn-sm btn-white border disabled"><span className="material-symbols-rounded fs-6">chevron_right</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}