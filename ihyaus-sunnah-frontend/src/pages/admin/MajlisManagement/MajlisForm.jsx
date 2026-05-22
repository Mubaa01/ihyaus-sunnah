import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaBook,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaChartLine,
  FaInfoCircle,
  FaClipboardList,
  FaImage,
  FaLock,
  FaGlobe,
} from "react-icons/fa";

const initialFormState = {
  id: null,
  title: "",
  type: "public",
  day: "",
  time: "",
  endTime: "",
  tutor: "",
  enrolled: 0,
  capacity: 0,
  level: "",
  book: "",
  bookImage: "",
  tutorImage: "",
  format: "",
  description: "",
  requirements: "",
};

const MajlisForm = ({ open, onClose, onSave, initialData }) => {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm(initialFormState);
    }
    setErrors({});
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.day.trim()) newErrors.day = "Day is required";
    if (!form.time.trim()) newErrors.time = "Start time is required";
    if (!form.tutor.trim()) newErrors.tutor = "Tutor name is required";
    if (form.capacity && form.enrolled > form.capacity) {
      newErrors.enrolled = "Enrolled cannot exceed capacity";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await onSave(form);
      onClose();
    } catch (error) {
      console.error("Error saving majlis:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient */}
            <div className="sticky top-0 bg-gradient-to-r from-primary to-primary/80 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">
                    {form.id ? "Edit Majlis Session" : "Create New Majlis"}
                  </h2>
                  <p className="text-white/80 mt-1">
                    {form.id 
                      ? "Update session details, schedule, and enrollment" 
                      : "Add a new study circle or private class to the system"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <FaTimes className="text-white text-xl" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                  <FaInfoCircle className="text-gold text-xl" />
                  <h3 className="text-xl font-bold text-primary">Basic Information</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Majlis Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="e.g., Advanced Quranic Studies"
                      className={`w-full px-5 py-3 rounded-2xl border ${
                        errors.title ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-primary"
                      } focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                      required
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Session Type
                    </label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, type: "public" }))}
                        className={`flex-1 py-3 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 ${
                          form.type === "public"
                            ? "bg-green-500 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <FaGlobe /> Public
                      </button>
                      <button
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, type: "private" }))}
                        className={`flex-1 py-3 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 ${
                          form.type === "private"
                            ? "bg-purple-500 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <FaLock /> Private
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                  <FaCalendarAlt className="text-gold text-xl" />
                  <h3 className="text-xl font-bold text-primary">Schedule Details</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Day <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="day"
                      value={form.day}
                      onChange={handleChange}
                      className={`w-full px-5 py-3 rounded-2xl border ${
                        errors.day ? "border-red-500 bg-red-50" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                      required
                    >
                      <option value="">Select day</option>
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thursday">Thursday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                    </select>
                    {errors.day && <p className="text-red-500 text-sm mt-1">{errors.day}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="time"
                      type="time"
                      value={form.time}
                      onChange={handleChange}
                      className={`w-full px-5 py-3 rounded-2xl border ${
                        errors.time ? "border-red-500 bg-red-50" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                      required
                    />
                    {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Time
                    </label>
                    <input
                      name="endTime"
                      type="time"
                      value={form.endTime}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              {/* Instructor & Book Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                  <FaChalkboardTeacher className="text-gold text-xl" />
                  <h3 className="text-xl font-bold text-primary">Instructor & Material</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tutor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="tutor"
                      value={form.tutor}
                      onChange={handleChange}
                      placeholder="e.g., Sheikh Ahmed Khan"
                      className={`w-full px-5 py-3 rounded-2xl border ${
                        errors.tutor ? "border-red-500 bg-red-50" : "border-gray-200"
                      } focus:outline-none focus:ring-2 focus:ring-primary/20`}
                      required
                    />
                    {errors.tutor && <p className="text-red-500 text-sm mt-1">{errors.tutor}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tutor Image URL
                    </label>
                    <input
                      name="tutorImage"
                      value={form.tutorImage}
                      onChange={handleChange}
                      placeholder="https://example.com/tutor-image.jpg"
                      className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Book/Textbook
                    </label>
                    <input
                      name="book"
                      value={form.book}
                      onChange={handleChange}
                      placeholder="e.g., The Noble Quran"
                      className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Book Image URL
                    </label>
                    <input
                      name="bookImage"
                      value={form.bookImage}
                      onChange={handleChange}
                      placeholder="https://example.com/book-cover.jpg"
                      className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              {/* Enrollment & Level Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                  <FaUsers className="text-gold text-xl" />
                  <h3 className="text-xl font-bold text-primary">Enrollment & Level</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Enrollment
                    </label>
                    <input
                      name="enrolled"
                      type="number"
                      min="0"
                      value={form.enrolled}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Maximum Capacity
                    </label>
                    <input
                      name="capacity"
                      type="number"
                      min="0"
                      value={form.capacity}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    {errors.enrolled && (
                      <p className="text-red-500 text-sm mt-1">{errors.enrolled}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Level/Prerequisite
                    </label>
                    <select
                      name="level"
                      value={form.level}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Details Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                  <FaClipboardList className="text-gold text-xl" />
                  <h3 className="text-xl font-bold text-primary">Additional Details</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Format
                    </label>
                    <select
                      name="format"
                      value={form.format}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select format</option>
                      <option value="In-person">In-person</option>
                      <option value="Online">Online</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Requirements
                    </label>
                    <textarea
                      name="requirements"
                      value={form.requirements}
                      onChange={handleChange}
                      placeholder="List any prerequisites or requirements..."
                      rows="2"
                      className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Provide a detailed description of the majlis, topics covered, and what students will learn..."
                    rows="4"
                    className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-2xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 btn-primary py-3 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {form.id ? "Updating..." : "Creating..."}
                    </span>
                  ) : (
                    form.id ? "Update Majlis" : "Create Majlis"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MajlisForm;