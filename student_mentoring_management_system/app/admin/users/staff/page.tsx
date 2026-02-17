"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminStaffPage() {
  const router = useRouter();
  const [staffList, setStaffList] = useState<any[]>([]);

  const STATIC_DATA = [
    { id: 101, StaffName: "Dr. Rajesh Kumar", EmailAddress: "rajesh.k@university.edu", MobileNo: "9876543210", Description: "Senior Faculty - IT" },
    { id: 102, StaffName: "Prof. Anita Sharma", EmailAddress: "anita.s@university.edu", MobileNo: "8765432109", Description: "Assistant Professor - CS" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('STAFF_STORAGE');
    if (saved) {
      setStaffList(JSON.parse(saved));
    } else {
      setStaffList(STATIC_DATA);
      localStorage.setItem('STAFF_STORAGE', JSON.stringify(STATIC_DATA));
    }
  }, []);

  const handleDelete = (id: number) => {
    if(confirm("Permanently remove this mentor?")) {
      const updated = staffList.filter(s => s.id !== id);
      setStaffList(updated);
      localStorage.setItem('STAFF_STORAGE', JSON.stringify(updated));
    }
  };

  return (
    <div className="container-fluid py-4 animate-fade-in">
      {/* Header section... (keeping as per your design) */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-black text-dark mb-1">Faculty Mentors</h2>
          <p className="text-secondary fw-medium mb-0">Manage university staff and roles</p>
        </div>
        <button 
          className="btn btn-indigo-glow rounded-pill px-4 py-2 fw-bold d-flex align-items-center"
          onClick={() => router.push('/admin/users/staff/new')}
        >
          <span className="material-symbols-rounded me-2">add_circle</span> Add Mentor
        </button>
      </div>

      <div className="card card-main border-0 shadow-sm overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr className="text-secondary extra-small fw-bold text-uppercase">
                <th className="ps-4 py-3">Mentor Identity</th>
                <th className="py-3">Contact info</th>
                <th className="py-3">Role</th>
                <th className="pe-4 py-3 text-end">Management</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff.id} className="border-bottom">
                  <td className="ps-4">
                    <div className="d-flex align-items-center py-2">
                      <div className="avatar-md-circle me-3 bg-indigo-soft fw-bold d-flex align-items-center justify-content-center" style={{width: '45px', height: '45px', borderRadius: '12px'}}>
                        {staff.StaffName.charAt(0)}
                      </div>
                      <div>
                        <div className="fw-bold text-dark">{staff.StaffName}</div>
                        <div className="extra-small text-muted">ID: {staff.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="small">
                    <div className="text-dark fw-medium">{staff.EmailAddress}</div>
                    <div className="text-muted">{staff.MobileNo}</div>
                  </td>
                  <td><span className="badge rounded-pill bg-light text-indigo border px-3">{staff.Description}</span></td>
                  
                  {/* PREMIUM BUTTONS SECTION */}
                  <td className="pe-4 text-end">
                    <div className="d-flex justify-content-end gap-2">
                      {/* Edit Button: Soft Blue Circle */}
                      <button 
                        className="btn-action-edit"
                        onClick={() => router.push(`/admin/users/staff/${staff.id}`)}
                        title="Edit Mentor"
                      >
                        <span className="material-symbols-rounded">edit_note</span>
                      </button>

                      {/* Delete Button: Soft Red Circle */}
                      <button 
                        className="btn-action-delete"
                        onClick={() => handleDelete(staff.id)}
                        title="Delete Mentor"
                      >
                        <span className="material-symbols-rounded">delete_sweep</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Internal CSS for the Premium Buttons */}
      <style jsx>{`
        .btn-action-edit {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: none;
          background-color: #eff6ff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .btn-action-edit:hover {
          background-color: #2563eb;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
        }

        .btn-action-delete {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: none;
          background-color: #fff1f2;
          color: #e11d48;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .btn-action-delete:hover {
          background-color: #e11d48;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(225, 29, 72, 0.2);
        }

        .material-symbols-rounded {
          font-size: 20px;
        }
      `}</style>
    </div>
  );
}