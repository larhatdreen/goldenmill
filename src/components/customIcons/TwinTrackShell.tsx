interface TwinTrackShellProps {
  className?: string
  stroke: string
}

function TwinTrackShell({ className, stroke }: TwinTrackShellProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='67'
      height='82'
      viewBox='0 0 67 82'
      fill='none'
      className={className}
    >
      <path
        d='M26.5002 78.5L12.5 78.5L12.5 3.49996L26.5002 3.49995M26.5002 78.5L26.5002 81L41.5002 81L41.5002 78.5M26.5002 78.5L26.5002 3.49995M26.5002 3.49995L26.5002 0.999999L41.5002 0.999999L41.5002 3.49995M41.5002 3.49995L55 3.49995L55 78.5L41.5002 78.5M41.5002 3.49995L41.5002 78.5'
        stroke={stroke}
      />
      <path d='M41 3L27 3' stroke={stroke} strokeWidth='0.5' />
      <path d='M41 8L27 8' stroke={stroke} strokeWidth='0.5' />
      <path d='M41 13L27 13' stroke={stroke} strokeWidth='0.5' />
      <path d='M41 18L27 18' stroke={stroke} strokeWidth='0.5' />
      <path d='M41 23L27 23' stroke={stroke} strokeWidth='0.5' />
      <path d='M41 28L27 28' stroke={stroke} strokeWidth='0.5' />
      <path d='M41 33L27 33' stroke={stroke} strokeWidth='0.5' />
      <path d='M41 38L27 38' stroke={stroke} strokeWidth='0.5' />
      <path d='M41 43L27 43' stroke={stroke} strokeWidth='0.5' />
      <path d='M41 48L27 48' stroke={stroke} strokeWidth='0.5' />
      <path d='M41 53L27 53' stroke={stroke} strokeWidth='0.5' />
      <path d='M41 58L27 58' stroke={stroke} strokeWidth='0.5' />
      <path d='M41 63L27 63' stroke={stroke} strokeWidth='0.5' />
      <path d='M41 68L27 68' stroke={stroke} strokeWidth='0.5' />
      <path d='M41 73L27 73' stroke={stroke} strokeWidth='0.5' />
      <path d='M41 78L27 78' stroke={stroke} strokeWidth='0.5' />
      <path d='M0 41H67' stroke={stroke} strokeDasharray='2 4 6 8' />
    </svg>
  )
}

export default TwinTrackShell
