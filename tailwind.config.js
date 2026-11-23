/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#005541",
        emerald: { deep: "#004B3D", ink: "#003429" },
        cream: "#FFF7E8",
        paper: "#FAF9F4",
        mist: "#EAF1EC",
        sage: "#DCE9DF",
        gold: "#D8B979",
        charcoal: "#242B28",
      },
      fontFamily: {
        display: ['"DM Serif Display"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      maxWidth: { site: "80rem" },
      boxShadow: {
        card: "0 1px 2px rgba(0,52,41,.06), 0 12px 32px -12px rgba(0,52,41,.18)",
        lift: "0 2px 4px rgba(0,52,41,.08), 0 24px 48px -16px rgba(0,52,41,.28)",
      },
    },
  },
  plugins: [],
};
