// src/pages/admin/MediaLibraryManagement/MediaFormPage.jsx

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"

import {
  FaImages,
  FaTag,
  FaAlignLeft,
  FaUser,
  FaEye,
  FaList,
  FaPlus,
  FaUpload,
} from "react-icons/fa"

import {
  getMediaById,
  getMediaCategories,
  createMedia,
  updateMedia,
  getPlaylists,
} from "../../../data/mock/mediaLibraryStore"
import { logActivity } from "../../../data/mock/activityStore"
import { dispatchAdminDataUpdate } from "../../../utils/adminDataSync"

import useStaff from "../../../hooks/useStaff"

import SecretKeyModal from "../../../components/admin/SecretKeyModal"

const emptyForm = {
  title: "",
  description: "",
  mediaCategory: "",
  type: "",
  staffId: "",
  playlistId: "",
  visibility: "public",
  url: "",
  thumbnail: "",
  tags: [],
}

const MediaFormPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { staff } = useStaff()

  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [newTag, setNewTag] = useState("")
  const [playlists, setPlaylists] = useState([])
  const [filePreview, setFilePreview] = useState("")
  const [thumbnailPreview, setThumbnailPreview] = useState("")

  const categories = getMediaCategories()

  // LOAD EXISTING MEDIA (EDIT MODE)
  useEffect(() => {
    if (!id) return

    const existingMedia = getMediaById(id)

    if (existingMedia) {
      setFormData({
        ...emptyForm,
        ...existingMedia,
        tags: existingMedia.tags || [],
      })

      // Set file previews
      setFilePreview(existingMedia.file || "")
      setThumbnailPreview(existingMedia.thumbnail || "")
    }
  }, [id])

  // LOAD PLAYLISTS BASED ON TYPE
  useEffect(() => {
    if (formData.type) {
      const availablePlaylists = getPlaylists({ mediaType: formData.type })
      setPlaylists(availablePlaylists)
    } else {
      setPlaylists([])
    }
  }, [formData.type])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTypeChange = (e) => {
    const { value } = e.target

    setFormData((prev) => ({
      ...prev,
      type: value,
      playlistId: "", // Reset playlist when type changes
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleFileUpload = (field, e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type based on media type
    const isVideo = formData.type === 'video' || formData.type === 'short-video'
    const isAudio = formData.type === 'audio'
    const isImage = field === 'thumbnail'

    if (isVideo && !file.type.startsWith('video/')) {
      alert('Please select a valid video file')
      return
    }
    if (isAudio && !file.type.startsWith('audio/')) {
      alert('Please select a valid audio file')
      return
    }
    if (isImage && !file.type.startsWith('image/')) {
      alert('Please select a valid image file')
      return
    }

    // Validate file size (max 50MB for video/audio, 5MB for images)
    const maxSize = isImage ? 5 * 1024 * 1024 : 50 * 1024 * 1024
    if (file.size > maxSize) {
      alert(`File size must be less than ${isImage ? '5MB' : '50MB'}`)
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target.result
      setFormData(prev => ({ ...prev, [field]: base64 }))
      if (field === 'file') {
        setFilePreview(base64)
      } else if (field === 'thumbnail') {
        setThumbnailPreview(base64)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  const confirmSave = () => {
    // Convert string IDs to numbers
    const processedData = {
      ...formData,
      staffId: formData.staffId ? Number(formData.staffId) : null,
      playlistId: formData.playlistId ? Number(formData.playlistId) : null,
    }

    if (id) {
      updateMedia(id, processedData)
      logActivity({
        type: "media",
        action: "Updated media item",
        details: `${processedData.title} was updated in the media library`,
        reference: id,
      })
    } else {
      createMedia(processedData)
      logActivity({
        type: "media",
        action: "Uploaded media",
        details: `${processedData.title} was added to the media library`,
      })
    }

    dispatchAdminDataUpdate({ media: true })
    setShowModal(false)
    navigate("/admin/media")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="bg-white rounded-3xl shadow-premium overflow-hidden">

        {/* HEADER */}
        <div className="bg-primary text-white p-10">
          <h1 className="text-5xl font-bold mb-3">
            {id ? "Edit Media" : "Upload Media"}
          </h1>

          <p className="text-white/80 text-lg">
            Add or update media content for the library with proper categorization and metadata.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-10 space-y-10">

          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-8">
            <Input label="Title" icon={<FaImages />} name="title" value={formData.title} onChange={handleChange} required />

            <Select
              label="Media Type"
              name="type"
              value={formData.type}
              onChange={handleTypeChange}
              options={[
                { value: "video", label: "Video" },
                { value: "audio", label: "Audio" },
                { value: "short", label: "Short Video" },
                { value: "student", label: "Student Media" },
              ]}
              required
            />

            <Select
              label="Category"
              name="mediaCategory"
              value={formData.mediaCategory}
              onChange={handleChange}
              options={categories.map(cat => ({ value: cat, label: cat }))}
              required
            />

            <Select
              label="Visibility"
              name="visibility"
              value={formData.visibility}
              onChange={handleChange}
              options={[
                { value: "public", label: "Public" },
                { value: "private", label: "Private" },
              ]}
            />

            <Select
              label="Staff Member"
              icon={<FaUser />}
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              options={[
                { value: "", label: "Student/Community" },
                ...staff.map(member => ({ value: member.id, label: member.name }))
              ]}
            />

            <Select
              label="Playlist"
              icon={<FaList />}
              name="playlistId"
              value={formData.playlistId}
              onChange={handleChange}
              options={[
                { value: "", label: "Select Playlist" },
                ...playlists.map(playlist => ({
                  value: playlist.id,
                  label: `${playlist.playlistName} (${playlist.mediaType})`
                }))
              ]}
              disabled={!formData.type}
            />
          </div>

          {/* MEDIA FILES */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <FaImages /> Media Files
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Media File */}
              <div className="space-y-3">
                <label className="font-semibold text-primary">Media File</label>
                <input
                  type="file"
                  accept={formData.type === 'video' || formData.type === 'short' ? 'video/*' : formData.type === 'audio' ? 'audio/*' : '*'}
                  onChange={(e) => handleFileUpload('url', e)}
                  className="hidden"
                  id="media-upload"
                />
                <label
                  htmlFor="media-upload"
                  className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-primary transition-colors"
                >
                  <FaUpload className="text-gray-400" />
                  <span className="text-gray-600 text-sm">
                    Upload {formData.type === 'video' || formData.type === 'short' ? 'video' : formData.type === 'audio' ? 'audio' : 'media'} file
                  </span>
                </label>
                {filePreview && (
                  <div className="relative">
                    {formData.type === 'video' || formData.type === 'short' ? (
                      <video
                        src={filePreview}
                        controls
                        className="w-full h-32 object-cover rounded-2xl border"
                      />
                    ) : formData.type === 'audio' ? (
                      <audio
                        src={filePreview}
                        controls
                        className="w-full"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-100 rounded-2xl border flex items-center justify-center">
                        <span className="text-gray-500">Media file uploaded</span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, url: "" }))
                        setFilePreview("")
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
                <Input
                  label="Or enter Media URL"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://example.com/media.mp4"
                  required={!filePreview}
                />
              </div>

              {/* Thumbnail */}
              <div className="space-y-3">
                <label className="font-semibold text-primary">Thumbnail Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload('thumbnail', e)}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-primary transition-colors"
                >
                  <FaUpload className="text-gray-400" />
                  <span className="text-gray-600 text-sm">Upload thumbnail</span>
                </label>
                {thumbnailPreview && (
                  <div className="relative">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail"
                      className="w-full h-32 object-cover rounded-2xl border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, thumbnail: "" }))
                        setThumbnailPreview("")
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
                <Input
                  label="Or enter Thumbnail URL"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="font-semibold text-primary flex items-center gap-2 mb-2">
              <FaAlignLeft /> Description
            </label>
            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-primary resize-none"
              placeholder="Detailed description of the media content..."
              required
            />
          </div>

          {/* TAGS */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <FaTag /> Tags
            </h3>
            <div className="flex flex-wrap gap-3 mb-4">
              {formData.tags.map((tag) => (
                <div key={tag} className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-2xl">
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="input-primary flex-1"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button type="button" onClick={addTag} className="btn-primary">
                <FaPlus />
              </button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-5">
            <button
              type="button"
              onClick={() => navigate("/admin/media")}
              className="px-6 py-3 border rounded-2xl"
            >
              Cancel
            </button>

            <button type="submit" className="btn-primary">
              {id ? "Update Media" : "Upload Media"}
            </button>
          </div>

        </form>
      </div>

      {/* MODAL */}
      <SecretKeyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmSave}
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

export default MediaFormPage