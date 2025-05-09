import { useTheme } from '../../hooks/useTheme';
import { getLocalThemeColor } from '../../theme/utils';

interface ButtonBigIconProps {
  className?: string;
}

function ButtonBigIcon({ className }: ButtonBigIconProps) {
  const theme = useTheme();
  const isDark = theme.name === 'dark';
  const strokeColor = getLocalThemeColor(isDark, '#969284', '#696D7B');

  return (
    <svg
      viewBox="0 0 507 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M485 57H506V36" stroke={strokeColor} />
      <path d="M22 57H1V36" stroke={strokeColor} />
      <path d="M506 22V1H485" stroke={strokeColor} />
      <path d="M1 22L1 1H22" stroke={strokeColor} />
    </svg>
  );
}

export default ButtonBigIcon;