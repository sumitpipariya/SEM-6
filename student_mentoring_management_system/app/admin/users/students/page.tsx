"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminStudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);

  // Static initial data for Table: Student
  const STATIC_STUDENTS = [
    { id: 1, StudentName: "John Doe", EnrollmentNo: "ENR2026001", EmailAddress: "john.doe@university.in", MobileNo: "9000011111", created: "2026-01-15" },
    { id: 2, StudentName: "Jane Smith", EnrollmentNo: "ENR2026002", EmailAddress: "jane.s@university.in", MobileNo: "9000022222", created: "2026-01-18" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('STUDENT_STORAGE');
    if (saved) {
      setStudents(JSON.parse(saved));
    } else {
      setStudents(STATIC_STUDENTS);
      localStorage.setItem('STUDENT_STORAGE', JSON.stringify(STATIC_STUDENTS));
    }
  }, []);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to remove this student record?")) {
      const updated = students.filter(s => s.id !== id);
      setStudents(updated);
      localStorage.setItem('STUDENT_STORAGE', JSON.stringify(updated));
    }
  };

  return (
    <div className="container-fluid py-4 animate-fade-in">
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="fw-black text-dark mb-1">Student Enrollment</h2>
          <p className="text-secondary fw-medium mb-0">University Mentee Records (Table: Student)</p>
        </div>
        <button 
          className="btn btn-indigo-glow rounded-pill px-4 py-2 fw-bold d-flex align-items-center"
          onClick={() => router.push('/admin/users/students/new')}
        >
          <span className="material-symbols-rounded me-2">group_add</span> Register Student
        </button>
      </div>

      <div className="card-main border-0 shadow-sm overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light text-uppercase extra-small fw-bold text-secondary">
              <tr>
                <th className="ps-4 py-3">Student Identity</th>
                <th className="py-3">Enrollment No</th>
                <th className="py-3">Contact</th>
                <th className="py-3">Registered On</th>
                <th className="pe-4 py-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((std) => (
                <tr key={std.id} className="border-bottom">
                  <td className="ps-4">
                    <div className="fw-bold text-dark">{std.StudentName}</div>
                    <div className="extra-small text-muted">ID: #{std.id}</div>
                  </td>
                  <td>
                    <span className="badge bg-primary-soft text-primary border fw-bold px-3">
                      {std.EnrollmentNo}
                    </span>
                  </td>
                  <td>
                    <div className="small text-dark fw-medium">{std.EmailAddress}</div>
                    <div className="extra-small text-muted">{std.MobileNo}</div>
                  </td>
                  <td className="small text-secondary">{std.created}</td>
                  <td className="pe-4 text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <button 
                        className="btn-action-edit"
                        onClick={() => router.push(`/admin/users/students/${std.id}`)}
                      >
                        <span className="material-symbols-rounded">edit_square</span>
                      </button>
                      <button 
                        className="btn-action-delete"
                        onClick={() => handleDelete(std.id)}
                      >
                        <span className="material-symbols-rounded">person_remove</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .btn-action-edit {
          width: 38px; height: 38px; border-radius: 10px; border: none;
          background-color: #eff6ff; color: #2563eb; display: flex;
          align-items: center; justify-content: center; transition: all 0.2s ease;
        }
        .btn-action-edit:hover {
          background-color: #2563eb; color: white; transform: translateY(-2px);
        }
        .btn-action-delete {
          width: 38px; height: 38px; border-radius: 10px; border: none;
          background-color: #fff1f2; color: #e11d48; display: flex;
          align-items: center; justify-content: center; transition: all 0.2s ease;
        }
        .btn-action-delete:hover {
          background-color: #e11d48; color: white; transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}