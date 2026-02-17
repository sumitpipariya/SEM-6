"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../staff.module.css';

// This matches the data structure in your Mentee Directory
const initialMentees = [
    { id: 101, name: "John Doe", roll: "21CS001" },
    { id: 102, name: "Jane Smith", roll: "21CS015" },
];

export default function AddMentoringSession() {
    const router = useRouter();
    const [mentees, setMentees] = useState(initialMentees);
    const [formData, setFormData] = useState({
        menteeId: '',
        menteeName: '', // Storing name for the history display
        date: new Date().toISOString().split('T')[0],
        category: 'Academic Guidance',
        notes: '',
        mood: 'Neutral'
    });

    useEffect(() => {
        // Load custom mentees if any exist in localStorage
        const savedMentees = JSON.parse(localStorage.getItem('custom_mentees') || '[]');
        setMentees([...initialMentees, ...savedMentees]);
    }, []);

    const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const student = mentees.find(m => m.id.toString() === selectedId);
        setFormData({
            ...formData,
            menteeId: selectedId,
            menteeName: student ? student.name : ''
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.menteeId) {
            alert("Please select a student");
            return;
        }

        const existingLogs = JSON.parse(localStorage.getItem('mentoring_logs') || '[]');
        const newLog = { ...formData, id: Date.now() };
        localStorage.setItem('mentoring_logs', JSON.stringify([newLog, ...existingLogs]));
        router.push('/staff/mentoring/history');
    };

    return (
        <div className={`${styles.dashboardContainer} animate-fade-in`}>
            <div className="container" style={{ maxWidth: '700px' }}>
                <div className="mb-4 text-center">
                    <h2 className="fw-black text-dark">Log Mentoring Session</h2>
                    <p className="text-muted">Select a student and document their progress.</p>
                </div>

                <div className={`${styles.tableContainer} p-4 p-md-5 border-0 shadow-premium`}>
                    <form onSubmit={handleSubmit} className="row g-4">
                        
                        {/* 1️⃣ Updated Student Name Dropdown */}
                        <div className="col-12">
                            <label className={styles.fieldLabel}>Select Mentee</label>
                            <select 
                                required
                                className={`form-select ${styles.fieldInput}`}
                                value={formData.menteeId}
                                onChange={handleStudentChange}
                            >
                                <option value="" disabled>Choose from your assigned mentees...</option>
                                {mentees.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.name} ({student.roll})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className={styles.fieldLabel}>Date of Session</label>
                            <input 
                                type="date" required value={formData.date}
                                className={`form-control ${styles.fieldInput}`}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className={styles.fieldLabel}>Session Category</label>
                            <select 
                                className={`form-select ${styles.fieldInput}`}
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                            >
                                <option>Academic Guidance</option>
                                <option>Personal Counseling</option>
                                <option>Career Support</option>
                                <option>Skill Development</option>
                            </select>
                        </div>

                        <div className="col-12">
                            <label className={styles.fieldLabel}>Discussion Notes</label>
                            <textarea 
                                className={`form-control ${styles.fieldInput}`} rows={4} required
                                placeholder="Write down the key discussion points and follow-up actions..."
                                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            ></textarea>
                        </div>

                        <div className="col-12 d-flex gap-3 pt-3">
                            <button type="submit" className={styles.btnStaffPrimary} style={{padding: '12px 30px'}}>
                                <span className="material-symbols-rounded me-2">save</span>
                                Save Session Log
                            </button>
                            <button type="button" onClick={() => router.back()} className="btn btn-light rounded-4 px-4 fw-bold">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}