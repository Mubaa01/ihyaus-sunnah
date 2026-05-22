import { motion } from "framer-motion"

const QuranVersePanel = ({ arabic, translation, reference, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.25 }}
    className={`border-l-4 border-gold bg-white/10 px-5 py-4 text-white shadow-soft backdrop-blur-md md:px-6 ${className}`}
  >
    <p className="font-arabic text-2xl leading-loose text-goldSoft md:text-3xl" dir="rtl">
      {arabic}
    </p>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-white/85 md:text-base">
      {translation}
    </p>
    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
      {reference}
    </p>
  </motion.div>
)

export default QuranVersePanel
