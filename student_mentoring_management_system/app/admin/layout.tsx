"use client";
import React, { useState } from 'react';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarWidth = isCollapsed ? '80px' : '280px';

  return (
    <div className="d-flex min-vh-100 bg-light-gray overflow-hidden">
      {/* 1. Fixed Sidebar */}
      <aside 
        style={{ 
          width: sidebarWidth, 
          height: '100vh', 
          position: 'fixed', 
          left: 0, 
          top: 0, 
          zIndex: 1040,
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backgroundColor: '#fff',
          boxShadow: '4px 0 10px rgba(0,0,0,0.02)'
        }}
      >
        <AdminSidebar 
            isCollapsed={isCollapsed} 
            onToggle={() => setIsCollapsed(!isCollapsed)} 
        />
      </aside>

      {/* 2. Main UI Wrapper */}
      <div 
        className="flex-grow-1 d-flex flex-column" 
        style={{ 
          marginLeft: sidebarWidth, 
          minHeight: '100vh',
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
        }}
      >
        {/* Navbar */}
        <AdminNavbar sidebarWidth={sidebarWidth} />
        
        {/* 3. Page Content Area with Card Wrapper */}
        <main className="p-3 p-md-4 flex-grow-1" style={{ marginTop: '70px' }}>
          <div className="container-fluid h-100">
            {/* THE CHILDREN WRAPPER CARD: 
                This card provides the consistent "SMMS Pro" background 
                for every child component (Dashboard, Users, Reports).
            */}
            <div 
                className="card border-0 shadow-sm h-100 animate-fade-in" 
                style={{ 
                    borderRadius: '24px', 
                    minHeight: 'calc(100vh - 140px)',
                    backgroundColor: '#ffffff'
                }}
            >
              <div className="card-body p-2 p-lg-3">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}