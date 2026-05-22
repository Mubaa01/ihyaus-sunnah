import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  FiBookOpen,
  FiDownload,
  FiFileText,
  FiFilter,
  FiRefreshCw,
  FiSearch,
  FiUsers,
} from "react-icons/fi"

import useStudentResearchAPI from "../../hooks/useStudentResearchAPI"
import {
  getResearchStatusLabel,
  researchCategories,
  researchStatusOptions,
  researchTypes,
} from "../../constants/researchOptions"
import { getResearchImageUrl, getResearchPdfUrl } from "../../utils/researchPdfStorage"

const defaultFilters = {
  category: "",
  type: "",
  status: "published",
  search: "",
}

const matchesText = (item, search) => {
  const term = search.trim().toLowerCase()
  if (!term) return true

  return [item.title, item.author, item.summary, ...(item.tags || [])]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(term))
}

const formatDate = (date) => {
  if (!date) return "غير محدد"

  return new Intl.DateTimeFormat("ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

const StudentResearchPage = () => {
  const [filters, setFilters] = useState(defaultFilters)
  const [pdfLinks, setPdfLinks] = useState({})
  const [imageLinks, setImageLinks] = useState({})

  const { research, loading, error } = useStudentResearchAPI()

  const filteredResearch = useMemo(() => {
    return research.filter((item) => {
      const matchesCategory = !filters.category || item.researchCategory === filters.category
      const matchesType = !filters.type || item.researchType === filters.type
      const matchesStatus = !filters.status || item.status === filters.status

      return matchesCategory && matchesType && matchesStatus && matchesText(item, filters.search)
    })
  }, [filters, research])

  const authorsCount = useMemo(
    () => new Set(filteredResearch.map((item) => item.author).filter(Boolean)).size,
    [filteredResearch]
  )

  const availablePdfCount = useMemo(
    () => filteredResearch.filter((item) => item.pdfUrl || item.pdfKey).length,
    [filteredResearch]
  )

  useEffect(() => {
    const loadFileLinks = async () => {
      const pdfUrls = {}
      const imgUrls = {}

      await Promise.all(
        filteredResearch.map(async (item) => {
          if (item.pdfKey && !item.pdfUrl) {
            const url = await getResearchPdfUrl(item.pdfKey)
            if (url) pdfUrls[item.id] = url
          }

          if (item.imageKey && !item.imageUrl) {
            const url = await getResearchImageUrl(item.imageKey)
            if (url) imgUrls[item.id] = url
          }
        })
      )

      setPdfLinks(pdfUrls)
      setImageLinks(imgUrls)
    }

    loadFileLinks()
  }, [filteredResearch])

  const handleChange = (field) => (event) => {
    setFilters((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const setCategory = (category) => {
    setFilters((prev) => ({
      ...prev,
      category,
    }))
  }

  const resetFilters = () => setFilters(defaultFilters)

  return (
    <div className="bg-[#f7f4ef] text-dark">
      <section className="relative min-h-[72vh] overflow-hidden bg-primary">
        <img
          src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2000&auto=format&fit=crop"
          alt="Arabic research library"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,38,29,0.98),rgba(7,38,29,0.86),rgba(7,38,29,0.54))]" />

        <div className="container-custom relative z-10 flex min-h-[72vh] items-end py-16 text-white md:py-20">
          <div className="grid w-full gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="mb-5 inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-goldSoft backdrop-blur">
                <FiBookOpen />
                Student Research
              </span>

              <h1 className="max-w-5xl text-4xl font-heading font-bold leading-tight md:text-6xl">
                Research & Academic Projects
                <span className="mt-4 block font-arabic text-gold" dir="rtl">
                  بحوث الطلاب العلمية
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-gray-200 md:text-lg">
                A curated library of Arabic student research across Qur'an, Hadith,
                Fiqh, Arabic language, education, da'wah, family, and community studies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid grid-cols-3 border border-white/15 bg-black/20 backdrop-blur-md"
            >
              <div className="border-r border-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-300">Works</p>
                <p className="mt-2 text-3xl font-bold text-white">{filteredResearch.length}</p>
              </div>
              <div className="border-r border-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-300">Authors</p>
                <p className="mt-2 text-3xl font-bold text-white">{authorsCount}</p>
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-gray-300">PDFs</p>
                <p className="mt-2 text-3xl font-bold text-white">{availablePdfCount}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white">
        <div className="container-custom -mt-10 relative z-20 pb-6">
          <div className="border border-gray-200 bg-white p-4 shadow-soft md:p-5">
            <div className="grid gap-4 xl:grid-cols-[1fr_220px_220px_180px]">
              <label className="relative block">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={filters.search}
                  onChange={handleChange("search")}
                  placeholder="Search title, author, summary, or tags"
                  className="h-12 w-full border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white"
                />
              </label>

              <select
                value={filters.type}
                onChange={handleChange("type")}
                className="h-12 border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-primary focus:bg-white"
              >
                <option value="">All Types</option>
                {researchTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={filters.status}
                onChange={handleChange("status")}
                className="h-12 border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-primary focus:bg-white"
              >
                <option value="">All Status</option>
                {researchStatusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex h-12 items-center justify-center gap-2 border border-gray-200 bg-white px-4 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
              >
                <FiRefreshCw />
                Reset
              </button>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setCategory("")}
                className={`shrink-0 border px-4 py-2 text-sm font-semibold transition ${
                  filters.category === ""
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary"
                }`}
              >
                All Categories
              </button>
              {researchCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setCategory(category)}
                  dir="rtl"
                  className={`shrink-0 border px-4 py-2 font-arabic text-sm font-semibold transition ${
                    filters.category === category
                      ? "border-primary bg-primary text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding py-12 md:py-16">
        <div className="container-custom">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                <FiFilter />
                Research Library
              </span>
              <h2 className="text-3xl font-bold text-primary md:text-4xl">Browse student works</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-gray-600 md:text-right">
              Showing {filteredResearch.length} result{filteredResearch.length === 1 ? "" : "s"}
              {filters.category ? ` in ${filters.category}` : ""}.
            </p>
          </div>

          {loading && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="h-80 animate-pulse border border-gray-200 bg-white p-5">
                  <div className="mb-5 h-36 bg-gray-100" />
                  <div className="mb-3 h-4 w-24 bg-gray-100" />
                  <div className="mb-4 h-6 w-3/4 bg-gray-100" />
                  <div className="h-4 w-full bg-gray-100" />
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="border border-red-100 bg-red-50 p-10 text-center text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && filteredResearch.length === 0 && (
            <div className="border border-gray-200 bg-white p-12 text-center shadow-soft">
              <FiSearch className="mx-auto mb-4 text-3xl text-primary" />
              <p className="mb-3 text-xl font-semibold text-primary">No research items found</p>
              <p className="text-gray-600">Try widening your filters or search criteria.</p>
            </div>
          )}

          {!loading && !error && filteredResearch.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredResearch.map((item, index) => {
                const imageSrc = item.imageUrl || imageLinks[item.id]
                const pdfSrc = item.pdfUrl || pdfLinks[item.id]

                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.16) }}
                    className="group flex min-h-[460px] flex-col overflow-hidden border border-gray-200 bg-white shadow-card transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft"
                  >
                    <div className="relative h-44 overflow-hidden bg-primary/5">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[linear-gradient(135deg,#0B3D2E,#C9A646)]">
                          <FiFileText className="text-5xl text-white/85" />
                        </div>
                      )}
                      <span className="absolute left-4 top-4 bg-white px-3 py-1 text-xs font-bold text-primary shadow-card">
                        {getResearchStatusLabel(item.status)}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span className="font-arabic text-sm font-semibold text-gold" dir="rtl">
                          {item.researchCategory}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
                          {item.researchType}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold leading-snug text-primary" dir="auto">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm font-medium text-gray-500">By {item.author}</p>

                      <p className="mt-4 line-clamp-4 flex-1 text-sm leading-7 text-gray-600" dir="auto">
                        {item.summary}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {(item.tags || []).slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="border border-gray-200 bg-gray-50 px-3 py-1 font-arabic text-xs font-semibold text-gray-600"
                            dir="rtl"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
                        <div className="text-xs text-gray-500">
                          <p className="font-semibold text-gray-700">Added</p>
                          <p>{formatDate(item.createdAt)}</p>
                        </div>

                        {pdfSrc ? (
                          <a
                            href={pdfSrc}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primaryLight"
                          >
                            <FiDownload />
                            PDF
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-500">
                            <FiBookOpen />
                            No PDF
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default StudentResearchPage
