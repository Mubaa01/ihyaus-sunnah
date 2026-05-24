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
        brand: {
          50: "#F0F7F4",
          100: "#D4EAE3",
          300: "#6DB8A2",
          400: "#3D7A6B",
          500: "#18453B",
          600: "#12352D",
          700: "#0C251F",
        },

        neutral: {
          50: "#FAF9F7",
          200: "#D9D4CC",
          400: "#8C8278",
          600: "#3D3830",
          700: "#2C2820",
        },

        error: {
          100: "#FDDEC9",
          500: "#C2410C",
        },

        warning: {
          100: "#FEF3C7",
          600: "#B45309",
        },

        gray: {
          50: "#FAF9F7",
          100: "#F0F7F4",
          200: "#D9D4CC",
          300: "#D9D4CC",
          400: "#8C8278",
          500: "#8C8278",
          600: "#3D3830",
          700: "#2C2820",
          800: "#2C2820",
          900: "#2C2820",
        },

        red: {
          50: "#FDDEC9",
          100: "#FDDEC9",
          200: "#FDDEC9",
          300: "#C2410C",
          400: "#C2410C",
          500: "#C2410C",
          600: "#C2410C",
          700: "#C2410C",
        },

        yellow: {
          50: "#FEF3C7",
          100: "#FEF3C7",
          200: "#FEF3C7",
          300: "#B45309",
          400: "#B45309",
          500: "#B45309",
          600: "#B45309",
          700: "#B45309",
        },

        primary: "#18453B",
        primaryLight: "#12352D",
        primaryDark: "#0C251F",
        "primary-dark": "#0C251F",

        secondary: "#3D7A6B",
        secondaryLight: "#6DB8A2",
        "secondary-light": "#6DB8A2",

        gold: "#B45309",
        goldSoft: "#FEF3C7",
        "soft-gold": "#FEF3C7",

        cream: "#FAF9F7",

        dark: "#2C2820",

        muted: "#8C8278",

        borderColor: "#D9D4CC",
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

        glow: "0 0 25px rgba(24, 69, 59, 0.22)",

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
          "linear-gradient(to bottom right, rgba(24,69,59,0.95), rgba(18,53,45,0.84), rgba(12,37,31,0.78))",

        sectionFade:
          "linear-gradient(to bottom, rgba(250,249,247,0), rgba(250,249,247,1))",
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
