import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#080808",
          soft: "#0f0e10",
          raised: "#161318"
        },
        bone: {
          DEFAULT: "#F4F1EC",
          muted: "#9A96A3"
        },
        plum: {
          50: "#f2ecfb",
          200: "#c9b3ec",
          400: "#9868D6",
          500: "#7C4FC7",
          600: "#5E3C9E",
          700: "#432B72",
          glow: "#8B5CF6"
        },
        gold: {
          DEFAULT: "#E3B341",
          soft: "#F0CE7C",
          deep: "#B98A22"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      letterSpacing: {
        widest2: "0.28em"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fadeIn 1s ease both"
      },
      boxShadow: {
        glow: "0 0 120px 0 rgba(139, 92, 246, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
