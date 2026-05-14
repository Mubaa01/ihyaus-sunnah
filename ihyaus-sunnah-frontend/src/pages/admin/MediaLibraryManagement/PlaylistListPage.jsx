// src/pages/admin/MediaLibraryManagement/PlaylistListPage.jsx

import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaList,
  FaUser,
  FaPlay,
  FaPlus,
} from "react-icons/fa"

import {
  getPlaylists,
  deletePlaylist,
  getMediaByPlaylist,
} from "../../../data/mock/mediaLibraryStore"
import {
  dispatchAdminDataUpdate,
} from "../../../utils/adminDataSync"

import useStaff from "../../../hooks/useStaff"

import SecretKeyModal from "../../../components/admin/SecretKeyModal"

const PlaylistListPage = () => {
  const { staff } = useStaff()

  const [search, setSearch] = useState("")
  const [trusteeFilter, setTrusteeFilter] = useState("All")
  const [typeFilter, setTypeFilter] = useState("All")
  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const playlists = useMemo(() => {
    let filtered = getPlaylists()

    if (trusteeFilter !== "All") {
      const trusteeId = trusteeFilter === "null" ? null : Number(trusteeFilter)
      filtered = filtered.filter(p => p.trusteeId === trusteeId)
    }

    if (typeFilter !== "All") {
      filtered = filtered.filter(p => p.mediaType === typeFilter)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(p =>
        p.playlistName.toLowerCase().includes(searchLower)
      )
    }

    return filtered
  }, [search, trusteeFilter, typeFilter, refreshKey])

  const handleDeleteClick = (id) => {
    setSelectedId(id)
    setShowModal(true)
  }

  const confirmDelete = () => {
    deletePlaylist(selectedId)
    setShowModal(false)
    setRefreshKey((prev) => prev + 1)
    dispatchAdminDataUpdate({ media: true })
  }

  const getTrusteeName = (trusteeId) => {
    if (!trusteeId) return "General/Student"
    const trustee = staff.find(s => s.id === trusteeId)
    return trustee ? trustee.name : "Unknown Trustee"
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "video": return <FaPlay className="text-red-500" />
      case "audio": return <FaPlay className="text-blue-500" />
      case "short": return <FaPlay className="text-green-500" />
      case "student": return <FaUser className="text-purple-500" />
      default: return <FaList />
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case "video": return "Video Library"
      case "audio": return "Audio Library"
      case "short": return "Short Videos"
      case "student": return "Student Library"
      default: return type
    }
  }

  const getMediaCount = (playlistId) => {
    return getMediaByPlaylist(playlistId).length
  }

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>
          <h1 className="text-4xl font-bold text-primary">
            Playlist Management
          </h1>

          <p className="text-gray-500 mt-2">
            Organize media content into playlists for better categorization and user experience.
          </p>
        </div>

        <div className="flex gap-3">
          <Link to="/admin/media" className="btn-secondary">
            Manage Media
          </Link>
          <Link to="/admin/media/playlists/create" className="btn-primary">
            <FaPlus className="mr-2" />
            Create Playlist
          </Link>
        </div>

      </div>

      {/* FILTER */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6">

        <div className="grid md:grid-cols-3 gap-4">

          {/* SEARCH */}
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search playlists..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* TRUSTEE FILTER */}
          <select
            value={trusteeFilter}
            onChange={(e) => setTrusteeFilter(e.target.value)}
            className="input-primary"
          >
            <option value="All">All Trustees</option>
            <option value="null">General/Student</option>
            {staff.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
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
            <option value="video">Video Library</option>
            <option value="audio">Audio Library</option>
            <option value="short">Short Videos</option>
            <option value="student">Student Library</option>
          </select>

        </div>
      </div>

      {/* PLAYLISTS GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

        {playlists.map((playlist, index) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            whileHover={{ y: -10 }}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-soft hover:shadow-premium transition-all duration-500"
          >

            {/* HEADER */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getTypeIcon(playlist.mediaType)}
                  <span className="text-sm font-semibold">
                    {getTypeLabel(playlist.mediaType)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {getMediaCount(playlist.id)}
                  </div>
                  <div className="text-xs opacity-80">
                    Media Items
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-2">
                {playlist.playlistName}
              </h2>

              <p className="text-white/80 text-sm">
                {getTrusteeName(playlist.trusteeId)}
              </p>

            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-4">

              {/* CREATED DATE */}
              <div className="text-sm text-gray-500">
                Created: {new Date(playlist.createdAt).toLocaleDateString()}
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-600 leading-relaxed">
                {playlist.mediaType === "short" || playlist.mediaType === "student"
                  ? `General collection of ${getTypeLabel(playlist.mediaType).toLowerCase()} content.`
                  : `Organized collection of ${getTypeLabel(playlist.mediaType).toLowerCase()} content by ${getTrusteeName(playlist.trusteeId)}.`
                }
              </p>

              {/* ACTIONS */}
              <div className="flex gap-3 pt-2 flex-col sm:flex-row">

                <Link
                  to={`/media-library?type=${playlist.mediaType}`}
                  className="flex-1 bg-secondary text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold hover:scale-105 transition"
                >
                  <FaList /> View Media
                </Link>

                <Link
                  to={`/admin/media/playlists/${playlist.id}`}
                  className="flex-1 bg-primary text-white py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold hover:scale-105 transition"
                >
                  <FaEdit /> Edit
                </Link>

                <button
                  onClick={() => handleDeleteClick(playlist.id)}
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
      {playlists.length === 0 && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-soft py-24 text-center">
          <FaList className="mx-auto text-6xl text-gray-300 mb-5" />

          <h3 className="text-3xl font-bold text-primary">
            No Playlists Found
          </h3>

          <p className="text-gray-500 mt-3">
            Try adjusting your filters or create a new playlist.
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

export default PlaylistListPage