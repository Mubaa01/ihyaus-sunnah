// // 

// import { motion } from "framer-motion";
// import {
//   FaPlay,
//   FaUsers,
//   FaClock,
//   FaStar,
//   FaBookOpen,
// } from "react-icons/fa";

// const fallbackCategoryImage =
//   "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=900&auto=format&fit=crop";

// const ProgramCategoriesSection = ({ program }) => {
//   if (!program?.categories?.length) return null;

//   return (
//     <section className="relative py-28 bg-neutral-50 overflow-hidden">
//       <div className="container-custom relative z-10">
//         {/* HEADER */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           viewport={{ once: true }}
//           className="text-center mb-24"
//         >
//           <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-6">
//             <FaBookOpen />
//             Program Levels
//           </div>

//           <h2 className="text-5xl md:text-6xl font-bold text-primary">
//             Structured Learning Path
//           </h2>

//           <p className="max-w-3xl mx-auto mt-6 text-lg text-muted">
//             Each program category gives students a clear path for learning, practice, and progress.
//           </p>
//         </motion.div>

//         {/* TIMELINE */}
//         <div className="relative">
//           <div className="hidden lg:block absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-gold/20 via-secondary/30 to-gold/20 -translate-x-1/2" />

//           <div className="space-y-24">
//             {program.categories.map((category, index) => {
//               const isEven = index % 2 === 0;

//               // enforce ONLY 2 videos
//               const videos = (category.previewVideos || []).slice(0, 2);

//               return (
//                 <motion.div
//                   key={category.id || category.title || index}
//                   initial={{ opacity: 0, y: 40 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.7, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className={`relative flex flex-col gap-10 lg:gap-16 items-center ${
//                     isEven ? "lg:flex-row" : "lg:flex-row-reverse"
//                   }`}
//                 >
//                   {/* STEP INDICATOR */}
//                   <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 flex-col items-center">
//                     <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-secondary text-white flex items-center justify-center text-2xl font-bold shadow-xl border-[6px] border-white">
//                       {String(index + 1).padStart(2, "0")}
//                     </div>

//                     <p className="mt-4 text-sm font-bold uppercase text-secondary">
//                       {category.categoryType || "Level"}
//                     </p>
//                   </div>

//                   {/* LEFT CONTENT */}
//                   <div className="w-full lg:w-1/2 lg:mx-10">
//                     <div className="relative bg-white/90 backdrop-blur-xl rounded-xl shadow-soft overflow-hidden p-8 md:p-10">

//                       {/* BADGES */}
//                       <div className="flex flex-wrap gap-3 mb-6">
//                         <span className="px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold">
//                           {category.totalClasses || 0} Classes
//                         </span>

//                         <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
//                           {category.categoryType}
//                         </span>
//                       </div>

//                       {/* TITLE */}
//                       <h3 className="text-3xl md:text-4xl font-bold text-primary">
//                         {category.title}
//                       </h3>

//                       {/* ARABIC */}
//                       {category.titleArabic && (
//                         <p dir="rtl" className="mt-3 text-2xl text-gold font-arabic">
//                           {category.titleArabic}
//                         </p>
//                       )}

//                       {/* AGE */}
//                       <p className="mt-3 text-secondary font-medium">
//                         {category.ageRange}
//                       </p>

//                       {/* DESCRIPTION */}
//                       <p className="mt-6 text-muted">
//                         {category.description}
//                       </p>

//                       {/* FIXED STATS (schema-safe fallback) */}
//                       <div className="grid grid-cols-3 gap-4 mt-8">
//                         <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
//                           <p className="text-sm text-secondary flex items-center gap-2">
//                             <FaUsers /> Students
//                           </p>
//                           <p className="text-xl font-bold">{category.studentCount || program.stats?.totalStudents || 'Open'}</p>
//                         </div>

//                         <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
//                           <p className="text-sm text-secondary flex items-center gap-2">
//                             <FaClock /> Duration
//                           </p>
//                           <p className="text-xl font-bold">{category.duration || program.duration || 'Ongoing'}</p>
//                         </div>

//                         <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
//                           <p className="text-sm text-secondary flex items-center gap-2">
//                             <FaStar /> Rating
//                           </p>
//                           <p className="text-xl font-bold">{category.rating || 'New'}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* RIGHT MEDIA (STRICT 2 VIDEOS) */}
//                   <div className="w-full lg:w-1/2 lg:mx-10">
//                     <div className="grid sm:grid-cols-2 gap-5">
//                       {videos.map((video, i) => (
//                         <motion.div
//                           key={i}
//                           whileHover={{ y: -6 }}
//                           className="relative overflow-hidden rounded-lg shadow-soft group"
//                         >
//                           <a
//                             href={video.url || undefined}
//                             target="_blank"
//                             rel="noreferrer"
//                             className={`block ${video.url ? "" : "pointer-events-none"}`}
//                           >
//                             <img
//                               src={video.thumbnail || fallbackCategoryImage}
//                               alt={video.title || `${category.title} preview`}
//                               className="w-full h-[220px] object-cover group-hover:scale-110 transition duration-700"
//                             />

//                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

//                             <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 text-white text-xs rounded-full">
//                               {video.duration || 'Preview'}
//                             </div>

//                             <div className="absolute inset-0 flex items-center justify-center">
//                               <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
//                                 <FaPlay className="text-white ml-1" />
//                               </div>
//                             </div>

//                             <div className="absolute bottom-0 p-4 text-white">
//                               <h4 className="text-sm font-semibold">
//                                 {video.title || `${category.title} preview`}
//                               </h4>
//                             </div>
//                           </a>
//                         </motion.div>
//                       ))}
//                     </div>

//                     {/* OUTCOMES */}
//                     {category.outcomes?.length > 0 && (
//                       <div className="mt-8">
//                         <h4 className="font-bold text-primary mb-4">
//                           Learning Outcomes
//                         </h4>

//                         <div className="space-y-2">
//                           {category.outcomes.slice(0, 4).map((o, i) => (
//                             <div key={i} className="flex gap-3">
//                               <span className="w-2 h-2 mt-2 rounded-full bg-secondary" />
//                               <p className="text-sm text-muted">{o}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProgramCategoriesSection;
import { motion } from "framer-motion";
import {
  FaPlay,
  FaUsers,
  FaClock,
  FaStar,
  FaBookOpen,
  FaCheckCircle,
} from "react-icons/fa";

const fallbackCategoryImage =
  "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=900&auto=format&fit=crop";

const ProgramCategoriesSection = ({ program }) => {
  if (!program?.categories?.length) return null;

  return (
    <section className="relative py-20 bg-neutral-50 overflow-hidden">
      <div className="container-custom max-w-7xl mx-auto px-4 relative z-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-5">
            <FaBookOpen />
            Program Levels
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            Structured Learning Path
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-base md:text-lg text-muted leading-relaxed">
            A clear progression system designed to guide students from
            foundational learning to confident mastery.
          </p>
        </motion.div>

        {/* TIMELINE WRAPPER */}
        <div className="relative">
          {/* TIMELINE LINE */}
          <div className="hidden lg:block absolute left-[34px] top-0 h-full w-[2px] bg-gradient-to-b from-gold/30 via-secondary/20 to-gold/30" />

          <div className="space-y-10">
            {program.categories.map((category, index) => {
              const videos = (category.previewVideos || []).slice(0, 2);

              return (
                <motion.div
                  key={category.id || category.title || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  viewport={{ once: true }}
                  className="relative flex gap-6"
                >
                  {/* TIMELINE */}
                  <div className="hidden lg:flex flex-col items-center relative z-10">
                    <div className="w-[68px] h-[68px] rounded-full bg-white border-[3px] border-gold shadow-md flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="mt-3 w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-secondary">
                      <FaBookOpen size={14} />
                    </div>
                  </div>

                  {/* MAIN CARD */}
                  <div className="flex-1 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden hover:shadow-lg transition duration-300">
                    <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
                      {/* CONTENT */}
                      <div className="p-7 md:p-9">
                        {/* TOP META */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold">
                            {category.totalClasses || 0} Classes
                          </span>

                          <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                            {category.categoryType || "Level"}
                          </span>
                        </div>

                        {/* TITLE */}
                        <div className="space-y-2">
                          <h3 className="text-2xl md:text-3xl font-bold text-primary leading-tight">
                            {category.title}
                          </h3>

                          {category.titleArabic && (
                            <p
                              dir="rtl"
                              className="text-xl text-gold font-arabic"
                            >
                              {category.titleArabic}
                            </p>
                          )}
                        </div>

                        {/* AGE */}
                        <p className="mt-3 text-sm font-medium text-secondary">
                          Age: {category.ageRange || "Flexible"}
                        </p>

                        {/* DESCRIPTION */}
                        <p className="mt-5 text-muted leading-relaxed max-w-2xl">
                          {category.description}
                        </p>

                        {/* OUTCOMES */}
                        {category.outcomes?.length > 0 && (
                          <div className="mt-7">
                            <h4 className="font-semibold text-primary mb-4">
                              Key Outcomes
                            </h4>

                            <div className="grid sm:grid-cols-2 gap-3">
                              {category.outcomes
                                .slice(0, 4)
                                .map((outcome, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start gap-3"
                                  >
                                    <FaCheckCircle className="text-secondary mt-1 text-sm shrink-0" />

                                    <p className="text-sm text-muted leading-relaxed">
                                      {outcome}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {/* STATS */}
                        <div className="flex flex-wrap gap-3 mt-8">
                          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100">
                            <FaUsers className="text-secondary" />

                            <div>
                              <p className="text-xs text-muted">Students</p>

                              <p className="font-bold text-primary">
                                {category.studentCount ||
                                  program.stats?.totalStudents ||
                                  "Open"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100">
                            <FaClock className="text-secondary" />

                            <div>
                              <p className="text-xs text-muted">Duration</p>

                              <p className="font-bold text-primary">
                                {category.duration ||
                                  program.duration ||
                                  "Ongoing"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-100">
                            <FaStar className="text-secondary" />

                            <div>
                              <p className="text-xs text-muted">Rating</p>

                              <p className="font-bold text-primary">
                                {category.rating ?? "New"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* MEDIA */}
                      <div className="bg-neutral-50 border-l border-neutral-100 p-6">
                        {videos.length > 0 ? (
                          <div className="space-y-4">
                            {videos.map((video, i) => (
                              <motion.a
                                key={i}
                                href={video.url || undefined}
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ y: -3 }}
                                className={`group block overflow-hidden rounded-xl bg-white border border-neutral-200 shadow-sm ${
                                  video.url ? "" : "pointer-events-none"
                                }`}
                              >
                                <div className="relative">
                                  <img
                                    src={
                                      video.thumbnail ||
                                      fallbackCategoryImage
                                    }
                                    alt={
                                      video.title ||
                                      `${category.title} preview`
                                    }
                                    loading="lazy"
                                    className="w-full h-[170px] object-cover transition duration-500 group-hover:scale-105"
                                  />

                                  {/* Overlay */}
                                  <div className="absolute inset-0 bg-black/25" />

                                  {/* Duration */}
                                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 text-white text-[11px] font-medium">
                                    {video.duration || "Preview"}
                                  </div>

                                  {/* Play */}
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                                      <FaPlay className="text-primary ml-0.5 text-sm" />
                                    </div>
                                  </div>
                                </div>

                                {/* TITLE */}
                                <div className="p-4">
                                  <h4 className="text-sm font-semibold text-primary leading-snug">
                                    {video.title ||
                                      `${category.title} preview`}
                                  </h4>
                                </div>
                              </motion.a>
                            ))}
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center text-center text-muted text-sm">
                            No preview videos available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* FOOTNOTE */}
        <div className="mt-14 text-center">
          <p className="inline-flex items-center gap-2 text-secondary font-medium">
            <FaCheckCircle />
            Clear progression. Practical outcomes. Continuous growth.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProgramCategoriesSection;