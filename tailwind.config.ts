import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0E0E1A', 'bg-secondary': '#161628', 'bg-tertiary': '#1E1E36',
        'text-primary': '#F0EDE6', 'text-secondary': '#8B8BA3', 'text-tertiary': '#5A5A72',
        'domain-intl': '#64B5F6', 'domain-finance': '#FFD54F', 'domain-tech': '#80CBC4',
        'domain-sports': '#FF8A65', 'domain-ent': '#CE93D8', 'domain-health': '#A5D6A7',
        'domain-edu': '#90CAF9', 'domain-life': '#FFAB91', 'domain-env': '#C5E1A5',
        accent: '#E8C547', danger: '#EF5350', success: '#66BB6A',
      },
      screens: {
        'sm': '480px',
        'md': '640px',
        'tablet': '640px',
        'lg': '768px',
        'desktop': '1024px',
        'xl': '1280px',
        'wide': '1440px',
        'mobile': { 'max': '639px' },
      },
      fontFamily: {
        display: ['Playfair Display', 'Noto Serif SC', 'serif'],
        body: ['Inter', 'Noto Sans SC', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [],
};
export default config;
