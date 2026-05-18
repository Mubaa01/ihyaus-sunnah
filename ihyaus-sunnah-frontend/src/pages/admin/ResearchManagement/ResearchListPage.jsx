import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaSearch, FaFilePdf, FaEdit, FaTrash, FaPlus } from "react-icons/fa"

import useStudentResearchAPI from "../../../hooks/useStudentResearchAPI"
import { getResearchPdfUrl, getResearchImageUrl } from "../../../utils/researchPdfStorage"
import SecretKeyModal from "../../../components/admin/SecretKeyModal"

const ResearchListPage = () => {
  const { research, removeResearch } = useStudentResearchAPI()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [pdfLinks, setPdfLinks] = useState({})
  const [imageLinks, setImageLinks] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const filteredResearch = useMemo(() => {
    return researchItems.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.author?.toLowerCase().includes(search.toLowerCase()) ||
        item.summary?.toLowerCase().includes(search.toLowerCase())

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
  }, [researchItems, search, statusFilter])

  useEffect(() => {
    const loadFileUrls = async () => {
      const pdfUrls = {}
      const imgUrls = {}

      await Promise.all(
        researchItems.map(async (item) => {
          if (item.pdfKey && !item.pdfUrl) {
            const url = await getResearchPdfUrl(item.pdfKey)
            if (url) {
              pdfUrls[item.id] = url
            }
          }
          if (item.imageKey && !item.imageUrl) {
            const url = await getResearchImageUrl(item.imageKey)
            if (url) {
              imgUrls[item.id] = url
            }
          }
        })
      )

      setPdfLinks(pdfUrls)
      setImageLinks(imgUrls)
    }

    loadFileUrls()
  }, [researchItems])

  const handleDeleteClick = (id) => {
    setSelectedId(id)
    setShowModal(true)
  }

  const confirmDelete = () => {
    removeResearch(selectedId)
    setShowModal(false)
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1 className="text-4xl font-bold text-primary">Research Management</h1>
          <p className="text-gray-500 mt-2">
            Manage completed student research, attach PDFs, and keep the repository up to date.
          </p>
        </div>

        <Link to="/admin/research/create" className="btn-primary inline-flex items-center gap-2">
          <FaPlus /> Add Research
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search research by title, author, or summary..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-5 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-primary"
          >
            <option value="All">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-sm text-gray-500">Total research items</p>
            <p className="mt-3 text-3xl font-bold text-primary">{researchItems.length}</p>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        {filteredResearch.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-soft p-12 text-center">
            <p className="text-xl font-semibold text-primary mb-3">No research items found</p>
            <p className="text-gray-600">Adjust your search or filters to see more results.</p>
          </div>
        ) : (
          filteredResearch.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-soft overflow-hidden"
            >
              {(item.imageUrl || imageLinks[item.id]) && (
                <div className="w-full h-48 overflow-hidden bg-gray-100">
                  <img
                    src={item.imageUrl || imageLinks[item.id]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-gold font-semibold">
                      {item.researchType}
                    </p>
                    <h2 className="text-2xl font-bold text-primary mt-3">{item.title}</h2>
                    <p className="text-gray-500 mt-2">By {item.author}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary">
                    <FaFilePdf />
                    {item.status}
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed line-clamp-3">{item.summary}</p>

                <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-500">
                  <div>
                    <p className="font-semibold text-gray-700">Category</p>
                    <p>{item.researchCategory}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Completed</p>
                    <p>{new Date(item.submittedAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Tags</p>
                    <p>{item.tags?.join(', ') || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {(item.pdfUrl || pdfLinks[item.id]) && (
                      <a
                        href={item.pdfUrl || pdfLinks[item.id]}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-2 text-sm text-secondary transition hover:bg-secondary/10"
                      >
                        <FaFilePdf />
                        {item.pdfFileName || 'View PDF'}
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      to={`/admin/research/${item.id}`}
                      className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-white hover:bg-primaryDark transition"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(item.id)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-red-200 px-5 py-3 text-red-600 hover:bg-red-50 transition"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </div>

      <SecretKeyModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

export default ResearchListPage
