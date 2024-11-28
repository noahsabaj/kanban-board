import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-secondary": "var(--background-secondary)",
        foreground: "var(--foreground)",
        card: {
          background: "var(--card-background)",
          border: "var(--card-border)",
          hover: "var(--card-hover)",
        },
        input: {
          background: "var(--input-background)",
          border: "var(--input-border)",
          placeholder: "var(--input-placeholder)",
        },
        task: {
          background: "var(--task-background)",
          border: "var(--task-border)",
          hover: "var(--task-hover)",
          shadow: "var(--task-shadow)",
        },
        modal: {
          background: "var(--modal-background)",
          overlay: "var(--modal-overlay)",
        },
        filter: {
          background: "var(--filter-background)",
          border: "var(--filter-border)",
        },
        button: {
          primary: "var(--button-primary)",
          "primary-hover": "var(--button-primary-hover)",
          secondary: "var(--button-secondary)",
          "secondary-hover": "var(--button-secondary-hover)",
        },
        accent: {
          purple: "var(--accent-purple)",
          blue: "var(--accent-blue)",
          success: "var(--accent-success)",
          warning: "var(--accent-warning)",
          danger: "var(--accent-danger)",
        },
        stats: {
          background: "var(--stats-background)",
          border: "var(--stats-border)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;