"use client";
import React, { useEffect, useState } from 'react';
import styles from '../../staff.module.css';

export default function MentoringHistory() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('mentoring_logs') || '[]');
        setLogs(history);
    }, []);

    const deleteLog = (id: number) => {
        const updated = logs.filter((log: any) => log.id !== id);
        setLogs(updated);
        localStorage.setItem('mentoring_logs', JSON.stringify(updated));
    };

    return (
        <div className={`${styles.dashboardContainer} animate-fade-in`}>
            <div className="container-fluid">
                <div className="mb-5">
                    <h2 className="fw-black text-dark">Session History</h2>
                    <p className="text-muted small">A chronological record of all mentoring activities.</p>
                </div>

                <div className={`${styles.tableContainer} shadow-premium border-0`}>
                    <table className={styles.customTable}>
                        <thead>
                            <tr>
                                <th className="ps-4">Mentee Name</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Outcome/Notes</th>
                                <th className="text-end pe-4">Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log: any) => (
                                <tr key={log.id} className="table-row">
                                    <td className="ps-4">
                                        <div className="fw-bold text-dark">{log.menteeName}</div>
                                    </td>
                                    <td><span className="text-muted small font-monospace">{log.date}</span></td>
                                    <td>
                                        <span className="badge bg-primary-soft text-primary px-3 py-2 rounded-pill fw-bold" style={{fontSize: '10px'}}>
                                            {log.category.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <p className="mb-0 text-muted small text-truncate" style={{maxWidth: '250px'}}>
                                            {log.notes}
                                        </p>
                                    </td>
                                    <td className="text-end pe-4">
                                        <button onClick={() => deleteLog(log.id)} className="btn btn-link text-danger p-0 ms-3">
                                            <span className="material-symbols-rounded">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {logs.length === 0 && (
                        <div className="text-center py-5">
                            <span className="material-symbols-rounded text-muted opacity-25" style={{fontSize: '4rem'}}>history_toggle_off</span>
                            <p className="text-muted mt-3">No history logs found.</p>
                        </div>
                    )}
                </div>
            </div>
            <style jsx>{`
                .table-row:hover { background-color: #fbfcfe; }
                .bg-primary-soft { background: rgba(79, 70, 229, 0.08); }
            `}</style>
        </div>
    );
}