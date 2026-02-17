"use client";
import React from 'react';

// Dummy Data mapped to your SQL Schema (Staff + StudentMentoring)
const MENTOR_DATA = {
  // Staff Table Fields
  staff: {
    name: "Dr. Rajesh Kumar",
    role: "Senior Professor",
    email: "rajesh.kumar@university.edu",
    phone: "+91 98765 43210",
    dept: "Computer Science & Engineering",
    description: "Specializes in AI and Student Career Counseling with 15+ years of academic experience.",
  },
  // StudentMentor Table Fields
  assignment: {
    fromDate: "July 15, 2024",
    status: "Active"
  },
  // StudentMentoring Table Fields (Latest Session)
  latestSession: {
    date: "Dec 10, 2025",
    stressLevel: "Moderate",
    learnerType: "Kinesthetic",
    attendance: "Present",
    agenda: "Semester Progress Review & Project Milestones",
    issues: "Discussed time management for final year project and documentation standards.",
    staffOpinion: "The student is showing great interest in technical labs but needs to focus more on theoretical documentation."
  }
};

export default function StudentMentorPage() {
  return (
    <div className="container-fluid py-4 animate-fade-in">
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="fw-black text-dark">My Mentor</h2>
          <p className="text-secondary fw-medium">View official mentor details and your current academic status.</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Mentor Profile Card (Staff Table) */}
        <div className="col-12 col-xl-4">
          <div className="card-mentor border-0 shadow-sm overflow-hidden h-100 bg-white">
            <div className="mentor-cover-gradient"></div>
            <div className="p-4 pt-0 text-center">
              <div className="mentor-avatar-xl shadow-lg border border-5 border-white mx-auto mb-3">RK</div>
              <h4 className="fw-bold text-dark mb-1">{MENTOR_DATA.staff.name}</h4>
              <p className="text-muted small mb-3">{MENTOR_DATA.staff.role} • {MENTOR_DATA.staff.dept}</p>
              
              <div className="d-flex justify-content-center gap-2 mb-4">
                <a href={`mailto:${MENTOR_DATA.staff.email}`} className="btn btn-primary-premium rounded-pill px-3 py-2">
                   <span className="material-symbols-rounded fs-6 me-2">mail</span> Message
                </a>
                <a href={`tel:${MENTOR_DATA.staff.phone}`} className="btn btn-light-outline rounded-pill px-3 py-2">
                   <span className="material-symbols-rounded fs-6 me-2">call</span> Call
                </a>
              </div>

              <hr className="opacity-10" />

              <div className="text-start mt-4">
                <label className="extra-small text-uppercase fw-bold text-muted ls-1">Bio</label>
                <p className="small text-secondary mb-3">{MENTOR_DATA.staff.description}</p>
                
                <div className="d-flex align-items-center p-2 bg-light rounded-3 mb-2">
                  <span className="material-symbols-rounded text-primary me-3">verified</span>
                  <div className="small fw-bold text-dark">Assigned: {MENTOR_DATA.assignment.fromDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mentoring Insights (StudentMentoring Table) */}
        <div className="col-12 col-xl-8">
          <div className="card-main border-0 shadow-sm p-4 h-100 bg-white">
            <h5 className="fw-bold mb-4 d-flex align-items-center">
              <span className="material-symbols-rounded text-primary me-2">analytics</span>
              Mentoring Insights
            </h5>
            
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <div className="insight-box p-3 rounded-4" style={{ background: '#eef2ff' }}>
                  <div className="d-flex align-items-center">
                    <div className="icon-circle bg-white text-primary shadow-sm me-3">
                      <span className="material-symbols-rounded">psychology</span>
                    </div>
                    <div>
                      <div className="extra-small text-muted text-uppercase fw-bold">Stress Level</div>
                      <div className="fw-bold text-dark fs-5">{MENTOR_DATA.latestSession.stressLevel}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="insight-box p-3 rounded-4" style={{ background: '#ecfdf5' }}>
                  <div className="d-flex align-items-center">
                    <div className="icon-circle bg-white text-success shadow-sm me-3">
                      <span className="material-symbols-rounded">rocket_launch</span>
                    </div>
                    <div>
                      <div className="extra-small text-muted text-uppercase fw-bold">Learner Type</div>
                      <div className="fw-bold text-dark fs-5">{MENTOR_DATA.latestSession.learnerType}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="session-detail-card p-4 rounded-4 border bg-white shadow-xs">
               <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <span className="badge bg-primary-soft text-primary mb-2">LATEST SESSION</span>
                    <h6 className="fw-bold mb-0">{MENTOR_DATA.latestSession.agenda}</h6>
                  </div>
                  <div className="text-end">
                    <div className="small fw-bold text-dark">{MENTOR_DATA.latestSession.date}</div>
                    <div className="extra-small text-success fw-bold">● {MENTOR_DATA.latestSession.attendance}</div>
                  </div>
               </div>
               
               <div className="p-3 bg-light rounded-3 mb-3 border-start border-4 border-primary">
                  <label className="extra-small fw-bold text-muted text-uppercase mb-1 d-block">Issues Discussed</label>
                  <p className="small text-dark mb-0 italic">{MENTOR_DATA.latestSession.issues}</p>
               </div>

               <div className="mt-3">
                  <label className="extra-small fw-bold text-muted text-uppercase mb-1 d-block">Mentor's Remark</label>
                  <p className="small text-secondary mb-0">{MENTOR_DATA.latestSession.staffOpinion}</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}