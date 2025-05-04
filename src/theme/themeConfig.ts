import { Theme, ThemeMode } from './types';

const baseColors = {
  light: {
    text: '#535353',
    background: '#F8F8F9',
    decorative: '#F2F2F2',
    title: '#82653F',
    subtitle: '#2A3242',
    particle: '#ABB4C3',
  },
  dark: {
    text: '#ACACAC',
    background: '#292A2C',
    decorative: '#2E3032',
    title: '#D5CDBD',
    subtitle: '#D5CDBD',
    particle: '#82643F',
    
  },
};

const svgColors = {
  light: {
    fill: '#C0BFBD',
    arrow: '#C0BFBD',
    darkColor: '#E8E8E8',
    lightColor: '#F6F6F6',
    crossColor: '#E8E8E8',
  },
  dark: {
    fill: '#3F4042',
    arrow: '#3F4042',
    darkColor: '#2D2D2D',
    lightColor: '#343637',
    crossColor: '#343637',
  },
};

export const createTheme = (mode: ThemeMode): Theme => ({
  name: mode,
  colors: {
    ...baseColors[mode],
    svg: svgColors[mode],
  },
});

export const themeConfig = {
  light: createTheme('light'),
  dark: createTheme('dark'),
} as const;
