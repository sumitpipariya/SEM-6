"use client";
import React, { useState } from 'react';
import styles from '../staff.module.css';

export default function StaffProfile() {
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - in a real app, this would come from an API
  const faculty = {
    name: "Dr. Amit Patel",
    id: "FAC-2024-089",
    designation: "Senior Professor",
    department: "Computer Science & Engineering",
    email: "amit.patel@university.edu",
    phone: "+91 98765 43210",
    cabin: "Block C, Room 402",
    experience: "12 Years",
    specialization: "Artificial Intelligence, Data Structures, Machine Learning",
  };

  return (
    <div className="container-fluid py-4 animate-fade-in">
      {/* Header Section */}
      <div className="d-flex align-items-center justify-content-between mb-4 px-2">
        <div>
          <h3 className="fw-black text-dark mb-1">Faculty Account</h3>
          <p className="text-secondary small fw-medium mb-0">Manage your professional profile and contact details</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`btn ${isEditing ? 'btn-success shadow-sm' : 'btn-outline-primary border-2'} rounded-4 px-4 py-2 fw-bold transition-all d-flex align-items-center gap-2`}
        >
          <span className="material-symbols-rounded fs-5">{isEditing ? 'check_circle' : 'edit_square'}</span>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="row g-4">
        {/* LEFT COLUMN: Identity Card */}
        <div className="col-lg-4 col-xl-3">
          <div className="card border-0 shadow-sm rounded-5 overflow-hidden">
            {/* Refined Banner */}
            <div className={`${styles.facultyProfileBanner} p-4 text-center`} style={{ background: 'linear-gradient(180deg, rgba(79, 70, 229, 0.05) 0%, rgba(255, 255, 255, 0) 100%)' }}>

              {/* Stylized Name Icon (Letter Avatar) */}
              <div className={`${styles.profileAvatarWrapper} mx-auto mb-3`}>
                <div className={styles.premiumNameIcon}>
                  {faculty.name.charAt(0)}
                </div>
                {isEditing && (
                  <button className={styles.avatarEditBtn} title="Upload New Photo">
                    <span className="material-symbols-rounded fs-6">add_a_photo</span>
                  </button>
                )}
              </div>

              <h5 className="fw-black text-dark mb-1">{faculty.name}</h5>
              <div className="d-flex justify-content-center">
                <span className="badge rounded-pill px-3 py-2 extra-small-text fw-bold" style={{ backgroundColor: '#EEF2FF', color: '#4F46E5' }}>
                  {faculty.designation}
                </span>
              </div>
            </div>

            <div className="card-body p-4 bg-light-subtle">
              <div className="d-flex flex-column gap-3">
                {/* ID Badge Item */}
                <div className="d-flex align-items-center gap-3 p-3 rounded-4 bg-white border border-light shadow-sm-hover transition-all">
                  <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '40px', height: '40px', backgroundColor: '#F1F5F9' }}>
                    <span className="material-symbols-rounded text-slate fs-5">badge</span>
                  </div>
                  <div>
                    <p className="extra-small-text text-muted fw-bold text-uppercase mb-0" style={{ fontSize: '0.65rem' }}>Employee ID</p>
                    <p className="small fw-black text-dark mb-0">{faculty.id}</p>
                  </div>
                </div>

                {/* Status Item */}
                <div className="d-flex align-items-center gap-3 p-3 rounded-4 bg-white border border-light shadow-sm-hover transition-all">
                  <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '40px', height: '40px', backgroundColor: '#ECFDF5' }}>
                    <span className="material-symbols-rounded text-success fs-5">verified_user</span>
                  </div>
                  <div>
                    <p className="extra-small-text text-muted fw-bold text-uppercase mb-0" style={{ fontSize: '0.65rem' }}>Account Status</p>
                    <p className="small fw-black text-success mb-0 d-flex align-items-center gap-1">
                      Verified <span className="material-symbols-rounded fs-6">check_circle</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* RIGHT COLUMN: Details Form */}
        <div className="col-lg-8 col-xl-9">
          <div className="card border-0 shadow-sm rounded-5 p-2">
            <div className="card-body p-4">
              <h5 className="fw-black text-dark mb-4 d-flex align-items-center gap-2">
                Personal Details
              </h5>

              <div className="row g-4">
                {[
                  { label: 'Full Name', val: faculty.name, icon: 'person', type: 'text' },
                  { label: 'Official Email', val: faculty.email, icon: 'alternate_email', type: 'email' },
                  { label: 'Mobile Number', val: faculty.phone, icon: 'smartphone', type: 'tel' },
                  { label: 'Cabin / Office', val: faculty.cabin, icon: 'meeting_room', type: 'text' },
                  { label: 'Department', val: faculty.department, icon: 'domain', type: 'text' },
                  { label: 'Teaching Experience', val: faculty.experience, icon: 'history_edu', type: 'text' },
                ].map((item, index) => (
                  <div className="col-md-6" key={index}>
                    <div className={styles.inputGroupPremium}>
                      <label className={styles.premiumLabel}>{item.label}</label>
                      <div className="position-relative">
                        <span className={`material-symbols-rounded ${styles.inputIconPremium}`}>
                          {item.icon}
                        </span>
                        <input
                          type={item.type}
                          className={`form-control ${styles.premiumInput} ${!isEditing ? styles.readOnlyInput : ''}`}
                          defaultValue={item.val}
                          readOnly={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="col-12 mt-4">
                  <div className={styles.inputGroupPremium}>
                    <label className={styles.premiumLabel}>Research Areas & Specializations</label>
                    <textarea
                      className={`form-control ${styles.premiumInput} ${!isEditing ? styles.readOnlyInput : ''}`}
                      rows={3}
                      defaultValue={faculty.specialization}
                      readOnly={!isEditing}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}