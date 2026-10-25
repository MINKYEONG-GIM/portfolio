import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        paper: "var(--paper)",
        surface: "var(--surface)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)"
      },
      fontFamily: {
        sans: ["Pretendard Variable", "Pretendard", "Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"]
      },
      boxShadow: {
        soft: "0 1px 2px rgba(17, 19, 24, 0.04), 0 8px 24px -12px rgba(17, 19, 24, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
