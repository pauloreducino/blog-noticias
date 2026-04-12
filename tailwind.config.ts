import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#060B18',
        surface: '#0C1424',
        elevated: '#111D35',
        cyan: {
          DEFAULT: '#00C8E8',
          dim: 'rgba(0,200,232,0.12)',
          glow: 'rgba(0,200,232,0.25)',
        },
        'red-news': '#FF3B5C',
        'red-badge': '#C4003C',
        'amber-news': '#F5A100',
        'green-live': '#00E08A',
        'purple-culture': '#A855F7',
        'text-primary': '#EDF2FF',
        'text-secondary': '#B8C5E0',
        'text-muted': '#7B8DB8',
        'border-cyan': 'rgba(0,200,232,0.15)',
      },
      fontFamily: {
        headline: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        ticker: 'ticker 50s linear infinite',
        'live-pulse': 'livePulse 1.5s ease-in-out infinite',
        shimmer: 'shimmer 1.5s ease infinite',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.5s ease forwards',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(-100%)' },
        },
        livePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% 0' },
          to: { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      backgroundImage: {
        'grid-pattern':
          "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300C8E8' fill-opacity='0.03'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;
