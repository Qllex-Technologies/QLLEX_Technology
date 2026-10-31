import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Finalized Nexovanta Color Palette
        charcoal: {
          DEFAULT: "#333333",
          primary: "#333333",
          dark: "#222222",
          light: "#444444",
          surface: "#2B2B2B",
        },
        cream: {
          DEFAULT: "#FCF1D0",
          warm: "#FCF1D0",
          light: "#FDF8E8",
          dark: "#F4E3AF",
        },
        softGrey: {
          DEFAULT: "#F5F5F3",
          light: "#FAFAF9",
          border: "#E8E8E5",
        },
        softBlue: {
          DEFAULT: "#DCE7FF",
          light: "#EDF3FF",
          border: "#CAD8F8",
        },
        sage: {
          DEFAULT: "#C6E7D7",
          light: "#E1F4EC",
          border: "#AFD7C4",
        },
        lavender: {
          DEFAULT: "#F1DDF5",
          light: "#F9EFFB",
          border: "#E2C7E7",
        },
        lightGrey: {
          DEFAULT: "#F5F5F3",
          light: "#FAFAF9",
          border: "#E8E8E5",
        },
        mutedGrey: {
          DEFAULT: "#666666",
          dark: "#555555",
          light: "#888888",
        },
        accent: {
          DEFAULT: "#333333",
          cream: "#FCF1D0",
          blue: "#DCE7FF",
          sage: "#C6E7D7",
          lavender: "#F1DDF5",
          gold: "#C8963E",
        },
        // Clean Theme Aliases
        paper: {
          DEFAULT: "#FFFFFF",
          warm: "#FCF1D0",
          subtle: "#F5F5F3",
          elevated: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#333333",
          primary: "#333333",
          secondary: "#666666",
          muted: "#888888",
        },
        edge: {
          light: "#E8E8E5",
          subtle: "#F0F0ED",
          focus: "#333333",
        },
        slateText: {
          primary: "#333333",
          secondary: "#666666",
          muted: "#888888",
        },
        obsidian: {
          950: "#F5F5F3",
          900: "#FFFFFF",
          800: "#FFFFFF",
          700: "#F5F5F3",
          600: "#E8E8E5",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
        card: "0 4px 20px -2px rgba(10, 10, 12, 0.05)",
        "card-hover": "0 16px 36px -4px rgba(10, 10, 12, 0.09)",
        pill: "0 2px 10px rgba(37, 99, 235, 0.12)",
      },
      backgroundImage: {
        "agency-grid":
          "linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
