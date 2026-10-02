import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#9588E8",
        optional: "#0B55E5",
        "optional-two": "#F82828",
        "optional-three": "#5DB996",
        "optional-four": "#E67A66",
        black: "#020D2B",
        paragraph: "#444F6F",
      },
      fontFamily: {
        heading: ["var(--font-libre-franklin)", "sans-serif"],
        body: ["var(--font-libre-franklin)", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
      },
      maxWidth: {
        container: "1230px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
