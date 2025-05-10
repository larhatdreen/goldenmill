interface RingShellProps {
  className?: string
  stroke: string
}

function RingShell({ className, stroke }: RingShellProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="67" height="41" viewBox="0 0 67 41" fill="none" className={className}>
      <path d="M18.6679 26.7069C22.8672 26.7069 26.2713 23.3027 26.2713 19.1034C26.2713 14.9042 22.8672 11.5 18.6679 11.5C14.4686 11.5 11.0645 14.9042 11.0645 19.1034C11.0645 23.3027 14.4686 26.7069 18.6679 26.7069Z" stroke={stroke} stroke-width="0.6" />
      <path d="M46.9096 26.7069C51.1089 26.7069 54.513 23.3027 54.513 19.1034C54.513 14.9042 51.1089 11.5 46.9096 11.5C42.7103 11.5 39.3062 14.9042 39.3062 19.1034C39.3062 23.3027 42.7103 26.7069 46.9096 26.7069Z" stroke={stroke} stroke-width="0.6" />
      <path d="M4.90986 31.4138V40.1035H61.465V31.4138C61.465 31.4138 66 29.2594 66 26.7069V6.7931C66 1 49.1547 1 49.1547 1H15.4823C15.4823 1 0.5 1 0.5 6.7931V26.7069C0.499971 29.2258 4.90986 31.4138 4.90986 31.4138Z" stroke={stroke} stroke-width="0.8" />
    </svg>
  )
}

export default RingShell
