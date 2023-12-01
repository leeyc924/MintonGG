import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      ['tier-1']: '#8b5cf6', // violet-500
      ['tier-2']: '#3b82f6', // blue-500
      ['tier-3']: '#10b981', // emerald-500
      ['tier-4']: '#eab308', // yellow-500
      ['tier-5']: '#ec4899', // pink-500
      ['tier-0']: '#737373', // zinc-500
      white: '#ffffff',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.375rem',
      xl: '1.75rem',
    },
    extend: {
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
};
export default config;
