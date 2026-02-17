"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const INITIAL_FEEDBACK = [
  { id: 1, student: "John Doe", type: "From Student", rating: 5, date: "2023-10-20", comment: "The session was very helpful in clarifying my doubts about the project.", status: "Reviewed" },
  { id: 2, student: "Jane Smith", type: "To Student", rating: 4, date: "2023-10-18", comment: "Showing great improvement in attendance. Focus more on technical labs.", status: "Sent" },
  { id: 3, student: "Robert Fox", type: "From Student", rating: 2, date: "2023-10-15", comment: "I feel overwhelmed with the workload and need guidance on time management.", status: "Pending Action" },
  { id: 4, student: "Alice Brown", type: "From Student", rating: 4, date: "2023-10-12", comment: "Thanks for the guidance on the internship report.", status: "Reviewed" },
];

export default function StaffFeedbackListPage() {
  const router = useRouter();
  const [feedbacks, setFeedbacks] = useState(INITIAL_FEEDBACK);

  useEffect(() => {
    // Import Bootstrap JS for any interactive components
    require("bootstrap/dist/js/bootstrap.bundle.min.js");

    // Check if we just returned from submitting a reply
    const lastRepliedId = localStorage.getItem('lastRepliedId');
    if (lastRepliedId) {
      setFeedbacks(prev => prev.map(item => 
        item.id === parseInt(lastRepliedId) ? { ...item, status: 'Reviewed' } : item
      ));
      localStorage.removeItem('lastRepliedId');
    }
  }, []);

  const handleAction = (feedback: any) => {
    // Store the specific feedback context so the submit page knows who we are replying to
    localStorage.setItem('selectedFeedbackContext', JSON.stringify(feedback));
    router.push('/staff/feedback/submit');
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Pending Action': return 'bg-danger-soft text-danger';
      case 'Sent': return 'bg-success-soft text-success';
      case 'Reviewed': return 'bg-secondary-soft text-secondary';
      default: return 'bg-light text-muted';
    }
  };

  return (
    <div className="container-fluid py-4 animate-fade-in">
      <div className="row mb-4 align-items-end">
        <div className="col-md-8">
          <h2 className="fw-black text-dark mb-1">Feedback & Progress</h2>
          <p className="text-secondary fw-medium mb-0">Monitor student evaluations and provide mentoring remarks.</p>
        </div>
        <div className="col-md-4 text-md-end mt-3 mt-md-0">
          <button 
            className="btn btn-indigo-glow rounded-pill px-4 fw-bold shadow-sm"
            onClick={() => {
              localStorage.removeItem('selectedFeedbackContext');
              router.push('/staff/feedback/submit');
            }}
          >
            <span className="me-2">+</span> New Remark
          </button>
        </div>
      </div>

      <div className="card-main border-0 shadow-sm overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4 py-3 text-uppercase extra-small fw-bold text-secondary">Date</th>
                <th className="py-3 text-uppercase extra-small fw-bold text-secondary">Student</th>
                <th className="py-3 text-uppercase extra-small fw-bold text-secondary">Type</th>
                <th className="py-3 text-uppercase extra-small fw-bold text-secondary" style={{ width: '35%' }}>Content</th>
                <th className="py-3 text-uppercase extra-small fw-bold text-secondary text-center">Status</th>
                <th className="pe-4 py-3 text-uppercase extra-small fw-bold text-secondary text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((item) => (
                <tr key={item.id} className="border-bottom">
                  <td className="ps-4">
                    <div className="fw-bold text-dark">{item.date}</div>
                    <div className="extra-small text-muted">Ref #{item.id}</div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-sm-circle me-2 bg-indigo-soft text-indigo fw-bold">
                        {item.student.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="small fw-semibold">{item.student}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge rounded-pill ${item.type === 'From Student' ? 'bg-info-soft text-info' : 'bg-purple-soft text-purple'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex flex-column">
                      <span className="small text-dark fw-medium text-truncate" style={{ maxWidth: '300px' }}>
                        "{item.comment}"
                      </span>
                      {item.rating && (
                        <div className="d-flex gap-1 text-warning mt-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="material-symbols-rounded" style={{ fontSize: '14px' }}>
                              {i < item.rating ? 'star' : 'star_outline'}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="text-center">
                    <span className={`badge rounded-pill ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="pe-4 text-end">
                    {item.status === 'Pending Action' ? (
                      <button 
                        className="btn btn-primary-soft btn-sm rounded-pill px-3 fw-bold"
                        onClick={() => handleAction(item)}
                      >
                        Reply
                      </button>
                    ) : (
                      <button 
                        className="btn btn-light btn-sm rounded-pill px-3 fw-bold text-secondary"
                        onClick={() => handleAction(item)}
                      >
                        View
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