interface FlatMatrixProps {
  className?: string;
  stroke: string;
}

function FlatMatrix({ stroke }: FlatMatrixProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 87 78' style={{height: '60%'}}>
      <g clipPath='url(#a)'>
        <path
          stroke={stroke}
          strokeWidth='.8'
          d='M1.191 31.7c-2.828-6.2 2.41-12.824 8.2-12.4.672.05 1.7.3 1.7.3l20.9 4.1v-2.2h1.5l2.2-3.7-1.5-3.1v-.8h1l1.1 1.5s2.6 3.6 7 3.6c6.4 0 8.6-5.1 8.6-5.1h1v.8l-1.6 3.1 1.9 3.7h1.5v2.2l19-3.6s2.385-.52 3.9-.5c5.763.078 10.428 6.2 7.9 12.1-.52 1.214-.9 1.8-.9 1.8l-16.5 20.4v4.4h-1.6v19.1h-46.9V58.3h-1.4v-4.4l-15.9-20.4s-.758-1.05-1.1-1.8Z'
        />
        <path
          stroke={stroke}
          strokeWidth='.8'
          d='M43.591 19a9.3 9.3 0 1 0 0-18.6 9.3 9.3 0 0 0 0 18.6Z'
        />
        <mask
          id='b'
          width='13'
          height='47'
          x='54'
          y='26'
          maskUnits='userSpaceOnUse'
          style={{ maskType: 'luminance' }}
        >
          <path fill='#fff' d='M66.691 26.2h-12.4V73h12.4V26.2Z' />
        </mask>
        <g mask='url(#b)'>
          <path
            stroke={stroke}
            strokeWidth='.8'
            d='M64.892 49.2c0 11.94-9.412 21.6-21 21.6s-21-9.66-21-21.6c0-11.94 9.412-21.6 21-21.6s21 9.66 21 21.6Z'
          />
        </g>
        <mask
          id='c'
          width='14'
          height='47'
          x='19'
          y='26'
          maskUnits='userSpaceOnUse'
          style={{ maskType: 'luminance' }}
        >
          <path fill='#fff' d='M32.092 26.2h-12.2V73h12.2V26.2Z' />
        </mask>
        <g mask='url(#c)'>
          <path
            stroke={stroke}
            strokeWidth='.8'
            d='M64.691 49.199c0 11.816-9.668 21.4-21.6 21.4-11.932 0-21.6-9.584-21.6-21.4 0-11.816 9.668-21.4 21.6-21.4 11.932 0 21.6 9.584 21.6 21.4Z'
          />
        </g>
        <path stroke={stroke} strokeWidth='.8' d='M32.09 23.6h22.6v50.2h-22.6V23.6Z' />
        <path stroke={stroke} strokeWidth='.8' d='M32.09 30.6h22.6v37h-22.6v-37Z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M.001 0h86.594v77.8H.001z' />
        </clipPath>
      </defs>
    </svg>
  );
}

export default FlatMatrix;
