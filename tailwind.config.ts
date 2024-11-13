import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkmode: 'class',

  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          from: {
            backgroundPosition: '0 0',
          },
          to: {
            backgroundPosition: '-200% 0',
          },
        },
      },

      before: {
        nav_underline: {
          content: '"',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '2px',
          backgroundColor: 'blue',
          transform: 'scaleX(0)',
          transition: 'transform 0.3s',
        },
        'nav_underline-active': {
          transform: 'scaleX(1)',
        },
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        brown: {
          DEFAULT: '#65000B',
          DarkSalmon: '#E9967A',
          LightSalmon: '#FFA07A',
        },
        white: {
          DEFAULT: '#FFFFFF',
          ivory: '#FFFFF0',
          beige: '#F5F5DC',
        },
      },
    },
  },
  variants: {
    extend: {
      before: ['hover', 'active'],
    },
  },
  plugins: [],
};
export default config;
