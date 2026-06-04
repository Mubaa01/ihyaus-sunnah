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
          500: "#F0E68C",
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
          50: "#F0E68C",
          100: "#F0E68C",
          200: "#F0E68C",
          300: "#F0E68C",
          400: "#F0E68C",
          500: "#F0E68C",
          600: "#F0E68C",
          700: "#F0E68C",
        },

        yellow: {
          50: "#FEF3C7",
          100: "#FEF3C7",
          200: "#FEF3C7",
          300: "#B45309",
          // 400: "#B45309",
          // 500: "#B45309",
          // 600: "#B45309",
          // 700: "#B45309",
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
        sans: ["Plus Jakarta Sans", "sans-serif"],
        heading: ["Plus Jakarta Sans", "sans-serif"],
        serif: ["Plus Jakarta Sans", "sans-serif"],
        arabic: ["Amiri", "serif"],
      },

      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "600",
      },

      fontSize: {
        xs: ["0.72rem", { lineHeight: "1rem" }],
        sm: ["0.82rem", { lineHeight: "1.2rem" }],
        base: ["0.94rem", { lineHeight: "1.55rem" }],
        lg: ["1.04rem", { lineHeight: "1.65rem" }],
        xl: ["1.16rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.34rem", { lineHeight: "1.95rem" }],
        "3xl": ["1.68rem", { lineHeight: "2.1rem" }],
        "4xl": ["2rem", { lineHeight: "2.35rem" }],
        "5xl": ["2.45rem", { lineHeight: "2.8rem" }],
        "6xl": ["3rem", { lineHeight: "3.35rem" }],
        "7xl": ["3.55rem", { lineHeight: "3.85rem" }],
        "8xl": ["4.2rem", { lineHeight: "1" }],
        "9xl": ["5.2rem", { lineHeight: "1" }],
      },

      /* =========================
         CONTAINER
      ========================= */

      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2.5rem",
          xl: "3.25rem",
          "2xl": "4rem",
        },
      },

      /* =========================
         SHADOWS
      ========================= */

      boxShadow: {
        soft: "0 8px 22px rgba(0,0,0,0.06)",

        card: "0 6px 18px rgba(0,0,0,0.05)",

        glow: "0 0 18px rgba(24, 69, 59, 0.18)",

        navbar: "0 6px 22px rgba(0,0,0,0.06)",
      },

      /* =========================
         BORDER RADIUS
      ========================= */

      borderRadius: {
        xl2: "1.1rem",
        xl3: "1.4rem",
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
