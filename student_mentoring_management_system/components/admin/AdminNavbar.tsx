"use client";
import React from 'react';

export default function AdminNavbar({ sidebarWidth }: { sidebarWidth: string }) {
  return (
    <nav 
      className="navbar navbar-expand-lg bg-white border-bottom px-4"
      style={{ 
        height: '70px', 
        position: 'fixed', 
        right: 0, 
        left: sidebarWidth, 
        top: 0, 
        zIndex: 1030,
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
      }}
    >
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <div className="d-none d-lg-block">
            <h5 className="fw-black text-dark mb-0">Central Administration</h5>
            <p className="text-muted extra-small-text mb-0 fw-bold">SYSTEM CONTROL PANEL</p>
          </div>
        </div>

        <div className="ms-auto d-flex align-items-center gap-3">

          {/* Admin Identity */}
          <div className="d-flex align-items-center gap-2 px-2 border-start ps-3 ms-2">
            <div className="text-end d-none d-lg-block">
              <p className="mb-0 fw-black text-dark" style={{ fontSize: '0.75rem', lineHeight: '1' }}>ADMIN ROOT</p>
              <p className="mb-0 text-danger fw-bold" style={{ fontSize: '0.65rem' }}>Full Access</p>
            </div>
            <div className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center shadow-sm" style={{ width: '38px', height: '38px' }}>
              <span className="material-symbols-rounded">admin_panel_settings</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}