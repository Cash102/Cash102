import type { Config } from "tailwindcss";

/**
 * Palette carried over from the prototype: a chalk-on-slate blackboard. Dark is
 * the only theme — students open this on a phone, often in a dim classroom.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          DEFAULT: "#1a2825",
          lift: "#22332f",
        },
        chalk: "#ece7d9",
        dust: "#93a29b",
        break: "#e2a03f",
        hold: "#74b6a4",
        rule: "#2f423d",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
