"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const INITIAL_SESSIONS = [
  { id: 1, date: "2025-12-10", agenda: "Project Review", mentor: "Dr. Rajesh Kumar", feedbackStatus: "Pending" },
  { id: 2, date: "2025-11-15", agenda: "Career Counseling", mentor: "Dr. Rajesh Kumar", feedbackStatus: "Submitted" },
  { id: 3, date: "2025-10-20", agenda: "Technical Workshop", mentor: "Prof. Anita Sharma", feedbackStatus: "Pending" },
];

export default function StudentFeedbackListPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    
    // Check if we just returned from a successful submission
    const lastSubmitted = localStorage.getItem('lastSubmittedId');
    if (lastSubmitted) {
      setSessions(prev => prev.map(s => 
        s.id === parseInt(lastSubmitted) ? { ...s, feedbackStatus: 'Submitted' } : s
      ));
      localStorage.removeItem('lastSubmittedId'); // Clear after updating
    }
  }, []);

  const handleGiveFeedback = (session: any) => {
    // Store session details temporarily for the next page to read
    localStorage.setItem('selectedSession', JSON.stringify(session));
    router.push('/student/feedback/submit');
  };

  return (
    <div className="container-fluid py-4 animate-fade-in">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="fw-black text-dark mb-1">Session Feedback</h2>
          <p className="text-secondary fw-medium">View your session history and provide feedback where pending.</p>
        </div>
      </div>

      <div className="card-main border-0 shadow-sm overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4 py-3 text-uppercase extra-small fw-bold text-secondary">Date</th>
                <th className="py-3 text-uppercase extra-small fw-bold text-secondary">Mentor</th>
                <th className="py-3 text-uppercase extra-small fw-bold text-secondary">Agenda</th>
                <th className="py-3 text-uppercase extra-small fw-bold text-secondary text-center">Status</th>
                <th className="pe-4 py-3 text-uppercase extra-small fw-bold text-secondary text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id} className="border-bottom">
                  <td className="ps-4">
                    <div className="fw-bold text-dark">{session.date}</div>
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
                  <td><div className="small text-dark fw-medium">{session.agenda}</div></td>
                  <td className="text-center">
                    <span className={`badge rounded-pill ${session.feedbackStatus === 'Submitted' ? 'bg-success-soft text-success' : 'bg-warning-soft text-warning'}`}>
                      {session.feedbackStatus}
                    </span>
                  </td>
                  <td className="pe-4 text-end">
                    {session.feedbackStatus === 'Pending' ? (
                      <button 
                        className="btn btn-primary-soft btn-sm rounded-pill px-3 fw-bold"
                        onClick={() => handleGiveFeedback(session)}
                      >
                        Give Feedback
                      </button>
                    ) : (
                      <button className="btn btn-light btn-sm rounded-pill px-3 fw-bold disabled">
                        Submitted
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}