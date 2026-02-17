"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MentorAssignmentPage() {
  const router = useRouter();
  
  // Data States
  const [assignments, setAssignments] = useState<any[]>([]);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [studentList, setStudentList] = useState<any[]>([]);

  // Form States (Matches Table: StudentMentor)
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // 1. Load Staff and Students to populate dropdowns
    const savedStaff = localStorage.getItem('STAFF_STORAGE');
    const savedStudents = localStorage.getItem('STUDENT_STORAGE');
    const savedAssigns = localStorage.getItem('ASSIGNMENT_STORAGE');

    if (savedStaff) setStaffList(JSON.parse(savedStaff));
    if (savedStudents) setStudentList(JSON.parse(savedStudents));
    
    // 2. Load existing assignments or set defaults
    if (savedAssigns) {
      setAssignments(JSON.parse(savedAssigns));
    } else {
      const initial = [
        { id: 1, StaffName: "Dr. Rajesh Kumar", StudentName: "John Doe", FromDate: "2026-01-01", ToDate: "2026-12-31", Description: "Primary Mentor" }
      ];
      setAssignments(initial);
      localStorage.setItem('ASSIGNMENT_STORAGE', JSON.stringify(initial));
    }
  }, []);

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    
    const staffObj = staffList.find(s => s.id.toString() === selectedStaff);
    const studentObj = studentList.find(s => s.id.toString() === selectedStudent);

    if (!staffObj || !studentObj) return alert("Please select both Mentor and Student");

    const newAssignment = {
      id: Date.now(),
      StaffName: staffObj.StaffName,
      StudentName: studentObj.StudentName,
      FromDate: fromDate,
      ToDate: toDate || "Ongoing",
      Description: description
    };

    const updated = [newAssignment, ...assignments];
    setAssignments(updated);
    localStorage.setItem('ASSIGNMENT_STORAGE', JSON.stringify(updated));
    
    // Reset Form
    setSelectedStudent("");
    setDescription("");
  };

  const handleUnassign = (id: number) => {
    if(confirm("Are you sure you want to revoke this mentorship assignment?")) {
      const updated = assignments.filter(a => a.id !== id);
      setAssignments(updated);
      localStorage.setItem('ASSIGNMENT_STORAGE', JSON.stringify(updated));
    }
  };

  return (
    <div className="container-fluid py-4 animate-fade-in">
      <div className="mb-4">
        <h2 className="fw-black text-dark mb-1">Mentor-Mentee Mapping</h2>
        <p className="text-secondary fw-medium">Establish relationships between Faculty and Students (Table: StudentMentor)</p>
      </div>

      <div className="row g-4">
        {/* Left Side: Assignment Form */}
        <div className="col-lg-4">
          <div className="card-main border-0 shadow-sm bg-white p-4">
            <h5 className="fw-bold text-indigo mb-4 d-flex align-items-center">
              <span className="material-symbols-rounded me-2">link</span> New Assignment
            </h5>
            <form onSubmit={handleAssign}>
              <div className="mb-3">
                <label className="extra-small fw-black text-muted text-uppercase">Select Mentor (Staff)</label>
                <select 
                  className="form-select border-0 bg-light p-3 rounded-3 mt-1"
                  value={selectedStaff}
                  onChange={(e) => setSelectedStaff(e.target.value)}
                  required
                >
                  <option value="">Choose Faculty...</option>
                  {staffList.map(s => <option key={s.id} value={s.id}>{s.StaffName}</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="extra-small fw-black text-muted text-uppercase">Select Mentee (Student)</label>
                <select 
                  className="form-select border-0 bg-light p-3 rounded-3 mt-1"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  required
                >
                  <option value="">Choose Student...</option>
                  {studentList.map(s => <option key={s.id} value={s.id}>{s.StudentName} ({s.EnrollmentNo})</option>)}
                </select>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="extra-small fw-black text-muted text-uppercase">From Date</label>
                  <input type="date" className="form-control border-0 bg-light p-3 rounded-3 mt-1" 
                    value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
                </div>
                <div className="col-6">
                  <label className="extra-small fw-black text-muted text-uppercase">To Date</label>
                  <input type="date" className="form-control border-0 bg-light p-3 rounded-3 mt-1" 
                    value={toDate} onChange={(e) => setToDate(e.target.value)} />
                </div>
              </div>

              <div className="mb-4">
                <label className="extra-small fw-black text-muted text-uppercase">Assignment Note</label>
                <textarea className="form-control border-0 bg-light p-3 rounded-3 mt-1" rows={2}
                  value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Academic Counseling"></textarea>
              </div>

              <button type="submit" className="btn btn-indigo-glow w-100 py-3 rounded-pill fw-bold">
                Assign Mentor
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Active Mapping Table */}
        <div className="col-lg-8">
          <div className="card-main border-0 shadow-sm bg-white overflow-hidden h-100">
            <div className="p-4 bg-light border-bottom d-flex justify-content-between align-items-center">
              <h6 className="fw-bold mb-0 text-dark">Active Mentorships</h6>
              <span className="badge bg-white text-indigo shadow-sm px-3 py-2 border">Total: {assignments.length}</span>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light-soft">
                  <tr className="extra-small fw-bold text-muted text-uppercase">
                    <th className="ps-4 py-3">Faculty Mentor</th>
                    <th className="py-3">Assigned Mentee</th>
                    <th className="py-3">Duration</th>
                    <th className="pe-4 py-3 text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((assign) => (
                    <tr key={assign.id} className="border-bottom">
                      <td className="ps-4">
                        <div className="fw-bold text-dark">{assign.StaffName}</div>
                        <div className="extra-small text-muted">Lead Mentor</div>
                      </td>
                      <td>
                        <div className="fw-bold text-indigo">{assign.StudentName}</div>
                        <div className="extra-small text-muted italic">"{assign.Description || 'No notes'}"</div>
                      </td>
                      <td>
                        <div className="small text-dark fw-medium">{assign.FromDate}</div>
                        <div className="extra-small text-muted">to {assign.ToDate}</div>
                      </td>
                      <td className="pe-4 text-end">
                        <button 
                          className="btn-action-delete"
                          onClick={() => handleUnassign(assign.id)}
                          title="Revoke Assignment"
                        >
                          <span className="material-symbols-rounded">link_off</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {assignments.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center py-5 text-muted">No active assignments found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-action-delete {
          width: 38px; height: 38px; border-radius: 10px; border: none;
          background-color: #fff1f2; color: #e11d48; display: flex;
          align-items: center; justify-content: center; transition: all 0.2s ease;
          margin-left: auto;
        }
        .btn-action-delete:hover {
          background-color: #e11d48; color: white; transform: scale(1.05);
        }
        .bg-light-soft { background-color: #f8fafc; }
      `}</style>
    </div>
  );
}