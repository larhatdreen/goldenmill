import { useSelector } from 'react-redux';
import { RootState } from '../store';
import themeConfig from '../theme/themeConfig';

export const useTheme = () => {
  const themeName = useSelector((state: RootState) => state.theme.shadowTheme ? 'dark' : 'light');
  const theme = themeConfig[themeName];

  return theme;
};
