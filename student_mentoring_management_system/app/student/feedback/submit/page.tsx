"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitFeedbackPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem('selectedSession');
    if (!data) router.push('/student/feedback');
    else setSession(JSON.parse(data));
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 1. Mark this specific ID as submitted in local storage
    localStorage.setItem('lastSubmittedId', session.id.toString());
    // 2. Go back to the main list
    router.push('/student/feedback');
  };

  if (!session) return <div className="p-5 text-center">Loading...</div>;

  return (
    <div className="container-fluid py-4 animate-fade-in">
      <button className="btn btn-white border-0 fw-bold text-primary mb-3 d-flex align-items-center" onClick={() => router.back()}>
        <span className="material-symbols-rounded me-1">arrow_back</span> Back
      </button>
      
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card-main border-0 shadow-sm bg-white overflow-hidden">
            <div className="card-header-glass p-4 border-bottom">
              <h5 className="fw-bold mb-0 text-indigo">Post-Session Evaluation</h5>
              <p className="small text-muted mb-0">{session.agenda} with {session.mentor}</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 p-md-5">
              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold small text-muted text-uppercase ls-1">Mentoring Satisfaction</label>
                  <div className="d-flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star} type="button" 
                        onClick={() => setRating(star)}
                        className={`btn rounded-3 p-2 flex-grow-1 border ${rating >= star ? 'btn-warning text-white' : 'btn-light'}`}
                      >
                        <span className="material-symbols-rounded">star</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold small text-muted text-uppercase ls-1">Current Stress Level</label>
                  <select className="form-select border-0 bg-light p-3 rounded-4" required>
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold small text-muted text-uppercase ls-1">Your Opinion</label>
                <textarea className="form-control border-0 bg-light p-3 rounded-4" rows={4} required placeholder="Share your experience..."></textarea>
              </div>

              <div className="text-end">
                <button type="submit" className="btn btn-indigo-glow px-5 py-3 rounded-pill fw-bold">
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}