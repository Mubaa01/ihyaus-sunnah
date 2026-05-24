import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiArrowRight,
} from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
     { name: "Staff", path: "/staff" },
     { name: "Programs", path: "/programs" },
      { name: "Majlis Schedule", path: "/lectures" },
    { name: "Research", path: "/research" },
    { name: "Media Library", path: "/media-library" },
    // { name: "Organization", path: "/organization" },
   
    { name: "Donate", path: "/donate" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 md: pb-6 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-navbar py-2"
            : "bg-primary py-3"
        } `}
      >
        <div className="px-4 sm:px-8 lg:px-12 xl:px-16">

          <div className="flex items-center justify-between">

            {/* LOGO */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition duration-300">
                    <img className="w-10 h-10 md:w-12 md:h-12 object-contain" src="/ihyau.svg" alt="Logo" />
                </div>

                <div className="absolute inset-0 blur-2xl bg-gold/30 opacity-0 group-hover:opacity-100 transition"></div>
              </div>

              <div>
                <h1
                  className={`text-lg md:text-xl font-heading font-bold leading-tight whitespace-nowrap transition ${
                    scrolled
                      ? "text-primary"
                      : "text-white"
                  }`}
                >
                  Ihyaus Sunnah
                </h1>

                <p
                  className={`text-[9px] md:text-[10px] uppercase tracking-[0.24em] leading-tight whitespace-nowrap transition ${
                    scrolled
                      ? "text-gold"
                      : "text-goldSoft"
                  }`}
                >
                  Foundation
                </p>
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">

              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative text-sm font-medium tracking-wide whitespace-nowrap transition duration-300 ${
                      isActive
                        ? "text-gold"
                        : scrolled
                        ? "text-gray-700 hover:text-primary"
                        : "text-white hover:text-goldSoft"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <div className="relative group">
                      {link.name}

                      <span
                        className={`absolute -bottom-2 left-0 h-[2px] bg-gold transition-all duration-300 ${
                          isActive
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </div>
                  )}
                </NavLink>
              ))}

              {/* ACTIONS */}
              <div className="flex items-center gap-2.5 ml-2 xl:ml-4">

                <Link to="/donate">
                  <button className="btn-primary px-5 py-2.5">
                    Donate
                  </button>
                </Link>


                <Link to="/login">
                  <button
                    className={`group px-4 py-2.5 rounded-lg border font-semibold transition duration-300 flex items-center gap-2 ${
                      scrolled
                        ? "border-primary text-primary hover:bg-primary hover:text-white"
                        : "border-white text-white hover:bg-white hover:text-primary"
                    }`}
                  >
                    Admin
                    <FiArrowRight className="group-hover:translate-x-1 transition" />
                  </button>
                </Link>

              </div>
            </nav>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden transition ${
                scrolled
                  ? "text-primary"
                  : "text-white"
              }`}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <FiX size={26} />
              ) : (
                <FiMenu size={26} />
              )}
            </button>

          </div>
        </div>

      </header>



      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >

        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>

        {/* PANEL */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          <div className="p-8 flex flex-col h-full">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-10">

              <div>
                <h2 className="text-2xl font-heading font-bold text-primary">
                  Ihyaus Sunnah
                </h2>

                <p className="text-xs uppercase tracking-[0.25em] text-gold">
                  Foundation
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-primary"
              >
                <FiX size={28} />
              </button>

            </div>

            {/* LINKS */}
            <nav className="flex flex-col gap-6">

              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-lg font-medium transition duration-300 ${
                      isActive
                        ? "text-gold"
                        : "text-gray-700 hover:text-primary"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

            </nav>

            {/* CTA */}
            <div className="mt-auto pt-10 space-y-4">

              <Link to="/donate">
                <button className="w-full btn-primary mb-8">
                  Support the Foundation
                </button>
              </Link>

              <Link to="/admin">
                <button className="w-full btn-dark-outline">
                  Admin Dashboard
                </button>
              </Link>

              {/* ARABIC */}
              <div className="pt-8 border-t border-gray-200 text-center">
                <p
                  className="font-arabic text-xl text-primary"
                  dir="rtl"
                >
                  عَلِّمُوا مَجَّانًا كَمَا عُلِّمْتُمْ مَجَّانًا
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>


      {/* SPACER */}
      <div className="h-[72px] md:h-[80px]"></div>
    </>
  );
};

export default Navbar;
