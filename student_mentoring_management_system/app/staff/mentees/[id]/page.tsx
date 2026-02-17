"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../staff.module.css';

export default function MenteeDetail() {
    const router = useRouter();
    const params = useParams();
    const [mentee, setMentee] = useState<any>(null);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('custom_mentees') || '[]');
        const combined = [...initialMentees, ...saved];
        const found = combined.find((m: any) => m.id.toString() === params.id);
        setMentee(found);
    }, [params.id]);

    if (!mentee) return (
        <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
            <div className="spinner-border text-primary mb-3" role="status"></div>
            <span className="text-muted fw-bold">Loading Profile...</span>
        </div>
    );

    return (
        <div className={`${styles.dashboardContainer} animate-fade-in`}>
            <div className="container py-2">
                {/* Back Button */}
                <button 
                    onClick={() => router.back()} 
                    className="btn btn-link text-decoration-none text-muted mb-4 p-0 d-flex align-items-center gap-2 hover-translate-x"
                    style={{ transition: 'transform 0.2s' }}
                >
                    <span className="material-symbols-rounded fs-5">arrow_back</span> 
                    <span className="fw-bold small text-uppercase ls-1">Back to Directory</span>
                </button>

                <div className="row g-4">
                    {/* Left: Profile Sidebar */}
                    <div className="col-lg-4">
                        <div className={`${styles.tableContainer} p-4 text-center h-100 shadow-premium`}>
                            <div className="position-relative d-inline-block mb-4">
                                <div className={styles.premiumNameIcon} style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}>
                                    {mentee.name.charAt(0)}
                                </div>
                                <span className="position-absolute bottom-0 end-0 bg-success border border-white border-3 rounded-circle p-2" title="Online"></span>
                            </div>
                            
                            <h3 className="fw-black text-dark mb-1">{mentee.name}</h3>
                            <p className="text-muted small mb-4">
                                <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-bold">
                                    {mentee.roll}
                                </span>
                            </p>

                            <div className="d-grid gap-3">
                                <button className={styles.btnStaffPrimary}>
                                    <span className="material-symbols-rounded me-2">mail</span>
                                    Message Student
                                </button>
                                <button className={styles.viewActionBtn} style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                                    <span className="material-symbols-rounded me-2">download</span>
                                    Download Report
                                </button>
                            </div>

                            <hr className="my-4 opacity-50" />
                            
                            <div className="text-start">
                                <label className={styles.fieldLabel}>Email Address</label>
                                <p className="fw-bold small mb-3">{mentee.email}</p>
                                <label className={styles.fieldLabel}>Department</label>
                                <p className="fw-bold small mb-0">{mentee.dept || 'Engineering'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Detailed Analytics */}
                    <div className="col-lg-8">
                        {/* Status Grid */}
                        <div className="row g-3 mb-4">
                            {[
                                { label: 'Stress Level', value: mentee.stress, color: mentee.stress === 'High' ? 'text-danger' : 'text-success', icon: 'psychology' },
                                { label: 'Attendance', value: '92%', color: 'text-dark', icon: 'event_available' },
                                { label: 'Academic GPA', value: '3.8 / 4.0', color: 'text-dark', icon: 'auto_stories' }
                            ].map((item, idx) => (
                                <div className="col-sm-4" key={idx}>
                                    <div className={`${styles.tableContainer} p-3 border-0 shadow-sm card-hover-up`}>
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <span className="material-symbols-rounded text-muted fs-5">{item.icon}</span>
                                            <small className="text-muted fw-bold text-uppercase ls-1" style={{ fontSize: '10px' }}>{item.label}</small>
                                        </div>
                                        <span className={`fs-5 fw-black ${item.color}`}>{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* History Timeline */}
                        <div className={`${styles.tableContainer} p-4 shadow-sm`}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-black text-dark mb-0 d-flex align-items-center gap-2">
                                    <span className="material-symbols-rounded text-primary">history</span>
                                    Mentoring History
                                </h5>
                                <button className={styles.viewActionBtn} style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
                                    + New Entry
                                </button>
                            </div>

                            <div className="position-relative ps-4 border-start border-2" style={{ borderColor: '#f1f5f9 !important' }}>
                                {/* Entry 1 */}
                                <div className="mb-5 position-relative">
                                    <div className="position-absolute bg-primary rounded-circle shadow-primary-lg" 
                                         style={{ width: '14px', height: '14px', left: '-32px', top: '5px', border: '3px solid white' }}></div>
                                    <div className="d-flex justify-content-between align-items-start mb-1">
                                        <h6 className="fw-bold text-dark mb-0">Academic Review Session</h6>
                                        <small className="text-primary fw-bold bg-primary-soft px-2 py-1 rounded">12 Jan 2026</small>
                                    </div>
                                    <p className="small text-muted mb-0">Discussed project milestones and lab results. Student is on track and showing improved focus in data structures.</p>
                                </div>

                                {/* Entry 2 */}
                                <div className="position-relative">
                                    <div className="position-absolute bg-secondary rounded-circle" 
                                         style={{ width: '14px', height: '14px', left: '-32px', top: '5px', border: '3px solid white' }}></div>
                                    <div className="d-flex justify-content-between align-items-start mb-1">
                                        <h6 className="fw-bold text-dark mb-0">Career Goal Setting</h6>
                                        <small className="text-muted fw-bold bg-light px-2 py-1 rounded">05 Dec 2025</small>
                                    </div>
                                    <p className="small text-muted mb-0">Reviewed internship applications for Summer 2026. Advised on portfolio improvements and LinkedIn networking.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* In-page styles for the hover effects */}
            <style jsx>{`
                .card-hover-up {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    cursor: pointer;
                }
                .card-hover-up:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 12px 20px rgba(0,0,0,0.08) !important;
                }
                .hover-translate-x:hover {
                    transform: translateX(-5px);
                }
                .ls-1 { letter-spacing: 1px; }
            `}</style>
        </div>
    );
}

const initialMentees = [
    { id: 101, name: "John Doe", roll: "21CS001", email: "john@univ.edu", stress: "Low", type: "Fast Learner", dept: "CS Eng" },
    { id: 102, name: "Jane Smith", roll: "21CS015", email: "jane@univ.edu", stress: "High", type: "Average", dept: "CS Eng" },
];