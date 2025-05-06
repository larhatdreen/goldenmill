import { useTheme } from '../../hooks/useTheme'; 
import { getLocalThemeColor } from '../../theme/utils';
import React from 'react';
const theme = useTheme();
const isDark = theme.name === 'dark';
const fillColor = getLocalThemeColor(isDark, '#666666', '#B5B5B5');

const UploadDecorSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 245 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M244 7L241 10" stroke={fillColor}/>
    <path d="M244 1L236 9.5" stroke={fillColor}/>
    <path d="M1 7L4 10" stroke={fillColor}/>
    <path d="M1 1L9 9.5" stroke={fillColor}/>
  </svg>
);

export default UploadDecorSvg; 