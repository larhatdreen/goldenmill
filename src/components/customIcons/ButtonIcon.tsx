import { useTheme } from '../../hooks/useTheme';
import { getLocalThemeColor } from '../../theme/utils';

interface ButtonIconProps {
  className?: string;
}

function ButtonIcon({ className }: ButtonIconProps) {
  const theme = useTheme();
  const isDark = theme.name === 'dark';
  const strokeColor = getLocalThemeColor(isDark, '#969284', '#696D7B');

  return (
    <svg
      width="284"
      height="58"
      viewBox="0 0 284 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M262 57H283V36" stroke={strokeColor} />
      <path d="M22 1L1 1L1 22" stroke={strokeColor} />
      <path d="M283 22V1L262 1" stroke={strokeColor} />
      <path d="M1 36L1 57H22" stroke={strokeColor} />
    </svg>
  );
}

export default ButtonIcon; 