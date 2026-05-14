import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaBookOpen,
  FaMosque,
  FaDonate,
  FaImages,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaBell,
  FaUser,
  FaShieldAlt,
  FaClock,
  FaFilePdf,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useStaff from "../../hooks/useStaff";
import usePrograms from "../../hooks/usePrograms";
import useActivities from "../../hooks/useActivities";
import useNotifications from "../../hooks/useNotifications";
import useMediaLibrary from "../../hooks/useMediaLibrary";
import useMajlis from "../../hooks/useMajlis";
import useStudentResearch from "../../hooks/useStudentResearch";

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { staff } = useStaff();
  const { programs } = usePrograms();
  const { researchItems } = useStudentResearch({});
  const { mediaItems } = useMediaLibrary({});
  const { activities } = useActivities();
  const { unreadCount } = useNotifications();
  const { stats } = useMajlis();

  const navItems = useMemo(() => [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FaHome />,
      badge: null,
    },
    {
      name: "Activity Feed",
      path: "/admin/activities",
      icon: <FaClock />,
      badge: activities.length ? activities.length.toString() : null,
      description: "Audit recent actions",
    },
    {
      name: "Notifications",
      path: "/admin/notifications",
      icon: <FaBell />,
      badge: unreadCount ? unreadCount.toString() : null,
      description: "Alerts and updates",
    },
    {
      name: "Staff Management",
      path: "/admin/staff",
      icon: <FaUsers />,
      badge: staff.length.toString(),
      description: "Manage team members",
    },
    {
      name: "Programs",
      path: "/admin/programs",
      icon: <FaBookOpen />,
      badge: programs.length.toString(),
      description: "Educational programs",
    },
    {
      name: "Research Library",
      path: "/admin/research",
      icon: <FaFilePdf />,
      badge: researchItems.length.toString(),
      description: "Student research publications",
    },
    {
      name: "Media Library",
      path: "/admin/media",
      icon: <FaImages />,
      badge: mediaItems.length.toString(),
      description: "Content library",
    },
    {
      name: "Majlis Schedule",
      path: "/admin/majlis",
      icon: <FaMosque />,
      badge: stats.totalMajlis ? stats.totalMajlis.toString() : "0",
      description: "Manage majlis sessions",
    },
    {
      name: "My Profile",
      path: "/admin/profile",
      icon: <FaUser />,
      badge: null,
      description: "Manage your admin account",
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <FaCog />,
      badge: null,
      description: "System settings",
    },
  ], [staff.length, programs.length, mediaItems.length, activities.length, unreadCount, stats.totalMajlis]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 z-50 h-screen w-[320px] ${collapsed ? 'lg:w-24' : 'lg:w-[320px]'}
        bg-gradient-to-b from-primary to-primaryLight text-white shadow-2xl
        overflow-hidden max-w-full
        transform transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo & User Section */}
        <div className="border-b border-white/10">
          {/* Logo */}
          <div className="h-20 flex items-center justify-between px-4 lg:px-6">
            <div className={`flex items-center gap-4 ${collapsed ? 'justify-center w-full' : ''}`}>
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                <FaShieldAlt className="text-secondary text-lg" />
              </div>
              <div className={`${collapsed ? 'hidden' : ''}`}>
                <h1 className="text-xl font-heading font-bold">
                  Ihyaus Sunnah
                </h1>
                <p className="text-xs text-secondary tracking-widest uppercase">
                  Admin Panel
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 transition-all"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
          </div>

          {/* User Info */}
          <div className={`px-8 pb-6 ${collapsed ? 'hidden lg:block' : ''}`}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl
              bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <img
                src="https://i.pravatar.cc/100"
                alt="admin"
                className="w-12 h-12 rounded-2xl object-cover border-2 border-white/30"
              />
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-sm">Admin User</h3>
                <p className="text-xs text-gray-300">Super Administrator</p>
              </div>
              <FaChevronDown
                className={`text-sm transition-transform duration-300 ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 space-y-2"
                >
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all">
                    <FaUser className="text-xs" />
                    Profile Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all">
                    <FaBell className="text-xs" />
                    Notifications
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    text-sm text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all">
                    <FaSignOutAlt className="text-xs" />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className={`px-6 py-8 flex flex-col h-[calc(100vh-200px)] ${collapsed ? 'px-3' : ''}`}>
          <div className="space-y-2 flex-1 min-w-0 overflow-y-auto pr-1">
            {navItems.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <NavLink
                  to={item.path}
                  end={item.path === "/admin"}
                  className={({ isActive }) => {
                    const base = `group flex items-center ${collapsed ? 'justify-center' : 'gap-4'} ${collapsed ? 'px-3' : 'px-5'} py-4 rounded-2xl transition-all duration-300 relative`
                    const state = isActive
                      ? 'bg-white text-primary shadow-lg transform scale-105'
                      : `text-gray-200 hover:bg-white/10 hover:text-white ${collapsed ? '' : 'hover:translate-x-2'}`

                    return `${base} ${state}`
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <span className={`text-xl transition-transform group-hover:scale-110 ${collapsed ? 'mx-auto' : ''}`}>
                    {item.icon}
                  </span>

                  <div className={`${collapsed ? 'hidden' : 'flex-1 min-w-0'}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium tracking-wide truncate">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="bg-secondary text-primary text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Active indicator */}
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-secondary rounded-r-full transition-all duration-300 ${collapsed ? 'opacity-0' : 'opacity-0 group-hover:opacity-50'}`} />
                </NavLink>
              </motion.div>
            ))}
          </div>

          {/* Quick Stats Footer */}
          <div className={`mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 ${collapsed ? 'hidden lg:block' : ''}`}>
            <h4 className="text-sm font-semibold text-secondary mb-3">Quick Stats</h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-gray-300">Active Users</p>
                <p className="font-bold text-white">1,247</p>
              </div>
              <div>
                <p className="text-gray-300">This Month</p>
                <p className="font-bold text-green-400">+23%</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;