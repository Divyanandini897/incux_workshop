/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#070a14',
          900: '#0b1021',
          850: '#10162b',
          800: '#161f38',
          700: '#222f52',
          600: '#324270',
        },
        navy: {
          950: '#050814',
          900: '#0a0f24',
          850: '#0f1738',
          800: '#16204d',
          700: '#1e2c66',
        },
        electric: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        violet: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        light: {
          bg: '#faf9f5',
          surface: '#ffffff',
          card: '#ffffff',
          cardHover: '#f5f3ec',
          muted: '#f0ede4',
          border: 'rgba(0, 0, 0, 0.08)',
          borderStrong: 'rgba(0, 0, 0, 0.16)',
          text: '#0f172a',
          textMuted: '#64748b',
        },
        cream: {
          50: '#fdfcf9',
          100: '#f7f5f0',
          200: '#eeebe2',
          300: '#ded8cb',
          900: '#2c2a26',
        },
        accent: {
          lime: '#ccff00',
          limeHover: '#b8e600',
          limeMuted: 'rgba(204, 255, 0, 0.12)',
          emerald: '#10b981',
          orange: '#ff5e1a',
          orangeHover: '#e04f12',
          orangeMuted: 'rgba(255, 94, 26, 0.12)',
        },
        surface: {
          charcoal: '#0d1224',
          graphite: '#12182e',
          card: '#10162c',
          border: 'rgba(255, 255, 255, 0.08)',
          borderLight: 'rgba(0, 0, 0, 0.08)',
        },
        textMuted: '#8b9bb4',
        textLightMuted: '#687791',
      },
      boxShadow: {
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.35)',
        'glow-electric': '0 0 35px -5px rgba(37, 99, 235, 0.35)',
        'glow-violet': '0 0 35px -5px rgba(139, 92, 246, 0.35)',
        'glow-lime': '0 0 35px -5px rgba(204, 255, 0, 0.35)',
        'glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.35)',
      },
      fontFamily: {
        headline: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.15em',
      },
    },
  },
  plugins: [],
}
