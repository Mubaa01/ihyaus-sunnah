import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaArrowLeft, FaBookOpen } from "react-icons/fa"

const fallbackHeroImage =
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000&auto=format&fit=crop"

const categoryThemes = {
  tahfeez: {
    eyebrow: "Qur'an Memorization",
    accent: "text-emerald-200",
    ring: "border-emerald-200/35",
    overlay: "from-primaryDark/95 via-primary/82 to-emerald-950/48",
  },
  islamiyyah: {
    eyebrow: "Islamic Studies",
    accent: "text-goldSoft",
    ring: "border-goldSoft/35",
    overlay: "from-primaryDark/95 via-primary/80 to-gold/40",
  },
  "youth development": {
    eyebrow: "Youth Formation",
    accent: "text-sky-100",
    ring: "border-sky-100/35",
    overlay: "from-primaryDark/94 via-primary/78 to-sky-950/52",
  },
  majlis: {
    eyebrow: "Public Learning",
    accent: "text-amber-100",
    ring: "border-amber-100/35",
    overlay: "from-primaryDark/95 via-primary/82 to-neutral-900/55",
  },
  "western education": {
    eyebrow: "Academic Excellence",
    accent: "text-cyan-100",
    ring: "border-cyan-100/35",
    overlay: "from-primaryDark/94 via-primary/78 to-cyan-950/50",
  },
}

const fallbackTheme = {
  eyebrow: "Educational Program",
  accent: "text-secondary-light",
  ring: "border-white/25",
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
  const heroImage = program.heroImage || program.banner || program.thumbnail || fallbackHeroImage
  const enrollSubject = encodeURIComponent(`Program enquiry: ${title}`)
  const cta = ctaByStatus[program.status] || ctaByStatus.active

  return (
    <section
      className="relative flex min-h-[52vh] items-center overflow-hidden bg-primaryDark"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${theme.overlay}`} />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/30 to-transparent" />

      <div className="container-custom relative z-10 py-16 text-white lg:py-20">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-7"
        >
          <Link
            to="/programs"
            className={`inline-flex items-center gap-2 rounded-lg border ${theme.ring} bg-white/10 px-3 py-2 text-sm font-semibold ${theme.accent} backdrop-blur-md transition duration-300 hover:bg-white/15 hover:text-white`}
          >
            <FaArrowLeft />
            Back to Programs
          </Link>
        </motion.div>

        <div className="max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className={`mb-5 inline-flex items-center gap-2 rounded-lg border ${theme.ring} bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${theme.accent} backdrop-blur-md`}
          >
            <FaBookOpen size={14} />
            {theme.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mb-5 max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="mb-7 max-w-2xl text-base leading-relaxed text-gray-100 md:text-lg"
          >
            {programSummary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85 }}
            className="flex flex-wrap gap-3"
          >
            <a href={`mailto:info@ihyaussunnah.org?subject=${enrollSubject}`}>
              <button className="btn-primary">
                {cta.primary}
              </button>
            </a>

            {program.status === "completed" ? (
              <Link to="/programs">
                <button className="btn-outline-light">
                  {cta.secondary}
                </button>
              </Link>
            ) : (
              <a href={`mailto:info@ihyaussunnah.org?subject=${enrollSubject}`}>
                <button className="btn-outline-light">
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
