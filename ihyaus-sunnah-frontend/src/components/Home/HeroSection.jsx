import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiBookOpen,
  FiHeart,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";

const highlights = [
  {
    value: "5+",
    label: "Programs",
    icon: <FiBookOpen />,
  },
  {
    value: "1000+",
    label: "Students reached",
    icon: <FiUsers />,
  },
  {
    value: "Nonprofit",
    label: "Community service",
    icon: <FiHeart />,
  },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[82vh] overflow-hidden mt-0">
      <div className="absolute inset-0">
        <img
          src="ihyau.jpg"
          alt="Islamic architecture representing Ihyaus Sunnah Foundation"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primaryDark via-primary/90 to-primary/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-primaryDark/80 via-transparent to-primaryDark/20" />
      </div>

      <div className="relative z-10 flex min-h-[82vh] items-end">
        <div className="container-custom w-full pb-10 pt-28 md:pb-12 lg:pb-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
            <div className="max-w-4xl">
              {/* <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="mx-auto inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-yellow-400Soft backdrop-blur lg:mx-0"
              >
                <FiMapPin className="text-yellow-400Soft" />
                Magume, Zaria
              </motion.div> */}

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                dir="rtl"
                className="mx-auto mb-7 mt-5 max-w-[760px] text-center font-arabic text-5xl leading-relaxed text-goldSoft md:text-6xl lg:mx-0 pt-0"
              >
                عَلِّمُوا مَجَّانًا كَمَا عُلِّمْتُمْ مَجَّانًا
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="mx-auto mb-14 mt-3 max-w-[760px] text-center text-base font-semibold uppercase tracking-[0.16em] text-white/85 md:text-lg lg:mx-0"
              >
                Teach freely as you were taught freely
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mx-auto mt-8 max-w-[760px] text-center text-4xl font-semibold leading-tight text-white md:text-5xl lg:mx-0 lg:text-6xl"
              >
                <span className="block">Ihyaus Sunnah</span>
                <span className="mt-4 block text-[0.72em] uppercase tracking-[0.32em] text-yellow-200 md:mt-5">
                  Foundation
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.16 }}
                className="mx-auto mt-6 block w-full max-w-[760px] lg:mx-0"
              >
                <p className="block text-center text-base leading-7 text-white/85 md:text-lg sm:px-6 lg:px-0">
                  Teaching freely, serving sincerely, and nurturing a community
                  rooted in Islamic knowledge, character, and compassion.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22 }}
                className="mx-auto mt-8 flex max-w-[760px] flex-wrap justify-center gap-3 lg:mx-0"
              >
                <Link
                  to="/programs"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg btn-primary px-5 text-sm font-semibold text-primary transition-colors hover:bg-yellow-400Soft"
                >
                  View programs <FiArrowRight />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary"
                >
                  Explore foundation
                </Link>
                <Link
                  to="/donate"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-yellow-400Soft/50 bg-white/10 px-5 text-sm font-semibold text-goldSoft backdrop-blur transition-colors hover:bg-white hover:text-primary"
                >
                  Support our mission
                </Link>
              </motion.div>
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur-md"
            >
              <p className="px-2 text-sm font-semibold uppercase tracking-[0.12em] text-yellow-200">
                Our work
              </p>

              <div className="mt-3 grid gap-2">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-lg bg-white/10 p-3"
                  >
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-400 text-lg text-yellow-200">
                      {item.icon}
                    </span>
                    <span>
                      <span className="block text-xl font-semibold text-white">
                        {item.value}
                      </span>
                      <span className="block text-sm text-yellow-200">
                        {item.label}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
