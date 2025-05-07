import { useTheme } from '../../hooks/useTheme'; 
import { getLocalThemeColor } from '../../theme/utils';

interface UploadDecorSvgProps {
  className?: string;
}

function UploadDecorSvg({ className }: UploadDecorSvgProps) {
  const theme = useTheme();
  const isDark = theme.name === 'dark';
  const strokeColor = getLocalThemeColor(isDark, '#666666', '#B5B5B5');

  return (
    <svg 
      viewBox="0 0 245 11" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M244 7L241 10" stroke={strokeColor}/>
      <path d="M244 1L236 9.5" stroke={strokeColor}/>
      <path d="M1 7L4 10" stroke={strokeColor}/>
      <path d="M1 1L9 9.5" stroke={strokeColor}/>
    </svg>
  );
}

export default UploadDecorSvg; 