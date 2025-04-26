interface FlatShellProps {
  className?: string
  stroke: string
}

function FlatShell({ className, stroke }: FlatShellProps) {
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
        d='M17.8047 77.3933L17.8047 80.9999L36.6066 80.9999L36.6066 0.999877L17.8047 0.999878L17.8047 4.60644L13 4.60644L13 77.3933L17.8047 77.3933Z'
        stroke={stroke}
      />
      <path
        d='M36.6055 77.3933L36.6055 80.9999L17.8036 80.9999L17.8036 0.999877L36.6055 0.999878L36.6055 4.60644L41.4102 4.60644L41.4102 77.3933L36.6055 77.3933Z'
        stroke={stroke}
      />
      <path d='M17.8047 76.9999L17.8047 4.99988' stroke={stroke} />
      <path d='M0 41H54' stroke={stroke} strokeDasharray='2 4 6 8' />
      <path d='M17.8047 2L36.8047 13' stroke={stroke} strokeWidth='0.5' />
      <path d='M24.8047 1L36.8047 8' stroke={stroke} strokeWidth='0.5' />
      <path d='M32.8047 0.999999L36.8047 3' stroke={stroke} strokeWidth='0.5' />
      <path d='M17.8047 7L36.8047 18' stroke={stroke} strokeWidth='0.5' />
      <path d='M17.8047 11.9999L36.8047 22.9999' stroke={stroke} strokeWidth='0.5' />
      <path d='M17.8047 17L36.8047 28' stroke={stroke} strokeWidth='0.5' />
      <path d='M17.8047 22L36.8047 33' stroke={stroke} strokeWidth='0.5' />
      <path d='M17.8047 27L36.8047 38' stroke={stroke} strokeWidth='0.5' />
      <path d='M17.8047 32L36.8047 43' stroke={stroke} strokeWidth='0.5' />
      <path d='M17.8047 37L36.8047 48' stroke={stroke} strokeWidth='0.5' />
      <path d='M17.8047 41.9999L36.8047 52.9999' stroke={stroke} strokeWidth='0.5' />
      <path d='M17.8047 47L36.8047 58' stroke={stroke} strokeWidth='0.5' />
      <path d='M17.8047 52L36.8047 63' stroke={stroke} strokeWidth='0.5' />
      <path d='M17.8047 57L36.8047 68' stroke={stroke} strokeWidth='0.5' />
      <path d='M17.8047 62L36.8047 73' stroke={stroke} strokeWidth='0.5' />
      <path d='M17.8047 67L36.8047 78' stroke={stroke} strokeWidth='0.5' />
      <path d='M17.8047 72L32.8047 81' stroke={stroke} strokeWidth='0.5' />
      <path d='M17.8031 77L24.8044 80.9999' stroke={stroke} strokeWidth='0.5' />
    </svg>
  )
}

export default FlatShell
