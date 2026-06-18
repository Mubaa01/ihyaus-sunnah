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
  const entry = (delay) => ({
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
      },
    },
  });

  const titleRef = useRef(null);
  const foundationRef = useRef(null);

  useEffect(() => {
    const adjust = () => {
      const t = titleRef.current;
      const f = foundationRef.current;

      if (!t || !f) return;

      t.style.transform = "scaleX(1)";
      f.style.transform = "scaleX(1)";

      const tW = t.getBoundingClientRect().width;
      const fW = f.getBoundingClientRect().width;

      if (!tW || !fW) return;

      const target = Math.min(tW, fW);

      const titleScale = Math.min(
        Math.max(target / tW, 0.72),
        1.02
      );

      const foundationScale = Math.min(
        Math.max(target / fW, 0.92),
        1.08
      );

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
    <section className="relative min-h-[80vh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/home-hero.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(7, 47, 39, 0.68), rgba(7, 47, 39, 0.72)), url('/sunrise-bg.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-primaryDark/80 via-primary/80 to-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-primaryDark/85 via-transparent to-primaryDark/20" />

        <div className="absolute right-0 top-0 h-full w-[50%]">
          <div
            className="h-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(201,166,70,0.18), transparent 70%)",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 flex min-h-[80vh] items-start pt-12 sm:items-center sm:pt-0">
        <div className="container-custom w-full py-10 sm:py-20 lg:py-24">
          <div className="mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-12">

            {/* LEFT SIDE */}
            <div className="w-full lg:w-[50%]">
              <motion.div
                className="mb-6 flex justify-center sm:hidden"
                initial="hidden"
                animate="visible"
                variants={entry(0.2)}
              >
                  <div className="relative flex h-52 w-52 items-center justify-center">
                  <div className="absolute h-40 w-40 rounded-full border border-yellow-200/20" />
                  <div className="absolute h-52 w-52 rounded-full border border-yellow-200/10" />
                  <div className="absolute h-64 w-64 rounded-full border border-yellow-200/5" />
                  <img
                    src="/ihyau.svg"
                    alt="Ihyaussunnah Foundation"
                    className="relative z-10 h-32 w-auto opacity-95"
                  />
                </div>
              </motion.div>

              <motion.h1
                className="text-center md:text-left"
                initial="hidden"
                animate="visible"
                variants={entry(0.3)}
              >
                <div className="inline-block">

                  <span
                    ref={titleRef}
                    className="block font-extrabold text-white"
                    style={{
                      fontSize: "clamp(2.8rem, 5vw, 5rem)",
                      lineHeight: 0.95,
                    }}
                  >
                    IHYAUSSUNNAH
                  </span>

                  <motion.span
                    ref={foundationRef}
                    className="mt-3 block text-center md:text-left uppercase font-extrabold text-yellow-200"
                    initial={{
                      opacity: 0,
                      letterSpacing: "0.08em",
                    }}
                    animate={{
                      opacity: 1,
                      letterSpacing: "0.22em",
                      transition: {
                        duration: 0.6,
                        delay: 0.75,
                      },
                    }}
                    style={{
                      fontSize: "clamp(1.1rem, 2vw, 2rem)",
                      transformOrigin: "left center",
                    }}
                  >
                    FOUNDATION
                  </motion.span>

                </div>
              </motion.h1>

              <motion.div
                className="mt-6 text-center md:text-left"
                initial="hidden"
                animate="visible"
                variants={entry(0.8)}
              >
                <span className="inline-flex items-center rounded-lg border border-yellow-200/30 bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-yellow-200">
                  Motto: Education and Sincerity
                </span>
              </motion.div>

              <motion.p
                className="mt-8 max-w-[700px] text-center text-white/85 md:text-left"
                initial="hidden"
                animate="visible"
                variants={entry(1)}
              >
               Guided by the Prophetic principle that the best people are those who benefit others, we are committed to empowering communities through authentic Islamic education, da'wah, compassion, and impactful service, firmly grounded in the Qur'an and authentic Sunnah according to the understanding of the Salaf As-Salih.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
                initial="hidden"
                animate="visible"
                variants={entry(1.15)}
              >
                <Link
                  to="/programs"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg btn-primary px-5 text-sm font-semibold text-primary"
                >
                  View Programs
                  <FiArrowRight />
                </Link>

                <Link
                  to="/donate"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary"
                >
                  Support Our Mission
                </Link>
              </motion.div>

              <motion.div
                className="mt-10 flex flex-wrap row-3 gap-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
                initial="hidden"
                animate="visible"
                variants={entry(1.3)}
              >
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3"
                  >
                    <div className="text-2xl text-yellow-200">
                      {item.icon}
                    </div>

                    <div>
                      <p className="font-bold text-white">
                        {item.value}
                      </p>

                      <p className="text-sm text-white/70">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

            </div>

            {/* RIGHT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="
                relative
                hidden
                sm:flex
                min-h-[320px]
                sm:min-h-[380px]
                md:min-h-[450px]
                lg:min-h-[620px]
                w-full
                lg:w-[48%]
                items-center
                justify-center
              "
            >

              {/* Orbit Rings */}
              <div className="absolute h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] md:h-[380px] md:w-[380px] lg:h-[420px] lg:w-[420px] rounded-full border border-yellow-200/20" />

              <div className="absolute h-[280px] w-[280px] sm:h-[380px] sm:w-[380px] md:h-[460px] md:w-[460px] lg:h-[520px] lg:w-[520px] rounded-full border border-yellow-200/10" />

              <div className="absolute h-[340px] w-[340px] sm:h-[460px] sm:w-[460px] md:h-[560px] md:w-[560px] lg:h-[620px] lg:w-[620px] rounded-full border border-yellow-200/5" />

              {/* Logo */}
              <motion.img
                src="/ihyau.svg"
                alt="Ihyaussunnah Foundation"
                className="relative z-10 h-auto w-[clamp(180px,35vw,520px)]"
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

           
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
