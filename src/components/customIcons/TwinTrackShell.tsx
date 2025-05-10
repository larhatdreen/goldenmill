interface TwinTrackShellProps {
  className?: string
  stroke: string
}

function TwinTrackShell({ className, stroke }: TwinTrackShellProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="76" viewBox="0 0 47 76" fill="none" className={className}>
      <circle cx="23.4191" cy="37.8" r="4.2" stroke={stroke} stroke-width="1.2" />
      <path d="M46.3995 67.6V72H0.999512V67.6H3.99951L8.39951 60.2V52.8L6.21939 49C6.21939 49 4.81939 37.4 4.81939 35.6C4.81939 32.4 14.2194 1 14.2194 1L32.8194 1C32.8194 1 43.3995 32.4 43.3995 35.6C43.3995 37.4 41.0194 49.6 41.0194 49.6L39.5995 52.2V60.2L43.3995 67.6H46.3995Z" stroke={stroke} stroke-width="0.8" />
      <circle cx="23.9995" cy="37" r="19" stroke={stroke} stroke-width="2" />
    </svg>
  )
}

export default TwinTrackShell
