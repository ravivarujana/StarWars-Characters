/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        typewriter: {
          from: { width: "0" },
          to: { width: "710px" },
        },
        blinkTextCursor: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "hsl(0, 0%, 80%)" },
        },
      },
      animation: {
        typewriter:
          "typewriter 4s steps(44) 1s 1 normal both, blinkTextCursor 500ms infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* Hide scrollbar for Chrome, Safari and Opera */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* Hide scrollbar for IE, Edge and Firefox */
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
      });
    },
  ],
};
