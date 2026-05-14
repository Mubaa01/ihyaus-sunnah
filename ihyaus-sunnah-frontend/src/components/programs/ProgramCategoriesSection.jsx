import { motion } from "framer-motion";
import {
  FaPlay,
  FaUsers,
  FaClock,
  FaStar,
  FaBookOpen,
} from "react-icons/fa";

const ProgramCategoriesSection = ({ program }) => {
  if (!program?.categories?.length) return null;

  return (
    <section className="relative py-28 bg-[#f8f4ee] overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />

        {/* Islamic Pattern */}
        <div className="absolute top-0 left-0 opacity-[0.03]">
          <img
            src="/patterns/islamic-pattern.svg"
            alt=""
            className="w-[350px]"
          />
        </div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-6">
            <FaBookOpen />
            Program Levels
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-primary leading-tight tracking-tight">
            Structured Learning Categories
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-muted leading-relaxed">
            Our curriculum is carefully designed to guide students through a
            progressive journey from foundational understanding to advanced
            mastery.
          </p>
        </motion.div>

        {/* Timeline Wrapper */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-gold/20 via-secondary/30 to-gold/20 -translate-x-1/2" />

          <div className="space-y-24">
            {program.categories.map((category, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col gap-10 lg:gap-16 items-center ${
                    isEven
                      ? "lg:flex-row"
                      : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Step */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-secondary text-white flex items-center justify-center text-2xl font-bold shadow-xl border-[6px] border-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-sm font-bold uppercase tracking-wider text-secondary">
                        {category.categoryType || "Level"}
                      </p>
                    </div>
                  </div>

                  {/* LEFT CONTENT */}
                  <div className="w-full lg:w-1/2 lg:mx-10">
                    <div className="relative group bg-white/90 backdrop-blur-xl border border-white/50 rounded-[32px] shadow-[0_10px_60px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_80px_rgba(0,0,0,0.10)] transition-all duration-500 overflow-hidden">
                      
                      {/* Hover Accent */}
                      <div className="absolute left-0 top-0 h-full w-1 bg-secondary scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

                      {/* Glow */}
                      <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />

                      <div className="relative z-10 p-8 md:p-10">
                        {/* Pills */}
                        <div className="flex flex-wrap gap-3 mb-6">
                          <span className="px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold">
                            {category.totalClasses} Classes
                          </span>

                          {category.categoryType && (
                            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                              {category.categoryType}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
                          {category.title}
                        </h3>

                        {/* Arabic */}
                        {category.titleArabic && (
                          <p
                            dir="rtl"
                            className="mt-3 text-2xl text-gold font-arabic leading-loose"
                          >
                            {category.titleArabic}
                          </p>
                        )}

                        {/* Age */}
                        <p className="mt-3 text-secondary font-medium">
                          {category.ageRange}
                        </p>

                        {/* Description */}
                        <p className="mt-6 text-muted leading-relaxed text-[15px]">
                          {category.description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-8">
                          <div className="rounded-2xl border border-gray-100 bg-[#faf8f4] p-4">
                            <div className="flex items-center gap-2 text-secondary mb-1">
                              <FaUsers />
                              <span className="text-sm font-semibold">
                                Students
                              </span>
                            </div>

                            <p className="text-xl font-bold text-primary">
                              500+
                            </p>
                          </div>

                          <div className="rounded-2xl border border-gray-100 bg-[#faf8f4] p-4">
                            <div className="flex items-center gap-2 text-secondary mb-1">
                              <FaClock />
                              <span className="text-sm font-semibold">
                                Duration
                              </span>
                            </div>

                            <p className="text-xl font-bold text-primary">
                              Ongoing
                            </p>
                          </div>

                          <div className="rounded-2xl border border-gray-100 bg-[#faf8f4] p-4">
                            <div className="flex items-center gap-2 text-secondary mb-1">
                              <FaStar />
                              <span className="text-sm font-semibold">
                                Rating
                              </span>
                            </div>

                            <p className="text-xl font-bold text-primary">
                              4.9/5
                            </p>
                          </div>
                        </div>

                        {/* Outcomes */}
                     
                      </div>
                    </div>
                  </div>

                  {/* RIGHT MEDIA */}
                  <div className="w-full lg:w-1/2 lg:mx-10">
                    <div className="grid sm:grid-cols-2 gap-5">

                      {category.previewVideos
                        ?.slice(0, 2)
                        .map((video, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ y: -6 }}
                            className="relative overflow-hidden rounded-[24px] group shadow-lg"
                          >
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-[220px] object-cover group-hover:scale-110 transition duration-700"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition duration-500" />

                            {/* Duration */}
                            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur text-white text-xs font-semibold">
                              {video.duration}
                            </div>

                            {/* Play */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center"
                              >
                                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center animate-pulse">
                                  <FaPlay className="text-white ml-1" />
                                </div>
                              </motion.div>
                            </div>

                            {/* Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                              <h4 className="text-white font-semibold text-sm leading-snug">
                                {video.title}
                              </h4>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                       {category.outcomes && (


                          <div className="mt-8">
                            <h4 className="text-primary font-bold mb-4">
                              Learning Outcomes
                            </h4>

                            <div className="grid sm:grid-cols-2 gap-3">
                              {category.outcomes
                                .slice(0, 4)
                                .map((outcome, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start gap-3"
                                  >
                                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />

                                    <p className="text-sm text-muted">
                                      {outcome}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-28"
        >
          <div className="bg-white rounded-[32px] p-8 md:p-10 border border-gray-100 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-3xl font-bold text-primary">
                Progress with Purpose
              </h3>

              <p className="text-muted mt-3 max-w-2xl">
                Each level is intentionally designed to build upon previous
                knowledge and guide students toward meaningful mastery.
              </p>
            </div>

            <button className="px-8 py-4 rounded-2xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all duration-300 hover:-translate-y-1 shadow-lg">
              View Full Curriculum
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramCategoriesSection;