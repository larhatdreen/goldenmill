import React from 'react'

interface AnimatedCircleProps extends React.SVGProps<SVGSVGElement> {
  x: string
  y: string
  stroke: string
}

function AnimatedCircle(props: AnimatedCircleProps) {
  return (
    <svg {...props} width='70' height='70' viewBox='0 0 70 70' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M49.0536 5.49057C56.0818 8.92072 61.6375 14.7702 64.7013 21.9657C67.765 29.1613 68.1314 37.2203 65.7331 44.6641C63.3349 52.1079 58.3328 58.4373 51.6448 62.491C44.9568 66.5447 37.0313 68.0508 29.3225 66.733C21.6136 65.4151 14.6386 61.3617 9.67697 55.3165C4.71537 49.2712 2.10003 41.6396 2.31081 33.8218C2.52158 26.004 5.54433 18.5244 10.8244 12.7553C16.1046 6.98615 23.2879 3.31447 31.0565 2.41391'
        stroke={props.stroke}
        strokeWidth='2'
        strokeDasharray='2 2'
      >
        <animateTransform
          attributeName='transform'
          type='rotate'
          from='0 35 35'
          to='360 35 35'
          begin='0s'
          dur='10s'
          repeatCount='indefinite'
        />
      </path>
    </svg>
  )
}

export default AnimatedCircle
