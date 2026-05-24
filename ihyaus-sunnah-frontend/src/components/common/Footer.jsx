import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-primary overflow-hidden text-white mt-24">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400/10 blur-3xl rounded-full"></div>

      <div className="relative container-custom pt-20 pb-8">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 border-b border-white/10 pb-14">

          {/* FOUNDATION */}
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-heading font-bold mb-2">
                Ihyaus Sunnah
              </h2>

              <p className="uppercase tracking-[0.25em] text-yellow-200 text-sm">
                Foundation
              </p>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6">
              Building a community rooted in authentic Islamic knowledge,
              sincerity, integrity, and service to humanity.
            </p>

            <p
              className="font-arabic text-2xl text-yellow-400Soft"
              dir="rtl"
            >
              عَلِّمُوا مَجَّانًا كَمَا عُلِّمْتُمْ مَجَّانًا
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4">

              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-yellow-400 transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/programs"
                  className="text-gray-300 hover:text-yellow-400 transition"
                >
                  Programs
                </Link>
              </li>

              <li>
                <Link
                  to="/staff"
                  className="text-gray-300 hover:text-yellow-400 transition"
                >
                  Staff Directory
                </Link>
              </li>

              <li>
                <Link
                  to="/organization"
                  className="text-gray-300 hover:text-yellow-400 transition"
                >
                  Organization
                </Link>
              </li>

              <li>
                <Link
                  to="/lectures"
                  className="text-gray-300 hover:text-yellow-400 transition"
                >
                  Lectures
                </Link>
              </li>

            </ul>
          </div>

          {/* PROGRAMS */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-6">
              Educational Programs
            </h3>

            <ul className="space-y-4 text-gray-300">

              <li>Islamiyyah</li>
              <li>Tahfeez</li>
              <li>Arabic Studies</li>
              <li>Western Education</li>
              <li>Public Majlis</li>
              <li>Private Classes</li>

            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-xl font-heading font-semibold mb-6">
              Contact Information
            </h3>

            <div className="space-y-5">

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-yellow-400">
                  <FaMapMarkerAlt />
                </div>

                <p className="text-gray-300 leading-relaxed">
                  No. 14 Shehu Idris Street, Magume, zaria, Kaduna State, Nigeria.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-yellow-400">
                  <FaPhoneAlt />
                </div>

                <p className="text-gray-300">
                  +234 803 123 4567
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-yellow-400">
                  <FaEnvelope />
                </div>

                <p className="text-gray-300">
                  info@ihyaussunnah.org
                </p>
              </div>

            </div>

            {/* SOCIALS */}
            <div className="flex items-center gap-4 mt-8">

              {[FaFacebookF, FaTwitter, FaYoutube].map(
                (Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-11 h-11 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-yellow-400 hover:text-primary transition duration-300"
                  >
                    <Icon />
                  </a>
                )
              )}

            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">

          <p>
            © {new Date().getFullYear()} Ihyaus Sunnah Foundation.
            All rights reserved.
          </p>

          <p>
            Education • Sincerity • Community Service
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;