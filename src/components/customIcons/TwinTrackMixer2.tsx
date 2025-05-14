interface TwinTrackMixer2Props {
  className?: string
  stroke: string
}

function TwinTrackMixer2({ className, stroke }: TwinTrackMixer2Props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="104" viewBox="0 0 47 104" fill="none" className={className}>
      <path d="M23.2098 103.5H0.509766V90.9996V86.5996H3.50977L7.90977 79.1996V71.7996L5.72964 67.9996C5.72964 67.9996 4.32964 56.3996 4.32964 54.5996C4.32964 53.3037 7.70583 40.7958 7.70583 40.7958L5.72964 36L4.32964 22.4996L13.7296 1H32" stroke={stroke} stroke-width="0.8" />
      <path d="M22.9999 103.5H45.7V90.9996V86.5996H42.7L38.2999 79.1996V71.7996L40.4801 67.9996C40.4801 67.9996 41.8801 56.3996 41.8801 54.5996C41.8801 53.3037 38.5039 40.7958 38.5039 40.7958L40.4801 35.5L41.8801 22.4996L32.4801 1H13.4998" stroke={stroke} stroke-width="0.8" />
      <g clip-path="url(#clip0_87_2247)">
        <circle cx="22.8" cy="26.8" r="4.2" stroke={stroke} stroke-width="1.2" />
        <path d="M33.9343 42C38.8131 38.6147 42 33.0251 42 26.7028C42 16.3735 33.4934 8 23 8C12.5066 8 4 16.3735 4 26.7028C4 33.0251 7.18692 38.6147 12.0657 42" stroke={stroke} stroke-width="2" />
      </g>
      <g clip-path="url(#clip1_87_2247)">
        <path d="M12.0657 40C7.18693 43.3853 4 48.9749 4 55.2972C4 65.6265 12.5066 74 23 74C33.4934 74 42 65.6265 42 55.2972C42 48.9749 38.8131 43.3853 33.9343 40" stroke={stroke} stroke-width="2" />
        <circle cx="22.8" cy="56.8" r="4.2" stroke={stroke} stroke-width="1.2" />
      </g>
    </svg>
  )
}

export default TwinTrackMixer2
