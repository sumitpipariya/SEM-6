"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StaffSubmitRemarkPage() {
  const router = useRouter();
  
  // State for the form fields
  const [studentName, setStudentName] = useState("");
  const [remarkType, setRemarkType] = useState('To Student');
  const [content, setContent] = useState("");
  const [contextData, setContextData] = useState<any>(null);

  useEffect(() => {
    // Check if we are replying to a specific context
    const data = localStorage.getItem('selectedFeedbackContext');
    if (data) {
      const parsed = JSON.parse(data);
      setContextData(parsed);
      setStudentName(parsed.student); // Pre-fill the name
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If we are replying to an existing feedback, mark it as reviewed in the list
    if (contextData?.id) {
      localStorage.setItem('lastRepliedId', contextData.id.toString());
    }
    
    // Logic for "submission" (e.g., API call) would go here
    console.log("Submitted Remark for:", studentName);
    
    // Redirect back to the list page
    router.push('/staff/feedback');
  };

  return (
    <div className="container-fluid py-4 animate-fade-in">
      {/* Back Button */}
      <button 
        className="btn btn-white border-0 fw-bold text-primary mb-3 d-flex align-items-center" 
        onClick={() => router.back()}
      >
        <span className="material-symbols-rounded me-1">arrow_back</span> Back to List
      </button>
      
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card-main border-0 shadow-sm bg-white overflow-hidden">
            
            {/* Header Section */}
            <div className="card-header-glass p-4 border-bottom bg-light">
              <h5 className="fw-bold mb-0 text-indigo">Mentoring Remark</h5>
              <p className="small text-muted mb-0">
                {contextData 
                  ? `Responding to: ${contextData.student}` 
                  : "Creating a new progress remark for student"}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 p-md-5">
              <div className="row g-4 mb-4">
                {/* Student Name Field */}
                <div className="col-md-6">
                  <label className="form-label fw-bold small text-muted text-uppercase ls-1">Student Name</label>
                  <input 
                    type="text" 
                    className={`form-control border-0 p-3 rounded-4 fw-semibold ${contextData ? 'bg-light' : 'bg-white border'}`} 
                    value={studentName}
                    // If contextData exists, it's a reply (Read Only). If not, they can type.
                    onChange={(e) => setStudentName(e.target.value)}
                    readOnly={!!contextData} 
                    placeholder="Enter student name..."
                    required 
                  />
                </div>

                {/* Remark Type Selection */}
                <div className="col-md-6">
                  <label className="form-label fw-bold small text-muted text-uppercase ls-1">Remark Type</label>
                  <select 
                    className="form-select border-0 bg-light p-3 rounded-4" 
                    value={remarkType}
                    onChange={(e) => setRemarkType(e.target.value)}
                    required
                  >
                    <option value="To Student">Guidance (To Student)</option>
                    <option value="Internal">Internal Note (Staff Only)</option>
                    <option value="Urgent">Urgent Action Required</option>
                  </select>
                </div>
              </div>

              {/* Context Alert: Shows the student's original comment if replying */}
              {contextData?.comment && (
                <div className="mb-4 p-3 rounded-4 bg-primary-soft border-start border-primary border-4 shadow-sm">
                  <label className="extra-small fw-bold text-uppercase text-primary ls-1 d-block mb-1">Student's Original Comment</label>
                  <p className="small mb-0 text-dark italic">"{contextData.comment}"</p>
                </div>
              )}

              {/* Observation Textarea */}
              <div className="mb-4">
                <label className="form-label fw-bold small text-muted text-uppercase ls-1">Observations & Feedback</label>
                <textarea 
                  className="form-control border-0 bg-light p-3 rounded-4" 
                  rows={5} 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required 
                  placeholder="Provide detailed feedback on the student's progress or session outcomes..."
                ></textarea>
              </div>

              {/* Footer Actions */}
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="notifyStudent" defaultChecked />
                  <label className="form-check-label small fw-medium text-muted" htmlFor="notifyStudent">
                    Notify student via email
                  </label>
                </div>
                
                <button type="submit" className="btn btn-indigo-glow px-5 py-3 rounded-pill fw-bold">
                  Post Remark
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}