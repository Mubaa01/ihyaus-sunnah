// src/pages/admin/MediaLibraryManagement/PlaylistFormPage.jsx

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"

import {
  FaList,
  FaUser,
  FaPlay,
} from "react-icons/fa"

import useStaffAPI from "../../../hooks/useStaffAPI"
import useMediaLibraryAPI from "../../../hooks/useMediaLibraryAPI"

import SecretKeyModal from "../../../components/admin/SecretKeyModal"

const emptyForm = {
  playlistName: "",
  trusteeId: "",
  mediaType: "",
}

const PlaylistFormPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { staff } = useStaffAPI()
  const { playlists, addPlaylist, editPlaylist } = useMediaLibraryAPI({})

  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState(emptyForm)

  useEffect(() => {
    if (!id) return

    const existing = playlists.find((playlist) => playlist._id === id || playlist.id === id)
    if (!existing) return

    setFormData({
      ...emptyForm,
      ...existing,
      trusteeId: existing.trusteeId?._id || existing.trusteeId || "",
    })
  }, [id, playlists])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  const confirmSave = async (secretKey) => {
    setSaving(true)

    const processedData = {
      ...formData,
      trusteeId: formData.trusteeId || null,
    }

    try {
      if (id) {
        await editPlaylist(id, processedData, secretKey)
      } else {
        await addPlaylist(processedData, secretKey)
      }
    } finally {
      setSaving(false)
    }
  }

  const handleSaveSuccess = () => {
    setShowModal(false)
    navigate("/admin/media/playlists")
  }

  const getTypeDescription = (type) => {
    switch (type) {
      case "video":
        return "Video lectures, talks, and educational content"
      case "audio":
        return "Audio recordings, podcasts, and recitations"
      case "short":
        return "Short videos, tips, and quick content (General)"
      case "student":
        return "Student-created content and projects (General)"
      default:
        return "Select a media type above"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-3xl shadow-premium overflow-hidden">

        {/* HEADER */}
        <div className="bg-primary text-white p-10">
          <h1 className="text-5xl font-bold mb-3">
            {id ? "Edit Playlist" : "Create Playlist"}
          </h1>

          <p className="text-white/80 text-lg">
            Organize media content into categorized playlists for better user experience.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-10 space-y-8">

          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-8">

            <Input
              label="Playlist Name"
              icon={<FaList />}
              name="playlistName"
              value={formData.playlistName}
              onChange={handleChange}
              placeholder="e.g., Leadership Lectures, Aqeedah Series"
              required
            />

            <Select
              label="Media Type"
              icon={<FaPlay />}
              name="mediaType"
              value={formData.mediaType}
              onChange={handleChange}
              options={[
                { value: "", label: "Select Media Type" },
                { value: "video", label: "Video Library" },
                { value: "audio", label: "Audio Library" },
                { value: "short", label: "Short Videos (General)" },
                { value: "student", label: "Student Library (General)" },
              ]}
              required
            />

          </div>

          {/* TRUSTEE SELECTION */}
          <div className="space-y-4">
            <Select
              label="Trustee/Owner"
              icon={<FaUser />}
              name="trusteeId"
              value={formData.trusteeId}
              onChange={handleChange}
              options={[
                { value: "", label: "General/Student Content (No specific trustee)" },
                ...staff.map(member => ({ value: member._id || member.id, label: member.name }))
              ]}
            />

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Playlist Type Information
              </h3>
              <p className="text-blue-700">
                {formData.mediaType
                  ? getTypeDescription(formData.mediaType)
                  : "Select a media type to see description"
                }
              </p>

              {formData.mediaType && (
                <div className="mt-4 p-4 bg-white rounded-xl border">
                  <p className="text-sm text-gray-600">
                    <strong>Trustee Assignment:</strong>{" "}
                    {formData.trusteeId
                      ? `${staff.find(s => (s._id || s.id) === formData.trusteeId)?.name || "The selected trustee"} will own this playlist`
                      : "This is a general playlist not assigned to any specific trustee"
                    }
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-5 pt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/media/playlists")}
              className="px-6 py-3 border rounded-2xl"
            >
              Cancel
            </button>

            <button type="submit" className="btn-primary">
              {id ? "Update Playlist" : "Create Playlist"}
            </button>
          </div>

        </form>
      </div>

      {/* MODAL */}
      <SecretKeyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmSave}
        onSuccess={handleSaveSuccess}
        loading={saving}
      />
    </motion.div>
  )
}

/* ---------------- SMALL REUSABLE COMPONENTS ---------------- */

const Input = ({ label, icon, ...props }) => (
  <div className="space-y-2">
    <label className="font-semibold text-primary flex items-center gap-2">
      {icon} {label}
    </label>
    <input {...props} className="input-primary w-full" />
  </div>
)

const Select = ({ label, icon, options, ...props }) => (
  <div className="space-y-2">
    <label className="font-semibold text-primary flex items-center gap-2">
      {icon} {label}
    </label>
    <select {...props} className="input-primary w-full">
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
)

export default PlaylistFormPage
