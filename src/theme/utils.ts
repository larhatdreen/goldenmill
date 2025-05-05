import { Theme } from './types';

export const getColor = (
  theme: Theme,
  path: keyof Theme['colors'] | `svg.${keyof Theme['colors']['svg']}`
): string => {
  if (path.startsWith('svg.')) {
    const svgKey = path.replace('svg.', '') as keyof Theme['colors']['svg'];
    return theme.colors.svg[svgKey];
  }
  if (path === 'mui') {
    throw new Error('Cannot get MUI colors directly, use specific paths like mui.primary');
  }
  return theme.colors[path as keyof Omit<Theme['colors'], 'svg' | 'mui'>];
};

export const getThemeStyles = (theme: Theme) => ({
  title: { color: theme.colors.title },
  subtitle: { color: theme.colors.subtitle },
  text: { color: theme.colors.text },
  background: { backgroundColor: theme.colors.background },
  decorative: { backgroundColor: theme.colors.decorative },
  particle: { backgroundColor: theme.colors.particle },
});

export const getLocalThemeColor = (
  isDark: boolean,
  darkColor: string,
  lightColor: string
): string => {
  return isDark ? darkColor : lightColor;
};
