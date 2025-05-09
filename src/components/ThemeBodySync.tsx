import { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeBodySync = () => {
  const theme = useTheme();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme.name);
    document.body.style.backgroundColor = theme.colors.background;
  }, [theme.name, theme.colors.background]);

  return null;
};

export default ThemeBodySync; 