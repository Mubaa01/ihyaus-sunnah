import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaUsers,
  FaBookOpen,
  FaDonate,
  FaMosque,
  FaImages,
  FaCalendarAlt,
  FaClock,
  FaArrowUp,
  FaArrowDown,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaFilePdf,
} from "react-icons/fa";

import AdminStatCard from "../../../components/admin/AdminStatCard";
import usePrograms from "../../../hooks/usePrograms";
import useStaff from "../../../hooks/useStaff";
import useMediaLibrary from "../../../hooks/useMediaLibrary";
import useStudentResearch from "../../../hooks/useStudentResearch";
import useActivities from "../../../hooks/useActivities";
import useMajlis from "../../../hooks/useMajlis";

const activityColors = {
  staff: "text-blue-600 bg-blue-100",
  program: "text-green-600 bg-green-100",
  media: "text-purple-600 bg-purple-100",
  donation: "text-yellow-600 bg-yellow-100",
  default: "text-gray-600 bg-gray-100",
}

const activityIcon = {
  staff: <FaUsers />,
  program: <FaBookOpen />,
  media: <FaMosque />,
  donation: <FaDonate />,
  default: <FaClock />,
}

const getTimeAgo = (dateString) => {
  const delta = Math.floor((new Date() - new Date(dateString)) / 1000)
  if (delta < 60) return `${delta}s ago`
  if (delta < 3600) return `${Math.floor(delta / 60)}m ago`
  if (delta < 86400) return `${Math.floor(delta / 3600)}h ago`
  return `${Math.floor(delta / 86400)}d ago`
}

const DashboardHome = () => {
  const { programs } = usePrograms();
  const { staff } = useStaff();
  const { mediaItems } = useMediaLibrary({});
  const { researchItems } = useStudentResearch({});
  const { activities } = useActivities();
  const { stats: majlisStats } = useMajlis();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Calculate dynamic stats
  const totalStaff = staff.length;
  const totalPrograms = programs.length;
  const activePrograms = programs.filter(p => p.status === 'active').length;
  const totalResearch = researchItems.length;
  const featuredPrograms = programs.filter(p => p.isFeatured).length;

  const recentActivities = [...activities]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4)
    .map((activity) => ({
      ...activity,
      icon: activityIcon[activity.type] || activityIcon.default,
      color: activityColors[activity.type] || activityColors.default,
      time: getTimeAgo(activity.createdAt),
    }))

  const quickActions = [
    {
      title: "Add Staff",
      description: "Register new team member",
      icon: <FaUsers />,
      path: "/admin/staff/create",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Create Program",
      description: "Launch new educational program",
      icon: <FaBookOpen />,
      path: "/admin/programs/create",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Upload Media",
      description: "Add lectures or media content",
      icon: <FaImages />,
      path: "/admin/media/create",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Publish Research",
      description: "Add a new student research item",
      icon: <FaFilePdf />,
      path: "/admin/research/create",
      color: "bg-yellow-500 hover:bg-yellow-600"
    },
    {
      title: "Manage Majlis",
      description: "Schedule new sessions",
      icon: <FaMosque />,
      path: "/admin/majlis",
      color: "bg-red-500 hover:bg-red-600"
    },
    {
      title: "View Reports",
      description: "Check analytics and reports",
      icon: <FaCalendarAlt />,
      path: "/admin/reports",
      color: "bg-orange-500 hover:bg-orange-600"
    },
  ];

  return (
    <div className="space-y-10">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[32px]
        bg-gradient-to-br from-primary via-primary to-primaryLight
        p-10 text-white"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full translate-y-32 -translate-x-32" />

        <div className="relative z-10 flex justify-between items-start">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
              <p className="uppercase tracking-[0.3em] text-secondary text-sm font-medium">
                Ihyaus Sunnah Foundation
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-4">
              Administrative Dashboard
            </h1>

            <p className="text-lg text-gray-200 max-w-xl leading-relaxed">
              Manage {totalPrograms} programs, {totalStaff} staff members, and institutional content
              from one centralized platform.
            </p>

            <div className="flex items-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <FaClock className="text-secondary" />
                <span>{currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span>System Online</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Programs</span>
                  <span className="font-bold">{activePrograms}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Featured</span>
                  <span className="font-bold">{featuredPrograms}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">This Month</span>
                  <span className="font-bold text-green-300">+12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <AdminStatCard
          title="Total Staff"
          value={totalStaff.toString()}
          icon={<FaUsers />}
          color="bg-blue-100 text-blue-600"
          trend={{ value: "+5%", direction: "up" }}
          description={`${staff.filter(s => s.category === 'Board of Trustees').length} trustees`}
        />

        <AdminStatCard
          title="Active Programs"
          value={activePrograms.toString()}
          icon={<FaBookOpen />}
          color="bg-green-100 text-green-600"
          trend={{ value: "+2", direction: "up" }}
          description={`${featuredPrograms} featured`}
        />

        <AdminStatCard
          title="Media Content"
          value={mediaItems.length.toString()}
          icon={<FaImages />}
          color="bg-purple-100 text-purple-600"
          trend={{ value: "+12", direction: "up" }}
          description="Lectures & media"
        />

        <AdminStatCard
          title="Research Items"
          value={totalResearch.toString()}
          icon={<FaFilePdf />}
          color="bg-yellow-100 text-yellow-700"
          trend={{ value: "+3", direction: "up" }}
          description="Student publications"
        />

        <AdminStatCard
          title="Majlis Sessions"
          value={majlisStats.totalMajlis.toString()}
          icon={<FaMosque />}
          color="bg-red-100 text-red-600"
          trend={{ value: `${majlisStats.publicCount} public`, direction: "up" }}
          description={`${majlisStats.privateCount} private classes`}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="xl:col-span-2 bg-white rounded-3xl p-8 shadow-soft border border-gray-100"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
              <FaClock className="text-secondary" />
              Recent Activities
            </h2>

            <Link
              to="/admin/activities"
              className="text-secondary font-medium hover:text-primary transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-6">
            {recentActivities.map((activity, idx) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-none last:pb-0"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                  {activity.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-primary text-lg">
                        {activity.action}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {activity.details}
                      </p>
                    </div>
                    <span className="text-sm text-gray-400 whitespace-nowrap ml-4">
                      {activity.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <button className="text-sm text-secondary hover:text-primary transition-colors flex items-center gap-1">
                      <FaEye className="w-3 h-3" />
                      View
                    </button>
                    <button className="text-sm text-gray-500 hover:text-primary transition-colors flex items-center gap-1">
                      <FaEdit className="w-3 h-3" />
                      Edit
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
            <FaPlus className="text-secondary" />
            Quick Actions
          </h2>

          <div className="space-y-4">
            {quickActions.map((action, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={action.path}
                  className={`group block p-5 rounded-2xl text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${action.color}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl mt-1">
                      {action.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        {action.title}
                      </h3>
                      <p className="text-sm opacity-90">
                        {action.description}
                      </p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <FaArrowUp className="transform rotate-45" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* System Status */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="font-semibold text-primary mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-green-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Media Storage</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-green-600">85% Free</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Services</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-green-600">Healthy</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;