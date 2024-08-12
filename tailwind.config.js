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
        shine: {
          "0%": { backgroundPosition: "0" },
          "60%": { backgroundPosition: "600px" },
          "100%": { backgroundPosition: "600px" },
        },
        blinkTextCursor: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "hsl(0, 0%, 80%)" },
        },
      },
      animation: {
        typewriter:
          "typewriter 4s steps(44) 1s 1 normal both, blinkTextCursor 500ms infinite",
        shine: "shine 3s infinite ease-in-out",
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
