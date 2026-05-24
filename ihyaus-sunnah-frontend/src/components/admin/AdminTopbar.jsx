import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaAngleRight,
  FaBars,
  FaBell,
  FaBookOpen,
  FaCog,
  FaExternalLinkAlt,
  FaHome,
  FaImages,
  FaSearch,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import useMediaLibraryAPI from "../../hooks/useMediaLibraryAPI";
import useNotificationsAPI from "../../hooks/useNotificationsAPI";
import useProgramsAPI from "../../hooks/useProgramsAPI";
import useStaffAPI from "../../hooks/useStaffAPI";

const labelMap = {
  admin: "Dashboard",
  activities: "Activity Feed",
  notifications: "Notifications",
  staff: "Staff",
  programs: "Programs",
  research: "Research",
  media: "Media Library",
  playlists: "Playlists",
  majlis: "Majlis Schedule",
  profile: "Profile",
  settings: "Settings",
  create: "Create",
};

const AdminTopbar = ({ setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { staff = [] } = useStaffAPI();
  const { programs = [] } = useProgramsAPI();
  const { mediaItems = [] } = useMediaLibraryAPI({});
  const { notifications = [], unreadCount = 0 } = useNotificationsAPI();

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query.length < 2) return [];

    const results = [];

    staff
      .filter((item) =>
        [item.name, item.position, item.role]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query))
      )
      .slice(0, 3)
      .forEach((item) =>
        results.push({
          category: "Staff",
          label: item.name,
          subtitle: item.position || item.role,
          path: "/admin/staff",
          icon: <FaUser className="text-blue-600" />,
        })
      );

    programs
      .filter((program) =>
        [program.title, program.category]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query))
      )
      .slice(0, 3)
      .forEach((item) =>
        results.push({
          category: "Program",
          label: item.title,
          subtitle: item.category,
          path: "/admin/programs",
          icon: <FaBookOpen className="text-green-600" />,
        })
      );

    mediaItems
      .filter((item) =>
        [item.title, item.description, ...(item.tags || [])]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query))
      )
      .slice(0, 3)
      .forEach((item) =>
        results.push({
          category: "Media",
          label: item.title,
          subtitle: item.mediaCategory,
          path: "/admin/media",
          icon: <FaImages className="text-purple-600" />,
        })
      );

    return results.slice(0, 6);
  }, [mediaItems, programs, searchQuery, staff]);

  const breadcrumbs = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const items = [{ name: "Dashboard", path: "/admin", icon: <FaHome /> }];
    let currentPath = "";

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      if (index === 0) return;
      items.push({
        name:
          labelMap[segment] ||
          segment
            .replace(/-/g, " ")
            .replace(/\b\w/g, (letter) => letter.toUpperCase()),
        path: currentPath,
      });
    });

    return items;
  }, [location.pathname]);

  const handleSearchSelect = (item) => {
    setSearchQuery("");
    navigate(item.path);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter" && searchResults.length > 0) {
      handleSearchSelect(searchResults[0]);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="flex h-[72px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:border-primary/30 hover:text-primary lg:hidden"
            aria-label="Open admin navigation"
          >
            <FaBars />
          </button>

          <div className="min-w-0">
            <div className="hidden items-center gap-2 text-sm md:flex">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.path} className="flex min-w-0 items-center gap-2">
                  {index > 0 && (
                    <FaAngleRight className="h-3 w-3 flex-shrink-0 text-neutral-400" />
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="truncate font-semibold text-primary">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      to={crumb.path}
                      className="flex items-center gap-2 text-neutral-500 transition-colors hover:text-primary"
                    >
                      {crumb.icon && <span>{crumb.icon}</span>}
                      <span>{crumb.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <h1 className="truncate text-lg font-semibold text-primary md:hidden">
              {breadcrumbs[breadcrumbs.length - 1]?.name || "Dashboard"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block">
            <div className="flex h-10 w-[300px] items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-3 transition focus-within:border-primary/40 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10">
              <FaSearch className="text-neutral-400" />
              <input
                type="text"
                placeholder="Search staff, programs, media"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-lg leading-none text-neutral-400 hover:text-neutral-600"
                  aria-label="Clear search"
                >
                  x
                </button>
              )}
            </div>

            <AnimatePresence>
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 top-full z-50 mt-2 w-full rounded-lg border border-neutral-200 bg-white p-2 shadow-card"
                >
                  {searchResults.length === 0 ? (
                    <div className="px-3 py-5 text-center text-sm text-neutral-500">
                      No matching records found.
                    </div>
                  ) : (
                    searchResults.map((item, index) => (
                      <button
                        key={`${item.category}-${index}`}
                        type="button"
                        onClick={() => handleSearchSelect(item)}
                        className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-brand-50"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100">
                          {item.icon}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-primary">
                            {item.label}
                          </span>
                          <span className="block truncate text-xs text-neutral-400">
                            {item.subtitle || item.category} / {item.category}
                          </span>
                        </span>
                      </button>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:border-primary/30 hover:text-primary"
              aria-label="Open notifications"
            >
              <FaBell />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-card"
                >
                  <div className="border-b border-neutral-200 p-4">
                    <h3 className="font-semibold text-primary">Notifications</h3>
                    <p className="text-sm text-neutral-400">{unreadCount} unread</p>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-sm text-neutral-500">
                        You are all caught up.
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((notification) => (
                        <button
                          key={notification.id}
                          type="button"
                          onClick={() => {
                            setNotificationsOpen(false);
                            navigate("/admin/notifications");
                          }}
                          className={`w-full border-b border-neutral-100 p-4 text-left transition-colors hover:bg-brand-50 ${
                            notification.read ? "bg-white" : "bg-brand-50/60"
                          }`}
                        >
                          <p className="text-sm font-semibold text-primary">
                            {notification.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
                            {notification.message}
                          </p>
                        </button>
                      ))
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setNotificationsOpen(false);
                      navigate("/admin/notifications");
                    }}
                    className="w-full p-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-brand-50"
                  >
                    View all notifications
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex h-10 items-center gap-2 rounded-lg border border-neutral-200 px-2 transition-colors hover:border-primary/30"
              aria-label="Open account menu"
            >
              <img
                src="https://i.pravatar.cc/100"
                alt="Admin user"
                className="h-7 w-7 rounded-md object-cover"
              />
              <span className="hidden text-sm font-semibold text-primary sm:block">
                Admin
              </span>
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-lg border border-neutral-200 bg-white p-2 shadow-card"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate("/admin/profile");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-brand-50 hover:text-primary"
                  >
                    <FaUser /> Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate("/admin/settings");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-brand-50 hover:text-primary"
                  >
                    <FaCog /> Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate("/");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-brand-50 hover:text-primary"
                  >
                    <FaExternalLinkAlt /> Public site
                  </button>
                  <div className="my-2 border-t border-neutral-200" />
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate("/login");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
