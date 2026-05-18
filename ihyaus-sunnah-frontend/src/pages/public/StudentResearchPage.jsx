import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useStudentResearchAPI from '../../hooks/useStudentResearchAPI'
import { getResearchPdfUrl, getResearchImageUrl } from '../../utils/researchPdfStorage'
import { FiSearch, FiBookOpen, FiUsers, FiTrendingUp } from 'react-icons/fi'

const StudentResearchPage = () => {
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    status: '',
    search: '',
  })

  const { research } = useStudentResearchAPI()
  const [pdfLinks, setPdfLinks] = useState({})
  const [imageLinks, setImageLinks] = useState({})

  useEffect(() => {
    const loadFileLinks = async () => {
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

    loadFileLinks()
  }, [researchItems])

  const handleChange = (field) => (event) => {
    setFilters((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  return (
    <div className="overflow-hidden bg-white">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop"
            alt="Student research"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-primary/70" />
        </div>

        <div className="container-custom relative z-10 py-32 text-white">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block uppercase tracking-[0.3em] text-goldSoft font-semibold mb-6"
          >
            Student Research
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-heading font-bold leading-tight max-w-4xl"
          >
            Research & Academic Projects
            <span className="block text-gold mt-3">
              by students of Ihyaus Sunnah Foundation
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl text-lg text-gray-200 leading-relaxed mt-8"
          >
            Explore scholarly works that reflect our commitment to Islamic knowledge,
            academic growth, and practical research rooted in Qur'anic and Sunnah studies.
          </motion.p>
        </div>
      </section>

      <section className="section-padding py-20 bg-cream">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1.4fr_2fr] gap-10">
            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-soft">
                <h2 className="text-3xl font-bold text-primary mb-3">Filter Research</h2>
                <p className="text-gray-600 leading-relaxed">
                  Narrow your search by category, project type, or publication status.
                </p>

                <div className="mt-8 grid gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select
                      value={filters.category}
                      onChange={handleChange('category')}
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                    <select
                      value={filters.type}
                      onChange={handleChange('type')}
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3"
                    >
                      <option value="">All Types</option>
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
                      value={filters.status}
                      onChange={handleChange('status')}
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3"
                    >
                      <option value="">All Status</option>
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
                    <div className="relative">
                      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={filters.search}
                        onChange={handleChange('search')}
                        placeholder="Search research titles, abstracts, or tags"
                        className="w-full rounded-2xl border border-gray-200 bg-white px-12 py-3"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-soft">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-2xl bg-primary/10 text-primary p-3">
                      <FiBookOpen />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Total research</p>
                      <p className="text-3xl font-bold text-primary">{researchItems.length}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">Relevant works matching your filters.</p>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-soft">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="rounded-2xl bg-gold/10 text-gold p-3">
                      <FiTrendingUp />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Student authors</p>
                      <p className="text-3xl font-bold text-primary">Active contributors</p>
                    </div>
                  </div>
                  <p className="text-gray-600">Showcasing research led by our student community.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {researchItems.length === 0 ? (
                <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-soft">
                  <p className="text-xl font-semibold text-primary mb-3">No research items found</p>
                  <p className="text-gray-600">Try widening your filters or search criteria.</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {researchItems.map((item) => (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-soft"
                    >
                      {(item.imageUrl || imageLinks[item.id]) && (
                        <div className="w-full h-40 overflow-hidden bg-gray-100">
                          <img
                            src={item.imageUrl || imageLinks[item.id]}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                          <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-gold font-semibold">{item.researchType}</p>
                            <h3 className="text-2xl font-bold text-primary mt-3">{item.title}</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Status</p>
                            <p className="font-semibold capitalize">{item.status}</p>
                          </div>
                        </div>

                        <p className="text-gray-700 leading-relaxed mb-6">{item.summary}</p>

                        <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-500">
                          <div>
                            <p className="font-semibold text-gray-700">Category</p>
                            <p>{item.researchCategory}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">Author</p>
                            <p>{item.author}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-700">Submitted</p>
                            <p>{new Date(item.submittedAt).toLocaleDateString()}</p>
                          </div>
                        </div>

                        {(item.pdfUrl || pdfLinks[item.id]) && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <a
                              href={item.pdfUrl || pdfLinks[item.id]}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-medium hover:bg-primary/20 transition"
                            >
                              <FiBookOpen />
                              {item.pdfFileName || 'View PDF Document'}
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StudentResearchPage
