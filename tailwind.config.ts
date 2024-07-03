import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        applemusic: "#ff243c",
        vsc: "#047bcb",
        discord: "#5865f2",
        github: '#0d1117',
        cwhite: 'rgb(241 245 249)',
        cblack: {
          100: "#141414",
          200: "#292929",
        },
        cred: "#EF5B5B",
        cgrey: "#7D8491",
        cgreen: "#78BC61",
        cblue: "#8388AF",
      },
    },
  },
  plugins: [],
};
export default config;
