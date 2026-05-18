import { useState } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaClock,
  FaUsers,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaLock,
  FaEye,
  FaCheck,
  FaBook,
  FaTrophy,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useMajlisAPI from "../../../hooks/useMajlisAPI";
import useCompletedSeriesAPI from "../../../hooks/useCompletedSeriesAPI";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import MajlisForm from "./MajlisForm";

const MajlisManagementPage = () => {
  const { majlis, stats, updateEnrollment, deleteMajlisData } = useMajlisAPI();
  const { series: completedSeries, stats: seriesStats, deleteSeriesData } = useCompletedSeriesAPI();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all"); // all, public, private
  const [selectedMajlis, setSelectedMajlis] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    action: null,
    itemId: null,
    title: "",
    message: "",
  });

  const filtered = majlis.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || m.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDeleteMajlis = (id) => {
    setConfirmationModal({
      isOpen: true,
      action: "deleteMajlis",
      itemId: id,
      title: "Delete Majlis Session",
      message: "Are you sure you want to delete this majlis session? This action cannot be undone.",
    });
  };

  const handleDeleteSeries = (id) => {
    setConfirmationModal({
      isOpen: true,
      action: "deleteSeries",
      itemId: id,
      title: "Delete Completed Series",
      message: "Are you sure you want to delete this completed series record? This action cannot be undone.",
    });
  };

  const handleConfirmAction = () => {
    const { action, itemId } = confirmationModal;

    switch (action) {
      case "deleteMajlis":
        deleteMajlisData(itemId);
        break;
      case "deleteSeries":
        deleteSeriesData(itemId);
        break;
      default:
        break;
    }
  };

  // Add or update majlis handler
  const handleSaveMajlis = (data) => {
    // If editing, update existing; else, add new
    if (data.id) {
      // Update logic (should call your updateMajlisData from useMajlis)
      if (typeof updateEnrollment === 'function') {
        updateEnrollment(data.id, data);
      }
    } else {
      // Add logic (should call your addMajlisData from useMajlis)
      if (typeof updateEnrollment === 'function') {
        updateEnrollment(Date.now(), { ...data, id: Date.now() });
      }
    }
    setIsFormOpen(false);
    setSelectedMajlis(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Majlis Management</h1>
          <p className="text-gray-600 mt-1">Manage all majlis sessions and private classes</p>
        </div>
        <button
          onClick={() => {
            setSelectedMajlis(null);
            setIsFormOpen(true);
          }}
          className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <FaPlus size={16} />
          Add New Majlis
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Majlis</p>
              <p className="text-3xl font-bold text-primary">{stats.totalMajlis}</p>
            </div>
            <FaChalkboardTeacher className="text-4xl text-gold/30" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Public Sessions</p>
              <p className="text-3xl font-bold text-green-600">{stats.publicCount}</p>
            </div>
            <FaUsers className="text-4xl text-green-600/30" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Private Classes</p>
              <p className="text-3xl font-bold text-purple-600">{stats.privateCount}</p>
            </div>
            <FaLock className="text-4xl text-purple-600/30" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Enrolled</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalEnrolled}</p>
            </div>
            <FaUsers className="text-4xl text-blue-600/30" />
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search majlis by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex gap-2">
          {["all", "public", "private"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-5 py-3 rounded-2xl font-semibold transition-all ${
                filterType === type
                  ? "bg-primary text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Majlis Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Schedule</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Instructor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Enrollment</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Level</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-primary">{item.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.type === "public"
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {item.type === "public" ? "Public" : "Private"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="font-medium text-gray-700">{item.day}</p>
                        <p className="text-gray-500 text-xs">
                          {item.time} - {item.endTime}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-700">{item.tutor}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          {item.enrolled}/{item.capacity}
                        </p>
                        <div className="w-16 bg-gray-200 rounded-full h-1.5 mt-2">
                          <div
                            className="bg-gold rounded-full h-1.5"
                            style={{
                              width: `${(item.enrolled / item.capacity) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{item.level}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedMajlis(item);
                            setIsFormOpen(true);
                          }}
                          className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteMajlis(item.id)}
                          className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No majlis found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Completed Series Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-bold text-primary flex items-center gap-3">
              <FaTrophy className="text-gold" />
              Completed Series
            </h2>
            <p className="text-gray-600 mt-1">Islamic texts and books completed by our community</p>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <FaPlus size={16} />
            Add Completed Series
          </button>
        </div>

        {/* Series Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Series</p>
                <p className="text-2xl font-bold text-primary">{seriesStats.totalSeries}</p>
              </div>
              <FaBook className="text-2xl text-primary/30" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Volumes</p>
                <p className="text-2xl font-bold text-blue-600">{seriesStats.totalVolumes}</p>
              </div>
              <FaBook className="text-2xl text-blue-600/30" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Participants</p>
                <p className="text-2xl font-bold text-green-600">{seriesStats.totalParticipants}</p>
              </div>
              <FaUsers className="text-2xl text-green-600/30" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Recent (6 months)</p>
                <p className="text-2xl font-bold text-gold">{seriesStats.recentCompletions}</p>
              </div>
              <FaTrophy className="text-2xl text-gold/30" />
            </div>
          </div>
        </div>

        {/* Series Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedSeries.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-gold text-primary px-3 py-1 rounded-full text-xs font-bold">
                  Completed
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-1">By {item.author}</p>
                <p className="text-xs text-gray-500 mb-3">{item.category}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Completion Date:</span>
                    <span className="font-medium">{new Date(item.completionDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Volumes:</span>
                    <span className="font-medium">{item.totalVolumes}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Participants:</span>
                    <span className="font-medium">{item.participants}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{item.duration}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                  <button
                    onClick={() => handleDeleteSeries(item.id)}
                    className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() => setConfirmationModal({ ...confirmationModal, isOpen: false })}
        onConfirm={handleConfirmAction}
        title={confirmationModal.title}
        message={confirmationModal.message}
        type="danger"
      />
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
