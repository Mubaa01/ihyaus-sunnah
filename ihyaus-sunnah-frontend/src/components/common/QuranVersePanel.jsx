import { motion } from "framer-motion"

const QuranVersePanel = ({
  arabic,
  translation,
  reference,
  className = "",
  compact = false,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.25 }}
    className={`border-l-4 border-yellow-200 bg-white/10 text-white shadow-soft backdrop-blur-md ${compact ? "px-4 py-4" : "px-5 py-4 md:px-6"} ${className}`}
  >
    <p
      className={`font-arabic leading-loose text-yellow-200 ${compact ? "text-xl" : "text-2xl md:text-3xl"}`}
      dir="rtl"
    >
      {arabic}
    </p>
    <p className={`mt-3 max-w-3xl leading-7 text-white/85 ${compact ? "text-sm" : "text-sm md:text-base"}`}>
      {translation}
    </p>
    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-yellow-200">
      {reference}
    </p>
  </motion.div>
)

export default QuranVersePanel
