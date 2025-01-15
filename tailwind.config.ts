import Color from 'color';

function generateColorVariants(baseColor: string) {
  const color = Color(baseColor);
  return {
    light: color.lighten(0.2).hex(),
    DEFAULT: baseColor,
    dark: color.darken(0.2).hex(),
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'eclipse-orange': generateColorVariants('#ffa800'),
        'eclipse-yellow': generateColorVariants('#D1BF1A'),
        'eclipse-green': generateColorVariants('#2EFC68'),
        'eclipse-pink': generateColorVariants('#FF49CC'),
        'eclipse-blue': generateColorVariants('#1A4FED'),
      },
    },
  },
  plugins: [],
};
