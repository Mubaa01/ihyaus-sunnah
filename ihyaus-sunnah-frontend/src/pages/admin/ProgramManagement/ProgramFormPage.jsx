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
  FaPlus,
  FaSave,
  FaTimes,
} from "react-icons/fa"

import useProgramsAPI from "../../../hooks/useProgramsAPI"

// TODO: Replace all program mock logic with real API

import SecretKeyModal from "../../../components/admin/SecretKeyModal"
import MediaLibrarySelectorModal from "../../../components/admin/MediaLibrarySelectorModal"

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
  const [saving, setSaving] = useState(false)
  const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false)
  const [selectedVideoCategory, setSelectedVideoCategory] = useState(null)

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

  const handleMediaLibrarySelect = (videos) => {
    if (selectedVideoCategory !== null) {
      setFormData((prev) => {
        const newCategories = [...prev.categories]
        newCategories[selectedVideoCategory].previewVideos = [
          ...(newCategories[selectedVideoCategory].previewVideos || []),
          ...videos,
        ].slice(0, 3) // Enforce max 3 videos
        return { ...prev, categories: newCategories }
      })
    }
    setSelectedVideoCategory(null)
    setMediaLibraryOpen(false)
  }

  const handleOpenMediaLibrary = (catIndex) => {
    setSelectedVideoCategory(catIndex)
    setMediaLibraryOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(true)
  }
  const confirmSave = async (secretKey) => {
    setSaving(true)

    const generatedSlug = !id
      ? formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      : formData.slug

    const dataToSave = {
      ...formData,
      slug: generatedSlug,
    }

    try {
      if (id) {
        await editProgram(id, dataToSave, secretKey)
      } else {
        await addProgram(dataToSave, secretKey)
      }
    } finally {
      setSaving(false)
    }
  }

  const handleSaveSuccess = () => {
    setShowModal(false)
    navigate("/admin/programs")
  }



  // const confirmSave = () => {
  //   // Generate slug from title if creating new
  //   if (!id) {
  //     const slug = formData.title
  //       .toLowerCase()
  //       .replace(/[^a-z0-9]+/g, '-')
  //       .replace(/(^-|-$)/g, '')
  //     formData.slug = slug
  //   }

  //   // Save all image data (including base64) so uploads persist
  //   const dataToSave = {
  //     ...formData
  //     // Optionally, you can still filter gallery if you want only URLs:
  //     // gallery: formData.gallery.filter(item => !item.startsWith('data:'))
  //   }

  //   if (id) {
  //     editProgram(id, dataToSave)
  //   } else {
  //     addProgram(dataToSave)
  //   }

  //   setShowModal(false)
  //   navigate("/admin/programs")
  // }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl"
    >
      <MediaLibrarySelectorModal
        isOpen={mediaLibraryOpen}
        onClose={() => {
          setMediaLibraryOpen(false)
          setSelectedVideoCategory(null)
        }}
        onSelect={handleMediaLibrarySelect}
        maxSelection={3}
      />
      <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-premium">

        {/* HEADER */}
        <div className="border-b border-neutral-200 bg-primary p-6 text-white md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold uppercase text-goldSoft">
                <FaBookOpen /> Program Editor
              </span>
              <h1 className="text-3xl font-bold md:text-4xl">
                {id ? "Edit Program" : "Create Program"}
              </h1>

              <p className="mt-3 max-w-2xl text-sm text-white/75 md:text-base">
                Manage the public page, curriculum levels, media, schedule, and program outcomes.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 rounded-lg border border-white/10 bg-white/10 p-2 text-center">
              <HeaderMetric label="Sections" value={formData.sections.length} />
              <HeaderMetric label="Features" value={formData.features.length} />
              <HeaderMetric label="Levels" value={formData.categories.length} />
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-50 p-4 md:p-6 lg:p-8">

          {/* BASIC INFO */}
          <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-soft md:p-6">
          <SectionTitle icon={<FaBookOpen />} title="Basic Information" />
          <div className="grid gap-5 md:grid-cols-2">
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
                { value: "upcoming", label: "Upcoming" },
                { value: "completed", label: "Completed" },
              ]}
            />
            <Input label="Instructor" name="instructor" value={formData.instructor || ""} onChange={handleChange} />
            <Input label="Duration" icon={<FaClock />} name="duration" value={formData.duration || ""} onChange={handleChange} />
            <Input label="Location" icon={<FaMapMarkerAlt />} name="location" value={formData.location || ""} onChange={handleChange} />
          </div>
          </section>

          {/* IMAGES */}
          <section className="rounded-lg border border-neutral-200 bg-white p-5 shadow-soft md:p-6">
            <SectionTitle icon={<FaImage />} title="Program Images" />

            <div className="grid gap-5 md:grid-cols-2">
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
          </section>

          {/* DESCRIPTIONS */}
          <section className="space-y-5 rounded-lg border border-neutral-200 bg-white p-5 shadow-soft md:p-6">
            <SectionTitle icon={<FaAlignLeft />} title="Descriptions" />
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
          </section>

          {/* SCHEDULE */}
          <section className="space-y-5 rounded-lg border border-neutral-200 bg-white p-5 shadow-soft md:p-6">
            <SectionTitle icon={<FaCalendarAlt />} title="Schedule Information" />
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Days" name="days" value={formData.schedule?.days || ""} onChange={handleScheduleChange} />
              <Input label="Time" name="time" value={formData.schedule?.time || ""} onChange={handleScheduleChange} />
            </div>
          </section>

          {/* STATS */}
          <section className="space-y-5 rounded-lg border border-neutral-200 bg-white p-5 shadow-soft md:p-6">
            <SectionTitle icon={<FaUsers />} title="Program Statistics" />
            <div className="grid gap-4 md:grid-cols-3">
              <Input label="Total Students" type="number" name="totalStudents" value={formData.stats?.totalStudents ?? 0} onChange={handleStatsChange} />
              <Input label="Total Staff" type="number" name="totalStaff" value={formData.stats?.totalStaff ?? 0} onChange={handleStatsChange} />
              <Input label="Years Running" type="number" name="yearsRunning" value={formData.stats?.yearsRunning ?? 0} onChange={handleStatsChange} />
            </div>
          </section>

          {/* SECTIONS */}
          <section className="space-y-5 rounded-lg border border-neutral-200 bg-white p-5 shadow-soft md:p-6">
            <SectionTitle icon={<FaLayerGroup />} title="Program Sections" />
            <div className="mb-4 flex flex-wrap gap-3">
              {formData.sections.map((section, index) => (
                <div key={index} className="flex items-center gap-2 rounded-lg border border-brand-100 bg-brand-50 px-3 py-2 text-primary">
                  <span>{section}</span>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="text-[#B91C1C] hover:text-[#7F1D1D]"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
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
          </section>

          {/* FEATURES */}
          <section className="space-y-5 rounded-lg border border-neutral-200 bg-white p-5 shadow-soft md:p-6">
            <SectionTitle icon={<FaBookOpen />} title="Key Features" />
            <div className="space-y-2 mb-4">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                  <span className="flex-1">{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-[#B91C1C] hover:text-[#7F1D1D]"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
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
          </section>

          {/* OBJECTIVES */}
          <section className="space-y-5 rounded-lg border border-neutral-200 bg-white p-5 shadow-soft md:p-6">
            <SectionTitle icon={<FaUsers />} title="Learning Objectives" />
            <div className="space-y-2 mb-4">
              {formData.objectives.map((objective, index) => (
                <div key={index} className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                  <span className="flex-1">{objective}</span>
                  <button
                    type="button"
                    onClick={() => removeObjective(index)}
                    className="text-[#B91C1C] hover:text-[#7F1D1D]"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
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
          </section>

          {/* CATEGORIES WITH PREVIEW VIDEOS */}
          <section className="space-y-5 rounded-lg border border-neutral-200 bg-white p-5 shadow-soft md:p-6">
            <SectionTitle icon={<FaLayerGroup />} title="Program Categories & Levels" />
            
            {/* Categories List */}
            {formData.categories.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 rounded-lg border border-neutral-200 bg-neutral-50 p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-primary">{category.title || `Category ${catIndex + 1}`}</h4>
                  <button
                    type="button"
                    onClick={() => removeCategory(catIndex)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#F1B4B4] text-[#B91C1C] hover:bg-[#FFF1F1]"
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
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="font-semibold text-primary">Preview Videos (max 3)</h5>
                    <button
                      type="button"
                      onClick={() => handleOpenMediaLibrary(catIndex)}
                      className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-white transition hover:bg-gold/90"
                    >
                      <FaPlus /> Add from Media Library
                    </button>
                  </div>

                  {/* Media Library Videos Grid */}
                  {(category.previewVideos || []).length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      {(category.previewVideos || []).map((video, vidIndex) => (
                        <motion.div
                          key={vidIndex}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative rounded-lg overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition group"
                        >
                          {/* Thumbnail */}
                          <div className="relative w-full aspect-video bg-neutral-200">
                            {video.thumbnail ? (
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-neutral-300">
                                <FaImage size={24} className="text-neutral-400" />
                              </div>
                            )}
                            
                            {/* Provider Badge */}
                            <div className="absolute top-2 right-2">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                video.provider === "telegram"
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-700 text-white"
                              }`}>
                                {video.provider === "telegram" ? "📱 TG" : "🔗 URL"}
                              </span>
                            </div>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => removeVideo(catIndex, vidIndex)}
                              className="absolute inset-0 bg-red-500/90 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition"
                            >
                              <span className="text-xl">Delete</span>
                            </button>
                          </div>

                          {/* Video Info */}
                          <div className="p-3 bg-white">
                            <p className="font-semibold text-sm line-clamp-2">{video.title}</p>
                            <p className="text-xs text-muted">{video.duration}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Manual Video Add (Collapsible) */}
                  <details className="border-t pt-4">
                    <summary className="cursor-pointer text-sm font-semibold text-secondary hover:text-primary transition">
                      + Add Video Manually (Advanced)
                    </summary>
                    <div className="mt-4 space-y-4">
                      {(category.previewVideos || []).map((video, vidIndex) => {
                        const previewKey = `cat-${catIndex}-vid-${vidIndex}`
                        return (
                          <div key={vidIndex} className="space-y-3 rounded-lg border border-neutral-200 bg-white p-4">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-700">Video {vidIndex + 1}</span>
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

                            <Input
                              label="Thumbnail URL"
                              value={video.thumbnail || ''}
                              onChange={(e) => updateVideo(catIndex, vidIndex, 'thumbnail', e.target.value)}
                              placeholder="https://example.com/thumbnail.jpg"
                            />

                            {video.provider === "external" && (
                              <Input
                                label="Video URL/Embed Link"
                                value={video.url || ''}
                                onChange={(e) => updateVideo(catIndex, vidIndex, 'url', e.target.value)}
                                placeholder="https://youtube.com/embed/..."
                              />
                            )}
                          </div>
                        )
                      })}

                      {(category.previewVideos || []).length < 3 && (
                        <button
                          type="button"
                          onClick={() => addVideo(catIndex)}
                          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary/90"
                        >
                          <FaPlus /> Add Video
                        </button>
                      )}
                    </div>
                  </details>
                </div>
                <div className="border-t pt-4">
                  <h5 className="font-semibold text-primary mb-3">Learning Outcomes</h5>
                  <div className="space-y-2 mb-3">
                    {(category.outcomes || []).map((outcome, outIndex) => (
                      <div key={outIndex} className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white p-2">
                        <span className="flex-1">{outcome}</span>
                        <button
                          type="button"
                          onClick={() => removeOutcome(catIndex, outIndex)}
                          className="text-[#B91C1C] hover:text-[#7F1D1D]"
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
            >
              <FaPlus /> Add Category
            </button>
          </section>

          {/* GALLERY */}
          <section className="space-y-5 rounded-lg border border-neutral-200 bg-white p-5 shadow-soft md:p-6">
            <SectionTitle icon={<FaImage />} title="Gallery Images" />

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
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 px-4 py-3 transition-colors hover:border-primary hover:bg-brand-50"
              >
                <FaUpload className="text-gray-400" />
                <span className="text-gray-600">Add gallery image</span>
              </label>
            </div>

            {/* Gallery Preview */}
            {galleryPreviews.length > 0 && (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {galleryPreviews.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="h-24 w-full rounded-lg border object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newGallery = formData.gallery.filter((_, i) => i !== index)
                        setFormData(prev => ({ ...prev, gallery: newGallery }))
                        setGalleryPreviews(prev => prev.filter((_, i) => i !== index))
                      }}
                      className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#B91C1C] text-sm text-white hover:bg-[#7F1D1D]"
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
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
              >
                <FaPlus /> Add URL Image
              </button>
            </div>
          </section>

          {/* DATES & FEATURED */}
          <section className="grid gap-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-soft md:grid-cols-3 md:p-6">
            <Input label="Start Date" type="date" name="startDate" value={formData.startDate || ""} onChange={handleChange} />
            <Input label="End Date" type="date" name="endDate" value={formData.endDate || ""} onChange={handleChange} />
            <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 md:mt-7">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={!!formData.isFeatured}
                onChange={handleChange}
                className="h-5 w-5 text-primary"
              />
              <label htmlFor="isFeatured" className="font-semibold text-primary">
                Featured Program
              </label>
            </div>
          </section>

          {/* ACTIONS */}
          <div className="sticky bottom-4 z-10 flex flex-col justify-end gap-3 rounded-lg border border-neutral-200 bg-white/95 p-4 shadow-premium backdrop-blur md:flex-row">
            <button
              type="button"
              onClick={() => navigate("/admin/programs")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-200 px-6 py-3 font-semibold text-primary transition hover:bg-brand-50"
            >
              <FaTimes />
              Cancel
            </button>

            <button type="submit" className="btn-primary gap-2">
              <FaSave />
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
        onSuccess={handleSaveSuccess}
        loading={saving}
      />
    </motion.div>
  )
}

/* ---------------- SMALL REUSABLE COMPONENTS ---------------- */

const HeaderMetric = ({ label, value }) => (
  <div className="rounded-lg px-4 py-3">
    <p className="text-2xl font-bold leading-none">{value}</p>
    <p className="mt-1 text-xs font-semibold uppercase text-white/65">{label}</p>
  </div>
)

const SectionTitle = ({ icon, title }) => (
  <div className="mb-5 flex items-center gap-3 border-b border-neutral-200 pb-4">
    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-primary">
      {icon}
    </span>
    <h3 className="text-lg font-semibold text-primary">{title}</h3>
  </div>
)

const Input = ({ label, icon, className = "", ...props }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-primary">
      {icon} {label}
    </label>
    <input {...props} className={`input-primary w-full ${className}`} />
  </div>
)

const Select = ({ label, options, className = "", ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-primary">{label}</label>
    <select {...props} className={`input-primary w-full ${className}`}>
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
