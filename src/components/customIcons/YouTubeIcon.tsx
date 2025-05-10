import { useTheme } from '../../hooks/useTheme';
import { getLocalThemeColor } from '../../theme/utils';

interface YouTubeIconProps {
  className?: string
}

function YouTubeIcon({ className }: YouTubeIconProps) {
  const theme = useTheme();
  const isDark = theme.name === 'dark';
  const fillColor = getLocalThemeColor(isDark, '#82653E', '#7D9BC1');
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='56'
      height='39'
      viewBox='0 0 56 39'
      fill='none'
      className={className}
    >
      <path
        d='M40.04 6.18018H15.96C12.5579 6.18018 9.79999 8.8987 9.79999 12.2522V24.9482C9.79999 28.3016 12.5579 31.0202 15.96 31.0202H40.04C43.4421 31.0202 46.2 28.3016 46.2 24.9482V12.2522C46.2 8.8987 43.4421 6.18018 40.04 6.18018Z'
        stroke={fillColor}
        strokeMiterlimit='10'
      />
      <path d='M35 18.6002L29.54 21.3657L24.08 24.1257V18.6002V13.0747L29.54 15.8347L35 18.6002Z' fill={fillColor} />
    </svg>
  )
}

export default YouTubeIcon
