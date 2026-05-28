import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { FaFilePdf, FaImage, FaSave, FaUpload } from "react-icons/fa"

import SecretKeyModal from "../../../components/admin/SecretKeyModal"
import {
  researchCategories,
  researchStatusOptions,
  researchTypes,
} from "../../../constants/researchOptions"
import useStudentResearchAPI from "../../../hooks/useStudentResearchAPI"
import useStaffAPI from "../../../hooks/useStaffAPI"
import {
  getResearchImageUrl,
  saveResearchImage,
  saveResearchPdf,
} from "../../../utils/researchPdfStorage"

const defaultForm = {
  title: "",
  author: "",
  staffId: "",
  researchCategory: "",
  researchType: "بحث التخرج",
  status: "published",
  summary: "",
  pdfUrl: "",
  pdfFileName: "",
  pdfKey: "",
  pdfFile: null,
  imageUrl: "",
  imageFileName: "",
  imageKey: "",
  imageFile: null,
  tags: "",
}

const createFileKey = (prefix, file) =>
  `${prefix}-${Date.now()}-${file.name.replace(/\s+/g, "-").toLowerCase()}`

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

const ResearchFormPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { addResearch, editResearch, getResearchById } = useStudentResearchAPI()
  const { staff } = useStaffAPI()

  const [formData, setFormData] = useState(defaultForm)
  const [previewImage, setPreviewImage] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(Boolean(id))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadResearch = async () => {
      if (!id) return

      try {
        setLoading(true)
        const existing = await getResearchById(id)
        setFormData({
          ...defaultForm,
          ...existing,
          staffId: existing.staffId?._id || existing.staffId || "",
          tags: existing.tags?.join(", ") || "",
          pdfFile: null,
          imageFile: null,
        })

        if (existing.imageUrl) {
          setPreviewImage(existing.imageUrl)
        } else if (existing.imageKey) {
          const localImage = await getResearchImageUrl(existing.imageKey)
          setPreviewImage(localImage || "")
        }
      } catch (err) {
        setError(err.message || "Failed to load research item")
      } finally {
        setLoading(false)
      }
    }

    loadResearch()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "staffId") {
      const selectedStaff = staff.find((member) => member._id === value)
      setFormData((prev) => ({
        ...prev,
        staffId: value,
        author: selectedStaff?.name || prev.author,
      }))
      return
    }

    if (name === "imageUrl") {
      setPreviewImage(value)
      setFormData((prev) => ({
        ...prev,
        imageUrl: value,
        imageFile: null,
        imageKey: value ? "" : prev.imageKey,
      }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePdfUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.")
      return
    }

    setError("")
    setFormData((prev) => ({
      ...prev,
      pdfFile: file,
      pdfFileName: file.name,
      pdfKey: prev.pdfKey || createFileKey("research-pdf", file),
      pdfUrl: "",
    }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.")
      return
    }

    setError("")

    try {
      const imageDataUrl = await readFileAsDataUrl(file)
      setPreviewImage(imageDataUrl)
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        imageFileName: file.name,
        imageKey: prev.imageKey || createFileKey("research-image", file),
        imageUrl: imageDataUrl,
      }))
    } catch (err) {
      setError("Could not read the selected image. Please try another file.")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  const confirmSave = async (secretKey) => {
    setSaving(true)
    setError("")

    try {
      if (formData.pdfFile && formData.pdfKey) {
        await saveResearchPdf(formData.pdfKey, formData.pdfFile)
      }

      if (formData.imageFile && formData.imageKey) {
        await saveResearchImage(formData.imageKey, formData.imageFile)
      }

      const {
        pdfFile,
        imageFile,
        id: _localId,
        _id,
        createdAt,
        updatedAt,
        __v,
        ...rest
      } = formData

      const payload = {
        ...rest,
        staffId: rest.staffId || null,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }

      if (id) {
        await editResearch(id, payload, secretKey)
      } else {
        await addResearch(payload, secretKey)
      }
    } catch (err) {
      setError(err.message || "Failed to save research")
      throw err
    } finally {
      setSaving(false)
    }
  }

  const handleSaveSuccess = () => {
    setShowModal(false)
    navigate("/admin/research")
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-soft">
        <p className="font-semibold text-primary">Loading research item...</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl"
    >
      <div className="overflow-hidden rounded-2xl bg-white shadow-premium">
        <div className="bg-primary p-8 text-white md:p-10">
          <h1 className="mb-3 text-4xl font-bold">
            {id ? "Edit Research" : "Create Research"}
          </h1>
          <p className="max-w-2xl text-gray-200">
            Add Arabic research metadata, optional image, PDF document, and publishing status.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 p-6 md:p-10">
          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-gray-700">
              Title / عنوان البحث
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-primary"
                required
                dir="auto"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-gray-700">
              Author / اسم الباحث
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="input-primary"
                required
                dir="auto"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-semibold text-gray-700">
            Conducted by Staff / Linked staff profile
            <select
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              className="input-primary"
            >
              <option value="">No linked staff profile</option>
              {staff.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name} - {member.position || member.role}
                </option>
              ))}
            </select>
            <span className="text-xs font-normal text-gray-500">
              If selected, research cards will show the staff image/name and link to the profile.
            </span>
          </label>

          <div className="grid gap-6 md:grid-cols-3">
            <label className="grid gap-2 text-sm font-semibold text-gray-700">
              Category / التصنيف
              <select
                name="researchCategory"
                value={formData.researchCategory}
                onChange={handleChange}
                className="input-primary"
                required
              >
                <option value="">Select category</option>
                {researchCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-semibold text-gray-700">
              Research Type / نوع البحث
              <select
                name="researchType"
                value={formData.researchType}
                onChange={handleChange}
                className="input-primary"
                required
              >
                {researchTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-semibold text-gray-700">
              Status / الحالة
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-primary"
              >
                {researchStatusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm font-semibold text-gray-700">
            Summary / ملخص البحث
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={6}
              className="input-primary"
              required
              dir="auto"
            />
          </label>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 p-5">
              <div className="mb-4 flex items-center gap-3 text-primary">
                <FaFilePdf />
                <h2 className="font-bold">PDF Document</h2>
              </div>
              <label
                htmlFor="pdf-upload"
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 transition hover:border-primary hover:text-primary"
              >
                <FaUpload /> Upload PDF
              </label>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={handlePdfUpload}
                className="hidden"
              />
              <p className="mt-3 text-sm text-gray-500">
                Use upload for local admin storage or paste a public PDF URL below.
              </p>
              {formData.pdfFileName && (
                <p className="mt-3 text-sm font-semibold text-green-700">{formData.pdfFileName}</p>
              )}
            </div>

            <label className="grid gap-2 text-sm font-semibold text-gray-700">
              PDF URL
              <input
                type="url"
                name="pdfUrl"
                value={formData.pdfUrl}
                onChange={handleChange}
                className="input-primary"
                placeholder="https://example.com/research.pdf"
              />
              <span className="text-xs font-normal text-gray-500">
                Public URL is best for visitors on different devices.
              </span>
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-gray-700">
              PDF File Name
              <input
                type="text"
                name="pdfFileName"
                value={formData.pdfFileName}
                onChange={handleChange}
                className="input-primary"
                placeholder="research-file.pdf"
              />
            </label>

            <label className="grid gap-2 text-sm font-semibold text-gray-700">
              Tags / الوسوم
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="input-primary"
                placeholder="الحديث، السنة، التربية"
                dir="auto"
              />
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 p-5">
              <div className="mb-4 flex items-center gap-3 text-primary">
                <FaImage />
                <h2 className="font-bold">Research Image</h2>
              </div>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Research preview"
                  className="mb-4 h-44 w-full rounded-2xl object-cover"
                />
              )}
              <label
                htmlFor="image-upload"
                className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 transition hover:border-primary hover:text-primary"
              >
                <FaUpload /> Upload Image
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <p className="mt-3 text-sm text-gray-500">Optional. Cards still look clean without an image.</p>
            </div>

            <label className="grid gap-2 text-sm font-semibold text-gray-700">
              Image URL
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="input-primary"
                placeholder="https://example.com/research-image.jpg"
              />
              <span className="text-xs font-normal text-gray-500">
                Optional public image URL.
              </span>
            </label>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-4 sm:flex-row">
            <button type="button" onClick={() => navigate("/admin/research")} className="btn-dark-outline">
              Cancel
            </button>
            <button type="submit" className="btn-primary inline-flex items-center gap-2">
              <FaSave /> {id ? "Save Updates" : "Publish Research"}
            </button>
          </div>
        </form>
      </div>

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

export default ResearchFormPage
