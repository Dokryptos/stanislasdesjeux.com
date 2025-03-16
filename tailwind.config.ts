import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   neueGrotesk: ["var(--font-neueHaal)"],
      //   ppeiko: ["var(--font-ppeiko)"],
      // },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        principal: "#D56745",
      },
      width: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1440px",
      },
      maxWidth: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1440px",
      },
      screens: {
        tablet: "640px",
        laptop: "1024px",
        desktop: "1440px",
        "pointer-fine": { raw: "(pointer: fine)" },
        "pointer-coarse": { raw: "(pointer: coarse)" },
      },
    },
  },
  plugins: [],
} satisfies Config;
