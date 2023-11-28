/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,tsx,ts}'],
  theme: {
    colors: {
      ['tier-1']: '#8b5cf6', // violet-500
      ['tier-2']: '#3b82f6', // blue-500
      ['tier-3']: '#10b981', // emerald-500
      ['tier-4']: '#eab308', // yellow-500
      ['tier-5']: '#ec4899', // pink-500
      ['tier-0']: '#737373', // zinc-500
    },
    extend: {
      borderWidth: {
        1: '1px',
      },
    },
  },
  plugins: [],
};
