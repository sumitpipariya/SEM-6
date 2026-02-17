"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/components/student/Student.module.css';

const menuItems = [
  { 
    name: 'Dashboard', 
    icon: 'dashboard', 
    href: '/student/dashboard',
    gradient: 'from-blue-500 to-indigo-600'
  },
  { 
    name: 'My Mentor', 
    icon: 'person_search', 
    href: '/student/mentor',
    gradient: 'from-purple-500 to-pink-600'
  },
  { 
    name: 'Meeting History', 
    icon: 'calendar_month', 
    href: '/student/mentoring/history',
    gradient: 'from-amber-500 to-orange-600'
  },
  { 
    name: 'Feedback', 
    icon: 'feedback', 
    href: '/student/feedback',
    gradient: 'from-green-500 to-emerald-600'
  },
  { 
    name: 'Profile', 
    icon: 'account_circle', 
    href: '/student/profile',
    gradient: 'from-cyan-500 to-teal-600'
  },
];

export default function StudentSidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div 
      className={styles.sidebarContainer}
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", damping: 20, stiffness: 120 }}
    >
      {/* Brand Header */}
      <div className={styles.brandSection}>
        <div className={styles.brandLogo}>
          <span className="material-symbols-rounded text-white fs-2">school</span>
        </div>
        <span className={styles.brandName}>SMMS</span>
      </div>

      {/* Navigation Menu */}
      <nav className={styles.navSection}>
        <div className={styles.menuLabel}>Main Menu</div>
        <div className={styles.sidebarDivider}></div>

        <div className={styles.navItems}>
          <AnimatePresence>
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={item.href}
                    className={`${styles.sidebarLink} ${isActive ? styles.active : ''}`}
                  >
                    <div className={`${styles.iconWrapper} ${isActive ? styles.iconActive : ''}`}>
                      <span className={`material-symbols-rounded ${isActive ? 'text-white' : 'text-muted'}`}>
                        {item.icon}
                      </span>
                    </div>
                    <span className={`${styles.linkText} ${isActive ? 'text-white fw-bold' : 'text-dark'}`}>
                      {item.name}
                    </span>
                    {isActive && (
                      <div className={styles.activeIndicator}>
                        <span className="material-symbols-rounded text-white fs-6">chevron_right</span>
                      </div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </nav>

      {/* Mentor Card */}
      <div className={styles.mentorCard}>
        <div className={styles.mentorHeader}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarInitials}>RK</div>
            <div className={styles.onlineStatus}></div>
          </div>
          <div className={styles.mentorInfo}>
            <p className={styles.mentorName}>Dr. Rajesh Kumar</p>
            <p className={styles.mentorRole}>Primary Mentor</p>
          </div>
        </div>
        
        <Link href="/student/mentor" className={styles.contactButtonLink}>
          <button className={styles.contactButton}>
            <span className="material-symbols-rounded me-2 fs-7">chat</span>
            Contact Mentor
          </button>
        </Link>
      </div>
    </motion.div>
  );
}