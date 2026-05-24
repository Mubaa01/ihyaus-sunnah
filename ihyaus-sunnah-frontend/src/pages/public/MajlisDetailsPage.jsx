import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaClock,
  FaExternalLinkAlt,
  FaFileAlt,
  FaLock,
  FaPlayCircle,
  FaTelegramPlane,
  FaUserGraduate,
  FaUsers,
  FaYoutube,
} from "react-icons/fa";

import { majlisAPI } from "../../services/api";

const FALLBACK_BOOK_IMAGE =
  "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1600&auto=format&fit=crop";

const formatLevel = (level) => {
  if (!level) return "Beginner";
  return level.charAt(0).toUpperCase() + level.slice(1);
};

const MajlisDetailsPage = () => {
  const { id } = useParams();
  const [majlis, setMajlis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    majlisAPI
      .getById(id)
      .then((res) => {
        setMajlis(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load majlis");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !majlis) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {error || "Majlis Not Found"}
          </h1>
          <Link to="/lectures" className="btn-primary inline-flex">
            <FaArrowLeft /> Back to schedule
          </Link>
        </div>
      </div>
    );
  }

  const enrolled = majlis.enrollment?.enrolled || 0;
  const capacity = majlis.enrollment?.capacity || 0;
  const progress = capacity > 0 ? Math.min(100, Math.round((enrolled / capacity) * 100)) : 0;
  const bookProgress = Math.min(100, Number(majlis.book?.progress) || 0);

  return (
    <div className="min-h-screen bg-brand-50">
      <section className="relative bg-primary text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={majlis.book?.image || FALLBACK_BOOK_IMAGE}
            alt={majlis.book?.name || majlis.title}
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-black/75" />
        </div>

        <div className="container-custom relative z-10 py-24">
          <Link
            to="/lectures"
            className="inline-flex items-center gap-2 text-white/80 hover:text-gold transition mb-10"
          >
            <FaArrowLeft /> Back to Majlis Schedule
          </Link>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 rounded-full bg-gold text-primary text-sm font-bold capitalize">
                  {majlis.status || "ongoing"}
                </span>
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm font-semibold capitalize">
                  {majlis.type || "public"} majlis
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight">
                {majlis.title}
              </h1>
              <p className="text-xl text-white/80 mt-6 max-w-3xl leading-relaxed">
                {majlis.book?.description ||
                  "A structured Islamic learning circle with scheduled lessons, guided reading, and community participation."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-[2rem] p-5"
            >
              <img
                src={majlis.book?.image || FALLBACK_BOOK_IMAGE}
                alt={majlis.book?.name || "Book cover"}
                className="h-80 w-full rounded-[1.5rem] object-cover"
              />
              <div className="pt-5">
                <p className="text-white/60 text-sm">Current text</p>
                <h2 className="text-2xl font-bold mt-1">{majlis.book?.name || "Study Text"}</h2>
                {majlis.book?.arabicName && (
                  <p dir="rtl" className="text-goldSoft text-2xl mt-2 font-arabic">
                    {majlis.book.arabicName}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container-custom -mt-10 relative z-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <InfoCard icon={FaCalendarAlt} label="Day" value={majlis.schedule?.day || "TBA"} />
          <InfoCard
            icon={FaClock}
            label="Time"
            value={`${majlis.schedule?.startTime || "TBA"}${majlis.schedule?.endTime ? ` - ${majlis.schedule.endTime}` : ""}`}
          />
          <InfoCard icon={FaUserGraduate} label="Level" value={formatLevel(majlis.level)} />
          <InfoCard icon={FaUsers} label="Enrolled" value={`${enrolled} / ${capacity || "Open"}`} />
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          <div className="space-y-8">
            <Panel title="Book Progress" icon={FaBookOpen}>
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-semibold text-primary">{bookProgress}%</span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-gold rounded-full" style={{ width: `${bookProgress}%` }} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <DetailItem label="Category" value={majlis.book?.category || "Not specified"} />
                  <DetailItem label="Current chapter" value={majlis.book?.currentChapter || "Not specified"} />
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {majlis.book?.description || "No book description has been added yet."}
                </p>
              </div>
            </Panel>

            <Panel title="Instructor" icon={FaChalkboardTeacher}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-28 h-28 rounded-3xl bg-primary/10 overflow-hidden flex items-center justify-center shrink-0">
                  {majlis.instructor?.image ? (
                    <img
                      src={majlis.instructor.image}
                      alt={majlis.instructor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaChalkboardTeacher className="text-primary text-4xl" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">
                    {majlis.instructor?.name || "Instructor"}
                  </h3>
                  <p className="text-gold font-semibold mt-1">
                    {majlis.instructor?.role || "Lead Instructor"}
                  </p>
                  <p className="text-gray-600 mt-4 leading-relaxed">
                    {majlis.instructor?.bio || "Instructor biography has not been added yet."}
                  </p>
                </div>
              </div>
            </Panel>

            {majlis.requirements && (
              <Panel title="Requirements" icon={FaLock}>
                <p className="text-gray-600 leading-relaxed">{majlis.requirements}</p>
              </Panel>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28">
            <Panel title="Session Access" icon={FaPlayCircle}>
              <div className="space-y-3">
                {majlis.access?.telegramLink && (
                  <AccessLink href={majlis.access.telegramLink} icon={FaTelegramPlane} label="Telegram Channel" />
                )}
                {majlis.access?.youtubeLink && (
                  <AccessLink href={majlis.access.youtubeLink} icon={FaYoutube} label="YouTube Playlist" />
                )}
                {majlis.access?.meetingLink && (
                  <AccessLink href={majlis.access.meetingLink} icon={FaExternalLinkAlt} label="Meeting Link" />
                )}
                {!majlis.access?.telegramLink &&
                  !majlis.access?.youtubeLink &&
                  !majlis.access?.meetingLink && (
                    <p className="text-gray-500">Access links have not been added yet.</p>
                  )}
              </div>
            </Panel>

            <Panel title="Materials" icon={FaFileAlt}>
              {majlis.access?.materials?.length ? (
                <div className="space-y-3">
                  {majlis.access.materials.map((material, index) => (
                    <a
                      key={material}
                      href={material}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-3 rounded-2xl border border-gray-100 px-4 py-3 text-primary hover:bg-primary/5 transition"
                    >
                      <span>Material {index + 1}</span>
                      <FaExternalLinkAlt className="text-sm" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No materials attached yet.</p>
              )}
            </Panel>

            <Panel title="Enrollment" icon={FaUsers}>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Capacity used</span>
                  <span className="font-semibold text-primary">{progress}%</span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-gray-600">
                  {enrolled} enrolled {capacity ? `out of ${capacity} available seats.` : "with open capacity."}
                </p>
              </div>
            </Panel>
          </aside>
        </div>
      </section>
    </div>
  );
};

const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-soft p-6">
    <Icon className="text-gold text-2xl mb-4" />
    <p className="text-sm text-gray-400 uppercase tracking-wide">{label}</p>
    <p className="text-xl font-bold text-primary mt-1">{value}</p>
  </div>
);

const Panel = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-[1.75rem] border border-gray-100 shadow-soft p-6 md:p-7">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-11 h-11 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
        <Icon />
      </div>
      <h2 className="text-2xl font-bold text-primary">{title}</h2>
    </div>
    {children}
  </div>
);

const DetailItem = ({ label, value }) => (
  <div className="rounded-2xl bg-gray-50 p-4">
    <p className="text-sm text-gray-400">{label}</p>
    <p className="font-semibold text-primary mt-1">{value}</p>
  </div>
);

const AccessLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-between gap-3 rounded-2xl bg-primary text-white px-5 py-4 font-semibold hover:scale-[1.02] transition"
  >
    <span className="flex items-center gap-3">
      <Icon /> {label}
    </span>
    <FaExternalLinkAlt className="text-sm" />
  </a>
);

export default MajlisDetailsPage;
