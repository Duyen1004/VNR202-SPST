/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(41 42% 82%)",
        input: "hsl(41 42% 82%)",
        ring: "hsl(39 83% 56%)",
        background: "hsl(91 38% 86%)",
        foreground: "hsl(31 41% 22%)",
        primary: {
          DEFAULT: "hsl(40 81% 53%)",
          foreground: "hsl(30 45% 18%)"
        },
        secondary: {
          DEFAULT: "hsl(46 56% 92%)",
          foreground: "hsl(31 41% 22%)"
        },
        muted: {
          DEFAULT: "hsl(45 56% 93%)",
          foreground: "hsl(34 25% 43%)"
        },
        accent: {
          DEFAULT: "hsl(198 82% 88%)",
          foreground: "hsl(205 50% 28%)"
        },
        card: {
          DEFAULT: "hsla(0 0% 100% / 0.84)",
          foreground: "hsl(31 41% 22%)"
        }
      },
      borderRadius: {
        lg: "1.25rem",
        md: "1rem",
        sm: "0.75rem"
      },
      boxShadow: {
        glow: "0 22px 60px rgba(176, 133, 53, 0.18)",
        soft: "0 16px 38px rgba(146, 112, 49, 0.12)"
      },
      fontFamily: {
        title: ["Merriweather", "serif"],
        sans: ["Be Vietnam Pro", "sans-serif"]
      },
      backgroundImage: {
        "hero-light":
          "radial-gradient(circle at 78% 12%, rgba(238,230,160,0.38) 0%, transparent 30%), radial-gradient(circle at 14% 22%, rgba(224,242,202,0.72) 0%, transparent 34%), linear-gradient(135deg, #eef6df 0%, #d9e9c8 48%, #b8d19d 100%)",
        "map-light":
          "radial-gradient(circle at 20% 18%, rgba(255,250,232,0.98), transparent 18%), radial-gradient(circle at 84% 16%, rgba(255,234,181,0.72), transparent 20%), linear-gradient(180deg, rgba(251,245,222,0.98) 0%, rgba(246,231,187,0.94) 48%, rgba(236,209,142,0.92) 100%)"
      }
    }
  },
  plugins: []
};
