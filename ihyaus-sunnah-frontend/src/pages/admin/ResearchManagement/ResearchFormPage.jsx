import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { FaBookOpen, FaUserGraduate, FaUpload, FaFilePdf, FaSave, FaImage } from "react-icons/fa"

import useStudentResearch from "../../../hooks/useStudentResearch"
import { getResearchById } from "../../../data/mock/studentResearchStore"
import { getResearchImageUrl } from "../../../utils/researchPdfStorage"
import SecretKeyModal from "../../../components/admin/SecretKeyModal"

const defaultForm = {
  title: "",
  author: "",
  researchCategory: "",
  researchType: "Graduation Thesis",
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

const ResearchFormPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { addResearch, editResearch, categories, types } = useStudentResearch({})

  const [formData, setFormData] = useState(defaultForm)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!id) return

    const existing = getResearchById(id)
    if (existing) {
      setFormData({
        ...defaultForm,
        ...existing,
        tags: existing.tags?.join(", ") || "",
        pdfKey: existing.pdfKey || "",
        imageKey: existing.imageKey || "",
      })
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePdfUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.")
      return
    }

    setFormData((prev) => ({
      ...prev,
      pdfFile: file,
      pdfFileName: file.name,
      pdfKey: prev.pdfKey || "",
      pdfUrl: "",
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.")
      return
    }

    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imageFileName: file.name,
      imageKey: prev.imageKey || "",
      imageUrl: "",
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  const confirmSave = async () => {
    console.log('Confirm save called, formData:', formData)
    const payload = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    }

    if (id) {
      await editResearch(id, payload)
    } else {
      await addResearch(payload)
    }

    setShowModal(false)
    navigate("/admin/research")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-3xl shadow-premium overflow-hidden">
        <div className="bg-primary text-white p-10">
          <h1 className="text-4xl font-bold mb-3">
            {id ? "Edit Research" : "Create Research"}
          </h1>
          <p className="text-gray-200 max-w-2xl">
            {id
              ? "Update research metadata, attach documentation, and publish to the student research repository."
              : "Add a new research item, attach a PDF, and publish the completed work for public access."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="input-primary"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                name="researchCategory"
                value={formData.researchCategory}
                onChange={handleChange}
                className="input-primary"
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Research Type</label>
              <select
                name="researchType"
                value={formData.researchType}
                onChange={handleChange}
                className="input-primary"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="input-primary"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={5}
              className="input-primary"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">PDF Attachment</label>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="pdf-upload"
                  className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 cursor-pointer hover:border-primary hover:text-primary transition"
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
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Select a PDF file to attach, or provide a direct URL below.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">PDF URL</label>
              <input
                type="text"
                name="pdfUrl"
                value={formData.pdfUrl}
                onChange={handleChange}
                className="input-primary"
                placeholder="https://example.com/research-document.pdf"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">PDF File Name</label>
              <input
                type="text"
                name="pdfFileName"
                value={formData.pdfFileName}
                onChange={handleChange}
                className="input-primary"
                placeholder="Optional filename for display"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="input-primary"
                placeholder="e.g. tajweed, youth, hadith"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Research Image</label>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-3 text-sm text-gray-600 cursor-pointer hover:border-primary hover:text-primary transition"
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
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Select an image to represent the research.
              </p>
              {formData.imageFileName && (
                <p className="text-sm text-green-600 mt-2 font-semibold">
                  ✓ {formData.imageFileName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="input-primary"
                placeholder="https://example.com/research-image.jpg"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/research")}
              className="btn-dark-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary inline-flex items-center gap-2"
            >
              <FaSave /> {id ? "Save Updates" : "Publish Research"}
            </button>
          </div>
        </form>
      </div>

      <SecretKeyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmSave}
      />
    </motion.div>
  )
}

export default ResearchFormPage
