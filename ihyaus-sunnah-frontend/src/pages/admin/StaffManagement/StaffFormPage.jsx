// src/pages/admin/StaffManagement/StaffFormPage.jsx

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"

import {
  FaUserTie,
  FaImage,
  FaAlignLeft,
  FaLayerGroup,
  FaUpload,
} from "react-icons/fa"

import useStaff from "../../../hooks/useStaff"

import {
  getStaffById,
} from "../../../data/mock/staffStore"

import SecretKeyModal from "../../../components/admin/SecretKeyModal"

const sectionsList = [
  "Administration",
  "Community",
  "Islamiyyah",
  "Tahfeez",
  "Academic",
  "Media",
]

const emptyForm = {
  name: "",
  position: "",
  role: "",
  image: "",
  bio: "",
  sections: [],
  email: "",
  phone: "",
  address: "",
  academicStatus: "",
  occupation: "",
  maritalStatus: "",
}

const StaffFormPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { staff, addStaff, editStaff } = useStaff()

  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState(emptyForm)

  const [imagePreview, setImagePreview] = useState("")

  // LOAD EXISTING STAFF (EDIT MODE)
  useEffect(() => {
    if (!id) return

    const existingStaff = getStaffById(id)

    if (existingStaff) {
      setFormData({
        ...emptyForm,
        ...existingStaff,
        sections: existingStaff.sections || [],
      })
      setImagePreview(existingStaff.image || "")
    }
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileUpload = (e) => {
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
      setFormData(prev => ({ ...prev, image: base64 }))
      setImagePreview(base64)
    }
    reader.readAsDataURL(file)
  }

  const handleSectionToggle = (section) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.includes(section)
        ? prev.sections.filter((s) => s !== section)
        : [...prev.sections, section],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowModal(true)
  }

  const confirmSave = () => {
    if (id) {
      editStaff(id, formData)
    } else {
      addStaff(formData)
    }

    setShowModal(false)
    navigate("/admin/staff")
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
            {id ? "Edit Staff" : "Create Staff"}
          </h1>

          <p className="text-white/80 text-lg">
            Manage staff profiles, departments, and organizational structure.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-10 space-y-10">

          {/* GRID */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* NAME */}
            <Input label="Full Name" icon={<FaUserTie />} name="name" value={formData.name} onChange={handleChange} />

            {/* POSITION */}
            <Input label="Position" name="position" value={formData.position} onChange={handleChange} />

            {/* ROLE */}
            <Select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={[
                { value: "director", label: "Director" },
                { value: "board", label: "Board" },
                { value: "senior", label: "Senior Staff" },
                { value: "staff-i", label: "Staff I" },
                { value: "staff-ii", label: "Staff II" },
                { value: "staff-iii", label: "Staff III" },
              ]}
            />

            <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
            <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
            <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
            <Input label="Academic Status" name="academicStatus" value={formData.academicStatus} onChange={handleChange} />
            <Input label="Occupation" name="occupation" value={formData.occupation} onChange={handleChange} />

            <Select
              label="Marital Status"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              options={[
                { value: "", label: "Select Status" },
                { value: "Single", label: "Single" },
                { value: "Married", label: "Married" },
                { value: "Divorced", label: "Divorced" },
              ]}
            />

            {/* IMAGE */}
            <div className="space-y-4">
              <label className="font-semibold text-primary flex items-center gap-2">
                <FaImage /> Profile Image
              </label>

              {/* File Upload */}
              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-primary transition-colors"
                >
                  <FaUpload className="text-gray-400" />
                  <span className="text-gray-600">Click to upload image or drag and drop</span>
                </label>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-2xl border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, image: "" }))
                        setImagePreview("")
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              {/* URL Fallback */}
              <Input
                label="Or enter Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {/* BIO */}
          <div>
            <label className="font-semibold text-primary flex items-center gap-2">
              <FaAlignLeft /> Biography
            </label>

            <textarea
              rows="6"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="input-primary resize-none"
            />
          </div>

          {/* SECTIONS */}
          <div>
            <label className="font-semibold text-primary flex items-center gap-2 mb-4">
              <FaLayerGroup /> Departments
            </label>

            <div className="flex flex-wrap gap-4">
              {sectionsList.map((section) => {
                const active = formData.sections.includes(section)

                return (
                  <button
                    key={section}
                    type="button"
                    onClick={() => handleSectionToggle(section)}
                    className={`px-5 py-3 rounded-2xl border transition ${
                      active
                        ? "bg-primary text-white"
                        : "border-gray-200 text-gray-600"
                    }`}
                  >
                    {section}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-5">
            <button
              type="button"
              onClick={() => navigate("/admin/staff")}
              className="px-6 py-3 border rounded-2xl"
            >
              Cancel
            </button>

            <button type="submit" className="btn-primary">
              {id ? "Update Staff" : "Create Staff"}
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
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
)

export default StaffFormPage