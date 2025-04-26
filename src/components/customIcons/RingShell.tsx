interface RingShellProps {
  className?: string
  stroke: string
}

function RingShell({ className, stroke }: RingShellProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='68'
      height='82'
      viewBox='0 0 68 82'
      fill='none'
      className={className}
    >
      <path d='M53 0.999998L14 1L14 81L53 81L53 0.999998Z' stroke={stroke} />
      <path d='M0 41H68' stroke={stroke} strokeDasharray='2 4 6 8' />
      <path d='M53 3.00012H14' stroke={stroke} strokeWidth='0.5' />
      <path d='M53 33.0001H14' stroke={stroke} strokeWidth='0.5' />
      <path d='M53 18.0001H14' stroke={stroke} strokeWidth='0.5' />
      <path d='M53 73.0001H14' stroke={stroke} strokeWidth='0.5' />
      <path d='M53 48.0001H14' stroke={stroke} strokeWidth='0.5' />
      <path d='M53 8.00012H14' stroke={stroke} strokeWidth='0.5' />
      <path d='M53 63.0001H14' stroke={stroke} strokeWidth='0.5' />
      <path d='M53 38.0001H14' stroke={stroke} strokeWidth='0.5' />
      <path d='M53 23.0001H14' stroke={stroke} strokeWidth='0.5' />
      <path d='M53 78.0001H14' stroke={stroke} strokeWidth='0.5' />
      <path d='M53 53.0001H14' stroke={stroke} strokeWidth='0.5' />
      <path d='M53 13.0001H14' stroke={stroke} strokeWidth='0.5' />
      <path d='M53 68.0001H14' stroke={stroke} strokeWidth='0.5' />
      <path d='M53 43.0001H14' stroke={stroke} strokeWidth='0.5' />
      <path d='M53 28.0001H14' stroke={stroke} strokeWidth='0.5' />
      <path d='M53 58.0001H14' stroke={stroke} strokeWidth='0.5' />
    </svg>
  )
}

export default RingShell
