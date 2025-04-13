import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#4F46E5",
          50: "#EBEAFD",
          100: "#D7D5FB",
          200: "#AFABF8",
          300: "#8781F4",
          400: "#5F57F1",
          500: "#4F46E5",
          600: "#2A20D9",
          700: "#211AAB",
          800: "#18137D",
          900: "#0F0C4F",
        },
        secondary: {
          DEFAULT: "#10B981",
          50: "#E6F9F1",
          100: "#CCF3E3",
          200: "#99E7C7",
          300: "#66DBAB",
          400: "#33CF8F",
          500: "#10B981",
          600: "#0D9267",
          700: "#0A6E4E",
          800: "#064A34",
          900: "#03251A",
        },
        accent: {
          DEFAULT: "#F97316",
          50: "#FEF2E9",
          100: "#FDE5D3",
          200: "#FBCBA7",
          300: "#FAB17B",
          400: "#F8974F",
          500: "#F97316",
          600: "#D55A06",
          700: "#A04404",
          800: "#6B2E03",
          900: "#351701",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
