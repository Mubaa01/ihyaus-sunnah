import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaBookOpen,
  FaClock,
  FaCalendarAlt,
  FaPlayCircle,
  FaTelegramPlane,
  FaFacebookF,
  FaYoutube,
  FaChalkboardTeacher,
  FaMosque,
  FaUsers,
  FaRegBell,
  FaDownload,
  FaStar,
  FaLock,
  FaShieldAlt,
  FaTrophy,
  FaChevronRight,
  FaUserGraduate,
  FaHourglassHalf,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

import { IoMdPeople } from "react-icons/io";
import { GiBookCover, GiOpenBook } from "react-icons/gi";

import useMajlisAPI from "../../hooks/useMajlisAPI";
import useCompletedMajlisAPI from "../../hooks/useCompletedMajlisAPI";

// =========================
// STAT CARD COMPONENT
// =========================
const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ y: -5 }}
    className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6 transition-all duration-300"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
      </div>
      <Icon className={`text-5xl text-${color}-600/20`} />
    </div>
  </motion.div>
);

// =========================
// MAJLIS CARD COMPONENT
// =========================
const MajlisCard = ({ item, type, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-premium transition-all duration-500"
    >
      {/* Header Section with Gradient */}
      <div className={`relative p-6 ${
        type === "public" 
          ? "bg-gradient-to-br from-green-50 to-green-100/30" 
          : "bg-gradient-to-br from-purple-50 to-purple-100/30"
      }`}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-primary mb-2">
              {item.title}
            </h3>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
              type === "public"
                ? "bg-green-100 text-green-700"
                : "bg-purple-100 text-purple-700"
            }`}>
              {type === "public" ? "Public Session" : "Private Class"}
            </span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {item.enrolled || 0}
            </div>
            <div className="text-xs text-gray-500">
              / {item.capacity || 0} enrolled
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Book Information */}
        {item.book && (
          <div className="flex gap-4">
            <img
              src={item.book.image || "https://via.placeholder.com/80"}
              alt={item.book.name}
              className="w-20 h-24 object-cover rounded-xl shadow-md"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-primary">{item.book.name}</h4>
              <p className="text-sm text-gray-600">{item.book.category}</p>
              {item.book.progress && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-primary">{item.book.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.book.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full rounded-full bg-gold"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Schedule */}
        <div className="flex items-start gap-3 pt-2">
          <FaCalendarAlt className="text-gold mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-gray-800">
              {item.day || item.schedule?.day || "TBA"}
            </p>
            <p className="text-sm text-gray-500">
              <FaClock className="inline mr-1 text-xs" />
              {item.time || item.schedule?.startTime || "TBA"} 
              {item.endTime && ` - ${item.endTime}`}
              {item.schedule?.endTime && ` - ${item.schedule.endTime}`}
            </p>
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-3 pt-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-primary/20 flex items-center justify-center overflow-hidden">
            {item.tutorImage || item.instructor?.image ? (
              <img
                src={item.tutorImage || item.instructor?.image}
                alt={item.tutor || item.instructor?.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaChalkboardTeacher className="text-primary text-xl" />
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-800">
              {item.tutor || item.instructor?.name || "TBA"}
            </p>
            <p className="text-sm text-gray-500">
              Lead Instructor
            </p>
          </div>
        </div>

        {/* Expandable Details */}
        <motion.div
          className="overflow-hidden"
          animate={{ height: isExpanded ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-4 space-y-3">
            {item.level && (
              <div className="flex items-start gap-3">
                <FaUserGraduate className="text-gold mt-1" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Level</p>
                  <p className="text-sm text-gray-600">{item.level}</p>
                </div>
              </div>
            )}
            {item.format && (
              <div className="flex items-start gap-3">
                <FaPlayCircle className="text-gold mt-1" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Format</p>
                  <p className="text-sm text-gray-600">{item.format}</p>
                </div>
              </div>
            )}
            {item.description && (
              <div className="flex items-start gap-3">
                <FaBookOpen className="text-gold mt-1" />
                <div>
                  <p className="text-sm font-semibold text-gray-700">Description</p>
                  <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-gray-200 transition"
          >
            {isExpanded ? "Show Less" : "View Details"}
            <FaChevronRight className={`transition-transform ${isExpanded ? "rotate-90" : ""}`} />
          </button>
          <button className="flex-1 bg-primary text-white py-2 rounded-xl flex items-center justify-center gap-2 font-medium hover:scale-105 transition">
            <FaRegBell /> Notify
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// =========================
// COMPLETED BOOK CARD
// =========================
const CompletedBookCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.04 }}
    whileHover={{ y: -10 }}
    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-premium transition-all duration-500"
  >
    <div className="relative h-56 overflow-hidden">
      <img
        src={item.book?.image || "https://via.placeholder.com/300"}
        alt={item.book?.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      
      <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-gold/90 backdrop-blur-md border border-white/20 text-primary text-sm font-bold">
        <FaCheckCircle className="inline mr-2" /> Completed
      </div>
      
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h3 className="text-xl font-bold line-clamp-2">{item.book?.name}</h3>
        <p className="text-gold text-sm mt-1">{item.book?.category}</p>
      </div>
    </div>

    <div className="p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-primary/20 flex items-center justify-center overflow-hidden">
          {item.tutor?.image ? (
            <img src={item.tutor.image} alt={item.tutor.name} className="w-full h-full object-cover" />
          ) : (
            <FaChalkboardTeacher className="text-primary text-xl" />
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{item.tutor?.name || "Tutor"}</p>
          <p className="text-xs text-gray-500">Lead Instructor</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Study Period:</span>
          <span className="font-semibold text-gray-800">
            {item.studyPeriod?.duration || "N/A"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Completed:</span>
          <span className="font-semibold text-gray-800">
            {item.studyPeriod?.completionDate 
              ? new Date(item.studyPeriod.completionDate).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
      </div>

      {item.book?.highlights && item.book.highlights.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {item.book.highlights.slice(0, 2).map((highlight, i) => (
            <span key={i} className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
              {highlight}
            </span>
          ))}
        </div>
      )}

      <button className="w-full bg-secondary text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold hover:scale-105 transition">
        <FaBookOpen /> View Book Details
      </button>
    </div>
  </motion.div>
);

// =========================
// MAIN PAGE
// =========================
const MajlisSchedulePage = () => {
  const [activeTab, setActiveTab] = useState("public");
  const [showNotifications, setShowNotifications] = useState(false);

  const {
    majlis,
    loading: majlisLoading,
  } = useMajlisAPI();

  const {
    completed,
    loading: completedLoading,
  } = useCompletedMajlisAPI();

  // Filter majlis with useMemo for performance
  const publicMajlis = useMemo(
    () => majlis.filter((item) => item.type === "public"),
    [majlis]
  );

  const privateMajlis = useMemo(
    () => majlis.filter((item) => item.type === "private"),
    [majlis]
  );

  // Calculate stats
  const stats = {
    totalPublic: publicMajlis.length,
    totalPrivate: privateMajlis.length,
    totalCompleted: completed.length,
    totalEnrolled: majlis.reduce((sum, item) => sum + (item.enrolled || 0), 0),
  };

  return (
    <div className="bg-gradient-to-b from-cream to-white min-h-screen">
      {/* =========================
          HERO SECTION - Enhanced
      ========================= */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519817650390-64a93db51149')",
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-black/70" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gold/5 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Majlis Schedule
            </h1>
            
            <p className="text-gold text-3xl font-arabic mb-8" dir="rtl">
              طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
            </p>
            
            <p className="text-white/90 max-w-2xl text-lg mb-10 leading-relaxed">
              Embark on a structured Islamic learning journey with our comprehensive 
              majlis program. Join live sessions, track your progress, and access 
              completed book archives.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-4 text-lg"
                href="#schedule"
              >
                Explore Schedule <FaArrowRight className="inline ml-2" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline px-8 py-4 text-lg"
                href="https://t.me/yourchannel"
                target="_blank"
              >
                <FaTelegramPlane className="inline mr-2" /> Join Telegram
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        >
          <FaChevronRight className="rotate-90 text-2xl" />
        </motion.div>
      </section>

      {/* =========================
          STATS SECTION - New
      ========================= */}
      <section className="container-custom -mt-16 relative z-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={FaUsers}
            label="Public Sessions"
            value={stats.totalPublic}
            color="green"
            delay={0.1}
          />
          <StatCard
            icon={FaLock}
            label="Private Classes"
            value={stats.totalPrivate}
            color="purple"
            delay={0.2}
          />
          <StatCard
            icon={FaTrophy}
            label="Completed Books"
            value={stats.totalCompleted}
            color="gold"
            delay={0.3}
          />
          <StatCard
            icon={FaUserGraduate}
            label="Total Enrolled"
            value={stats.totalEnrolled}
            color="blue"
            delay={0.4}
          />
        </div>
      </section>

      {/* =========================
          INTRO SECTION - Enhanced
      ========================= */}
      <section className="section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-primary mb-6">
            About The Majlis
          </h2>
          
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            A structured Islamic study circle where students learn classical texts
            through scheduled sessions and guided instruction under qualified scholars.
          </p>
          
          <div className="flex justify-center gap-8 mt-10">
            <div className="flex items-center gap-2 text-gray-600">
              <FaCheckCircle className="text-gold" />
              <span>Live Sessions</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaCheckCircle className="text-gold" />
              <span>Recorded Archive</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaCheckCircle className="text-gold" />
              <span>Certificate Program</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =========================
          PUBLIC / PRIVATE TOGGLE - Enhanced
      ========================= */}
      <section className="container-custom mb-10">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-3 inline-flex w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("public")}
            className={`flex-1 px-8 py-3 rounded-2xl font-semibold transition-all ${
              activeTab === "public"
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaUsers className="inline mr-2" />
            Public Majlis
          </button>
          <button
            onClick={() => setActiveTab("private")}
            className={`flex-1 px-8 py-3 rounded-2xl font-semibold transition-all ${
              activeTab === "private"
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaLock className="inline mr-2" />
            Private Majlis
          </button>
        </div>
      </section>

      {/* =========================
          MAJLIS SCHEDULE - Card Grid
      ========================= */}
      <section id="schedule" className="container-custom space-y-10 pb-20">
        <AnimatePresence mode="wait">
          {majlisLoading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden"
                >
                  <div className="h-48 bg-gray-200 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                    <div className="h-20 bg-gray-200 rounded animate-pulse" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (activeTab === "public" ? publicMajlis : privateMajlis).length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-soft py-24 text-center"
            >
              {activeTab === "public" ? (
                <FaUsers className="mx-auto text-6xl text-gray-300 mb-5" />
              ) : (
                <FaLock className="mx-auto text-6xl text-gray-300 mb-5" />
              )}
              <h3 className="text-3xl font-bold text-primary">
                No {activeTab === "public" ? "Public Sessions" : "Private Classes"} Available
              </h3>
              <p className="text-gray-500 mt-3">
                Check back later for upcoming {activeTab === "public" ? "sessions" : "classes"}.
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {(activeTab === "public" ? publicMajlis : privateMajlis).map(
                (item, index) => (
                  <MajlisCard
                    key={item._id || item.id}
                    item={item}
                    type={activeTab}
                    index={index}
                  />
                )
              )}
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* =========================
          COMPLETED BOOKS - Enhanced
      ========================= */}
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Completed Books Archive
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our collection of completed study circles and mastered texts
            </p>
          </motion.div>

          {completedLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden">
                  <div className="h-56 bg-gray-200 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : completed.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-soft py-24 text-center"
            >
              <FaBookOpen className="mx-auto text-6xl text-gray-300 mb-5" />
              <h3 className="text-3xl font-bold text-primary">No Completed Books Yet</h3>
              <p className="text-gray-500 mt-3">Completed books will appear here once sessions finish.</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {completed.map((item, index) => (
                <CompletedBookCard key={item._id} item={item} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================
          CALL TO ACTION - New
      ========================= */}
      <section className="container-custom py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 text-center text-white shadow-premium"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Join our upcoming majlis sessions and be part of a vibrant learning community
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition">
              View Schedule
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-2xl font-semibold hover:bg-white/10 transition">
              Contact Us
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default MajlisSchedulePage;