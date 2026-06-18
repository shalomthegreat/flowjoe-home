import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF2E6",
        "cream-soft": "#FFF8EF",
        sand: "#F4EBDC",
        "sand-deep": "#EFE2CF",
        latte: "#E8DCCC",
        mocha: "#B9AA96",
        espresso: "#4A3B32",
        cinnamon: "#8B4513",
        peach: "#E8C9A0",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        body: ["var(--font-inter)", "Arial", "sans-serif"],
      },
      borderRadius: {
        sm: "10px",
        md: "20px",
        lg: "24px",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0,0,0,.2)",
      },
      lineHeight: {
        heading: "1.1",
        subheading: "1.2",
        body: "1.6",
        loose: "1.7",
        chain: "2",
      },
    },
  },
  plugins: [],
};

export default config;
