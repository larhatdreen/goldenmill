import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Theme, ThemeMode } from '../theme/types';
import { themeConfig } from '../theme/themeConfig';

export const useTheme = (): Theme => {
  const themeMode = useSelector((state: RootState) =>
    state.theme.shadowTheme ? 'dark' : 'light'
  ) as ThemeMode;

  return useMemo(() => themeConfig[themeMode], [themeMode]);
};
