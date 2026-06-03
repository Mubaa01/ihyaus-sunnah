import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  FiArrowRight,
  FiCheckCircle,
  FiBookOpen,
  FiUsers,
  FiAward,
  FiHeart,
  FiFilter,
  FiSearch,
  FiRefreshCw,
} from "react-icons/fi"

import useProgramsAPI from "../../hooks/useProgramsAPI"
import ProgramCard from "../../components/programs/ProgramCard"
import QuranVersePanel from "../../components/common/QuranVersePanel"

const programsVerse = {
  arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
  translation: "Read in the name of your Lord who created.",
  reference: "Surah Al-Alaq 96:1",
}

const fallbackFeaturedImage =
  "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1600&auto=format&fit=crop"

const ProgramsPage = () => {
  const {
    programs,
    loading,
    error,
    featuredPrograms,
    activePrograms,
    categories: apiCategories,
    refreshPrograms,
  } = useProgramsAPI()
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState("all")
  const [level, setLevel] = useState("all")

  const getProgramLevels = (program) => [
    program.ageGroup,
    program.level,
    program.targetAge,
    program.audience,
    ...(program.categories || []).flatMap((item) => [
      item.ageRange,
      item.categoryType,
      item.title,
    ]),
  ].filter(Boolean)

  const categories = useMemo(
    () => ["all", ...(apiCategories?.length
      ? apiCategories
      : [...new Set(programs.map((program) => program.category).filter(Boolean))])],
    [apiCategories, programs]
  )

  const levels = useMemo(
    () => ["all", ...new Set(programs.flatMap(getProgramLevels))],
    [programs]
  )

  const filteredPrograms = useMemo(() => {
    const term = query.trim().toLowerCase()

    return programs.filter((program) => {
      const matchesCategory = category === "all" || program.category === category
      const matchesStatus = status === "all" || program.status === status
      const programLevels = getProgramLevels(program)
      const matchesLevel = level === "all" || programLevels.includes(level)
      const matchesQuery = !term || [
        program.title,
        program.shortDescription,
        program.fullDescription,
        program.category,
        program.status,
        ...programLevels,
        ...(program.features || []),
      ]
        .flat()
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))

      return matchesCategory && matchesStatus && matchesLevel && matchesQuery
    })
  }, [category, level, programs, query, status])

  const activeCount = activePrograms.length
  const featuredProgram = featuredPrograms[0] || programs[0]

  const stats = [
    {
      icon: <FiBookOpen />,
      value: programs.length,
      label: "Structured Programs",
    },
    {
      icon: <FiUsers />,
      value: activeCount,
      label: "Active Programs",
    },
    {
      icon: <FiAward />,
      value: categories.length > 1 ? categories.length - 1 : 0,
      label: "Program Categories",
    },
    {
      icon: <FiHeart />,
      value: featuredPrograms.length,
      label: "Featured Programs",
    },
  ]

  const featuredDescription = Array.isArray(featuredProgram?.fullDescription)
    ? featuredProgram.fullDescription[0]
    : featuredProgram?.fullDescription

  return (
    <div className="overflow-hidden bg-white">
      <section className="relative min-h-[50vh] lg:min-h-[65vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000&auto=format&fit=crop"
            alt="Students learning in a structured program"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-primary/70" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark to-transparent" />

       

        <div className="relative z-10 container-custom py-20 lg:py-28">
          <div className="max-w-5xl">
            {/* <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="uppercase tracking-[0.3em] text-goldSoft font-semibold mb-7"
            >
              Educational Programs & Community Development
            </motion.p> */}

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl xl:text-7xl font-heading font-bold text-white leading-[1.1] mb-8"
            >
              Programs That Build
              <span className="block text-yellow-400 mt-2">Knowledge & Society</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-lg md:text-2xl text-gray-200 leading-relaxed max-w-4xl mb-12"
            >
              Our programs are carefully structured to nurture authentic Islamic
              knowledge, academic excellence, leadership, discipline, community
              service, and moral development through education rooted in
              sincerity and purpose.
            </motion.p>

            <QuranVersePanel {...programsVerse} className="mb-12 max-w-4xl" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="flex flex-wrap gap-5"
            >
              <a href="#programs-grid" className="btn-primary flex items-center gap-3">
                Browse Programs
                <FiArrowRight />
              </a>

              <Link to="/donate">
                <button className="btn-outline-light">
                  Support Our Programs
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    

      <section id="programs-grid" className="relative overflow-hidden bg-cream py-24 md:py-28">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <p className="mb-4 font-semibold uppercase tracking-[0.25em] text-gold">
              Our Educational Structure
            </p>
            <h2 className="mb-7 text-4xl font-bold leading-tight text-primary md:text-6xl">
              Programs Designed for
              <span className="mt-2 block text-gold">Holistic Development</span>
            </h2>
            <p className="text-lg leading-relaxed text-muted">
              We combine Islamic education, academic learning, leadership
              development, public enlightenment, and social responsibility into
              one integrated mission.
            </p>
          </div>

          <div className="mb-12 rounded-lg border border-gray-100 bg-white p-4 shadow-soft md:p-5">
            <div className="grid gap-4 lg:grid-cols-[1fr_210px_170px_210px]">
              <label className="relative block">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search title, description, category, or highlight"
                  className="h-12 w-full rounded-lg border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white"
                />
              </label>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="h-12 rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-primary focus:bg-white"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === "all" ? "All Categories" : item}
                  </option>
                ))}
              </select>

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="h-12 rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm capitalize outline-none transition focus:border-primary focus:bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={level}
                onChange={(event) => setLevel(event.target.value)}
                className="h-12 rounded-lg border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-primary focus:bg-white"
              >
                {levels.map((item) => (
                  <option key={item} value={item}>
                    {item === "all" ? "All Ages / Levels" : item}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-muted">
              <FiFilter className="text-gold" />
              Showing {filteredPrograms.length} of {programs.length} program
              {programs.length === 1 ? "" : "s"}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              <div className="col-span-full text-center py-24 text-primary font-semibold">
                Loading programs...
              </div>
            ) : error ? (
              <div className="col-span-full rounded-lg border border-red-100 bg-red-50 p-10 text-center shadow-soft">
                <h3 className="text-2xl font-bold text-red-700">Programs could not load</h3>
                <p className="mx-auto mt-3 max-w-2xl text-red-600">
                  {error}
                </p>
                <button
                  type="button"
                  onClick={refreshPrograms}
                  className="btn-secondary mt-6 gap-2"
                >
                  <FiRefreshCw />
                  Retry
                </button>
              </div>
            ) : filteredPrograms.length === 0 ? (
              <div className="col-span-full rounded-lg border border-dashed border-primary/20 bg-white p-12 text-center shadow-soft">
                <FiSearch className="mx-auto mb-4 text-4xl text-primary" />
                <h3 className="text-2xl font-bold text-primary">
                  {programs.length ? "No matching programs" : "No programs available yet"}
                </h3>
                <p className="mt-2 text-gray-600">
                  {programs.length
                    ? "Try another search term or reset the category, status, and age/level filters."
                    : "Programs added from the admin dashboard will appear here automatically."}
                </p>
              </div>
            ) : (
              filteredPrograms.map((program, index) => (
                <ProgramCard
                  key={program._id || program.id || program.slug}
                  program={program}
                  index={index}
                  variant="showcase"
                />
              ))
            )}
          </div>
        </div>
      </section>

      {featuredProgram && (
        <section className="py-24 md:py-32 bg-white overflow-hidden">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src={featuredProgram.banner || featuredProgram.thumbnail || fallbackFeaturedImage}
                  alt={featuredProgram.title}
                  className="rounded-lg shadow-premium object-cover w-full aspect-[4/3]"
                />

                <div className="absolute -bottom-8 right-6 bg-white rounded-lg shadow-premium p-6 max-w-sm border border-gray-100">
                  <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                    {featuredProgram.title}
                  </h3>
                  <p className="text-muted leading-relaxed line-clamp-3">
                    {featuredProgram.shortDescription ||
                      "A structured program built for knowledge, character, and community benefit."}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <p className="uppercase tracking-[0.25em] text-gold font-semibold mb-4">
                  Featured Program
                </p>
                <h2 className="text-4xl md:text-6xl font-heading font-bold text-primary leading-tight mb-8">
                  Learning With
                  <span className="block text-gold mt-2">Structure & Care</span>
                </h2>
                <p className="text-lg text-muted leading-relaxed mb-10">
                  {featuredDescription ||
                    featuredProgram.shortDescription ||
                    "This featured program supports students with structured learning, mentorship, discipline, and meaningful educational growth."}
                </p>

                <div className="space-y-5 mb-12">
                  {(featuredProgram.features?.length
                    ? featuredProgram.features.slice(0, 4)
                    : [
                      "Structured learning system",
                      "Qualified teachers and mentors",
                      "Regular revision and supervision",
                      "Character and moral development",
                    ]
                  ).map((item) => (
                    <div key={item} className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <FiCheckCircle />
                      </div>
                      <p className="text-lg text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>

                {(featuredProgram.slug || featuredProgram._id || featuredProgram.id) && (
                  <Link to={`/programs/${featuredProgram.slug || featuredProgram._id || featuredProgram.id}`}>
                    <button className="btn-primary">View Featured Program</button>
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop"
            alt="Community development"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/90" />
        </div>

        <div className="relative z-10 container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <p className="uppercase tracking-[0.25em] text-goldSoft font-semibold mb-4">
              Community Development
            </p>
            <h2 className="text-4xl md:text-7xl font-heading font-bold text-white leading-tight mb-8">
              Education Beyond
              <span className="block text-yellow-400 mt-2">The Classroom</span>
            </h2>
            <p className="text-lg md:text-2xl text-gray-200 leading-relaxed mb-12">
              Through donations and community support, we assist orphans and
              vulnerable families, organize public lectures, and provide
              meaningful educational opportunities that transform society.
            </p>
            <Link to="/donate">
              <button className="btn-primary">Donate & Support</button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ProgramsPage
