import { BASE_COLORS, ECLIPSE_COLORS } from './theme.config';
import Color from 'color';

const UTILITY_PREFIXES = ['text', 'bg', 'border'] as const;
const VARIANTS = ['hover', 'group-hover'] as const;

function generateColorVariants(baseColor: string) {
  const color = Color(baseColor);
  const lightColor = color.mix(Color('white'), 0.4).hex();

  return {
    light: lightColor,
    DEFAULT: baseColor,
    dark: color.darken(0.2).hex(),
  };
}

const colors = Object.fromEntries(
  ECLIPSE_COLORS.map(colorName => [
    `eclipse-${colorName}`,
    generateColorVariants(BASE_COLORS[colorName])
  ])
);

const safelistPatterns = [
  // Basic utility patterns
  new RegExp(`^(${UTILITY_PREFIXES.join('|')})-eclipse-(${ECLIPSE_COLORS.join('|')})(-light|-dark)?$`),
  // Background gradient patterns
  new RegExp(`^bg-gradient-to-[trbl]{1,2}$`),
  // Animation patterns
  new RegExp('^animate-'),
  // Additional utility patterns for gradients
  new RegExp('^from-eclipse-'),
  new RegExp('^via-eclipse-'),
  new RegExp('^to-eclipse-'),
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.css',
  ],
  theme: {
    extend: {
      colors,
      animation: {
        gradient: 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  safelist: [
    ...safelistPatterns.map(pattern => ({
      pattern,
      variants: VARIANTS,
    })),
    'psychedelic-bg',
    {
      pattern: /^eclipse-(blue|pink|green|yellow|orange)(-light|-dark)?$/,
      variants: ['hover', 'group-hover'],
    },
  ],
  plugins: [],
};
