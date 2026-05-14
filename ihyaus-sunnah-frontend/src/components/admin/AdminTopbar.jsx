import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaSearch,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaHome,
  FaAngleRight,
  FaBookOpen,
  FaImages,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useStaff from "../../hooks/useStaff";
import usePrograms from "../../hooks/usePrograms";
import useMediaLibrary from "../../hooks/useMediaLibrary";
import useNotifications from "../../hooks/useNotifications";

const AdminTopbar = ({ setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { staff } = useStaff();
  const { programs } = usePrograms();
  const { mediaItems } = useMediaLibrary({});

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query || query.length < 2) return []

    const results = []

    staff
      .filter((item) =>
        item.name?.toLowerCase().includes(query) ||
        item.position?.toLowerCase().includes(query) ||
        item.role?.toLowerCase().includes(query)
      )
      .slice(0, 3)
      .forEach((item) =>
        results.push({
          category: "Staff",
          label: item.name,
          subtitle: item.position || item.role,
          path: "/admin/staff",
          icon: <FaUser className="text-blue-500" />,
        })
      )

    programs
      .filter((program) =>
        program.title?.toLowerCase().includes(query) ||
        program.category?.toLowerCase().includes(query)
      )
      .slice(0, 3)
      .forEach((item) =>
        results.push({
          category: "Program",
          label: item.title,
          subtitle: item.category,
          path: "/admin/programs",
          icon: <FaBookOpen className="text-green-500" />,
        })
      )

    mediaItems
      .filter((item) =>
        item.title?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(query))
      )
      .slice(0, 3)
      .forEach((item) =>
        results.push({
          category: "Media",
          label: item.title,
          subtitle: item.mediaCategory,
          path: "/admin/media",
          icon: <FaImages className="text-purple-500" />,
        })
      )

    return results.slice(0, 6)
  }, [searchQuery, staff, programs, mediaItems])

  const handleSearchSelect = (item) => {
    setSearchQuery("")
    navigate(item.path)
  }

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      handleSearchSelect(searchResults[0])
    }
  }

  const { notifications, unreadCount } = useNotifications()

  // Generate breadcrumbs from current path
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Dashboard', path: '/admin', icon: <FaHome /> }];

    let currentPath = '/admin';
    pathSegments.slice(1).forEach((segment, index) => {
      currentPath += `/${segment}`;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
      breadcrumbs.push({ name, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <header
      className="sticky top-0 z-30
      bg-white/95 backdrop-blur-xl
      border-b border-gray-100 shadow-sm"
    >
      <div className="h-20 px-6 lg:px-10 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden w-12 h-12 rounded-2xl
            bg-gray-100 hover:bg-gray-200
            flex items-center justify-center transition-all hover:scale-105"
          >
            <FaBars />
          </button>

          {/* Breadcrumbs */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.path} className="flex items-center gap-2">
                {index > 0 && <FaAngleRight className="text-gray-400 w-3 h-3" />}
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-semibold text-primary">{crumb.name}</span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    {crumb.icon && <span className="text-gray-400">{crumb.icon}</span>}
                    {crumb.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Title */}
          <div className="md:hidden">
            <h1 className="text-xl font-heading font-bold text-primary">
              {breadcrumbs[breadcrumbs.length - 1]?.name || 'Dashboard'}
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:block relative">
            <div
              className="flex items-center gap-3
              bg-gray-100 rounded-2xl px-4 py-3 w-[280px]
              focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:shadow-lg
              transition-all duration-300"
            >
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search programs, staff, media..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="bg-transparent outline-none w-full text-sm placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50"
                >
                  <div className="space-y-3">
                    <div className="text-sm text-gray-500 mb-2">Search results</div>
                    {searchResults.length === 0 ? (
                      <div className="text-sm text-gray-500 py-4 text-center">
                        No results found. Try staff names, program titles or media keywords.
                      </div>
                    ) : (
                      searchResults.map((item, index) => (
                        <button
                          key={`${item.category}-${index}`}
                          onClick={() => handleSearchSelect(item)}
                          className="w-full flex items-center gap-3 p-3 rounded-2xl text-left hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center">
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-primary">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.subtitle} • {item.category}</p>
                          </div>
                        </button>
                      ))
                    )}
                    {searchResults.length > 0 && (
                      <button
                        onClick={() => navigate(searchResults[0].path)}
                        className="w-full text-left text-sm text-primary font-medium hover:text-secondary transition-colors"
                      >
                        See all {searchResults[0].category.toLowerCase()} results
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative w-12 h-12 rounded-2xl
              bg-gray-100 hover:bg-gray-200
              flex items-center justify-center transition-all hover:scale-105"
            >
              <FaBell />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1
                w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold
                flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50"
                >
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-primary">Notifications</h3>
                    <p className="text-sm text-gray-500">{unreadCount} unread</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <button
                        key={notification.id}
                        onClick={() => {
                          setNotificationsOpen(false)
                          navigate('/admin/notifications')
                        }}
                        className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                          notification.read ? '' : 'bg-blue-50/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            notification.type === 'staff' ? 'bg-blue-100 text-blue-600' :
                            notification.type === 'program' ? 'bg-green-100 text-green-600' :
                            notification.type === 'media' ? 'bg-purple-100 text-purple-600' :
                            'bg-yellow-100 text-yellow-600'
                          }`}>
                            {notification.type === 'staff' ? <FaUser className="w-4 h-4" /> :
                             notification.type === 'program' ? <FaBookOpen className="w-4 h-4" /> :
                             notification.type === 'media' ? <FaImages className="w-4 h-4" /> :
                             <FaBell className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm text-primary">{notification.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-2">{new Date(notification.createdAt).toLocaleTimeString()}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setNotificationsOpen(false)
                        navigate('/admin/notifications')
                      }}
                      className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      View All Notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 p-2 rounded-2xl
              hover:bg-gray-100 transition-all hover:scale-105"
            >
              <img
                src="https://i.pravatar.cc/100"
                alt="admin"
                className="w-10 h-10 rounded-2xl object-cover border-2 border-gray-200"
              />
              <div className="hidden sm:block text-left">
                <h3 className="text-sm font-semibold text-primary">Admin User</h3>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <FaChevronDown className={`text-sm transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 z-50"
                >
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://i.pravatar.cc/100"
                        alt="admin"
                        className="w-12 h-12 rounded-2xl object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-primary">Admin User</h4>
                        <p className="text-sm text-gray-500">admin@example.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false)
                        navigate('/admin/profile')
                      }}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <FaUser className="w-4 h-4" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false)
                        navigate('/admin/settings')
                      }}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <FaCog className="w-4 h-4" />
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false)
                        navigate('/')
                      }}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      Public Site
                    </button>
                    <div className="border-t border-gray-100 my-2"></div>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false)
                        navigate('/login')
                      }}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
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