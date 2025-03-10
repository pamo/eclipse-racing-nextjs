export const ECLIPSE_COLORS = ['blue', 'pink', 'green', 'yellow', 'orange'] as const;
export type EclipseColor = (typeof ECLIPSE_COLORS)[number];

export const BASE_COLORS: Record<EclipseColor, string> = {
  blue: '#1A4FED',
  pink: '#FF49CC',
  green: '#2EFC68',
  yellow: '#D1BF1A',
  orange: '#ffa800',
};
