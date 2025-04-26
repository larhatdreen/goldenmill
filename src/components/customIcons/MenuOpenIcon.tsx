import React from 'react'

interface MenuOpenIconProps extends React.SVGProps<SVGSVGElement> {
  className: string
}
function MenuOpenIcon({ ...props }: MenuOpenIconProps) {
  return (
    <svg
      className={props.className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M0 8H24.5' stroke='white' strokeWidth='4' />
      <path d='M0 17H24.5' stroke='white' strokeWidth='4' />
    </svg>
  )
}

export default MenuOpenIcon
