import { useTheme } from '../../hooks/useTheme';
import { getLocalThemeColor } from '../../theme/utils';

interface GranulatorModelProps {
  className?: string;
}

function GranulatorModel({ className }: GranulatorModelProps) {
  const theme = useTheme();
  const isDark = theme.name === 'dark';
  const stroke = getLocalThemeColor(isDark, '#82643F', '#ABB4C3');

  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 88 91' className={className} style={{height: '60%'}}>
      <path
        stroke={stroke}
        strokeWidth='.8'
        d='M1.79 44.5c-2.828-6.2 2.41-12.825 8.2-12.4.672.05 1.7.3 1.7.3l20.9 4.1v-2.2h1.5l2.2-3.7v-3.7L35.2 25s-.7-5.8-.7-6.7c0-1.6 4.7-17.3 4.7-17.3h9.3s5.29 15.7 5.29 17.3c0 .9-1.19 7-1.19 7l-.71 1.3v4l1.9 3.7h1.5v2.2l19-3.6s2.384-.52 3.9-.5c5.762.078 10.428 6.2 7.9 12.1-.52 1.215-.9 1.8-.9 1.8l-16.5 20.4v4.4h-1.6v19.1h-46.9V71.1h-1.4v-4.4L2.89 46.3s-.758-1.05-1.1-1.8Z'
      />
      <circle cx='43.8' cy='19.4' r='2.1' stroke={stroke} strokeWidth='.6' />
      <circle cx='44' cy='19.8' r='9.7' stroke={stroke} strokeWidth='2.2' />
      <g clipPath='url(#a)'>
        <path
          stroke={stroke}
          strokeWidth='.8'
          d='M44.49 40.4c11.588 0 21 9.66 21 21.6 0 11.94-9.412 21.6-21 21.6-11.587 0-21-9.66-21-21.6 0-11.94 9.413-21.6 21-21.6Z'
        />
      </g>
      <g clipPath='url(#b)'>
        <path
          stroke={stroke}
          strokeWidth='.8'
          d='M43.69 40.6c11.932 0 21.599 9.584 21.6 21.399 0 11.815-9.668 21.4-21.6 21.4-11.933 0-21.6-9.585-21.6-21.4 0-11.815 9.667-21.4 21.6-21.4Z'
        />
      </g>
      <path stroke={stroke} strokeWidth='.8' d='M32.69 36.398h22.6v50.2h-22.6v-50.2Z' />
      <path stroke={stroke} strokeWidth='.8' d='M32.69 43.398h22.6v37h-22.6v-37Z' />
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M54.89 39h12.4v46.8h-12.4z' />
        </clipPath>
        <clipPath id='b'>
          <path fill='#fff' d='M20.49 39h12.2v46.8h-12.2z' />
        </clipPath>
      </defs>
    </svg>
  );
}

export default GranulatorModel;
