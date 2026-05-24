import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaFilePdf,
  FaImages,
  FaMosque,
  FaPlus,
  FaUsers,
} from "react-icons/fa";

import AdminStatCard from "../../../components/admin/AdminStatCard";
import useActivitiesAPI from "../../../hooks/useActivitiesAPI";
import useMajlisAPI from "../../../hooks/useMajlisAPI";
import useMediaLibraryAPI from "../../../hooks/useMediaLibraryAPI";
import useProgramsAPI from "../../../hooks/useProgramsAPI";
import useStaffAPI from "../../../hooks/useStaffAPI";
import useStudentResearchAPI from "../../../hooks/useStudentResearchAPI";

const activityColors = {
  staff: "bg-blue-50 text-blue-600",
  program: "bg-green-50 text-green-600",
  media: "bg-purple-50 text-purple-600",
  donation: "bg-yellow-50 text-yellow-700",
  default: "bg-brand-50 text-primary",
};

const activityIcon = {
  staff: <FaUsers />,
  program: <FaBookOpen />,
  media: <FaImages />,
  donation: <FaCheckCircle />,
  default: <FaClock />,
};

const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Recently";

  const delta = Math.max(0, Math.floor((new Date() - date) / 1000));
  if (delta < 60) return `${delta}s ago`;
  if (delta < 3600) return `${Math.floor(delta / 60)}m ago`;
  if (delta < 86400) return `${Math.floor(delta / 3600)}h ago`;
  return `${Math.floor(delta / 86400)}d ago`;
};

const DashboardHome = () => {
  const { programs = [] } = useProgramsAPI();
  const { staff = [] } = useStaffAPI();
  const { mediaItems = [] } = useMediaLibraryAPI({});
  const { researchItems = [] } = useStudentResearchAPI({});
  const { activities = [] } = useActivitiesAPI();
  const { stats: majlisStats = {} } = useMajlisAPI();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const dashboardStats = useMemo(() => {
    const activePrograms = programs.filter((program) => program.status === "active");
    const featuredPrograms = programs.filter((program) => program.isFeatured);
    const trustees = staff.filter((member) => member.category === "Board of Trustees");

    return {
      totalStaff: staff.length,
      totalPrograms: programs.length,
      activePrograms: activePrograms.length,
      featuredPrograms: featuredPrograms.length,
      trustees: trustees.length,
      totalResearch: researchItems.length,
      totalMedia: mediaItems.length,
      totalMajlis: majlisStats?.totalMajlis ?? 0,
      publicMajlis: majlisStats?.publicCount ?? 0,
      privateMajlis: majlisStats?.privateCount ?? 0,
    };
  }, [majlisStats, mediaItems.length, programs, researchItems.length, staff]);

  const recentActivities = useMemo(
    () =>
      [...activities]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map((activity) => ({
          ...activity,
          icon: activityIcon[activity.type] || activityIcon.default,
          color: activityColors[activity.type] || activityColors.default,
          time: getTimeAgo(activity.createdAt),
        })),
    [activities]
  );

  const quickActions = [
    {
      title: "Add staff",
      description: "Create a staff profile",
      icon: <FaUsers />,
      path: "/admin/staff/create",
    },
    {
      title: "Create program",
      description: "Publish a new program",
      icon: <FaBookOpen />,
      path: "/admin/programs/create",
    },
    {
      title: "Upload media",
      description: "Add lecture or media content",
      icon: <FaImages />,
      path: "/admin/media/create",
    },
    {
      title: "Publish research",
      description: "Add student research",
      icon: <FaFilePdf />,
      path: "/admin/research/create",
    },
    {
      title: "Manage majlis",
      description: "Review schedules and classes",
      icon: <FaMosque />,
      path: "/admin/majlis",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm lg:p-6"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
              Admin overview
            </p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-primary lg:text-4xl">
              Administrative Dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-neutral-500 sm:text-base">
              Monitor institutional content, staff records, media, research, and
              majlis scheduling from one focused workspace.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[360px]">
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <FaClock className="text-secondary" />
                Today
              </div>
              <p className="mt-2 text-sm text-neutral-500">
                {currentTime.toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="mt-1 text-lg font-semibold text-primary">
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="rounded-lg border border-green-100 bg-green-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                <FaCheckCircle />
                System status
              </div>
              <p className="mt-2 text-sm text-green-700">
                Dashboard services are available.
              </p>
              <Link
                to="/admin/activities"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary"
              >
                View audit feed <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard
          title="Staff"
          value={dashboardStats.totalStaff.toString()}
          icon={<FaUsers />}
          color="bg-blue-50 text-blue-600"
          trend={{ value: `${dashboardStats.trustees} trustees`, direction: "up" }}
          description="Team and leadership records"
        />
        <AdminStatCard
          title="Active Programs"
          value={dashboardStats.activePrograms.toString()}
          icon={<FaBookOpen />}
          color="bg-green-50 text-green-600"
          trend={{ value: `${dashboardStats.featuredPrograms} featured`, direction: "up" }}
          description={`${dashboardStats.totalPrograms} total programs`}
        />
        <AdminStatCard
          title="Media"
          value={dashboardStats.totalMedia.toString()}
          icon={<FaImages />}
          color="bg-purple-50 text-purple-600"
          description="Lectures and library assets"
        />
        <AdminStatCard
          title="Research"
          value={dashboardStats.totalResearch.toString()}
          icon={<FaFilePdf />}
          color="bg-yellow-50 text-yellow-700"
          description="Student publications"
        />
        <AdminStatCard
          title="Majlis"
          value={dashboardStats.totalMajlis.toString()}
          icon={<FaMosque />}
          color="bg-brand-50 text-primary"
          description={`${dashboardStats.publicMajlis} public, ${dashboardStats.privateMajlis} private`}
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-lg border border-neutral-200 bg-white shadow-sm"
        >
          <div className="flex flex-col gap-3 border-b border-neutral-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-primary">
                Recent activity
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Latest changes across admin-managed content.
              </p>
            </div>
            <Link
              to="/admin/activities"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary"
            >
              View all <FaArrowRight className="text-xs" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-200">
            {recentActivities.length === 0 ? (
              <div className="p-8 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-primary">
                  <FaClock />
                </div>
                <p className="mt-3 font-semibold text-primary">
                  No recent activity yet
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                  New admin actions will appear here as they happen.
                </p>
              </div>
            ) : (
              recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id || `${activity.action}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="flex gap-4 p-5"
                >
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${activity.color}`}
                  >
                    {activity.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-primary">
                          {activity.action || "Admin update"}
                        </h3>
                        <p className="mt-1 text-sm text-neutral-500">
                          {activity.details || "A dashboard record was updated."}
                        </p>
                      </div>
                      <span className="whitespace-nowrap text-xs font-medium text-neutral-400">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="rounded-lg border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 p-5">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-primary">
                <FaPlus className="text-secondary" />
                Quick actions
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Common creation and review tasks.
              </p>
            </div>
            <div className="grid gap-2 p-3">
              {quickActions.map((action) => (
                <Link
                  key={action.path}
                  to={action.path}
                  className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-brand-50"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                    {action.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-primary">
                      {action.title}
                    </span>
                    <span className="block truncate text-sm text-neutral-500">
                      {action.description}
                    </span>
                  </span>
                  <FaArrowRight className="text-xs text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-primary">
              <FaCalendarAlt className="text-secondary" />
              Content health
            </h2>
            <div className="mt-5 space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-neutral-600">
                    Program coverage
                  </span>
                  <span className="font-semibold text-primary">
                    {dashboardStats.totalPrograms
                      ? Math.round(
                          (dashboardStats.activePrograms /
                            dashboardStats.totalPrograms) *
                            100
                        )
                      : 0}
                    %
                  </span>
                </div>
                <div className="h-2 rounded-full bg-neutral-100">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{
                      width: `${
                        dashboardStats.totalPrograms
                          ? (dashboardStats.activePrograms /
                              dashboardStats.totalPrograms) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-neutral-50 p-3">
                  <p className="text-neutral-500">Featured</p>
                  <p className="mt-1 text-lg font-semibold text-primary">
                    {dashboardStats.featuredPrograms}
                  </p>
                </div>
                <div className="rounded-lg bg-neutral-50 p-3">
                  <p className="text-neutral-500">Audit items</p>
                  <p className="mt-1 text-lg font-semibold text-primary">
                    {activities.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </section>
    </div>
  );
};

export default DashboardHome;
