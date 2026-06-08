import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiAward,
  FiBookOpen,
  FiHeart,
  FiUsers,
} from "react-icons/fi";

import HeroSection from "../../components/Home/HeroSection";
import ProgramCard from "../../components/programs/ProgramCard";
import useProgramsAPI from "../../hooks/useProgramsAPI";

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

const HomePage = () => {
  const { programs, loading } = useProgramsAPI();

  return (
    <div className="overflow-hidden">
      <HeroSection />

      <section className="relative overflow-hidden bg-cream py-16 md:py-20">
        <div className="container-custom relative z-10">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold"
            >
              Our Programs
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl font-semibold text-primary md:text-4xl"
            >
              Educational & Community Initiatives
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="mt-4 text-base leading-relaxed"
            >
              We provide comprehensive educational programs and impactful
              community initiatives designed to nurture knowledge, character,
              and societal development.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full py-20 text-center font-semibold text-primary">
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

      <section className="relative overflow-hidden bg-white py-16 md:py-20">
        <div className="container-custom">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              Our Values
            </p>
            <h2 className="text-3xl font-semibold text-primary md:text-4xl">
              Principles That Guide Our Mission
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Everything we do is rooted in Islamic values, sincerity,
              educational excellence, and service to humanity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="group rounded-lg border border-neutral-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-card"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-gold">
                  {value.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-primary">
                  {value.title}
                </h3>
                <p className="leading-relaxed text-muted">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000&auto=format&fit=crop"
            alt="Community support"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/90" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-goldSoft">
              Support Our Mission
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">
             Give for yourself, invest in your reward.

            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/80 md:text-lg">
             Your support is a personal investment in sadaqah jariyah helping educate, uplift orphans, and serve the Muslim community through meaningful programs.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/donate"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-yellow-400 px-6 text-sm font-semibold text-primary transition-colors hover:bg-goldSoft"
              >
                Donate now
              </Link>
              <Link
                to="/about"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/35 px-6 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary"
              >
                Learn more
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
