import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  FaArrowLeft,
  FaBookOpen,
  FaCalendarAlt,
  FaClock,
  FaGraduationCap,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaStar,
  FaUserGraduate,
} from "react-icons/fa"
import QuranVersePanel from "../common/QuranVersePanel"

const fallbackHeroImage =
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000&auto=format&fit=crop"

const defaultProgramVerse = {
  arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
  translation: "Read in the name of your Lord who created.",
  reference: "Surah Al-Alaq 96:1",
}

const categoryThemes = {
  tahfeez: {
    eyebrow: "Qur'an Memorization",
    accent: "text-emerald-200",
    ring: "border-emerald-200/35",
    glow: "from-emerald-300/25",
    dot: "bg-emerald-200",
    overlay: "from-primaryDark/95 via-primary/82 to-emerald-950/48",
  },
  islamiyyah: {
    eyebrow: "Islamic Studies",
    accent: "text-goldSoft",
    ring: "border-goldSoft/35",
    glow: "from-goldSoft/25",
    dot: "bg-goldSoft",
    overlay: "from-primaryDark/95 via-primary/80 to-gold/40",
  },
  "youth development": {
    eyebrow: "Youth Formation",
    accent: "text-sky-100",
    ring: "border-sky-100/35",
    glow: "from-sky-200/25",
    dot: "bg-sky-100",
    overlay: "from-primaryDark/94 via-primary/78 to-sky-950/52",
  },
  majlis: {
    eyebrow: "Public Learning",
    accent: "text-amber-100",
    ring: "border-amber-100/35",
    glow: "from-amber-200/25",
    dot: "bg-amber-100",
    overlay: "from-primaryDark/95 via-primary/82 to-neutral-900/55",
  },
  "western education": {
    eyebrow: "Academic Excellence",
    accent: "text-cyan-100",
    ring: "border-cyan-100/35",
    glow: "from-cyan-200/25",
    dot: "bg-cyan-100",
    overlay: "from-primaryDark/94 via-primary/78 to-cyan-950/50",
  },
}

const fallbackTheme = {
  eyebrow: "Educational Program",
  accent: "text-secondary-light",
  ring: "border-white/25",
  glow: "from-secondary-light/20",
  dot: "bg-secondary-light",
  overlay: "from-primaryDark/95 via-primary/82 to-black/48",
}

const ctaByStatus = {
  active: {
    primary: "Enroll / Register",
    secondary: "Ask a Question",
  },
  upcoming: {
    primary: "Join Waitlist",
    secondary: "Ask About Start Date",
  },
  completed: {
    primary: "Contact Admin",
    secondary: "View Other Programs",
  },
}

const ProgramHeroSection = ({ program }) => {
  const title = program.title || "Educational Program"
  const categoryKey = String(program.category || "").trim().toLowerCase()
  const theme = categoryThemes[categoryKey] || fallbackTheme
  const programSummary =
    program.tagline ||
    program.shortDescription ||
    "Structured learning, mentorship, and character development."
  const enrollSubject = encodeURIComponent(`Program enquiry: ${title}`)
  const sourceVerse = program.verse || defaultProgramVerse
  const cta = ctaByStatus[program.status] || ctaByStatus.active
  const verse = {
    ...sourceVerse,
    reference: sourceVerse.reference?.includes("Surah")
      ? sourceVerse.reference
      : sourceVerse.reference
        ? `Qur'an ${sourceVerse.reference}`
        : defaultProgramVerse.reference,
  }
  const heroImage = program.heroImage || program.banner || program.thumbnail || fallbackHeroImage
  const categoryCount = program.categories?.length || 0
  const featurePreview = program.features?.filter(Boolean).slice(0, 3) || []
  const heroFacts = [
    {
      icon: <FaLayerGroup />,
      label: "Category",
      value: program.category || "Program",
    },
    {
      icon: <FaStar />,
      label: "Status",
      value: program.status || "Open",
      className: "capitalize",
    },
    program.duration && {
      icon: <FaClock />,
      label: "Duration",
      value: program.duration,
    },
    program.location && {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: program.location,
    },
    categoryCount > 0 && {
      icon: <FaGraduationCap />,
      label: "Levels",
      value: `${categoryCount} learning path${categoryCount === 1 ? "" : "s"}`,
    },
    program.stats?.totalStudents > 0 && {
      icon: <FaUserGraduate />,
      label: "Students",
      value: `${program.stats.totalStudents}+ enrolled`,
    },
  ].filter(Boolean).slice(0, 6)

  return (
    <section
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-primaryDark"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${theme.overlay}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_26%,rgba(254,243,199,0.16),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(109,184,162,0.13),transparent_32%)]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-white via-white/70 to-transparent" />

      <div className="container-custom relative z-10 py-24 text-white md:py-32">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            to="/programs"
            className={`inline-flex items-center gap-2 rounded-lg border ${theme.ring} bg-white/10 px-4 py-2 text-sm font-semibold ${theme.accent} backdrop-blur-md transition duration-300 hover:bg-white/15 hover:text-white`}
          >
            <FaArrowLeft />
            Back to Programs
          </Link>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.72fr)]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`mb-6 inline-flex items-center gap-2 rounded-lg border ${theme.ring} bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.16em] ${theme.accent} backdrop-blur-md`}
            >
              <FaBookOpen size={16} />
              {theme.eyebrow}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mb-6 max-w-5xl text-4xl font-bold leading-[1.08] text-white sm:text-5xl md:text-6xl xl:text-7xl"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 max-w-3xl text-lg leading-relaxed text-gray-100 md:text-xl"
            >
              {programSummary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="mb-9 grid max-w-4xl gap-3 sm:grid-cols-2 xl:grid-cols-3"
            >
              {heroFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-lg border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md"
                >
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-300">
                    <span className={theme.accent}>{fact.icon}</span>
                    {fact.label}
                  </p>
                  <p className={`mt-1 truncate text-base font-bold text-white ${fact.className || ""}`}>
                    {fact.value}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-wrap gap-4"
            >
              <a href={`mailto:info@ihyaussunnah.org?subject=${enrollSubject}`}>
                <button className="btn-primary px-8 py-4 text-base md:text-lg">
                  {cta.primary}
                </button>
              </a>

              {program.status === "completed" ? (
                <Link to="/programs">
                  <button className="btn-outline-light px-8 py-4 text-base md:text-lg">
                    {cta.secondary}
                  </button>
                </Link>
              ) : (
                <a href={`mailto:info@ihyaussunnah.org?subject=${enrollSubject}`}>
                  <button className="btn-outline-light px-8 py-4 text-base md:text-lg">
                    {cta.secondary}
                  </button>
                </a>
              )}
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <div className={`absolute -inset-8 rounded-full bg-gradient-to-br ${theme.glow} to-transparent blur-3xl`} />
            <div className="relative overflow-hidden rounded-lg border border-white/20 bg-white/10 p-5 shadow-premium backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={heroImage}
                  alt={`${title} program`}
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
                {program.schedule && (
                  <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/15 bg-black/40 p-4 backdrop-blur-md">
                    <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-gray-200">
                      <FaCalendarAlt className={theme.accent} />
                      Schedule
                    </p>
                    <p className="text-lg font-bold text-white">
                      {program.schedule.days || "Scheduled"} &bull; {program.schedule.time || "Time TBA"}
                    </p>
                  </div>
                )}
              </div>

              <QuranVersePanel {...verse} className="mt-5" compact />

              {featurePreview.length > 0 && (
                <div className="mt-5 grid gap-3">
                  {featurePreview.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/90"
                    >
                      <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${theme.dot}`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

export default ProgramHeroSection
