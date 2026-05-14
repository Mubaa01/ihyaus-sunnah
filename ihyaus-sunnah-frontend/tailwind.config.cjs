/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      /* =========================
         COLORS
      ========================= */

      colors: {
        primary: "#0B3D2E",
        primaryLight: "#145A45",

        secondary: "#C9A646",
        secondaryLight: "#E6C76A",

        gold: "#C9A646",
        goldSoft: "#E6C76A",

        cream: "#F8F5F0",

        dark: "#1A1A1A",

        muted: "#6B7280",

        borderColor: "#E5E7EB",
      },

      /* =========================
         FONTS
      ========================= */

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Playfair Display", "serif"],
        arabic: ["Amiri", "serif"],
      },

      /* =========================
         CONTAINER
      ========================= */

      container: {
        center: true,
        padding: {
          DEFAULT: "1.5rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },

      /* =========================
         SHADOWS
      ========================= */

      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",

        card: "0 8px 24px rgba(0,0,0,0.06)",

        glow: "0 0 25px rgba(201, 166, 70, 0.25)",

        navbar: "0 8px 30px rgba(0,0,0,0.08)",
      },

      /* =========================
         BORDER RADIUS
      ========================= */

      borderRadius: {
        xl2: "1.5rem",
        xl3: "2rem",
      },

      /* =========================
         BACKGROUND GRADIENTS
      ========================= */

      backgroundImage: {
        heroGradient:
          "linear-gradient(to bottom right, rgba(11,61,46,0.95), rgba(11,61,46,0.8), rgba(0,0,0,0.75))",

        sectionFade:
          "linear-gradient(to bottom, rgba(248,245,240,0), rgba(248,245,240,1))",
      },

      /* =========================
         KEYFRAMES
      ========================= */

      keyframes: {

        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(40px)",
          },

          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        fadeIn: {
          "0%": {
            opacity: "0",
          },

          "100%": {
            opacity: "1",
          },
        },

        scaleIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },

          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },

        slideDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },

          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },

        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },

          "50%": {
            transform: "translateY(-8px)",
          },
        },

        pulseGlow: {
          "0%, 100%": {
            opacity: "0.6",
          },

          "50%": {
            opacity: "1",
          },
        },
      },

      /* =========================
         ANIMATIONS
      ========================= */

      animation: {
        fadeUp: "fadeUp 0.8s ease-out",

        fadeIn: "fadeIn 0.8s ease-out",

        scaleIn: "scaleIn 0.5s ease-out",

        slideDown: "slideDown 0.5s ease-out",

        float: "float 4s ease-in-out infinite",

        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },

      /* =========================
         TRANSITIONS
      ========================= */

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

    },
  },

  plugins: [],
}