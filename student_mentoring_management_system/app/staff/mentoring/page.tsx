"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../staff.module.css';

const initialSessions = [
    { id: 1, name: "Arjun Mehta", enrollment: "22BECE01", type: "Fast Learner", nextDate: "2026-02-15" },
    { id: 2, name: "Priya Shah", enrollment: "22BECE12", type: "Average", nextDate: "2026-02-10" },
    { id: 3, name: "Deep Patel", enrollment: "22BECE45", type: "Advanced", nextDate: "2026-03-01" },
];

export default function MentoringSessionsPage() {
    const [sessions, setSessions] = useState(initialSessions);

    useEffect(() => {
        const savedLogs = JSON.parse(localStorage.getItem('mentoring_logs') || '[]');
        if (savedLogs.length > 0) {
        }
    }, []);

    return (
        <div className="container-fluid">

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
                <div>
                    <h2 className="fw-black text-dark mb-1">Mentoring Sessions</h2>
                    <p className="text-muted small mb-0">All mentoring sessions conducted by you</p>
                </div>

                <Link href="/staff/mentoring/add" className="text-decoration-none">
                    <button className={styles.btnStaffPrimary}>
                        <span className="material-symbols-rounded me-2">add_circle</span>
                        Add Mentoring Session
                    </button>
                </Link>
            </div>

            {/* 3️⃣ Mentoring Sessions Table */}
            <div className={`${styles.tableContainer} shadow-premium border-0`}>
                <div className="table-responsive">
                    <table className={styles.customTable}>
                        <thead>
                            <tr>
                                <th className="ps-4">Student Name</th>
                                <th>Enrollment No</th>
                                <th>Mentoring Type</th>
                                <th>Next Mentoring Date</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.map((session) => (
                                <tr key={session.id} className="table-row-hover">
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center">
                                            <div className={styles.avatar}>
                                                {session.name.charAt(0)}
                                            </div>
                                            <div className="ms-3 fw-bold text-dark">
                                                {session.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-secondary fw-medium">{session.enrollment}</span>
                                    </td>
                                    <td>
                                        <span className={`badge px-3 py-2 rounded-pill fw-bold ${getTypeClass(session.type)}`} style={{ fontSize: '10px' }}>
                                            {session.type.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="material-symbols-rounded text-muted fs-6">calendar_today</span>
                                            <span className="small fw-bold text-dark">{session.nextDate}</span>
                                        </div>
                                    </td>
                                    <td className="text-end pe-4">
                                        <div className="d-flex justify-content-end gap-2">
                                            <Link href={`/staff/mentoring/history`}>
                                                <button className={styles.viewActionBtn} title="History">
                                                    <span className="material-symbols-rounded fs-5">history</span>
                                                </button>
                                            </Link>


                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {sessions.length === 0 && (
                    <div className="text-center py-5">
                        <span className="material-symbols-rounded text-muted opacity-25" style={{ fontSize: '3.5rem' }}>record_voice_over</span>
                        <p className="text-muted mt-2">No mentoring sessions found.</p>
                    </div>
                )}
            </div>


            <style jsx>{`
                .table-row-hover {
                    transition: all 0.2s ease;
                }
                .table-row-hover:hover {
                    background-color: #fbfcfe !important;
                }
                .bg-fast { background: #e0e7ff; color: #4338ca; }
                .bg-average { background: #fef9c3; color: #a16207; }
                .bg-advanced { background: #dcfce7; color: #15803d; }
            `}</style>
        </div>
    );
}

// Type મુજબ Badge Color નક્કી કરવા માટેનું function
function getTypeClass(type: string) {
    switch (type.toLowerCase()) {
        case 'fast learner': return 'bg-fast';
        case 'average': return 'bg-average';
        case 'advanced': return 'bg-advanced';
        default: return 'bg-light text-dark';
    }
}