import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaBookOpen,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaCog,
  FaFilePdf,
  FaHome,
  FaImages,
  FaMosque,
  FaShieldAlt,
  FaSignOutAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import useActivitiesAPI from "../../hooks/useActivitiesAPI";
import useMajlisAPI from "../../hooks/useMajlisAPI";
import useMediaLibraryAPI from "../../hooks/useMediaLibraryAPI";
import useNotificationsAPI from "../../hooks/useNotificationsAPI";
import useProgramsAPI from "../../hooks/useProgramsAPI";
import useStaffAPI from "../../hooks/useStaffAPI";
import useStudentResearchAPI from "../../hooks/useStudentResearchAPI";
import { currentUserAPI } from "../../services/api";

const handleLogout = async (navigate) => {
  try {
    await authAPI.logout();
  } catch {
    // Still leave the admin UI even if the cookie clear request fails.
  }
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("adminUser");
  navigate("/login");
};

const AdminSidebar = ({
  isOpen,
  setIsOpen,
  isCollapsed,
  setIsCollapsed,
}) => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  useEffect(() => {
    currentUserAPI.getProfile().then((r) => setAdminUser(r?.data || r?.user || r)).catch(() => {});
  }, []);
  const { staff = [] } = useStaffAPI();
  const { programs = [] } = useProgramsAPI();
  const { researchItems = [] } = useStudentResearchAPI({});
  const { mediaItems = [] } = useMediaLibraryAPI({});
  const { activities = [] } = useActivitiesAPI();
  const { unreadCount = 0 } = useNotificationsAPI();
  const { stats = {} } = useMajlisAPI();

  const navItems = useMemo(
    () => [
      { name: "Dashboard", path: "/admin", icon: <FaHome /> },
      {
        name: "Activity Feed",
        path: "/admin/activities",
        icon: <FaClock />,
        badge: activities.length || null,
      },
      {
        name: "Staff",
        path: "/admin/staff",
        icon: <FaUsers />,
        badge: staff.length,
      },
      {
        name: "Programs",
        path: "/admin/programs",
        icon: <FaBookOpen />,
        badge: programs.length,
      },
      {
        name: "Research",
        path: "/admin/research",
        icon: <FaFilePdf />,
        badge: researchItems.length,
      },
      {
        name: "Media Library",
        path: "/admin/media",
        icon: <FaImages />,
        badge: mediaItems.length,
      },
      {
        name: "Majlis Schedule",
        path: "/admin/majlis",
        icon: <FaMosque />,
        badge: stats.totalMajlis || 0,
      },
    ],
    [
      activities.length,
      mediaItems.length,
      programs.length,
      researchItems.length,
      staff.length,
      stats.totalMajlis,
      unreadCount,
    ]
  );

  const secondaryItems = [
    { name: "Profile", path: "/admin/profile", icon: <FaUser /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  const navClass = ({ isActive }) =>
    [
      "group relative flex h-11 items-center rounded-lg px-3 text-sm font-medium transition-colors",
      isCollapsed ? "justify-center" : "gap-3",
      isActive
        ? "is-active bg-primary text-white shadow-sm"
        : "text-neutral-600 hover:bg-brand-50 hover:text-primary",
    ].join(" ");

  return (
    <>
      <button
        type="button"
        className={`fixed inset-0 z-40 bg-primary/40 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
        aria-label="Close admin navigation"
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-neutral-200 bg-white shadow-xl transition-all duration-300 lg:shadow-none ${
          isCollapsed ? "lg:w-24" : "lg:w-[300px]"
        } w-[300px] max-w-[86vw] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-neutral-200 px-4">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className={`flex min-w-0 items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-lg text-white overflow-hidden">
              <img src="/ihyau.svg" alt="Ihya us Sunnah" className="h-8 w-8 object-contain" />
            </span>
            {!isCollapsed && (
              <span className="min-w-0 text-left">
                <span className="block truncate text-base font-semibold text-primary">
                  Ihyaus Sunnah
                </span>
                <span className="block truncate text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                  Admin Console
                </span>
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-colors hover:border-primary/30 hover:text-primary lg:flex"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={navClass}
                onClick={() => setIsOpen(false)}
                title={isCollapsed ? item.name : undefined}
              >
                <span className="flex h-5 w-5 items-center justify-center text-base">
                  {item.icon}
                </span>
                {!isCollapsed && (
                  <>
                    <span className="min-w-0 flex-1 truncate">{item.name}</span>
                    {item.badge !== null && item.badge !== undefined && (
                      <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-600 group-[.is-active]:bg-white/15 group-[.is-active]:text-white">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="mt-5 border-t border-neutral-200 pt-4">
            <p
              className={`mb-2 px-3 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400 ${
                isCollapsed ? "sr-only" : ""
              }`}
            >
              Account
            </p>
            <div className="space-y-1">
              {secondaryItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={navClass}
                  onClick={() => setIsOpen(false)}
                  title={isCollapsed ? item.name : undefined}
                >
                  <span className="flex h-5 w-5 items-center justify-center text-base">
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="min-w-0 flex-1 truncate">{item.name}</span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <div className="border-t border-neutral-200 p-3">
          <div
            className={`flex items-center rounded-lg bg-brand-50 p-2 ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            {adminUser?.avatar ? (
              <img
                src={adminUser.avatar}
                alt="Admin user"
                className="h-9 w-9 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
                <FaUser />
              </div>
            )}
            {!isCollapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-primary">
                    {adminUser?.name ? `Admin ${adminUser.name}` : "Admin User"}
                  </p>
                  <p className="truncate text-xs text-neutral-400">
                    {adminUser?.role || "Super Administrator"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleLogout(navigate)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-white hover:text-red-600"
                  aria-label="Logout"
                >
                  <FaSignOutAlt />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
