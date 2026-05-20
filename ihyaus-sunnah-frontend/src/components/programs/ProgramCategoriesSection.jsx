// 

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

        <div className="absolute top-0 left-0 opacity-[0.03]">
          <img src="/patterns/islamic-pattern.svg" alt="" className="w-[350px]" />
        </div>
      </div>

      <div className="container-custom relative z-10">
        {/* HEADER */}
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

          <h2 className="text-5xl md:text-6xl font-bold text-primary">
            Structured Learning Path
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-muted">
            Each program follows a clear progression: Basic → Intermediate → Advanced.
          </p>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-gold/20 via-secondary/30 to-gold/20 -translate-x-1/2" />

          <div className="space-y-24">
            {program.categories.map((category, index) => {
              const isEven = index % 2 === 0;

              // enforce ONLY 2 videos
              const videos = (category.previewVideos || []).slice(0, 2);

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col gap-10 lg:gap-16 items-center ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* STEP INDICATOR */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-secondary text-white flex items-center justify-center text-2xl font-bold shadow-xl border-[6px] border-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <p className="mt-4 text-sm font-bold uppercase text-secondary">
                      {category.categoryType || "Level"}
                    </p>
                  </div>

                  {/* LEFT CONTENT */}
                  <div className="w-full lg:w-1/2 lg:mx-10">
                    <div className="relative bg-white/90 backdrop-blur-xl rounded-[32px] shadow-lg overflow-hidden p-8 md:p-10">

                      {/* BADGES */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        <span className="px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold">
                          {category.totalClasses || 0} Classes
                        </span>

                        <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                          {category.categoryType}
                        </span>
                      </div>

                      {/* TITLE */}
                      <h3 className="text-3xl md:text-4xl font-bold text-primary">
                        {category.title}
                      </h3>

                      {/* ARABIC */}
                      {category.titleArabic && (
                        <p dir="rtl" className="mt-3 text-2xl text-gold font-arabic">
                          {category.titleArabic}
                        </p>
                      )}

                      {/* AGE */}
                      <p className="mt-3 text-secondary font-medium">
                        {category.ageRange}
                      </p>

                      {/* DESCRIPTION */}
                      <p className="mt-6 text-muted">
                        {category.description}
                      </p>

                      {/* FIXED STATS (schema-safe fallback) */}
                      <div className="grid grid-cols-3 gap-4 mt-8">
                        <div className="p-4 rounded-2xl bg-[#faf8f4] border">
                          <p className="text-sm text-secondary flex items-center gap-2">
                            <FaUsers /> Students
                          </p>
                          <p className="text-xl font-bold">500+</p>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#faf8f4] border">
                          <p className="text-sm text-secondary flex items-center gap-2">
                            <FaClock /> Duration
                          </p>
                          <p className="text-xl font-bold">Ongoing</p>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#faf8f4] border">
                          <p className="text-sm text-secondary flex items-center gap-2">
                            <FaStar /> Rating
                          </p>
                          <p className="text-xl font-bold">4.9</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT MEDIA (STRICT 2 VIDEOS) */}
                  <div className="w-full lg:w-1/2 lg:mx-10">
                    <div className="grid sm:grid-cols-2 gap-5">
                      {videos.map((video, i) => (
                        <motion.div
                          key={i}
                          whileHover={{ y: -6 }}
                          className="relative overflow-hidden rounded-[24px] shadow-lg group"
                        >
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-[220px] object-cover group-hover:scale-110 transition duration-700"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 text-white text-xs rounded-full">
                            {video.duration}
                          </div>

                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                              <FaPlay className="text-white ml-1" />
                            </div>
                          </div>

                          <div className="absolute bottom-0 p-4 text-white">
                            <h4 className="text-sm font-semibold">
                              {video.title}
                            </h4>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* OUTCOMES */}
                    {category.outcomes?.length > 0 && (
                      <div className="mt-8">
                        <h4 className="font-bold text-primary mb-4">
                          Learning Outcomes
                        </h4>

                        <div className="space-y-2">
                          {category.outcomes.slice(0, 4).map((o, i) => (
                            <div key={i} className="flex gap-3">
                              <span className="w-2 h-2 mt-2 rounded-full bg-secondary" />
                              <p className="text-sm text-muted">{o}</p>
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
      </div>
    </section>
  );
};

export default ProgramCategoriesSection;