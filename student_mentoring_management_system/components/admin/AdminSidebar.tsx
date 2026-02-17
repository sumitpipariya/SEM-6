"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './admin.module.css';

const adminMenuItems = [
  { name: 'Dashboard', icon: 'grid_view', href: '/admin/dashboard' },
  { name: 'Mentors', icon: 'school', href: '/admin/users/staff' },
  { name: 'Students', icon: 'person_search', href: '/admin/users/students' },
  { name: 'Assignments', icon: 'swap_horiz', href: '/admin/users/assign' },
  { name: 'Reports', icon: 'monitoring', href: '/admin/reports' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="h-100 d-flex flex-column bg-white">
      {/* Brand Header */}
      <div className="p-4 d-flex align-items-center justify-content-between">
        {!isCollapsed && (
          <div className="d-flex align-items-center">
            <div className="bg-dark rounded-3 p-2 me-2 shadow-sm">
              <span className="material-symbols-rounded text-white fs-4">shield_person</span>
            </div>
            <span className="fw-black fs-4 text-dark ls-tight">
              SMMS <span className="text-danger fs-6">Admin</span>
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
            System Control
          </label>
        )}
        <hr className="sidebar-divider mx-3" />
        
        <div className="nav flex-column gap-2 mt-3">
          {adminMenuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.name} href={item.href} className="text-decoration-none">
                <div 
                  className={`sidebar-link ${isActive ? 'active' : ''} ${isCollapsed ? 'justify-content-center px-0' : 'px-3'}`}
                >
                  <span className="material-symbols-rounded fs-5">{item.icon}</span>
                  {!isCollapsed && <span className="ms-3 fw-medium">{item.name}</span>}
                  {isActive && !isCollapsed && <div className="active-dot bg-danger"></div>}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Admin Profile */}
      <div className="p-3 mt-auto border-top bg-light-soft">
        <div className="d-flex align-items-center">
          <div 
            className="avatar-sm bg-dark text-white rounded-circle fw-bold d-flex align-items-center justify-content-center shadow-sm" 
            style={{ width: '40px', height: '40px', minWidth: '40px' }}
          >
            AD
          </div>
          {!isCollapsed && (
            <div className="ms-3 overflow-hidden">
              <p className="mb-0 fw-bold text-dark small text-truncate">System Admin</p>
              <p className="mb-0 extra-small-text text-muted">ID: #001</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}