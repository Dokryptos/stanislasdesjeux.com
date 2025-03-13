import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
