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
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 87 72' className={className} style={{height: '60%'}}>
      <g clipPath='url(#a)'>
        <path
          stroke={stroke}
          strokeWidth='.8'
          d='M1.188 25.1c-2.82-6.2 2.4-12.82 8.2-12.4.68.04 1.7.3 1.7.3l20.9 4.1v-2.2h1.5l2.2-3.7V8.8l-1.08-1.3V2c0-1.6 4-1.6 4-1.6h9.3s4.1 0 4.1 1.6v5.5l-.7 1.3v2.4l1.9 3.7h1.5v2.2l19-3.6s2.38-.52 3.9-.5c5.76.08 10.42 6.2 7.9 12.1-.52 1.22-.9 1.8-.9 1.8l-16.5 20.4v4.4h-1.6v19.1h-46.92V51.7h-1.4v-4.4l-15.9-20.4s-.76-1.06-1.1-1.8Z'
        />
        <path
          stroke={stroke}
          strokeWidth='.6'
          d='M39.489 7.5a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2ZM47.288 7.5a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z'
        />
        <mask
          id='b'
          width='13'
          height='48'
          x='54'
          y='19'
          maskUnits='userSpaceOnUse'
          style={{ maskType: 'luminance' }}
        >
          <path fill='#fff' d='M66.69 19.6h-12.4v46.8h12.4V19.6Z' />
        </mask>
        <g mask='url(#b)'>
          <path
            stroke={stroke}
            strokeWidth='.8'
            d='M64.889 42.6c0 11.94-9.42 21.6-21 21.6s-21-9.66-21-21.6c0-11.94 9.42-21.6 21-21.6s21 9.66 21 21.6Z'
          />
        </g>
        <mask
          id='c'
          width='14'
          height='48'
          x='19'
          y='19'
          maskUnits='userSpaceOnUse'
          style={{ maskType: 'luminance' }}
        >
          <path fill='#fff' d='M32.089 19.6h-12.2v46.8h12.2V19.6Z' />
        </mask>
        <g mask='url(#c)'>
          <path
            stroke={stroke}
            strokeWidth='.8'
            d='M64.688 42.6c0 11.82-9.66 21.4-21.6 21.4-11.94 0-21.6-9.58-21.6-21.4 0-11.82 9.66-21.4 21.6-21.4 11.94 0 21.6 9.58 21.6 21.4Z'
          />
        </g>
        <path stroke={stroke} strokeWidth='.8' d='M32.068 17h22.6v50.2h-22.6V17Z' />
        <path stroke={stroke} strokeWidth='.8' d='M32.068 24h22.6v37h-22.6V24Z' />
        <path fill={stroke} d='M51.389 10.8h-16v.6h16v-.6Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h86.608v71.2H0z' />
        </clipPath>
      </defs>
    </svg>
  );
}

export default GranulatorModel;
