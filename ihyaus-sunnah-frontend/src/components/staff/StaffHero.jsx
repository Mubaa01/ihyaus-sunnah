// src/components/staff/StaffHero.jsx

import { motion } from "framer-motion";
import QuranVersePanel from "../common/QuranVersePanel";

const staffVerse = {
  arabic: "وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ",
  translation: "Let there be from you a community inviting to all that is good.",
  reference: "Surah Ali Imran 3:104",
};

const StaffHero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="min-h-[40vh] lg:min-h-[50vh] py-20 lg:py-28 relative flex items-center overflow-hidden">
        
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/staff-hero.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/70 to-primary-dark/80" />

        {/* Optional Dark Overlay for Better Text Visibility */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="relative z-10 container-custom w-full flex items-center">
          <div className="max-w-4xl text-white">
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden font-arabic text-4xl md:text-5xl text-secondary-light mb-6"
              dir="rtl"
            >
              إدارة المؤسسة وهيكلها التعليمي
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6"
            >
              Leadership & Staff Directory
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-200 leading-relaxed max-w-3xl"
            >
              Meet the dedicated scholars, teachers, administrators, and
              staff members serving the mission of education, sincerity,
              and community development.
            </motion.p>

            <QuranVersePanel
              {...staffVerse}
              className="max-w-3xl mt-40 mx-auto"
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10 mb-0">
              {[
                { value: "50+", label: "Staff Members" },
                { value: "6", label: "Departments" },
                { value: "25+", label: "Years Service" },
                { value: "1000+", label: "Students Served" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-5 rounded-2xl text-center backdrop-blur-md bg-white/10 border border-white/20 mb-0"
                >
                  <h3 className="text-3xl font-bold text-secondary-light">
                    {item.value}
                  </h3>

                  <p className="text-sm text-gray-200 mt-2">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default StaffHero;