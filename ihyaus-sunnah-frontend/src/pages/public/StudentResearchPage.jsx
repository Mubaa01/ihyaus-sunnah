import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  FiBookOpen,
  FiDownload,
  FiEye,
  FiExternalLink,
  FiFileText,
  FiFilter,
  FiRefreshCw,
  FiSearch,
  FiUsers,
} from "react-icons/fi"

import { researchAPI } from "../../services/api"
import useStudentResearchAPI from "../../hooks/useStudentResearchAPI"
import QuranVersePanel from "../../components/common/QuranVersePanel"
import {
  getResearchStatusLabel,
  researchCategories,
  researchStatusOptions,
  researchTypes,
} from "../../constants/researchOptions"
import { getResearchImageUrl, getResearchPdfUrl } from "../../utils/researchPdfStorage"

const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:4000/api")
  .trim()
  .replace(/\/+$/, "")
const API_ORIGIN = API_BASE_URL.replace(/\/api$/, "")

const resolveStoredPdfUrl = (url) => {
  if (!url) return ""
  if (url.startsWith("/api/")) return `${API_ORIGIN}${url}`
  if (url.startsWith("/")) return `${API_BASE_URL}${url}`
  return url
}

const isTelegramResolverUrl = (item) =>
  item?.provider === "telegram" ||
  item?.telegramFileId ||
  item?.pdfUrl?.includes("/telegram-url")

const getTelegramPdfProxyUrl = (item, { download = false } = {}) => {
  if (!isTelegramResolverUrl(item)) return ""

  const itemId = item.id || item._id
  if (!itemId) return ""

  const baseUrl = item.pdfUrl?.includes("/telegram-url")
    ? resolveStoredPdfUrl(item.pdfUrl).replace(/\/telegram-url$/, "/pdf")
    : `${API_BASE_URL}/research/${itemId}/pdf`

  return download ? `${baseUrl}?download=1` : baseUrl
}

const getPdfPreviewUrl = (url) => {
  if (!url) return ""
  const separator = url.includes("#") ? "&" : "#"
  return `${url}${separator}page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH`
}

const ResearchCoverPreview = ({ imageSrc, pdfSrc, title, isResolving }) => {
  if (imageSrc) {
    return (
      <>
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(238,185,74,0.22),transparent_34%)]" />
      </>
    )
  }

  if (pdfSrc) {
    return (
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f332d,#f8faf8)]">
        <div className="absolute inset-y-5 left-1/2 w-[72%] -translate-x-1/2 overflow-hidden rounded-lg border border-white/70 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
          <iframe
            src={getPdfPreviewUrl(pdfSrc)}
            title={`${title} PDF cover`}
            className="h-[132%] w-full origin-top scale-[1.03] bg-white"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary shadow-sm">
          PDF Cover
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#163A33,#2F6F60)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(238,185,74,0.22),transparent_35%)]" />
      <div className="absolute inset-x-8 bottom-8 h-24 rounded-full bg-white/10 blur-2xl" />
      <div className="relative z-10 flex flex-col items-center gap-4 text-white">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
          {isResolving ? <FiRefreshCw className="animate-spin text-4xl" /> : <FiFileText className="text-5xl" />}
        </div>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/75">
          {isResolving ? "Preparing PDF" : "Research Document"}
        </span>
      </div>
    </div>
  )
}

const ResearchPdfReader = ({ document, onClose }) => {
  if (!document) return null

  return (
    <div className="fixed inset-0 z-[80] bg-black/75 p-3 backdrop-blur-sm md:p-6">
      <div className="mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex flex-col gap-4 border-b border-neutral-200 p-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">
              PDF Reader
            </p>
            <h3 className="truncate text-lg font-bold text-primary md:text-2xl">
              {document.title}
            </h3>
          </div>

          <div className="flex shrink-0 gap-3">
            <a
              href={document.downloadSrc}
              download={document.fileName}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-primary/20 px-4 text-sm font-semibold text-primary transition hover:bg-primary/5"
            >
              <FiDownload />
              Download
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:bg-secondary"
            >
              Close
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 bg-neutral-100">
          <iframe
            src={getPdfPreviewUrl(document.pdfSrc)}
            title={`${document.title} reader`}
            className="h-full w-full bg-white"
          />
        </div>
      </div>
    </div>
  )
}

const defaultFilters = {
  category: "",
  type: "",
  status: "published",
  search: "",
}

const researchVerse = {
  arabic: "قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",
  translation: "Say: Are those who know equal to those who do not know?",
  reference: "Surah Az-Zumar 39:9",
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
  const [telegramLinks, setTelegramLinks] = useState({})
  const [resolvingTelegramIds, setResolvingTelegramIds] = useState({})
  const [activePdf, setActivePdf] = useState(null)

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
      const telegramUrls = {}
      const resolvingIds = {}

      filteredResearch.forEach((item) => {
        if (isTelegramResolverUrl(item)) {
          resolvingIds[item.id || item._id] = true
        }
      })

      setResolvingTelegramIds(resolvingIds)

      await Promise.all(
        filteredResearch.map(async (item) => {
          const itemId = item.id || item._id

          if (isTelegramResolverUrl(item)) {
            try {
              const response = await researchAPI.getTelegramUrl(itemId)
              const resolvedUrl =
                response?.data?.url ||
                response?.url ||
                response?.data?.data?.url ||
                ""

              if (resolvedUrl) {
                telegramUrls[itemId] = resolvedUrl
              } else if (item.pdfUrl) {
                telegramUrls[itemId] = `${resolveStoredPdfUrl(item.pdfUrl)}?redirect=1`
              }
            } catch (error) {
              if (item.pdfUrl) {
                telegramUrls[itemId] = `${resolveStoredPdfUrl(item.pdfUrl)}?redirect=1`
              }
            }

            return
          }

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
      setTelegramLinks(telegramUrls)
      setResolvingTelegramIds({})
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
    <div className="bg-neutral-50 text-dark">
      <section className="relative min-h-[50vh] lg:min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/videos/reseach-hero.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,38,29,0.98),rgba(7,38,29,0.86),rgba(7,38,29,0.54))]" />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="container-custom relative z-10 flex min-h-[50vh] lg:min-h-[60vh] items-center py-20 lg:py-28 text-white">
          <div className="grid w-full gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* <span className="mb-5 inline-flex items-center gap-2 border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-goldSoft backdrop-blur">
                <FiBookOpen />
                Student Research
              </span> */}

              <h1 className="max-w-5xl text-4xl font-heading font-bold leading-tight md:text-6xl">
                Research & Academic Projects
                <span className="mt-4 block font-arabic text-yellow-400" dir="rtl">
                  بحوث الطلاب العلمية
                </span>
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-gray-200 md:text-lg">
                A curated library of Arabic student research across Qur'an, Hadith,
                Fiqh, Arabic language, education, da'wah, family, and community studies.
              </p>

              <QuranVersePanel {...researchVerse} className="mt-8 max-w-3xl" />
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
                const itemId = item.id || item._id
                const imageSrc = item.imageUrl || imageLinks[itemId]
                const pdfUrl = isTelegramResolverUrl(item)
                  ? ""
                  : resolveStoredPdfUrl(item.pdfUrl)
                const pdfSrc =
                  getTelegramPdfProxyUrl(item) ||
                  telegramLinks[itemId] ||
                  pdfUrl ||
                  pdfLinks[itemId] ||
                  ""
                const downloadSrc =
                  getTelegramPdfProxyUrl(item, { download: true }) ||
                  pdfSrc
                const isResolvingPdf =
                  isTelegramResolverUrl(item) &&
                  resolvingTelegramIds[itemId] &&
                  !pdfSrc
                const pdfFileName =
                  item.pdfFileName ||
                  `${item.title?.replace(/\s+/g, "-") || "research"}.pdf`
                const isTelegramNonPdf =
                  item.provider === "telegram" &&
                  item.telegramMimeType &&
                  item.telegramMimeType !== "application/pdf"

                // =========================================
                // PREMIUM RESEARCH CARD (UPGRADED)
                // =========================================
                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(index * 0.03, 0.18),
                    }}
                    className="
                      group relative flex min-h-[520px] flex-col overflow-hidden
                      rounded-2xl border border-neutral-200/70
                      bg-white
                      shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                      transition-all duration-500
                      hover:-translate-y-2
                      hover:border-primary/20
                      hover:shadow-[0_25px_70px_rgba(0,0,0,0.12)]
                    "
                  >
                    {/* TOP IMAGE */}
                    <div className="relative h-72 overflow-hidden bg-neutral-100">
                      <ResearchCoverPreview
                        imageSrc={imageSrc}
                        pdfSrc={pdfSrc}
                        title={item.title}
                        isResolving={isResolvingPdf}
                      />

                      {/* STATUS */}
                      <div className="absolute right-5 top-5">
                        <span
                          className="
                            inline-flex items-center gap-2
                            rounded-full
                            border border-white/20
                            bg-white/90
                            px-4 py-2
                            text-[11px] font-bold uppercase tracking-[0.14em]
                            text-primary
                            backdrop-blur-md
                          "
                        >
                          {getResearchStatusLabel(item.status)}
                        </span>
                      </div>

                      {/* CATEGORY */}
                      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                        <span
                          className="
                            max-w-[72%] rounded-full
                            bg-black/50
                            px-4 py-2
                            font-arabic text-sm font-semibold
                            text-white
                            backdrop-blur-sm
                            truncate
                          "
                          dir="rtl"
                        >
                          {item.researchCategory}
                        </span>
                        <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
                          {pdfSrc ? "PDF Ready" : "Metadata"}
                        </span>
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-1 flex-col p-6">
                      {/* TYPE */}
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span
                          className="
                            inline-flex items-center gap-2
                            text-[11px] font-bold uppercase
                            tracking-[0.16em]
                            text-secondary
                          "
                        >
                          <span className="h-2 w-2 rounded-full bg-secondary" />
                          {item.researchType}
                        </span>

                        <span className="text-xs text-gray-400">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>

                      {/* TITLE */}
                      <h3
                        className="
                          text-[1.35rem] font-bold leading-tight tracking-tight
                          text-primary
                          transition duration-300
                          group-hover:text-secondary
                        "
                        dir="auto"
                      >
                        {item.title}
                      </h3>

                      {/* AUTHOR */}
                      {item.staffId?._id ? (
                        <Link
                          to={`/staff/profile/${item.staffId._id}`}
                          className="
                            mt-5 flex items-center gap-4
                            rounded-2xl border border-neutral-200
                            bg-neutral-50/80
                            p-4
                            transition duration-300
                            hover:border-primary/20
                            hover:bg-primary/[0.03]
                          "
                        >
                          <div className="relative">
                            <img
                              src={item.staffId.image}
                              alt={item.staffId.name}
                              className="
                                h-14 w-14 rounded-full
                                object-cover
                                ring-2 ring-white
                                shadow-md
                              "
                            />

                            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-secondary" />
                          </div>

                          <div className="min-w-0">
                            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                              Conducted by
                            </span>

                            <span className="block truncate text-base font-bold text-primary">
                              {item.staffId.name}
                            </span>
                          </div>
                        </Link>
                      ) : (
                        <div className="mt-5 flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <FiUsers />
                          </div>

                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                              Author
                            </p>

                            <p className="font-semibold text-primary">
                              {item.author}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* SUMMARY */}
                      <p
                        className="
                          mt-6 flex-1
                          text-[14px] leading-7
                          text-gray-600
                          line-clamp-4
                        "
                        dir="auto"
                      >
                        {item.summary}
                      </p>

                      {/* TAGS */}
                      {(item.tags || []).length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {(item.tags || []).slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="
                                rounded-full
                                border border-neutral-200
                                bg-neutral-50
                                px-3 py-1.5
                                font-arabic text-xs font-semibold
                                text-gray-600
                                transition duration-300
                                hover:border-secondary/30
                                hover:bg-secondary/5
                                hover:text-secondary
                              "
                              dir="rtl"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* FOOTER */}
                      <div className="mt-7 flex flex-col gap-5 border-t border-neutral-100 pt-5">
                        {/* META */}
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 text-primary">
                            <FiBookOpen />
                          </div>

                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                              Research Archive
                            </p>

                            <p className="text-sm font-semibold text-primary">
                              Academic Publication
                            </p>
                          </div>
                        </div>

                                {/* ACTION */}
                        {pdfSrc ? (
                          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_auto]">
                            <button
                              type="button"
                              onClick={() =>
                                setActivePdf({
                                  title: item.title,
                                  pdfSrc,
                                  downloadSrc,
                                  fileName: pdfFileName,
                                })
                              }
                              className="
                                group/button relative inline-flex min-h-12 items-center justify-center gap-3
                                overflow-hidden
                                rounded-2xl
                                bg-primary
                                px-5 py-3
                                text-sm font-semibold text-white
                                shadow-lg shadow-primary/20
                                transition-all duration-300
                                hover:-translate-y-0.5
                                hover:bg-secondary
                                hover:shadow-xl hover:shadow-secondary/20
                              "
                            >
                              <span className="relative z-10 flex items-center gap-2">
                                {isTelegramNonPdf ? <FiExternalLink /> : <FiEye />}
                                {isTelegramNonPdf ? "Open Document" : "Read PDF"}
                              </span>

                              <div
                                className="
                                  absolute inset-0
                                  translate-y-full
                                  bg-white/10
                                  transition duration-500
                                  group-hover/button:translate-y-0
                                "
                              />
                            </button>

                            <a
                              href={downloadSrc}
                              download={pdfFileName}
                              className="
                                inline-flex min-h-12 items-center justify-center gap-2
                                rounded-2xl
                                border border-primary/20
                                bg-white
                                px-5 py-3
                                text-sm font-semibold text-primary
                                transition duration-300
                                hover:bg-primary/5
                              "
                            >
                              <FiDownload />
                              Download
                            </a>
                          </div>
                        ) : isResolvingPdf ? (
                          <span
                            className="
                              inline-flex items-center gap-2
                              rounded-2xl
                              bg-primary/10
                              px-5 py-3
                              text-sm font-semibold text-primary
                            "
                          >
                            <FiRefreshCw className="animate-spin" />
                            Preparing PDF
                          </span>
                        ) : (
                          <span
                            className="
                              inline-flex items-center gap-2
                              rounded-2xl
                              bg-neutral-100
                              px-5 py-3
                              text-sm font-semibold text-gray-500
                            "
                          >
                            <FiBookOpen />
                            No PDF
                          </span>
                        )}
                      </div>
                    </div>

                    {/* HOVER GLOW */}
                    <div
                      className="
                        pointer-events-none absolute inset-0
                        opacity-0 transition duration-500
                        group-hover:opacity-100
                      "
                    >
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    </div>
                  </motion.article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <ResearchPdfReader
        document={activePdf}
        onClose={() => setActivePdf(null)}
      />
    </div>
  )
}

export default StudentResearchPage
