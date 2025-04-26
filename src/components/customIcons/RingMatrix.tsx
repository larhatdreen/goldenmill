interface RingMatrixProps {
  className?: string
  stroke: string
}

function RingMatrix({ className, stroke }: RingMatrixProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='54'
      height='82'
      viewBox='0 0 54 82'
      fill='none'
      className={className}
    >
      <path
        d='M17.4185 77.3934L17.4185 81L38.8033 81L38.8033 0.999999L17.4185 1L17.4185 4.60656L15.1967 4.60656L15.1967 77.3934L17.4185 77.3934Z'
        stroke={stroke}
      />
      <path d='M15.5246 70.8361L38.8033 70.8361' stroke={stroke} />
      <path d='M15.5246 11.4918L38.8033 11.4918' stroke={stroke} />
      <path d='M-1.90735e-06 41H54' stroke={stroke} strokeDasharray='2 4 6 8' />
      <path d='M36.8361 1.00002L36.8361 11.4918' stroke={stroke} strokeWidth='0.5' />
      <path d='M34.8688 1.00002L34.8688 11.4918' stroke={stroke} strokeWidth='0.5' />
      <path d='M32.9016 1.00002L32.9016 11.4918' stroke={stroke} strokeWidth='0.5' />
      <path d='M30.9344 1.00002L30.9344 11.4918' stroke={stroke} strokeWidth='0.5' />
      <path d='M28.9672 1.00002L28.9672 11.4918' stroke={stroke} strokeWidth='0.5' />
      <path d='M27 1.00002L27 11.4918' stroke={stroke} strokeWidth='0.5' />
      <path d='M25.0328 1.00002L25.0328 11.4918' stroke={stroke} strokeWidth='0.5' />
      <path d='M23.0656 1.00002L23.0656 11.4918' stroke={stroke} strokeWidth='0.5' />
      <path d='M21.0983 1.00002L21.0983 11.4918' stroke={stroke} strokeWidth='0.5' />
      <path d='M19.1311 1.00002L19.1311 11.4918' stroke={stroke} strokeWidth='0.5' />
      <path d='M36.8361 70.5082L36.8361 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M34.8688 70.5082L34.8688 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M32.9016 70.5082L32.9016 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M30.9344 70.5082L30.9344 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M28.9672 70.5082L28.9672 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M27 70.5082L27 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M25.0328 70.5082L25.0328 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M23.0656 70.5082L23.0656 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M21.0983 70.5082L21.0983 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M19.1311 70.5082L19.1311 81' stroke={stroke} strokeWidth='0.5' />
    </svg>
  )
}

export default RingMatrix
