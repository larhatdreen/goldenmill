interface TwinTrackMatrixProps {
  className?: string
  stroke: string
}

function TwinTrackMatrix({ className, stroke }: TwinTrackMatrixProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='66'
      height='82'
      viewBox='0 0 66 82'
      fill='none'
      className={className}
    >
      <path
        d='M17.4185 77.3934L17.4185 81L45 81L45 78L52.5 78L52.5 3.5L45 3.5L45 0.999999L17.4185 1.00001L17.4185 4.60657L15.1967 4.60657L15.1967 10.1803L12.9016 10.1803L12.9016 72.1475L15.1967 72.1475L15.1967 77.3934L17.4185 77.3934Z'
        stroke={stroke}
      />
      <path d='M13 68L52 68' stroke={stroke} />
      <path d='M13 15L52 15' stroke={stroke} />
      <path d='M0 41H66' stroke={stroke} strokeDasharray='2 4 6 8' />
      <path d='M32.9016 1.00002L32.9016 14.7705' stroke={stroke} strokeWidth='0.5' />
      <path d='M41.9344 1.00002L41.9344 14.7705' stroke={stroke} strokeWidth='0.5' />
      <path d='M30.9344 1.00002L30.9344 14.7705' stroke={stroke} strokeWidth='0.5' />
      <path d='M39.9672 1.00002L39.9672 14.7705' stroke={stroke} strokeWidth='0.5' />
      <path d='M28.9672 1.00002L28.9672 14.7705' stroke={stroke} strokeWidth='0.5' />
      <path d='M38 1.00002L38 14.7705' stroke={stroke} strokeWidth='0.5' />
      <path d='M24.0328 1.00002L24.0328 14.7705' stroke={stroke} strokeWidth='0.5' />
      <path d='M22.0656 1.00002L22.0656 14.7705' stroke={stroke} strokeWidth='0.5' />
      <path d='M20.0984 1.00002L20.0984 14.7705' stroke={stroke} strokeWidth='0.5' />
      <path d='M32.9016 67.8852L32.9016 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M41.9344 67.8852L41.9344 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M30.9344 67.8852L30.9344 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M39.9672 67.8852L39.9672 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M28.9672 67.8852L28.9672 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M38 67.8852L38 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M24.0328 67.8852L24.0328 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M22.0656 67.8852L22.0656 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M20.0984 67.8852L20.0984 81' stroke={stroke} strokeWidth='0.5' />
    </svg>
  )
}

export default TwinTrackMatrix
