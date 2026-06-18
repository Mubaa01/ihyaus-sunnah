import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaEdit, FaFilePdf, FaPlus, FaSearch, FaTrash } from "react-icons/fa"

import SecretKeyModal from "../../../components/admin/SecretKeyModal"
import {
  getResearchStatusLabel,
  researchCategories,
  researchStatusOptions,
} from "../../../constants/researchOptions"
import useStudentResearchAPI from "../../../hooks/useStudentResearchAPI"
import { getResearchImageUrl } from "../../../utils/researchPdfStorage"
import { researchAPI } from "../../../services/api"

const isTelegramResearch = (item) =>
  item?.provider === "telegram" ||
  item?.telegramFileId ||
  item?.pdfUrl?.includes("/telegram-url")

const includesSearch = (item, search) => {
  const term = search.trim().toLowerCase()
  if (!term) return true

  return [item.title, item.author, item.summary, item.researchCategory, ...(item.tags || [])]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(term))
}

const ResearchListPage = () => {
  const { research, loading, error, removeResearch } = useStudentResearchAPI()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [imageLinks, setImageLinks] = useState({})
  const [telegramLinks, setTelegramLinks] = useState({})

  const filteredResearch = useMemo(() => {
    return research.filter((item) => {
      const matchesStatus = !statusFilter || item.status === statusFilter
      const matchesCategory = !categoryFilter || item.researchCategory === categoryFilter
      return matchesStatus && matchesCategory && includesSearch(item, search)
    })
  }, [categoryFilter, research, search, statusFilter])

  useEffect(() => {
    const loadFileLinks = async () => {
      const urls = {}
      const telegramUrls = {}

      await Promise.all(
        filteredResearch.map(async (item) => {
          if (item.imageKey && !item.imageUrl) {
            const url = await getResearchImageUrl(item.imageKey)
            if (url) urls[item.id] = url
          }

          if (isTelegramResearch(item)) {
            try {
              const response = await researchAPI.getTelegramUrl(item.id || item._id)
              if (response.data?.url) {
                telegramUrls[item.id || item._id] = response.data.url
              }
            } catch (error) {
              // Leave the PDF link unavailable if Telegram cannot issue a fresh URL.
            }
          }
        })
      )

      setImageLinks(urls)
      setTelegramLinks(telegramUrls)
    }

    loadFileLinks()
  }, [filteredResearch])

  const handleDeleteClick = (id) => {
    setSelectedId(id)
    setShowModal(true)
  }

  const confirmDelete = async (secretKey) => {
    setIsDeleting(true)
    try {
      await removeResearch(selectedId, secretKey)
      setShowModal(false)
      setSelectedId(null)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-primary">Research Management</h1>
          <p className="mt-2 text-gray-500">
            Manage Arabic student research, optional images, PDF links, tags, and publishing status.
          </p>
        </div>

        <Link to="/admin/research/create" className="btn-primary inline-flex items-center gap-2">
          <FaPlus /> Add Research
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-soft">
        <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px_170px]">
          <div className="relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search title, author, category, summary, or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-primary pl-14"
            />
          </div>

          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="input-primary">
            <option value="">All Categories</option>
            {researchCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-primary">
            <option value="">All Status</option>
            {researchStatusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3">
            <p className="text-xs text-gray-500">Total items</p>
            <p className="text-2xl font-bold text-primary">{filteredResearch.length}</p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-soft">
          <p className="font-semibold text-primary">Loading research...</p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-10 text-center text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && filteredResearch.length === 0 && (
        <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-soft">
          <p className="mb-3 text-xl font-semibold text-primary">No research items found</p>
          <p className="text-gray-600">Adjust your search or filters to see more results.</p>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-2">
        {filteredResearch.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.03 }}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft"
          >
            {(item.imageUrl || imageLinks[item.id]) && (
              <img
                src={item.imageUrl || imageLinks[item.id]}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
            )}

            <div className="space-y-5 p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-semibold text-gold">{item.researchType}</p>
                  <h2 className="mt-2 text-2xl font-bold leading-snug text-primary" dir="auto">
                    {item.title}
                  </h2>
                  {item.staffId?._id ? (
                    <Link
                      to={`/staff/profile/${item.staffId._id}`}
                      className="mt-3 flex w-fit items-center gap-3 rounded-2xl bg-gray-50 p-2 pr-4 transition hover:bg-primary/5"
                    >
                      <img
                        src={item.staffId.image}
                        alt={item.staffId.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <span className="text-sm font-semibold text-primary">
                        {item.staffId.name}
                      </span>
                    </Link>
                  ) : (
                    <p className="mt-2 text-gray-500">By {item.author}</p>
                  )}
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
                  <FaFilePdf />
                  {getResearchStatusLabel(item.status)}
                </span>
              </div>

              <p className="line-clamp-3 leading-relaxed text-gray-600" dir="auto">
                {item.summary}
              </p>

              <div className="grid gap-4 text-sm text-gray-500 sm:grid-cols-3">
                <div>
                  <p className="font-semibold text-gray-700">Category</p>
                  <p dir="rtl">{item.researchCategory}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">PDF</p>
                  <p>{item.pdfUrl || item.pdfKey ? "Available" : "Missing"}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Tags</p>
                  <p dir="auto">{item.tags?.join("، ") || "N/A"}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                {(telegramLinks[item.id || item._id] || (!isTelegramResearch(item) && item.pdfUrl)) ? (
                  <a
                    href={telegramLinks[item.id || item._id] || item.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-2 text-sm text-secondary transition hover:bg-secondary/10"
                  >
                    <FaFilePdf />
                    {item.pdfFileName || "View PDF"}
                  </a>
                ) : (
                  <span className="text-sm text-gray-400">No public PDF URL</span>
                )}

                <div className="flex items-center gap-3">
                  <Link
                    to={`/admin/research/${item.id}`}
                    className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-white transition hover:bg-primaryDark"
                  >
                    <FaEdit /> Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-red-200 px-5 py-3 text-red-600 transition hover:bg-red-50"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <SecretKeyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        loading={isDeleting}
      />
    </div>
  )
}

export default ResearchListPage
