import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FaArrowLeft } from "react-icons/fa"
import QuranVersePanel from "../common/QuranVersePanel"

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
  const programVerse =
    program.verse || {
      arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
      translation: "And say: My Lord, increase me in knowledge.",
      reference: "Surah Taha 20:114",
    }

  return (
    <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-primaryDark lg:min-h-[60vh]">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_22%),linear-gradient(to_right,rgba(7,31,24,0.92),rgba(7,31,24,0.72),rgba(7,31,24,0.58))]" />
    

      <div className="container-custom relative z-10 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-7"
          >
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md transition duration-300 hover:bg-white/12 hover:text-white"
            >
              <FaArrowLeft />
              Back to Programs
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mb-5 max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="mb-7 max-w-3xl text-base leading-relaxed text-gray-200 md:text-xl"
          >
            {programSummary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="max-w-3xl"
          >
            <QuranVersePanel
              arabic={programVerse.arabic}
              translation={programVerse.translation}
              reference={programVerse.reference}
              compact
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProgramHeroSection
