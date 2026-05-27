import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaArrowLeft, FaBookOpen, FaCalendarAlt } from "react-icons/fa"
import QuranVersePanel from "../common/QuranVersePanel"

const fallbackHeroImage =
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000&auto=format&fit=crop"

const defaultProgramVerse = {
  arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
  translation: "Read in the name of your Lord who created.",
  reference: "Surah Al-Alaq 96:1",
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

  return (
    <section
      className="relative flex min-h-[86vh] items-center overflow-hidden"
      style={{
        backgroundImage: `url(${program.banner || program.thumbnail || program.heroImage || fallbackHeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/72 to-primary/45" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />

      <div className="container-custom relative z-10 py-20 text-white md:py-32">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-secondary-light transition duration-300 hover:text-goldSoft"
          >
            <FaArrowLeft />
            Back to Programs
          </Link>
        </motion.div>

        <div className="max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-secondary-light backdrop-blur-md"
          >
            <FaBookOpen size={16} />
            IHYAUS SUNNAH FOUNDATION
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10 max-w-3xl text-xl leading-relaxed text-gray-200 md:text-2xl"
          >
            {programSummary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mb-10 flex flex-wrap gap-4"
          >
            <div className="glass-card rounded-lg border border-white/20 px-5 py-3 backdrop-blur-md">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-300">
                Category
              </p>
              <p className="mt-1 text-lg font-bold">{program.category || "Program"}</p>
            </div>

            <div className="glass-card rounded-lg border border-white/20 px-5 py-3 backdrop-blur-md">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-300">
                Status
              </p>
              <p className="mt-1 text-lg font-bold capitalize">{program.status || "Open"}</p>
            </div>

            {program.schedule && (
              <div className="glass-card rounded-lg border border-white/20 px-5 py-3 backdrop-blur-md">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-gray-300">
                  <FaCalendarAlt /> Schedule
                </p>
                <p className="mt-1 text-lg font-bold">
                  {program.schedule.days || "Scheduled"} • {program.schedule.time || "Time TBA"}
                </p>
              </div>
            )}
          </motion.div>

          <QuranVersePanel {...verse} className="mb-10 max-w-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-wrap gap-5"
          >
            <a href={`mailto:info@ihyaussunnah.org?subject=${enrollSubject}`}>
              <button className="btn-primary px-8 py-4 text-lg">
                {cta.primary}
              </button>
            </a>

            {program.status === "completed" ? (
              <Link to="/programs">
                <button className="btn-outline px-8 py-4 text-lg">
                  {cta.secondary}
                </button>
              </Link>
            ) : (
              <a href={`mailto:info@ihyaussunnah.org?subject=${enrollSubject}`}>
                <button className="btn-outline px-8 py-4 text-lg">
                  {cta.secondary}
                </button>
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProgramHeroSection
