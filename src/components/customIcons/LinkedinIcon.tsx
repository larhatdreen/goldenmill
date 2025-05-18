import { useTheme } from '../../hooks/useTheme';

interface LinkedinIconProps {
  className?: string
}

function LinkedinIcon({ className }: LinkedinIconProps) {
  const theme = useTheme();
  const isDark = theme.name === 'dark';
  const fillColor = isDark ? '#82643E' : '#7D9BC1';
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='29'
      height='29'
      viewBox='0 0 29 29'
      fill='none'
      className={className}
    >
      <path
        d='M11.6477 9.44141C11.6477 10.2375 11.055 10.8828 10.3239 10.8828C9.59272 10.8828 9 10.2375 9 9.44141C9 8.64534 9.59272 8 10.3239 8C11.055 8 11.6477 8.64534 11.6477 9.44141Z'
        fill={fillColor}
      />
      <path d='M9.08611 12.0312H11.3894V19.9531H9.08611V12.0312Z' fill={fillColor} />
      <path d='M12.8748 11.8906H15.1781V19.9766H12.8748V11.8906Z' fill={fillColor} />
      <path d='M17.6967 15.7109H20V20H17.6967V15.7109Z' fill={fillColor} />
      <path
        d='M17.3523 11.7852C15.9746 11.607 15.1924 12.6953 14.9736 13.2617C14.6148 13.6055 13.893 14.3375 13.8757 14.5156C13.8585 14.6937 14.6005 17.7695 14.9736 19.2852C14.7691 17.7227 14.7067 14.4875 16.093 14.0469C17.4793 13.6062 17.7397 15.0664 17.6967 15.8516L20 15.7461C19.9892 12.6406 19.0744 12.0078 17.3523 11.7852Z'
        fill={fillColor}
      />
      <circle cx='14.5' cy='14.5' r='14' stroke={fillColor} />
    </svg>
  )
}

export default LinkedinIcon
