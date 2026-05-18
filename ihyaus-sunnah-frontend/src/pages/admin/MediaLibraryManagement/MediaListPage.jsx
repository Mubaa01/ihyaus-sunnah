// src/pages/admin/MediaLibraryManagement/MediaListPage.jsx

import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaImages,
  FaEye,
  FaPlay,
  FaDownload,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa"

// TODO: Replace all media mock logic with real API
import {
  dispatchAdminDataUpdate,
} from "../../../utils/adminDataSync"

import useStaffAPI from "../../../hooks/useStaffAPI"

import SecretKeyModal from "../../../components/admin/SecretKeyModal"

const MediaListPage = () => {
  const { staff } = useStaffAPI()

  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [staffFilter, setStaffFilter] = useState("All")
  const [visibilityFilter, setVisibilityFilter] = useState("All")
  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  // TODO: Fetch media items from backend API
  const mediaItems = []

  // TODO: Fetch media categories from backend API
  const categories = []

  const [refreshKey, setRefreshKey] = useState(0)

  const handleDeleteClick = (id) => {
    setSelectedId(id)
    setShowModal(true)
  }

  // TODO: Implement media delete with backend API
  const confirmDelete = () => {
    setShowModal(false)
    setRefreshKey((prev) => prev + 1)
  }

  const getStaffName = (staffId) => {
    if (!staffId) return "Student/Community"
    const staffMember = staff.find(s => s.id === staffId)
    return staffMember ? staffMember.name : "Unknown"
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "video": return <FaPlay className="text-red-500" />
      case "audio": return <FaPlay className="text-blue-500" />
      case "short": return <FaPlay className="text-green-500" />
      case "student": return <FaUser className="text-purple-500" />
      default: return <FaImages />
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case "video": return "Video"
      case "audio": return "Audio"
      case "short": return "Short Video"
      case "student": return "Student Media"
      default: return type
    }
  }

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <h1 className="text-4xl font-bold text-primary">
            Media Library Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage media content, playlists, and digital assets across all categories.
          </p>
        </div>

        <div className="flex gap-3">
          <Link to="/admin/media/playlists" className="btn-secondary">
            Manage Playlists
          </Link>
          <Link to="/admin/media/create" className="btn-primary">
            + Upload Media
          </Link>
        </div>

      </div>

      {/* FILTER */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

          {/* SEARCH */}
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search media..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* CATEGORY FILTER */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input-primary"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* TYPE FILTER */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input-primary"
          >
            <option value="All">All Types</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="short">Short Video</option>
            <option value="student">Student Media</option>
          </select>

          {/* STAFF FILTER */}
          <select
            value={staffFilter}
            onChange={(e) => setStaffFilter(e.target.value)}
            className="input-primary"
          >
            <option value="All">All Staff</option>
            {staff.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
          </select>

          {/* VISIBILITY FILTER */}
          <select
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value)}
            className="input-primary"
          >
            <option value="All">All Visibility</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

        </div>
      </div>

      {/* MEDIA GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {mediaItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            whileHover={{ y: -10 }}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-premium transition-all duration-500"
          >

            {/* THUMBNAIL */}
            <div className="relative h-48 overflow-hidden">

              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* TYPE BADGE */}
              <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm">
                {getTypeIcon(item.type)}
                <span>{getTypeLabel(item.type)}</span>
              </div>

              {/* VISIBILITY BADGE */}
              <div className={`absolute top-5 right-5 px-3 py-1 rounded-full backdrop-blur-md border text-xs font-semibold ${
                item.visibility === 'public'
                  ? 'bg-green-500/20 border-green-500/30 text-green-100'
                  : 'bg-red-500/20 border-red-500/30 text-red-100'
              }`}>
                {item.visibility}
              </div>

              {/* STATS */}
              <div className="absolute bottom-5 left-5 right-5 flex justify-between text-white text-sm">
                <div className="flex items-center gap-1">
                  <FaEye />
                  <span>{item.views || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaDownload />
                  <span>{item.downloads || 0}</span>
                </div>
              </div>

            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-4">

              {/* TITLE & CATEGORY */}
              <div>
                <h2 className="text-xl font-bold text-primary line-clamp-2 mb-2">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {item.mediaCategory}
                </p>
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm">
                {item.description}
              </p>

              {/* STAFF & DATE */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <FaUser />
                  <span>{getStaffName(item.staffId)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* TAGS */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-500 text-xs">
                      +{item.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex gap-3 pt-2 flex-col sm:flex-row">

                <Link
                  to={`/media-library?search=${encodeURIComponent(item.title)}`}
                  className="flex-1 bg-secondary text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold hover:scale-105 transition"
                >
                  <FaEye /> View Public
                </Link>

                <Link
                  to={`/admin/media/${item.id}`}
                  className="flex-1 bg-primary text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold hover:scale-105 transition"
                >
                  <FaEdit /> Edit
                </Link>

                <button
                  onClick={() => handleDeleteClick(item.id)}
                  className="w-full sm:w-14 rounded-2xl border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition"
                >
                  <FaTrash />
                </button>

              </div>

            </div>

          </motion.div>
        ))}

      </div>

      {/* EMPTY STATE */}
      {mediaItems.length === 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft py-24 text-center">
          <FaImages className="mx-auto text-6xl text-gray-300 mb-5" />

          <h3 className="text-3xl font-bold text-primary">
            No Media Found
          </h3>

          <p className="text-gray-500 mt-3">
            Try adjusting your filters or upload new media content.
          </p>
        </div>
      )}

      {/* MODAL */}
      <SecretKeyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />

    </div>
  )
}

export default MediaListPage