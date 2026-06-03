import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaClock,
  FaExternalLinkAlt,
  FaLock,
  FaSearch,
  FaTelegramPlane,
  FaTrophy,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";

import useMajlisAPI from "../../hooks/useMajlisAPI";
import useCompletedMajlisAPI from "../../hooks/useCompletedMajlisAPI";
import QuranVersePanel from "../../components/common/QuranVersePanel";

const FALLBACK_BOOK_IMAGE =
  "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1200&auto=format&fit=crop";

const typeTabs = [
  { value: "all", label: "All", icon: FaBookOpen },
  { value: "public", label: "Public", icon: FaUsers },
  { value: "private", label: "Private", icon: FaLock },
];

const majlisVerse = {
  arabic: "يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ",
  translation:
    "Allah raises those who believe and those given knowledge by degrees.",
  reference: "Surah Al-Mujadilah 58:11",
};

const statCardClasses = {
  public: "bg-emerald-50 text-emerald-700 border-emerald-100",
  private: "bg-violet-50 text-violet-700 border-violet-100",
  completed: "bg-amber-50 text-amber-700 border-amber-100",
  enrolled: "bg-blue-50 text-blue-700 border-blue-100",
};

const normalize = (value = "") => value.toString().toLowerCase();

const formatLevel = (level) => {
  if (!level) return "Beginner";
  return level.charAt(0).toUpperCase() + level.slice(1);
};

const MajlisSchedulePage = () => {
  const [activeType, setActiveType] = useState("all");
  const [query, setQuery] = useState("");

  const { majlis, loading: majlisLoading } = useMajlisAPI();
  const { completed, loading: completedLoading } = useCompletedMajlisAPI();

  const filteredMajlis = useMemo(() => {
    const search = normalize(query);

    return majlis.filter((item) => {
      const matchesType = activeType === "all" || item.type === activeType;
      const matchesSearch =
        normalize(item.title).includes(search) ||
        normalize(item.book?.name).includes(search) ||
        normalize(item.instructor?.name).includes(search) ||
        normalize(item.schedule?.day).includes(search);

      return matchesType && matchesSearch && item.published !== false;
    });
  }, [activeType, majlis, query]);

  const featuredMajlis = useMemo(
    () => majlis.find((item) => item.featured && item.published !== false) || majlis[0],
    [majlis]
  );

  const stats = useMemo(() => {
    const publicCount = majlis.filter((item) => item.type === "public").length;
    const privateCount = majlis.filter((item) => item.type === "private").length;
    const totalEnrolled = majlis.reduce(
      (sum, item) => sum + (item.enrollment?.enrolled || 0),
      0
    );

    return [
      {
        label: "Public sessions",
        value: publicCount,
        icon: FaUsers,
        variant: "public",
      },
      {
        label: "Private classes",
        value: privateCount,
        icon: FaLock,
        variant: "private",
      },
      {
        label: "Completed books",
        value: completed.length,
        icon: FaTrophy,
        variant: "completed",
      },
      {
        label: "Current enrollment",
        value: totalEnrolled,
        icon: FaUserGraduate,
        variant: "enrolled",
      },
    ];
  }, [completed.length, majlis]);

  return (
    <div className="min-h-screen bg-brand-50 text-neutral-700">
      <section className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000&auto=format&fit=crop"
            alt="Islamic study circle"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-black/70" />
        </div>

        <div className="container-custom relative z-10 min-h-[50vh] lg:min-h-[60vh] py-20 lg:py-28 flex items-center">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <p className="uppercase tracking-[0.28em] text-goldSoft font-semibold mb-5">
                Weekly learning circles
              </p>
              <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
                Majlis Schedule
              </h1>
              <p className="mt-7 text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl">
                Follow active study circles, see the books currently being taught,
                and join public or private sessions with qualified instructors.
              </p>

              <QuranVersePanel {...majlisVerse} className="mt-8 max-w-2xl" />

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#schedule" className="btn-primary px-7 py-4">
                  Browse sessions <FaArrowRight />
                </a>
                {featuredMajlis?.access?.telegramLink && (
                  <a
                    href={featuredMajlis.access.telegramLink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline-light px-7 py-4 flex items-center gap-2"
                  >
                    <FaTelegramPlane /> Join Telegram
                  </a>
                )}
              </div>
            </motion.div>

            {featuredMajlis && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-[2rem] p-5 shadow-premium"
              >
                <img
                  src={featuredMajlis.book?.image || FALLBACK_BOOK_IMAGE}
                  alt={featuredMajlis.book?.name || featuredMajlis.title}
                  className="h-72 w-full object-cover rounded-[1.5rem]"
                />
                <div className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="px-3 py-1 rounded-full bg-gold text-primary text-sm font-bold capitalize">
                      {featuredMajlis.status || "ongoing"}
                    </span>
                    <span className="text-sm text-white/70 capitalize">
                      {featuredMajlis.type} majlis
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mt-4">{featuredMajlis.title}</h2>
                  <p className="text-white/75 mt-2">
                    {featuredMajlis.book?.name || "Current study text"}
                  </p>
                  <Link
                    to={`/lectures/${featuredMajlis._id}`}
                    className="mt-6 inline-flex items-center gap-2 text-gold font-semibold"
                  >
                    View details <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="container-custom -mt-12 relative z-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
            <div className="lg:sticky lg:top-28 space-y-7">
              <div>
                <p className="section-subtitle">Study Overview</p>
                <h2 className="section-title mt-3">Structured Circles For Steady Learning</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Each Majlis keeps the schedule, book progress, teacher, and access
                links in one place so students can quickly find where they belong.
              </p>
              <div className="space-y-3">
                {[
                  "Live public and private learning sessions",
                  "Book progress and current chapter tracking",
                  "Instructor details and access links",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-700">
                    <FaCheckCircle className="text-gold shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div id="schedule" className="space-y-8">
              <div className="bg-white border border-gray-100 shadow-soft rounded-[1.75rem] p-4 md:p-5">
                <div className="grid md:grid-cols-[1fr_auto] gap-4 items-center">
                  <div className="relative">
                    <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by title, book, teacher, or day..."
                      className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="flex rounded-2xl bg-gray-100 p-1 overflow-x-auto">
                    {typeTabs.map((tab) => {
                      const Icon = tab.icon;
                      const active = activeType === tab.value;
                      return (
                        <button
                          key={tab.value}
                          type="button"
                          onClick={() => setActiveType(tab.value)}
                          className={`px-5 py-3 rounded-xl flex items-center gap-2 font-semibold whitespace-nowrap transition ${
                            active
                              ? "bg-primary text-white shadow"
                              : "text-gray-600 hover:bg-white"
                          }`}
                        >
                          <Icon /> {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {majlisLoading ? (
                <div className="grid gap-6">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-100 shadow-soft rounded-[1.75rem] p-5 animate-pulse"
                    >
                      <div className="h-44 bg-gray-100 rounded-3xl" />
                      <div className="mt-5 h-6 bg-gray-100 rounded w-2/3" />
                      <div className="mt-3 h-4 bg-gray-100 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : filteredMajlis.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="grid gap-6">
                  {filteredMajlis.map((item, index) => (
                    <MajlisSessionCard key={item._id || item.id} item={item} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
            <div>
              <p className="section-subtitle">Archive</p>
              <h2 className="section-title mt-3">Completed Books</h2>
            </div>
            <p className="text-gray-500 max-w-xl">
              Completed studies remain available as a record of texts covered by the community.
            </p>
          </div>

          {completedLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="h-80 bg-white rounded-[1.75rem] animate-pulse" />
              ))}
            </div>
          ) : completed.length === 0 ? (
            <EmptyState title="No completed books yet" text="Completed studies will appear here once sessions finish." />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completed.map((item, index) => (
                <CompletedBookCard key={item._id || index} item={item} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ stat, index }) => {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`bg-white rounded-[1.5rem] border shadow-soft p-6 ${statCardClasses[stat.variant]}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-75">{stat.label}</p>
          <p className="text-3xl font-bold mt-1">{stat.value}</p>
        </div>
        <Icon className="text-4xl opacity-25" />
      </div>
    </motion.div>
  );
};

const MajlisSessionCard = ({ item, index }) => {
  const enrolled = item.enrollment?.enrolled || 0;
  const capacity = item.enrollment?.capacity || 0;
  const progress = capacity > 0 ? Math.min(100, Math.round((enrolled / capacity) * 100)) : 0;
  const detailUrl = `/lectures/${item._id || item.id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      className="bg-white rounded-[1.75rem] border border-gray-100 shadow-soft overflow-hidden hover:shadow-premium transition"
    >
      <div className="grid lg:grid-cols-[260px_1fr]">
        <Link to={detailUrl} className="relative min-h-[240px] block overflow-hidden">
          <img
            src={item.book?.image || FALLBACK_BOOK_IMAGE}
            alt={item.book?.name || item.title}
            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <span className="absolute left-5 top-5 px-3 py-1 rounded-full bg-white/90 text-primary text-sm font-bold capitalize">
            {item.type}
          </span>
        </Link>

        <div className="p-6 md:p-7 space-y-5">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
            <div>
              <Link to={detailUrl}>
                <h3 className="text-2xl md:text-3xl font-bold text-primary hover:text-gold transition">
                  {item.title}
                </h3>
              </Link>
              <p className="text-gray-500 mt-2">
                {item.book?.name || "Book details coming soon"}
              </p>
            </div>
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold capitalize self-start">
              {item.status || "ongoing"}
            </span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <MiniInfo icon={FaCalendarAlt} label="Day" value={item.schedule?.day || "TBA"} />
            <MiniInfo
              icon={FaClock}
              label="Time"
              value={`${item.schedule?.startTime || "TBA"}${item.schedule?.endTime ? ` - ${item.schedule.endTime}` : ""}`}
            />
            <MiniInfo icon={FaChalkboardTeacher} label="Teacher" value={item.instructor?.name || "TBA"} />
          </div>

          {/* <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Enrollment</span>
              <span className="font-semibold text-primary">
                {enrolled} / {capacity || "Open"}
              </span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full bg-gold rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div> */}

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to={detailUrl} className="btn-primary justify-center">
              View Details <FaArrowRight />
            </Link>
            {(item.access?.telegramLink || item.access?.meetingLink) && (
              <a
                href={item.access.telegramLink || item.access.meetingLink}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-2xl border border-primary/20 text-primary font-semibold flex items-center justify-center gap-2 hover:bg-primary/5 transition"
              >
                Join Session <FaExternalLinkAlt className="text-sm" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const MiniInfo = ({ icon: Icon, label, value }) => (
  <div className="rounded-2xl bg-gray-50 p-4">
    <Icon className="text-gold mb-3" />
    <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
    <p className="font-semibold text-primary mt-1">{value}</p>
  </div>
);

const CompletedBookCard = ({ item, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45, delay: index * 0.04 }}
    className="bg-white rounded-[1.75rem] border border-gray-100 shadow-soft overflow-hidden"
  >
    <div className="relative h-64">
      <img
        src={item.book?.image || FALLBACK_BOOK_IMAGE}
        alt={item.book?.name || "Completed book"}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <span className="absolute top-5 left-5 px-3 py-1 rounded-full bg-gold text-primary text-sm font-bold">
        Completed
      </span>
      <div className="absolute bottom-5 left-5 right-5 text-white">
        <h3 className="text-xl font-bold">{item.book?.name || "Completed Study"}</h3>
        <p className="text-goldSoft text-sm mt-1">{item.book?.category}</p>
      </div>
    </div>
    <div className="p-6 space-y-4">
      <MiniInfo icon={FaChalkboardTeacher} label="Tutor" value={item.tutor?.name || "Tutor"} />
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-400">Completed</p>
          <p className="font-semibold text-primary">
            {item.studyPeriod?.completionDate
              ? new Date(item.studyPeriod.completionDate).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Duration</p>
          <p className="font-semibold text-primary">{item.studyPeriod?.durationText || "N/A"}</p>
        </div>
      </div>
    </div>
  </motion.article>
);

const EmptyState = ({
  title = "No sessions found",
  text = "Try a different search term or switch the session type.",
}) => (
  <div className="bg-white border border-gray-100 shadow-soft rounded-[1.75rem] py-20 px-6 text-center">
    <FaBookOpen className="mx-auto text-5xl text-gray-300 mb-5" />
    <h3 className="text-2xl font-bold text-primary">{title}</h3>
    <p className="text-gray-500 mt-3">{text}</p>
  </div>
);

export default MajlisSchedulePage;
