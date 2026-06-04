import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiBookOpen, FiHeart, FiUsers } from "react-icons/fi";
import { useEffect, useRef } from "react";

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
  const entry = (delay) => ({ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } } });
  const titleRef = useRef(null);
  const foundationRef = useRef(null);

  useEffect(() => {
    const adjust = () => {
      const t = titleRef.current;
      const f = foundationRef.current;
      if (!t || !f) return;
      // reset any scaling then measure
      t.style.transform = "scaleX(1)";
      f.style.transform = "scaleX(1)";
      const tW = t.getBoundingClientRect().width;
      const fW = f.getBoundingClientRect().width;
      if (!tW || !fW) return;
      const target = Math.min(tW, fW);
      const titleScale = Math.min(Math.max(target / tW, 0.72), 1.02);
      const foundationScale = Math.min(Math.max(target / fW, 0.92), 1.08);
      t.style.transition = "transform 320ms ease";
      f.style.transition = "transform 320ms ease";
      t.style.transformOrigin = "left center";
      f.style.transformOrigin = "left center";
      t.style.transform = `scaleX(${titleScale})`;
      f.style.transform = `scaleX(${foundationScale})`;
    };

    requestAnimationFrame(adjust);
    window.addEventListener("resize", adjust);
    return () => window.removeEventListener("resize", adjust);
  }, []);

  return (
    <section className="relative min-h-[76vh] overflow-hidden mt-0">
      {/* Background + overlays (preserve original color tokens) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.img
          src="ihyau.jpg"
          alt="Islamic architecture representing Ihyaus Sunnah Foundation"
          className="h-full w-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.06 }}
          transition={{ duration: 18, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primaryDark via-primary/90 to-primary/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-primaryDark/80 via-transparent to-primaryDark/20" />
        <div className="absolute inset-y-0 right-0 w-44 md:w-72 lg:w-96 pointer-events-none">
          <div className="h-full" style={{ background: "radial-gradient(ellipse at left, rgba(201,166,70,0.06), transparent 40%)" }} />
        </div>
      </div>

      <div className="relative z-10 flex min-h-[76vh] items-end">
        <div className="container-custom w-full pb-8 pt-24 md:pb-10 lg:pb-12">
          <div className="mx-auto flex flex-col lg:flex-row lg:items-end lg:gap-8">
            <div className="w-full lg:max-w-[820px]">
              <motion.p
                dir="rtl"
                className="mx-auto mb-5 mt-4 max-w-[820px] text-center font-arabic text-goldSoft leading-[1.45] md:mb-8 lg:mb-10 md:mx-0 md:text-left md:text-5xl lg:text-left"
                initial="hidden"
                animate="visible"
                variants={entry(0.1)}
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)' }}
              >
                عَلِّمُوا مَجَّانًا كَمَا عُلِّمْتُمْ مَجَّانًا
              </motion.p>

              <motion.p
                className="mx-auto mt-5 max-w-[700px] text-center text-sm font-semibold uppercase tracking-[0.08em] text-white/90 slogan-glow-delay md:text-left lg:text-left"
                initial="hidden"
                animate="visible"
                variants={entry(0.35)}
                style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)' }}
              >
                <span className="text-white md:text-current"> Teach freely</span>
                <br className="md:hidden" /> as you were taught freely
              </motion.p>

              <motion.h1
                className="mx-auto mt-6 max-w-[780px] text-center md:text-left lg:text-left"
                initial="hidden"
                animate="visible"
                variants={entry(0.55)}
              >
                <span ref={titleRef} className="block text-white font-extrabold" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 0.95 }}>
                  IHYAUS_SUNNAH
                </span>
                <motion.span
                  ref={foundationRef}
                  className="mt-3 block uppercase text-yellow-200 font-extrabold foundation-text"
                  initial={{ opacity: 0, letterSpacing: '0.12em' }}
                  animate={{ opacity: 1, letterSpacing: '0.42em', transition: { duration: 0.6, delay: 0.75 } }}
                  style={{ fontSize: 'clamp(1.1rem, 2.2vw, 2rem)', transformOrigin: 'left center' }}
                >
                  Foundation
                </motion.span>
          </motion.h1>

              <motion.div className="mt-4 max-w-[720px] text-center md:text-left md:text-justify lg:text-left" initial="hidden" animate="visible" variants={entry(0.95)}>
                <span className="inline-flex items-center rounded-lg border border-yellow-200/30 bg-white/10 px-3 py-1 text-sm font-bold text-yellow-200 tracking-[0.12em] uppercase">
                  Our motto: Education and Sincerity
                </span>
              </motion.div>

              <motion.div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start lg:justify-start" initial="hidden" animate="visible" variants={entry(1.15)}>
                <Link to="/programs" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg btn-primary px-4 text-sm font-semibold text-primary transition-colors hover:bg-yellow-400Soft">
                  View programs <FiArrowRight />
                </Link>
                <Link to="/donate" className="inline-flex h-11 items-center justify-center rounded-lg border border-white/30 px-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary">
                  Support our mission
                </Link>
              </motion.div>

              <motion.p className="mb-10 mt-6 max-w-[720px] text-sm text-white/85 text-center md:text-left md:text-justify lg:text-left" initial="hidden" animate="visible" variants={entry(1.35)}>
                Teaching freely, serving sincerely, and nurturing a community rooted in Islamic knowledge, character, and compassion.
              </motion.p>
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mb-6 w-full lg:w-[340px] rounded-lg border border-white/15 bg-white/10 p-3 backdrop-blur-md"
            >
              <p className="px-2 text-sm font-semibold uppercase tracking-[0.12em] text-yellow-200">Our work</p>
              <div className="mt-3 grid gap-2">
                {highlights.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-lg bg-white/10 p-2.5">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-yellow-400 text-base text-yellow-200">
                      {item.icon}
                    </span>
                    <span>
                      <span className="block text-lg font-semibold text-white">{item.value}</span>
                      <span className="block text-sm text-yellow-200">{item.label}</span>
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
