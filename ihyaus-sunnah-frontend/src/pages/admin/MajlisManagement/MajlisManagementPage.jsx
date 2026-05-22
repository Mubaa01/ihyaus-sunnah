import { useState, useMemo, useEffect } from "react";
import {
  FaPlus,
  FaTimes,
  FaEdit,
  FaTrash,
  FaSearch,
  FaClock,
  FaUsers,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaLock,
  FaEye,
  FaCheck,
  FaBook,
  FaTrophy,
  FaGraduationCap,
  FaChartLine,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import useMajlisAPI from "../../../hooks/useMajlisAPI";
import useCompletedMajlisAPI from "../../../hooks/useCompletedMajlisAPI";
import SecretKeyModal from "../../../components/admin/SecretKeyModal";
import MajlisForm from "./MajlisForm";

const MajlisManagementPage = () => {
  const { majlis, stats = {}, updateEnrollment, deleteMajlisData } = useMajlisAPI();
  const { completed, loading: completedLoading, removeCompleted } = useCompletedMajlisAPI();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedMajlis, setSelectedMajlis] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null); // "active" or "completed"
  
  // For Completed Majlis modal
  const [selectedCompleted, setSelectedCompleted] = useState(null);
  const [showCompletedModal, setShowCompletedModal] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log("[MajlisManagementPage] majlis:", majlis);
    console.log("[MajlisManagementPage] completed:", completed);
  }, [majlis, completed]);

  // Optimized filtering with useMemo
  const filteredMajlis = useMemo(() => {
    return majlis.filter((m) => {
      const matchesSearch = m.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || m.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [majlis, searchTerm, filterType]);

  // Get role label for consistent styling
  const getTypeLabel = (type) => {
    switch (type) {
      case "public":
        return "Public Session";
      case "private":
        return "Private Class";
      default:
        return "Majlis";
    }
  };

  const handleDeleteClick = (id, type) => {
    setItemToDelete(id);
    setDeleteType(type);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteType === "active") {
      deleteMajlisData(itemToDelete);
    } else if (deleteType === "completed") {
      removeCompleted(itemToDelete);
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
    setDeleteType(null);
  };

  const handleSaveMajlis = (data) => {
    if (data.id) {
      if (typeof updateEnrollment === 'function') {
        updateEnrollment(data.id, data);
      }
    } else {
      if (typeof updateEnrollment === 'function') {
        updateEnrollment(Date.now(), { ...data, id: Date.now() });
      }
    }
    setIsFormOpen(false);
    setSelectedMajlis(null);
  };

  return (
    <div className="space-y-10">
      {/* HEADER - Matching Staff Page style */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1 className="text-4xl font-bold text-primary">
            Majlis Management
          </h1>
          <p className="text-gray-500 mt-2">
            Manage study circles, private classes, and track completed sessions.
          </p>
        </div>
        
        <button
          onClick={() => {
            setSelectedMajlis(null);
            setIsFormOpen(true);
          }}
          className="btn-primary"
        >
          + Add Majlis
        </button>
      </div>

      {/* STATS OVERVIEW - Enhanced with animations matching Staff Page aesthetics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Majlis", value: stats.totalMajlis || 0, icon: FaChalkboardTeacher, color: "primary" },
          { label: "Public Sessions", value: stats.publicCount || 0, icon: FaUsers, color: "green" },
          { label: "Private Classes", value: stats.privateCount || 0, icon: FaLock, color: "purple" },
          { label: "Total Enrolled", value: stats.totalEnrolled || 0, icon: FaGraduationCap, color: "blue" },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
              </div>
              <stat.icon className={`text-5xl text-${stat.color}-600/20`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* SEARCH & FILTER - Matching Staff Page design */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* SEARCH */}
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search majlis by title or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* TYPE FILTER - Dropdown style matching Staff Page */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input-primary"
          >
            <option value="all">All Types</option>
            <option value="public">Public Sessions</option>
            <option value="private">Private Classes</option>
          </select>
        </div>
      </div>

      {/* ACTIVE MAJLIS SECTION - Card-based like Staff Page */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
              <FaCalendarAlt className="text-gold" />
              Active Sessions
            </h2>
            <p className="text-gray-500 mt-1">Currently running and upcoming majlis sessions</p>
          </div>
          <div className="text-sm text-gray-400">
            {filteredMajlis.length} session{filteredMajlis.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredMajlis.map((item, index) => (
              <motion.div
                key={item.id || item._id || index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-premium transition-all duration-500"
              >
                {/* HEADER SECTION - Gradient background */}
                <div className={`relative p-6 ${
                  item.type === "public" 
                    ? "bg-gradient-to-br from-green-50 to-green-100/30" 
                    : "bg-gradient-to-br from-purple-50 to-purple-100/30"
                }`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        item.type === "public"
                          ? "bg-green-100 text-green-700"
                          : "bg-purple-100 text-purple-700"
                      }`}>
                        {getTypeLabel(item.type)}
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

                {/* CONTENT SECTION */}
                <div className="p-6 space-y-4">
                  {/* Schedule */}
                  <div className="flex items-start gap-3">
                    <FaClock className="text-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">{item.day || "TBA"}</p>
                      <p className="text-sm text-gray-500">
                        {item.time || "TBA"} {item.endTime && `- ${item.endTime}`}
                      </p>
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="flex items-start gap-3">
                    <FaChalkboardTeacher className="text-gold mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">{item.tutor || "TBA"}</p>
                      <p className="text-sm text-gray-500">Lead Instructor</p>
                    </div>
                  </div>

                  {/* Level */}
                  <div className="flex items-start gap-3">
                    <FaGraduationCap className="text-gold mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{item.level || "All levels welcome"}</p>
                  </div>

                  {/* Progress Bar */}
                  {item.capacity && (
                    <div className="pt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Enrollment</span>
                        <span className="font-semibold text-primary">
                          {Math.round(((item.enrolled || 0) / item.capacity) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${((item.enrolled || 0) / item.capacity) * 100}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className={`h-full rounded-full ${
                            item.type === "public" ? "bg-green-500" : "bg-purple-500"
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* ACTIONS - Matching Staff Page button style */}
                <div className="p-6 pt-0 flex gap-3 flex-col sm:flex-row">
                  <button
                    onClick={() => {
                      setSelectedMajlis(item);
                      setIsFormOpen(true);
                    }}
                    className="flex-1 bg-primary text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold hover:scale-105 transition"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item.id || item._id, "active")}
                    className="w-full sm:w-14 rounded-2xl border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* EMPTY STATE for Active Majlis */}
        {filteredMajlis.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-soft py-24 text-center"
          >
            <FaCalendarAlt className="mx-auto text-6xl text-gray-300 mb-5" />
            <h3 className="text-3xl font-bold text-primary">No Active Sessions</h3>
            <p className="text-gray-500 mt-3">
              {searchTerm || filterType !== "all" 
                ? "Try adjusting your search or filter criteria."
                : "Click 'Add Majlis' to create your first session."}
            </p>
          </motion.div>
        )}
      </div>

      {/* COMPLETED MAJLIS SECTION - Card grid matching Staff Page aesthetics */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary flex items-center gap-3">
              <FaTrophy className="text-gold" />
              Completed Studies
            </h2>
            <p className="text-gray-500 mt-1">Books and study circles completed by our community</p>
          </div>
          <div className="text-sm text-gray-400">
            {completed.length} completed
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {completedLoading ? (
            // Loading skeletons matching card style
            [...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden"
              >
                <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                  <div className="h-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </motion.div>
            ))
          ) : completed.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full bg-white rounded-3xl border border-gray-100 shadow-soft py-24 text-center"
            >
              <FaBook className="mx-auto text-6xl text-gray-300 mb-5" />
              <h3 className="text-3xl font-bold text-primary">No Completed Studies</h3>
              <p className="text-gray-500 mt-3">Completed majlis will appear here once sessions finish.</p>
            </motion.div>
          ) : (
            completed.map((item, idx) => (
              <motion.div
                key={item._id || idx}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-premium transition-all duration-500"
              >
                {/* IMAGE SECTION with gradient overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.book?.image}
                    alt={item.book?.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  {/* COMPLETED BADGE */}
                  <div className="absolute top-5 left-5 px-4 py-2 rounded-full bg-gold/90 backdrop-blur-md border border-white/20 text-primary text-sm font-bold">
                    <FaCheck className="inline mr-2" /> Completed
                  </div>
                </div>

                {/* CONTENT SECTION */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-1 line-clamp-2">
                      {item.book?.name}
                    </h3>
                    <p className="text-gold font-medium">
                      By {item.tutor?.name}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Completion Date:</span>
                      <span className="font-semibold text-gray-800">
                        {item.studyPeriod?.completionDate 
                          ? new Date(item.studyPeriod.completionDate).toLocaleDateString() 
                          : '-'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Study Duration:</span>
                      <span className="font-semibold text-gray-800">{item.studyPeriod?.duration || '-'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-semibold text-gray-800">{item.book?.category || '-'}</span>
                    </div>
                  </div>

                  {/* HIGHLIGHTS TAGS */}
                  {item.book?.highlights && item.book.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.book.highlights.slice(0, 3).map((highlight, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="p-6 pt-0 flex gap-3 flex-col sm:flex-row">
                  <button
                    onClick={() => {
                      setSelectedCompleted(item);
                      setShowCompletedModal(true);
                    }}
                    className="flex-1 bg-secondary text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold hover:scale-105 transition"
                  >
                    <FaEye /> View Details
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item._id, "completed")}
                    className="w-full sm:w-14 rounded-2xl border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* COMPLETED MAJLIS DETAILS MODAL - Redesigned matching Staff Page aesthetics */}
      <AnimatePresence>
        {showCompletedModal && selectedCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowCompletedModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setShowCompletedModal(false)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/70 transition"
                >
                  <FaTimes />
                </button>
                
                <div className="relative h-80 overflow-hidden rounded-t-3xl">
                  <img
                    src={selectedCompleted.book?.image}
                    alt={selectedCompleted.book?.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h2 className="text-3xl font-bold mb-2">{selectedCompleted.book?.name}</h2>
                    <p className="text-gold text-lg">By {selectedCompleted.tutor?.name}</p>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Completion Date</p>
                      <p className="font-semibold text-gray-800">
                        {selectedCompleted.studyPeriod?.completionDate 
                          ? new Date(selectedCompleted.studyPeriod.completionDate).toLocaleDateString() 
                          : '-'}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Study Duration</p>
                      <p className="font-semibold text-gray-800">{selectedCompleted.studyPeriod?.duration || '-'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Category</p>
                      <p className="font-semibold text-gray-800">{selectedCompleted.book?.category || '-'}</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Highlights</p>
                      <p className="font-semibold text-gray-800">{selectedCompleted.book?.highlights?.join(", ") || '-'}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Description</p>
                    <p className="text-gray-700 leading-relaxed">{selectedCompleted.book?.description || 'No description available.'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SECRET KEY MODAL for Delete Confirmation - Matching Staff Page */}
      <SecretKeyModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />

      {/* MAJLIS FORM MODAL */}
      <MajlisForm
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedMajlis(null);
        }}
        onSave={handleSaveMajlis}
        initialData={selectedMajlis}
      />
    </div>
  );
};

export default MajlisManagementPage;