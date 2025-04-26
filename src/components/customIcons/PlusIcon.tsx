interface PlusIconProps {
  className?: string
}

function PlusIcon({ className }: PlusIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='42'
      height='52'
      viewBox='0 0 42 52'
      fill='none'
      className={className}
    >
      <path d='M21.5 19.5V33.5' stroke='#82653E' strokeWidth='1.8' strokeLinecap='round' />
      <path d='M28.5 26.5L14.5 26.5' stroke='#82653E' strokeWidth='1.8' strokeLinecap='round' />
      <rect x='7.9' y='12.9' width='27.2' height='28.2' rx='6.1' stroke='#82653E' strokeWidth='1.8' />
    </svg>
  )
}

export default PlusIcon
