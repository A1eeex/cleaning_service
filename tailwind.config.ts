import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      fontFamily: {
        main: ['Manrope'],
      },
      colors: {
        'main-color': '#3e54a3',
        'main-bg-color': '#393837',

        'header-bg-color': '#3b3b3b',
        'body-bg-color': '#f9f9f9',
        'main-page-text-color': '#393837',

        'event-color': '#ffea84',
        'event-color-active': '#ffc73b',

        'link-hover': '#00000014',
      },
    },
  },
  plugins: [],
};
export default config;
