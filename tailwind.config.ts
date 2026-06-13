import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#090B12',
        glow: '#8B5CF6',
        aqua: '#22D3EE'
      }
    }
  },
  plugins: []
};

export default config;
