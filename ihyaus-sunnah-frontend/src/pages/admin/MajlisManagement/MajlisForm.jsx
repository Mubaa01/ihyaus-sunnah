import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaUsers,
  FaInfoCircle,
  FaClipboardList,
  FaLock,
  FaGlobe,
} from "react-icons/fa";

import SecretKeyModal from "../../../components/admin/SecretKeyModal";

const initialFormState = {
  id: null,
  title: "",
  type: "public",
  status: "ongoing",
  day: "",
  startTime: "",
  endTime: "",
  timezone: "Africa/Lagos",
  instructorName: "",
  instructorImage: "",
  instructorRole: "",
  instructorBio: "",
  bookName: "",
  bookArabicName: "",
  bookImage: "",
  bookCategory: "",
  bookDescription: "",
  bookProgress: 0,
  currentChapter: "",
  enrolled: 0,
  capacity: 0,
  level: "beginner",
  requirements: "",
  telegramLink: "",
  youtubeLink: "",
  meetingLink: "",
  materials: "",
  featured: false,
  published: true,
};

const toFormState = (item) => ({
  ...initialFormState,
  id: item?._id || item?.id || null,
  title: item?.title || "",
  type: item?.type || "public",
  status: item?.status || "ongoing",
  day: item?.schedule?.day || "",
  startTime: item?.schedule?.startTime || "",
  endTime: item?.schedule?.endTime || "",
  timezone: item?.schedule?.timezone || "Africa/Lagos",
  instructorName: item?.instructor?.name || "",
  instructorImage: item?.instructor?.image || "",
  instructorRole: item?.instructor?.role || "",
  instructorBio: item?.instructor?.bio || "",
  bookName: item?.book?.name || "",
  bookArabicName: item?.book?.arabicName || "",
  bookImage: item?.book?.image || "",
  bookCategory: item?.book?.category || "",
  bookDescription: item?.book?.description || "",
  bookProgress: item?.book?.progress ?? 0,
  currentChapter: item?.book?.currentChapter || "",
  enrolled: item?.enrollment?.enrolled ?? 0,
  capacity: item?.enrollment?.capacity ?? 0,
  level: item?.level || "beginner",
  requirements: item?.requirements || "",
  telegramLink: item?.access?.telegramLink || "",
  youtubeLink: item?.access?.youtubeLink || "",
  meetingLink: item?.access?.meetingLink || "",
  materials: item?.access?.materials?.join("\n") || "",
  featured: !!item?.featured,
  published: item?.published !== false,
});

const toPayload = (form) => {
  const payload = {
    title: form.title.trim(),
    slug: form.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    type: form.type,
    status: form.status,
    schedule: {
      day: form.day,
      startTime: form.startTime,
      endTime: form.endTime,
      timezone: form.timezone || "Africa/Lagos",
    },
    book: {
      name: form.bookName.trim(),
      arabicName: form.bookArabicName.trim(),
      image: form.bookImage.trim(),
      category: form.bookCategory.trim(),
      description: form.bookDescription.trim(),
      progress: Number(form.bookProgress) || 0,
      currentChapter: form.currentChapter.trim(),
    },
    instructor: {
      name: form.instructorName.trim(),
      image: form.instructorImage.trim(),
      role: form.instructorRole.trim(),
      bio: form.instructorBio.trim(),
    },
    access: {
      telegramLink: form.telegramLink.trim(),
      youtubeLink: form.youtubeLink.trim(),
      meetingLink: form.meetingLink.trim(),
      materials: form.materials
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    },
    enrollment: {
      enrolled: Number(form.enrolled) || 0,
      capacity: Number(form.capacity) || 0,
    },
    requirements: form.requirements.trim(),
    level: form.level,
    featured: !!form.featured,
    published: !!form.published,
  };

  if (!payload.book.category) {
    delete payload.book.category;
  }

  return payload;
};

const MajlisForm = ({ open, onClose, onSave, initialData }) => {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSecretModal, setShowSecretModal] = useState(false);

  useEffect(() => {
    setForm(initialData ? toFormState(initialData) : initialFormState);
    setErrors({});
    setShowSecretModal(false);
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.day) newErrors.day = "Day is required";
    if (!form.startTime) newErrors.startTime = "Start time is required";
    if (!form.endTime) newErrors.endTime = "End time is required";
    if (!form.instructorName.trim()) newErrors.instructorName = "Instructor is required";
    if (!form.bookName.trim()) newErrors.bookName = "Book name is required";
    if (Number(form.enrolled) > Number(form.capacity) && Number(form.capacity) > 0) {
      newErrors.enrolled = "Enrolled cannot exceed capacity";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSecretModal(true);
    }
  };

  const confirmSave = async (secretKey) => {
    setIsSubmitting(true);
    try {
      await onSave(form.id, toPayload(form), secretKey);
      setShowSecretModal(false);
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
            className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-primary to-primary/80 text-white p-6 rounded-t-3xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">
                    {form.id ? "Edit Majlis Session" : "Create New Majlis"}
                  </h2>
                  <p className="text-white/80 mt-1">
                    Manage the backend-backed schedule, instructor, book, access, and enrollment details.
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
              <SectionHeader icon={<FaInfoCircle />} title="Basic Information" />
              <div className="grid md:grid-cols-3 gap-5">
                <Input
                  label="Majlis Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  error={errors.title}
                  required
                />
                <Select
                  label="Status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  options={[
                    { value: "ongoing", label: "Ongoing" },
                    { value: "upcoming", label: "Upcoming" },
                    { value: "paused", label: "Paused" },
                  ]}
                />
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Session Type</label>
                  <div className="flex gap-3">
                    <TypeButton
                      active={form.type === "public"}
                      onClick={() => setForm((prev) => ({ ...prev, type: "public" }))}
                      icon={<FaGlobe />}
                      label="Public"
                      activeClass="bg-green-500"
                    />
                    <TypeButton
                      active={form.type === "private"}
                      onClick={() => setForm((prev) => ({ ...prev, type: "private" }))}
                      icon={<FaLock />}
                      label="Private"
                      activeClass="bg-purple-500"
                    />
                  </div>
                </div>
              </div>

              <SectionHeader icon={<FaCalendarAlt />} title="Schedule Details" />
              <div className="grid md:grid-cols-4 gap-5">
                <Select
                  label="Day"
                  name="day"
                  value={form.day}
                  onChange={handleChange}
                  error={errors.day}
                  required
                  options={[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => ({ value: day, label: day }))}
                />
                <Input
                  label="Start Time"
                  name="startTime"
                  type="time"
                  value={form.startTime}
                  onChange={handleChange}
                  error={errors.startTime}
                  required
                />
                <Input
                  label="End Time"
                  name="endTime"
                  type="time"
                  value={form.endTime}
                  onChange={handleChange}
                  error={errors.endTime}
                  required
                />
                <Input
                  label="Timezone"
                  name="timezone"
                  value={form.timezone}
                  onChange={handleChange}
                />
              </div>

              <SectionHeader icon={<FaChalkboardTeacher />} title="Instructor & Book" />
              <div className="grid md:grid-cols-2 gap-5">
                <Input
                  label="Instructor Name"
                  name="instructorName"
                  value={form.instructorName}
                  onChange={handleChange}
                  error={errors.instructorName}
                  required
                />
                <Input
                  label="Instructor Image URL"
                  name="instructorImage"
                  value={form.instructorImage}
                  onChange={handleChange}
                />
                <Input
                  label="Instructor Role"
                  name="instructorRole"
                  value={form.instructorRole}
                  onChange={handleChange}
                />
                <Input
                  label="Book Name"
                  name="bookName"
                  value={form.bookName}
                  onChange={handleChange}
                  error={errors.bookName}
                  required
                />
                <Input
                  label="Book Arabic Name"
                  name="bookArabicName"
                  value={form.bookArabicName}
                  onChange={handleChange}
                />
                <Input
                  label="Book Image URL"
                  name="bookImage"
                  value={form.bookImage}
                  onChange={handleChange}
                />
                <Input
                  label="Book Category"
                  name="bookCategory"
                  value={form.bookCategory}
                  onChange={handleChange}
                />
                <Input
                  label="Current Chapter"
                  name="currentChapter"
                  value={form.currentChapter}
                  onChange={handleChange}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <Textarea
                  label="Book Description"
                  name="bookDescription"
                  value={form.bookDescription}
                  onChange={handleChange}
                />
                <Textarea
                  label="Instructor Bio"
                  name="instructorBio"
                  value={form.instructorBio}
                  onChange={handleChange}
                />
              </div>

              <SectionHeader icon={<FaUsers />} title="Enrollment & Access" />
              <div className="grid md:grid-cols-4 gap-5">
                <Input
                  label="Current Enrollment"
                  name="enrolled"
                  type="number"
                  min="0"
                  value={form.enrolled}
                  onChange={handleChange}
                  error={errors.enrolled}
                />
                <Input
                  label="Maximum Capacity"
                  name="capacity"
                  type="number"
                  min="0"
                  value={form.capacity}
                  onChange={handleChange}
                />
                <Input
                  label="Book Progress (%)"
                  name="bookProgress"
                  type="number"
                  min="0"
                  max="100"
                  value={form.bookProgress}
                  onChange={handleChange}
                />
                <Select
                  label="Level"
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  options={[
                    { value: "beginner", label: "Beginner" },
                    { value: "intermediate", label: "Intermediate" },
                    { value: "advanced", label: "Advanced" },
                  ]}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <Input label="Telegram Link" name="telegramLink" value={form.telegramLink} onChange={handleChange} />
                <Input label="YouTube Link" name="youtubeLink" value={form.youtubeLink} onChange={handleChange} />
                <Input label="Meeting Link" name="meetingLink" value={form.meetingLink} onChange={handleChange} />
              </div>

              <SectionHeader icon={<FaClipboardList />} title="Additional Details" />
              <div className="grid md:grid-cols-2 gap-5">
                <Textarea
                  label="Requirements"
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                />
                <Textarea
                  label="Materials"
                  name="materials"
                  value={form.materials}
                  onChange={handleChange}
                  placeholder="One material URL per line"
                />
              </div>

              <div className="flex flex-wrap gap-6 pt-2">
                <Checkbox label="Featured" name="featured" checked={form.featured} onChange={handleChange} />
                <Checkbox label="Published" name="published" checked={form.published} onChange={handleChange} />
              </div>

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
                  {isSubmitting ? "Saving..." : form.id ? "Update Majlis" : "Create Majlis"}
                </button>
              </div>
            </form>
          </motion.div>

          <SecretKeyModal
            isOpen={showSecretModal}
            onClose={() => setShowSecretModal(false)}
            onConfirm={confirmSave}
            loading={isSubmitting}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SectionHeader = ({ icon, title }) => (
  <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
    <span className="text-gold text-xl">{icon}</span>
    <h3 className="text-xl font-bold text-primary">{title}</h3>
  </div>
);

const Input = ({ label, error, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {props.required && <span className="text-red-500">*</span>}
    </label>
    <input
      {...props}
      className={`w-full px-5 py-3 rounded-2xl border ${
        error ? "border-red-500 bg-red-50" : "border-gray-200"
      } focus:outline-none focus:ring-2 focus:ring-primary/20`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const Select = ({ label, options, error, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {props.required && <span className="text-red-500">*</span>}
    </label>
    <select
      {...props}
      className={`w-full px-5 py-3 rounded-2xl border ${
        error ? "border-red-500 bg-red-50" : "border-gray-200"
      } focus:outline-none focus:ring-2 focus:ring-primary/20`}
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <textarea
      {...props}
      rows={4}
      className="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
    />
  </div>
);

const TypeButton = ({ active, onClick, icon, label, activeClass }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex-1 py-3 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 ${
      active ? `${activeClass} text-white shadow-lg` : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }`}
  >
    {icon} {label}
  </button>
);

const Checkbox = ({ label, ...props }) => (
  <label className="flex items-center gap-3 text-sm font-semibold text-gray-700">
    <input type="checkbox" className="w-5 h-5 text-primary" {...props} />
    {label}
  </label>
);

export default MajlisForm;
