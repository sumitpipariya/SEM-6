"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../staff.module.css';

const menuItems = [
  { name: 'Dashboard', icon: 'dashboard', href: '/staff/dashboard' },
  { name: 'My Mentees', icon: 'group', href: '/staff/mentees' },
  { name: 'Mentoring Record', icon: 'add_notes', href: '/staff/mentoring' },
  { name: 'History', icon: 'history', href: '/staff/mentoring/history' },
  { name: 'Feedback', icon: 'reviews', href: '/staff/feedback' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function StaffSidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="h-100 d-flex flex-column">
      {/* Brand Header */}
      <div className="p-4 d-flex align-items-center justify-content-between">
        {!isCollapsed && (
          <div className="d-flex align-items-center">
            <div className="bg-primary rounded-3 p-2 me-2">
              <span className="material-symbols-rounded text-white fs-4">analytics</span>
            </div>
            <span className="fw-black fs-4 text-dark ls-tight">
              SMMS <span className="text-primary fs-6">Pro</span>
            </span>
          </div>
        )}
        <button 
          onClick={onToggle} 
          className="btn btn-light btn-sm rounded-circle border-0 shadow-sm"
        >
          <span className="material-symbols-rounded fs-5">
            {isCollapsed ? 'side_navigation' : 'keyboard_double_arrow_left'}
          </span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow-1 px-3 mt-3">
        {!isCollapsed && (
          <label className="extra-small-text text-uppercase fw-bold text-muted ls-2 px-3 mb-2 d-block">
            Management
          </label>
        )}
        <hr className="sidebar-divider mx-3" />
        
        <div className="nav flex-column gap-2 mt-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className="text-decoration-none">
                <div 
                  className={`sidebar-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-content-center px-0' : 'px-3'}`}
                >
                  <span className="material-symbols-rounded fs-5">{item.icon}</span>
                  {!isCollapsed && <span className="ms-3 fw-medium">{item.name}</span>}
                  {isActive && !isCollapsed && <div className="active-dot"></div>}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Staff Profile Quick-Card */}
      <div className="p-3 mt-auto border-top bg-light-soft">
        <div className="d-flex align-items-center">
          <div 
            className="avatar-sm bg-primary-soft text-primary rounded-circle fw-bold d-flex align-items-center justify-content-center" 
            style={{ width: '40px', height: '40px', minWidth: '40px' }}
          >
            RK
          </div>
          {!isCollapsed && (
            <div className="ms-3 overflow-hidden">
              <p className="mb-0 fw-bold text-dark small text-truncate">Dr. Amit Patel</p>
              <p className="mb-0 extra-small-text text-muted">Faculty ID: 5021</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}