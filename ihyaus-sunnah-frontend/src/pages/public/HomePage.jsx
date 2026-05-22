import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiArrowRight,
  FiBookOpen,
  FiHeart,
  FiUsers,
  FiAward,
} from "react-icons/fi";

import useProgramsAPI from "../../hooks/useProgramsAPI";
import ProgramCard from "../../components/programs/ProgramCard";
import QuranVersePanel from "../../components/common/QuranVersePanel";

const values = [
  {
    icon: <FiBookOpen size={28} />,
    title: "Knowledge",
    description:
      "Promoting authentic Islamic knowledge with wisdom, discipline, and excellence.",
  },

  {
    icon: <FiHeart size={28} />,
    title: "Sincerity",
    description:
      "Building education and service purely for the pleasure of Allah.",
  },

  {
    icon: <FiUsers size={28} />,
    title: "Community",
    description:
      "Strengthening the Muslim community through education and unity.",
  },

  {
    icon: <FiAward size={28} />,
    title: "Service",
    description:
      "Serving humanity through impactful educational and welfare initiatives.",
  },
];

const homeVerse = {
  arabic: "إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ",
  translation:
    "Indeed, Allah commands justice, excellence, and giving to relatives.",
  reference: "Surah An-Nahl 16:90",
}

const HomePage = () => {
  const { programs, loading } = useProgramsAPI()

  return (
    <div className="overflow-hidden">


      <section className="relative min-h-screen flex items-center overflow-hidden">

        <div className=" absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000&auto=format&fit=crop"
            alt="Ihyaus Sunnah Foundation"
            className="w-full h-full object-cover"
          />

         
          <div className="absolute inset-0 bg-heroGradient"></div>
        </div>

  
        {/* <div className="absolute top-20 left-10 w-72 h-72 bg-gold/20 blur-3xl rounded-full animate-pulseGlow"></div> */}

        <div className="relative z-10  px-20  py-8 md:grid md:items-center">
          

          <div className="max-w-4xl">
            <QuranVersePanel {...homeVerse} className="mb-10 max-w-3xl" />

            
          
  <motion.div className="hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1
          dir="ltr"
          className="font-arabic text-5xl md:text-6xl font-bold text-white leading-tight  tracking-[0.25em] pt-32 pb-8"
          
        >
          عَلِّمُوا مَجَّانًا كَمَا عُلِّمْتُمْ مَجَّانًا
        </h1>
      </motion.div>

    
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      className="hidden text-sm md:text-lg uppercase tracking-[0.25em] text-white mb-16"
      >
        Teach freely <br></br>
        <span className=" bg-gold p-1 "> as you have been taught freely</span>
       
      </motion.p>
      
          
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-6xl font-heading font-bold leading-tight text-white mb-6 pb-8"
            >
              Ihyaus Sunnah Foundation
              <span className="block text-yellow-300 mt-2 md: text-xlg">
                Magume Zaria
              </span>
            </motion.h1>

          
         

        
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="flex flex-wrap gap-5 "
            >
              

              <Link to="/about">
                <button className="btn-primary flex items-center gap-2 hover:bg-yellow-400">
                  Explore Foundation
                  <FiArrowRight />
                </button>
              </Link>

              <Link to="/programs">
                <button className="btn-outline flex items-center gap-2">
                  View Programs
                </button>
              </Link>

              
              <Link to="/donate">
                <button className="btn-primary flex items-center gap-2 hover:bg-yellow-400">
                  Support Our Misssion
                  <FiArrowRight />
                </button>
              </Link>

             
            </motion.div>

          </div>

          {/* FLOATING STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">

            {/* CARD 1 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition duration-500 shadow-soft"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold text-primary flex items-center justify-center mb-6">
                <FiBookOpen size={30} />
              </div>

              <h3 className="text-4xl font-bold text-white mb-2">
                5+
              </h3>

              <p className="text-goldSoft text-lg font-semibold mb-3">
                Educational Programs
              </p>

              <p className="text-gray-300 leading-relaxed">
                Islamic studies, Tahfeez, Arabic education, western education,
                and community learning programs.
              </p>
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition duration-500 shadow-soft"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold text-primary flex items-center justify-center mb-6">
                <FiUsers size={30} />
              </div>

              <h3 className="text-4xl font-bold text-white mb-2">
                1000+
              </h3>

              <p className="text-goldSoft text-lg font-semibold mb-3">
                Students
              </p>

              <p className="text-gray-300 leading-relaxed">
                Building a disciplined community grounded upon knowledge,
                sincerity, and Islamic values.
              </p>
            </motion.div>

            {/* CARD 3 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:-translate-y-2 transition duration-500 shadow-soft"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold text-primary flex items-center justify-center mb-6">
                <FiHeart size={30} />
              </div>

              <h3 className="text-4xl font-bold text-white mb-2">
                Nonprofit
              </h3>

              <p className="text-goldSoft text-lg font-semibold mb-3">
                Community Development
              </p>

              <p className="text-gray-300 leading-relaxed">
                Supporting orphans and vulnerable members of society through
                donations and welfare initiatives.
              </p>
            </motion.div>

          </div>

        </div>

      </section>


      

      {/* ====================================================== */}
      {/* PROGRAMS SECTION */}
      {/* ====================================================== */}

      <section className="py-28 bg-cream relative overflow-hidden">

        {/* BACKGROUND GLOW */}
        <div className="absolute top-10 right-0 w-72 h-72 bg-gold/10 blur-3xl rounded-full"></div>

        <div className="container-custom relative z-10">

          {/* SECTION HEADER */}
          <div className="text-center mb-16">

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="uppercase tracking-[0.25em] text-gold font-semibold mb-4 text-6xl"
            >
              
              Our Programs
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6"
            >
              Educational & Community Initiatives
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-lg text-muted max-w-3xl mx-auto leading-relaxed"
            >
              We provide comprehensive educational programs and impactful
              community initiatives designed to nurture knowledge, character,
              and societal development.
            </motion.p>

          </div>

          {/* PROGRAM CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              <div className="col-span-full text-center py-24 text-primary font-semibold">
                Loading programs...
              </div>
            ) : (
              programs.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))
            )}
          </div>

        </div>
      </section>

      {/* ====================================================== */}
      {/* VALUES SECTION */}
      {/* ====================================================== */}

      <section className="py-28 bg-white relative overflow-hidden">

        <div className="container-custom">

          {/* HEADER */}
          <div className="text-center mb-16">

            <p className="uppercase tracking-[0.25em] text-gold font-semibold mb-4 text-6xl">
              Our Values
            </p>

            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
              Principles That Guide Our Mission
            </h2>

            <p className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">
              Everything we do is rooted in Islamic values, sincerity,
              educational excellence, and service to humanity.
            </p>

          </div>

          {/* VALUES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group card p-10 text-center hover:-translate-y-2 transition duration-500"
              >

                {/* ICON */}
                <div className="w-20 h-20 mx-auto rounded-3xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-primary transition duration-500">
                  {value.icon}
                </div>

                {/* TITLE */}
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  {value.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-muted leading-relaxed">
                  {value.description}
                </p>

              </motion.div>
            ))}

          </div>

        </div>
      </section>

      {/* ====================================================== */}
      {/* CTA SECTION */}
      {/* ====================================================== */}

      <section className="relative py-28 overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop"
            alt="Community Support"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-primary/90"></div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 container-custom text-center">

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >

            <p className="uppercase tracking-[0.25em] text-goldSoft font-semibold mb-4">
              Support Our Mission
            </p>

            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white leading-tight mb-8">
              Help Us Build Knowledge,
              <span className="block text-gold">
                Character & Community
              </span>
            </h2>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-10">
              Your support helps us provide affordable Islamic education,
              support orphans, organize public lectures, and strengthen the
              Muslim community through impactful programs.
            </p>

            <div className="flex flex-wrap justify-center gap-5">

              <Link to="/donate">
                <button className="btn-primary">
                  Donate Now
                </button>
              </Link>

              <Link to="/about">
                <button className="btn-outline">
                  Learn More
                </button>
              </Link>

            </div>

          </motion.div>

        </div>

      </section>

    </div>
  );
};

export default HomePage;
