"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function StudentFormPage() {
  const router = useRouter();
  const { id } = useParams();
  const isEdit = id !== 'new';

  const [formData, setFormData] = useState({
    StudentName: '',
    EnrollmentNo: '',
    EmailAddress: '',
    MobileNo: '',
    Password: '',
  });

  useEffect(() => {
    if (isEdit) {
      const saved = localStorage.getItem('STUDENT_STORAGE');
      if (saved) {
        const student = JSON.parse(saved).find((s: any) => s.id.toString() === id);
        if (student) setFormData(student);
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const saved = localStorage.getItem('STUDENT_STORAGE');
    let list = saved ? JSON.parse(saved) : [];

    if (isEdit) {
      list = list.map((s: any) => s.id.toString() === id ? { ...formData, id: s.id, created: s.created } : s);
    } else {
      const newStudent = { 
        ...formData, 
        id: Math.floor(1000 + Math.random() * 9000),
        created: new Date().toISOString().split('T')[0]
      };
      list.push(newStudent);
    }

    localStorage.setItem('STUDENT_STORAGE', JSON.stringify(list));
    router.push('/admin/users/students');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card-main border-0 shadow-lg bg-white overflow-hidden">
            <div className="p-4 bg-primary text-white d-flex justify-content-between align-items-center" style={{background: '#2563eb'}}>
              <h4 className="fw-bold mb-0">{isEdit ? 'Update Student' : 'New Enrollment'}</h4>
              <button className="btn btn-sm btn-light border-0 fw-bold" onClick={() => router.back()}>Back</button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 p-md-5">
              <div className="row g-4">
                <div className="col-12">
                  <label className="form-label extra-small fw-black text-muted text-uppercase">Full Name</label>
                  <input type="text" className="form-control border-0 bg-light p-3" value={formData.StudentName} 
                    onChange={(e) => setFormData({...formData, StudentName: e.target.value})} required />
                </div>

                <div className="col-md-12">
                  <label className="form-label extra-small fw-black text-muted text-uppercase">Enrollment Number</label>
                  <input type="text" className="form-control border-0 bg-light p-3" value={formData.EnrollmentNo} 
                    onChange={(e) => setFormData({...formData, EnrollmentNo: e.target.value})} required placeholder="e.g. ENR2026XXX" />
                </div>

                <div className="col-md-6">
                  <label className="form-label extra-small fw-black text-muted text-uppercase">Email</label>
                  <input type="email" className="form-control border-0 bg-light p-3" value={formData.EmailAddress} 
                    onChange={(e) => setFormData({...formData, EmailAddress: e.target.value})} required />
                </div>

                <div className="col-md-6">
                  <label className="form-label extra-small fw-black text-muted text-uppercase">Mobile</label>
                  <input type="text" className="form-control border-0 bg-light p-3" value={formData.MobileNo} 
                    onChange={(e) => setFormData({...formData, MobileNo: e.target.value})} required />
                </div>

                {!isEdit && (
                  <div className="col-12">
                    <label className="form-label extra-small fw-black text-muted text-uppercase">Login Password</label>
                    <input type="password" className="form-control border-0 bg-light p-3" value={formData.Password} 
                      onChange={(e) => setFormData({...formData, Password: e.target.value})} required />
                  </div>
                )}

                <div className="col-12 mt-5">
                  <button type="submit" className="btn btn-indigo-glow w-100 py-3 rounded-pill fw-bold">
                    {isEdit ? 'Save Changes' : 'Confirm Enrollment'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}