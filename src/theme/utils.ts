import { Theme } from './types';

export const getColor = (
  theme: Theme,
  path: keyof Theme['colors'] | `svg.${keyof Theme['colors']['svg']}` | `mainSection.${keyof Theme['colors']['mainSection']}` | `footer.${keyof Theme['colors']['footer']}`
): string => {
  if (path.startsWith('svg.')) {
    const svgKey = path.replace('svg.', '') as keyof Theme['colors']['svg'];
    return theme.colors.svg[svgKey];
  }
  if (path.startsWith('mainSection.')) {
    const mainSectionKey = path.replace('mainSection.', '') as keyof Theme['colors']['mainSection'];
    return theme.colors.mainSection[mainSectionKey];
  }
  if (path.startsWith('footer.')) {
    const footerKey = path.replace('footer.', '') as keyof Theme['colors']['footer'];
    return theme.colors.footer[footerKey];
  }
  if (path === 'mui') {
    throw new Error('Cannot get MUI colors directly, use specific paths like theme.mui....');
  }
  return theme.colors[path as keyof Omit<Theme['colors'], 'svg' | 'mui' | 'mainSection' | 'footer'>];
};
