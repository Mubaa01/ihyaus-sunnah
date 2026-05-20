// src/pages/admin/ProgramManagement/ProgramFormPage.jsx

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"

import {
  FaBookOpen,
  FaImage,
  FaAlignLeft,
  FaLayerGroup,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaClock,
  FaUpload,
} from "react-icons/fa"

import useProgramsAPI from "../../../hooks/useProgramsAPI"

// TODO: Replace all program mock logic with real API

import SecretKeyModal from "../../../components/admin/SecretKeyModal"

const categoriesList = [
  "Tahfeez",
  "Islamiyyah",
  "Youth Development",
  "Community",
  "Majlis",
  "Western Education",
  "Media",
  "Research",
]

const emptyForm = {
  title: "",
  slug: "",
  category: "",
  status: "active",
  thumbnail: "",
  banner: "",
  heroImage: "",
  overviewImage: "",
  tagline: "",
  shortDescription: "",
  fullDescription: "",
  instructor: "",
  duration: "",
  location: "",
  sections: [],
  features: [],
  objectives: [],
  gallery: [],
  stats: {
    totalStudents: 0,
    totalStaff: 0,
    yearsRunning: 0,
  },
  categories: [],
  staffHighlights: [],
  testimonials: [],
  verse: null,
  islamicIntegration: [],
  schedule: {
    days: "",
    time: "",
    dailyStructure: [],
  },
  startDate: "",
  endDate: "",
  isFeatured: false,
}

const ProgramFormPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { programs, addProgram, editProgram } = useProgramsAPI()

  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [imagePreviews, setImagePreviews] = useState({
    thumbnail: "",
    banner: "",
    heroImage: "",
    overviewImage: "",
  })
  const [galleryPreviews, setGalleryPreviews] = useState([])
  const [videoPreviews, setVideoPreviews] = useState({}) // Format: { `cat-${catIndex}-vid-${vidIndex}`: videoUrl }
  const [thumbnailPreviews, setThumbnailPreviews] = useState({}) // Format: { `cat-${catIndex}-vid-${vidIndex}`: thumbnailUrl }
  const [newFeature, setNewFeature] = useState("")
  const [newObjective, setNewObjective] = useState("")
  const [newSection, setNewSection] = useState("")
  const [newGalleryImage, setNewGalleryImage] = useState("")

  // TODO: Fetch program by ID from backend API for edit mode
  useEffect(() => {
    if (!id) return; // Only run in edit mode

    // Try to find the program in the loaded programs list first
    const existing = programs.find((p) => p._id === id || p.id === id || p.slug === id);
    if (existing) {
      setFormData(existing);
      return;
    }

    // If not found, fetch from API directly
    import("../../../services/api").then(({ programsAPI }) => {
      // Try getBySlug first, fallback to getById if you have it
      programsAPI.getBySlug(id)
        .then((res) => {
          setFormData(res.data);
        })
        .catch(() => {
          // Optionally handle error
        });
    });
  }, [id, programs]);
  // Load program data for edit mode and align with schema
  useEffect(() => {
    if (!id) return;
    const existing = programs.find(
      (item) => item._id?.toString() === id || item.id === id || item.slug === id
    );
    if (existing) {
      setFormData({
        ...emptyForm,
        ...existing,
        categories: existing.categories || [],
        features: existing.features || [],
        objectives: existing.objectives || [],
        sections: existing.sections || [],
        gallery: existing.gallery || [],
        stats: existing.stats || emptyForm.stats,
        schedule: existing.schedule || emptyForm.schedule,
        verse: existing.verse || { arabic: "", translation: "", reference: "" },
      });
      setImagePreviews({
        thumbnail: existing.thumbnail || "",
        banner: existing.banner || "",
        heroImage: existing.heroImage || "",
        overviewImage: existing.overviewImage || "",
      });
      setGalleryPreviews(existing.gallery || []);
      return;
    }
    // If not found, fetch from API directly
    import("../../../services/api").then(({ programsAPI }) => {
      programsAPI.getBySlug(id)
        .then((res) => {
          const data = res.data;
          setFormData({
            ...emptyForm,
            ...data,
            categories: data.categories || [],
            features: data.features || [],
            objectives: data.objectives || [],
            sections: data.sections || [],
            gallery: data.gallery || [],
            stats: data.stats || emptyForm.stats,
            schedule: data.schedule || emptyForm.schedule,
            verse: data.verse || { arabic: "", translation: "", reference: "" },
          });
          setImagePreviews({
            thumbnail: data.thumbnail || "",
            banner: data.banner || "",
            heroImage: data.heroImage || "",
            overviewImage: data.overviewImage || "",
          });
          setGalleryPreviews(data.gallery || []);
        })
        .catch(() => {
          // Optionally handle error
        });
    });
  }, [id, programs]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleStatsChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [name]: Number(value),
      },
    }))
  }

  const handleScheduleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [name]: value,
      },
    }))
  }

  const handleSectionToggle = (section) => {
    setFormData((prev) => {
      const exists = prev.sections.includes(section)

      return {
        ...prev,
        sections: exists
          ? prev.sections.filter((s) => s !== section)
          : [...prev.sections, section],
      }
    })
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const addObjective = () => {
    if (newObjective.trim()) {
      setFormData((prev) => ({
        ...prev,
        objectives: [...prev.objectives, newObjective.trim()],
      }))
      setNewObjective("")
    }
  }

  const removeObjective = (index) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index),
    }))
  }

  const addSection = () => {
    if (newSection.trim()) {
      setFormData((prev) => ({
        ...prev,
        sections: [...prev.sections, newSection.trim()],
      }))
      setNewSection("")
    }
  }

  const removeSection = (index) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }))
  }

  const addCategory = () => {
    setFormData((prev) => ({
      ...prev,
      categories: [
        ...prev.categories,
        {
          id: Math.max(...prev.categories.map(c => c.id || 0), 0) + 1,
          title: '',
          titleArabic: '',
          ageRange: '',
          categoryType: '',
          totalClasses: 0,
          description: '',
          prerequisites: '',
          previewVideos: [],
          outcomes: []
        }
      ]
    }))
  }

  const removeCategory = (index) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }))
  }

  const updateCategory = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.map((cat, i) =>
        i === index ? { ...cat, [field]: value } : cat
      )
    }))
  }

  const addVideo = (catIndex) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.map((cat, i) =>
        i === catIndex
          ? {
              ...cat,
              previewVideos: [
                ...(cat.previewVideos || []),
                {
                  thumbnail: '',
                  title: '',
                  duration: '',
                  url: ''
                }
              ]
            }
          : cat
      )
    }))
  }

  const removeVideo = (catIndex, vidIndex) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.map((cat, i) =>
        i === catIndex
          ? {
              ...cat,
              previewVideos: (cat.previewVideos || []).filter((_, j) => j !== vidIndex)
            }
          : cat
      )
    }))
  }

  const updateVideo = (catIndex, vidIndex, field, value) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.map((cat, i) =>
        i === catIndex
          ? {
              ...cat,
              previewVideos: (cat.previewVideos || []).map((vid, j) =>
                j === vidIndex ? { ...vid, [field]: value } : vid
              )
            }
          : cat
      )
    }))
  }

  const addOutcome = (catIndex, outcomeText) => {
    if (outcomeText.trim()) {
      setFormData((prev) => ({
        ...prev,
        categories: prev.categories.map((cat, i) =>
          i === catIndex
            ? {
                ...cat,
                outcomes: [...(cat.outcomes || []), outcomeText.trim()]
              }
            : cat
        )
      }))
    }
  }

  const removeOutcome = (catIndex, outIndex) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.map((cat, i) =>
        i === catIndex
          ? {
              ...cat,
              outcomes: (cat.outcomes || []).filter((_, j) => j !== outIndex)
            }
          : cat
      )
    }))
  }

  const addGalleryImage = () => {
    if (newGalleryImage.trim()) {
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, newGalleryImage.trim()],
      }))
      setNewGalleryImage("")
    }
  }

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }))
  }

  const handleImageUpload = (field, e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target.result
      setFormData(prev => ({ ...prev, [field]: base64 }))
      setImagePreviews(prev => ({ ...prev, [field]: base64 }))
    }
    reader.readAsDataURL(file)
  }

  const handleVideoUpload = (catIndex, vidIndex, e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('video/')) {
      alert('Please select a valid video file')
      return
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert('File size must be less than 100MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target.result
      const key = `cat-${catIndex}-vid-${vidIndex}`
      setVideoPreviews(prev => ({ ...prev, [key]: base64 }))
      updateVideo(catIndex, vidIndex, 'url', base64)
    }
    reader.readAsDataURL(file)
  }

  const handleThumbnailUpload = (catIndex, vidIndex, e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target.result
      const key = `cat-${catIndex}-vid-${vidIndex}`
      setThumbnailPreviews(prev => ({ ...prev, [key]: base64 }))
      updateVideo(catIndex, vidIndex, 'thumbnail', base64)
    }
    reader.readAsDataURL(file)
  }

  const handleGalleryUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target.result
      setFormData(prev => ({
        ...prev,
        gallery: [...prev.gallery, base64]
      }))
      setGalleryPreviews(prev => [...prev, base64])
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  const confirmSave = () => {
    // Generate slug from title if creating new
    if (!id) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      formData.slug = slug
    }

    // Save all image data (including base64) so uploads persist
    const dataToSave = {
      ...formData
      // Optionally, you can still filter gallery if you want only URLs:
      // gallery: formData.gallery.filter(item => !item.startsWith('data:'))
    }

    if (id) {
      editProgram(id, dataToSave)
    } else {
      addProgram(dataToSave)
    }

    setShowModal(false)
    navigate("/admin/programs")
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
            {id ? "Edit Program" : "Create Program"}
          </h1>

          <p className="text-white/80 text-lg">
            Manage program details, curriculum, and organizational information.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-10 space-y-10">

          {/* BASIC INFO */}
          <div className="grid md:grid-cols-2 gap-8">
            <Input label="Program Title" icon={<FaBookOpen />} name="title" value={formData.title || ""} onChange={handleChange} required />
            <Select
              label="Category"
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              options={categoriesList.map(cat => ({ value: cat, label: cat }))}
              required
            />
            <Select
              label="Status"
              name="status"
              value={formData.status || ""}
              onChange={handleChange}
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
                { value: "completed", label: "Completed" },
              ]}
            />
            <Input label="Instructor" name="instructor" value={formData.instructor || ""} onChange={handleChange} />
            <Input label="Duration" icon={<FaClock />} name="duration" value={formData.duration || ""} onChange={handleChange} />
            <Input label="Location" icon={<FaMapMarkerAlt />} name="location" value={formData.location || ""} onChange={handleChange} />
          </div>

          {/* IMAGES */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <FaImage /> Program Images
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Thumbnail */}
              <div className="space-y-3">
                <label className="font-semibold text-primary">Thumbnail Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('thumbnail', e)}
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
                {imagePreviews.thumbnail && (
                  <img
                    src={imagePreviews.thumbnail}
                    alt="Thumbnail"
                    className="w-full h-32 object-cover rounded-2xl border"
                  />
                )}
                <Input
                  label="Or enter URL"
                  name="thumbnail"
                  value={formData.thumbnail || ""}
                  onChange={handleChange}
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>

              {/* Banner */}
              <div className="space-y-3">
                <label className="font-semibold text-primary">Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('banner', e)}
                  className="hidden"
                  id="banner-upload"
                />
                <label
                  htmlFor="banner-upload"
                  className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-primary transition-colors"
                >
                  <FaUpload className="text-gray-400" />
                  <span className="text-gray-600 text-sm">Upload banner</span>
                </label>
                {imagePreviews.banner && (
                  <img
                    src={imagePreviews.banner}
                    alt="Banner"
                    className="w-full h-32 object-cover rounded-2xl border"
                  />
                )}
                <Input
                  label="Or enter URL"
                  name="banner"
                  value={formData.banner || ""}
                  onChange={handleChange}
                  placeholder="https://example.com/banner.jpg"
                />
              </div>

              {/* Hero Image */}
              <div className="space-y-3">
                <label className="font-semibold text-primary">Hero Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('heroImage', e)}
                  className="hidden"
                  id="hero-upload"
                />
                <label
                  htmlFor="hero-upload"
                  className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-primary transition-colors"
                >
                  <FaUpload className="text-gray-400" />
                  <span className="text-gray-600 text-sm">Upload hero image</span>
                </label>
                {imagePreviews.heroImage && (
                  <img
                    src={imagePreviews.heroImage}
                    alt="Hero"
                    className="w-full h-32 object-cover rounded-2xl border"
                  />
                )}
                <Input
                  label="Or enter URL"
                  name="heroImage"
                  value={formData.heroImage || ""}
                  onChange={handleChange}
                  placeholder="https://example.com/hero.jpg"
                />
              </div>

              {/* Overview Image */}
              <div className="space-y-3">
                <label className="font-semibold text-primary">Overview Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('overviewImage', e)}
                  className="hidden"
                  id="overview-upload"
                />
                <label
                  htmlFor="overview-upload"
                  className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-primary transition-colors"
                >
                  <FaUpload className="text-gray-400" />
                  <span className="text-gray-600 text-sm">Upload overview image</span>
                </label>
                {imagePreviews.overviewImage && (
                  <img
                    src={imagePreviews.overviewImage}
                    alt="Overview"
                    className="w-full h-32 object-cover rounded-2xl border"
                  />
                )}
                <Input
                  label="Or enter URL"
                  name="overviewImage"
                  value={formData.overviewImage || ""}
                  onChange={handleChange}
                  placeholder="https://example.com/overview.jpg"
                />
              </div>
            </div>
          </div>

          {/* DESCRIPTIONS */}
          <div className="space-y-6">
            <Input label="Tagline" name="tagline" value={formData.tagline || ""} onChange={handleChange} />
            <div>
              <label className="font-semibold text-primary flex items-center gap-2 mb-2">
                <FaAlignLeft /> Short Description
              </label>
              <textarea
                rows="3"
                name="shortDescription"
                value={formData.shortDescription || ""}
                onChange={handleChange}
                className="input-primary resize-none"
                placeholder="Brief description for program cards..."
              />
            </div>
            <div>
              <label className="font-semibold text-primary flex items-center gap-2 mb-2">
                <FaAlignLeft /> Full Description
              </label>
              <textarea
                rows="6"
                name="fullDescription"
                value={formData.fullDescription || ""}
                onChange={handleChange}
                className="input-primary resize-none"
                placeholder="Detailed program description..."
              />
            </div>
          </div>

          {/* SCHEDULE */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <FaCalendarAlt /> Schedule Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Days" name="days" value={formData.schedule?.days || ""} onChange={handleScheduleChange} />
              <Input label="Time" name="time" value={formData.schedule?.time || ""} onChange={handleScheduleChange} />
            </div>
          </div>

          {/* STATS */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <FaUsers /> Program Statistics
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Input label="Total Students" type="number" name="totalStudents" value={formData.stats?.totalStudents ?? 0} onChange={handleStatsChange} />
              <Input label="Total Staff" type="number" name="totalStaff" value={formData.stats?.totalStaff ?? 0} onChange={handleStatsChange} />
              <Input label="Years Running" type="number" name="yearsRunning" value={formData.stats?.yearsRunning ?? 0} onChange={handleStatsChange} />
            </div>
          </div>

          {/* SECTIONS */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <FaLayerGroup /> Program Sections
            </h3>
            <div className="flex flex-wrap gap-4 mb-4">
              {formData.sections.map((section, index) => (
                <div key={index} className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-2xl">
                  <span>{section}</span>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
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
                placeholder="Add section..."
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                className="input-primary flex-1"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSection())}
              />
              <button type="button" onClick={addSection} className="btn-primary">
                Add
              </button>
            </div>
          </div>

          {/* FEATURES */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">Key Features</h3>
            <div className="space-y-2 mb-4">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-2xl">
                  <span className="flex-1">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
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
                placeholder="Add feature..."
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="input-primary flex-1"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              />
              <button type="button" onClick={addFeature} className="btn-primary">
                Add
              </button>
            </div>
          </div>

          {/* OBJECTIVES */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">Learning Objectives</h3>
            <div className="space-y-2 mb-4">
              {formData.objectives.map((objective, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded-2xl">
                  <span className="flex-1">{objective}</span>
                  <button
                    type="button"
                    onClick={() => removeObjective(index)}
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
                placeholder="Add objective..."
                value={newObjective}
                onChange={(e) => setNewObjective(e.target.value)}
                className="input-primary flex-1"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addObjective())}
              />
              <button type="button" onClick={addObjective} className="btn-primary">
                Add
              </button>
            </div>
          </div>

          {/* CATEGORIES WITH PREVIEW VIDEOS */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <FaLayerGroup /> Program Categories & Levels
            </h3>
            
            {/* Categories List */}
            {formData.categories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cream p-6 rounded-2xl border border-gray-200 space-y-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-primary">{category.title || `Category ${catIndex + 1}`}</h4>
                  <button
                    type="button"
                    onClick={() => removeCategory(catIndex)}
                    className="text-red-500 hover:text-red-700 font-bold text-xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Category Title"
                    value={category.title || ''}
                    onChange={(e) => updateCategory(catIndex, 'title', e.target.value)}
                  />
                  <Input
                    label="Arabic Title"
                    value={category.titleArabic || ''}
                    onChange={(e) => updateCategory(catIndex, 'titleArabic', e.target.value)}
                  />
                  <Input
                    label="Age Range"
                    placeholder="e.g., 7 - 12 Years"
                    value={category.ageRange || ''}
                    onChange={(e) => updateCategory(catIndex, 'ageRange', e.target.value)}
                  />
                  <Input
                    label="Category Type"
                    placeholder="e.g., Memorization, Foundation"
                    value={category.categoryType || ''}
                    onChange={(e) => updateCategory(catIndex, 'categoryType', e.target.value)}
                  />
                  <Input
                    label="Total Classes"
                    type="number"
                    value={category.totalClasses || ''}
                    onChange={(e) => updateCategory(catIndex, 'totalClasses', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div>
                  <label className="font-semibold text-primary block mb-2">Description</label>
                  <textarea
                    rows="3"
                    value={category.description || ''}
                    onChange={(e) => updateCategory(catIndex, 'description', e.target.value)}
                    className="input-primary resize-none w-full"
                    placeholder="Category description..."
                  />
                </div>

                <Input
                  label="Prerequisites"
                  value={category.prerequisites || ''}
                  onChange={(e) => updateCategory(catIndex, 'prerequisites', e.target.value)}
                />

                {/* Preview Videos */}
                <div className="border-t pt-4">
                  <h5 className="font-semibold text-primary mb-3">Preview Videos (max 3)</h5>
                  {(category.previewVideos || []).map((video, vidIndex) => {
                    const previewKey = `cat-${catIndex}-vid-${vidIndex}`
                    return (
                      <div key={vidIndex} className="bg-white p-4 rounded-xl mb-3 border border-gray-100 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-700">Video {vidIndex + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeVideo(catIndex, vidIndex)}
                            className="text-red-500 hover:text-red-700"
                          >
                            ×
                          </button>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-3">
                          <Input
                            label="Video Title"
                            value={video.title || ''}
                            onChange={(e) => updateVideo(catIndex, vidIndex, 'title', e.target.value)}
                          />
                          <Input
                            label="Duration"
                            placeholder="e.g., 12:45"
                            value={video.duration || ''}
                            onChange={(e) => updateVideo(catIndex, vidIndex, 'duration', e.target.value)}
                          />
                        </div>

                        {/* Thumbnail Upload */}
                        <div className="border-t pt-3">
                          <label className="font-semibold text-primary block mb-2 text-sm">
                            Upload Thumbnail
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleThumbnailUpload(catIndex, vidIndex, e)}
                            className="hidden"
                            id={`thumbnail-upload-${catIndex}-${vidIndex}`}
                          />
                          <label
                            htmlFor={`thumbnail-upload-${catIndex}-${vidIndex}`}
                            className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary transition-colors"
                          >
                            <FaUpload className="text-gray-400" />
                            <span className="text-gray-600 text-sm">Choose thumbnail image</span>
                          </label>
                          {thumbnailPreviews[previewKey] && (
                            <div className="mt-2 relative">
                              <img
                                src={thumbnailPreviews[previewKey]}
                                alt="Thumbnail preview"
                                className="w-full h-24 object-cover rounded-xl border"
                              />
                              <p className="text-xs text-green-600 mt-1">✓ Thumbnail uploaded</p>
                            </div>
                          )}
                          <Input
                            label="Or enter Thumbnail URL"
                            value={video.thumbnail || ''}
                            onChange={(e) => updateVideo(catIndex, vidIndex, 'thumbnail', e.target.value)}
                            placeholder="https://example.com/thumbnail.jpg"
                          />
                        </div>

                        {/* Video Upload */}
                        <div className="border-t pt-3">
                          <label className="font-semibold text-primary block mb-2 text-sm">
                            Upload Video
                          </label>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleVideoUpload(catIndex, vidIndex, e)}
                            className="hidden"
                            id={`video-upload-${catIndex}-${vidIndex}`}
                          />
                          <label
                            htmlFor={`video-upload-${catIndex}-${vidIndex}`}
                            className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary transition-colors"
                          >
                            <FaUpload className="text-gray-400" />
                            <span className="text-gray-600 text-sm">Choose video file (max 100MB)</span>
                          </label>
                          {videoPreviews[previewKey] && (
                            <p className="text-xs text-green-600 mt-2">✓ Video uploaded</p>
                          )}
                          <Input
                            label="Or enter Video URL/Embed Link"
                            value={video.url || ''}
                            onChange={(e) => updateVideo(catIndex, vidIndex, 'url', e.target.value)}
                            placeholder="https://youtube.com/embed/..."
                          />
                        </div>
                      </div>
                    )
                  })}

                  {(category.previewVideos || []).length < 3 && (
                    <button
                      type="button"
                      onClick={() => addVideo(catIndex)}
                      className="px-4 py-2 bg-secondary text-white rounded-xl hover:bg-secondary/90 transition-colors"
                    >
                      + Add Video
                    </button>
                  )}
                </div>

                {/* Learning Outcomes */}
                <div className="border-t pt-4">
                  <h5 className="font-semibold text-primary mb-3">Learning Outcomes</h5>
                  <div className="space-y-2 mb-3">
                    {(category.outcomes || []).map((outcome, outIndex) => (
                      <div key={outIndex} className="flex items-center gap-2 bg-white p-2 rounded">
                        <span className="flex-1">{outcome}</span>
                        <button
                          type="button"
                          onClick={() => removeOutcome(catIndex, outIndex)}
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
                      placeholder="Add learning outcome..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addOutcome(catIndex, e.target.value)
                          e.target.value = ''
                        }
                      }}
                      className="input-primary flex-1"
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add New Category Button */}
            <button
              type="button"
              onClick={addCategory}
              className="px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-semibold w-full"
            >
              + Add Category
            </button>
          </div>

          {/* GALLERY */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <FaImage /> Gallery Images
            </h3>

            {/* Upload New Image */}
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleGalleryUpload}
                className="hidden"
                id="gallery-upload"
              />
              <label
                htmlFor="gallery-upload"
                className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-primary transition-colors"
              >
                <FaUpload className="text-gray-400" />
                <span className="text-gray-600">Add gallery image</span>
              </label>
            </div>

            {/* Gallery Preview */}
            {galleryPreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryPreviews.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-24 object-cover rounded-xl border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newGallery = formData.gallery.filter((_, i) => i !== index)
                        setFormData(prev => ({ ...prev, gallery: newGallery }))
                        setGalleryPreviews(prev => prev.filter((_, i) => i !== index))
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* URL Fallback */}
            <div className="space-y-3">
              <Input
                label="Or add Gallery Image URL"
                name="newGalleryImage"
                value={newGalleryImage}
                onChange={(e) => setNewGalleryImage(e.target.value)}
                placeholder="https://example.com/gallery.jpg"
              />
              <button
                type="button"
                onClick={() => {
                  if (newGalleryImage.trim()) {
                    setFormData(prev => ({
                      ...prev,
                      gallery: [...prev.gallery, newGalleryImage.trim()]
                    }))
                    setGalleryPreviews(prev => [...prev, newGalleryImage.trim()])
                    setNewGalleryImage("")
                  }
                }}
                className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
              >
                Add URL Image
              </button>
            </div>
          </div>

          {/* DATES & FEATURED */}
          <div className="grid md:grid-cols-3 gap-4">
            <Input label="Start Date" type="date" name="startDate" value={formData.startDate || ""} onChange={handleChange} />
            <Input label="End Date" type="date" name="endDate" value={formData.endDate || ""} onChange={handleChange} />
            <div className="flex items-center gap-3 pt-8">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={!!formData.isFeatured}
                onChange={handleChange}
                className="w-5 h-5 text-primary"
              />
              <label htmlFor="isFeatured" className="font-semibold text-primary">
                Featured Program
              </label>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-5">
            <button
              type="button"
              onClick={() => navigate("/admin/programs")}
              className="px-6 py-3 border rounded-2xl"
            >
              Cancel
            </button>

            <button type="submit" className="btn-primary">
              {id ? "Update Program" : "Create Program"}
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

const Select = ({ label, options, ...props }) => (
  <div className="space-y-2">
    <label className="font-semibold text-primary">{label}</label>
    <select {...props} className="input-primary w-full">
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
)

export default ProgramFormPage