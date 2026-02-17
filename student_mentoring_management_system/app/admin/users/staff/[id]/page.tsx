"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function StaffFormPage() {
  const router = useRouter();
  const { id } = useParams();
  const isEdit = id !== 'new';

  const [formData, setFormData] = useState({
    StaffName: '',
    EmailAddress: '',
    MobileNo: '',
    Password: '',
    Description: ''
  });

  useEffect(() => {
    if (isEdit) {
      const saved = localStorage.getItem('STAFF_STORAGE');
      if (saved) {
        const staff = JSON.parse(saved).find((s: any) => s.id.toString() === id);
        if (staff) setFormData(staff);
      }
    }
  }, [id, isEdit]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const saved = localStorage.getItem('STAFF_STORAGE');
    let list = saved ? JSON.parse(saved) : [];

    if (isEdit) {
      list = list.map((s: any) => s.id.toString() === id ? { ...formData, id: s.id } : s);
    } else {
      const newEntry = { ...formData, id: Math.floor(1000 + Math.random() * 9000) };
      list.push(newEntry);
    }

    localStorage.setItem('STAFF_STORAGE', JSON.stringify(list));
    router.push('/admin/users/staff');
  };

  return (
    <div className="container py-5 animate-fade-in">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card-main border-0 shadow-lg bg-white overflow-hidden">
            <div className="p-4 bg-indigo text-white d-flex justify-content-between align-items-center" style={{background: '#4f46e5'}}>
                <h4 className="fw-bold mb-0">{isEdit ? 'Update Profile' : 'New Mentor Registration'}</h4>
                <button className="btn btn-sm btn-white bg-white bg-opacity-25 text-white border-0" onClick={() => router.back()}>Cancel</button>
            </div>
            
            <form onSubmit={handleSave} className="p-4 p-md-5">
              <div className="row g-4">
                <div className="col-12">
                  <label className="form-label extra-small fw-black text-muted text-uppercase">Mentor Full Name</label>
                  <input type="text" className="form-control border-0 bg-light p-3 rounded-3" value={formData.StaffName} 
                    onChange={(e) => setFormData({...formData, StaffName: e.target.value})} required placeholder="e.g. Dr. Jane Smith" />
                </div>
                
                <div className="col-md-6">
                  <label className="form-label extra-small fw-black text-muted text-uppercase">Email</label>
                  <input type="email" className="form-control border-0 bg-light p-3 rounded-3" value={formData.EmailAddress} 
                    onChange={(e) => setFormData({...formData, EmailAddress: e.target.value})} required />
                </div>

                <div className="col-md-6">
                  <label className="form-label extra-small fw-black text-muted text-uppercase">Mobile</label>
                  <input type="text" className="form-control border-0 bg-light p-3 rounded-3" value={formData.MobileNo} 
                    onChange={(e) => setFormData({...formData, MobileNo: e.target.value})} required />
                </div>

                {!isEdit && (
                  <div className="col-12">
                    <label className="form-label extra-small fw-black text-muted text-uppercase">Temporary Password</label>
                    <input type="password" className="form-control border-0 bg-light p-3 rounded-3" value={formData.Password} 
                      onChange={(e) => setFormData({...formData, Password: e.target.value})} required />
                  </div>
                )}

                <div className="col-12">
                  <label className="form-label extra-small fw-black text-muted text-uppercase">Department / Description</label>
                  <textarea className="form-control border-0 bg-light p-3 rounded-3" rows={3} value={formData.Description} 
                    onChange={(e) => setFormData({...formData, Description: e.target.value})} placeholder="Mention department or role..."></textarea>
                </div>

                <div className="col-12 mt-5">
                  <button type="submit" className="btn btn-indigo-glow w-100 py-3 rounded-pill fw-bold text-uppercase ls-1">
                    {isEdit ? 'Update Record' : 'Complete Registration'}
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