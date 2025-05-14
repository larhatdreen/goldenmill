interface FlatMixerProps {
  className?: string
  stroke: string
}

function FlatMixer({ className, stroke }: FlatMixerProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="61" viewBox="0 0 60 61" fill="none" className={className}>
      <path d="M0.999512 54.9126V60.5338H58.9995V54.9126H55.1669L50.3123 45.4589L54.4004 37.5382V35.4941H51.8453C51.8453 35.4941 46.2242 48.525 29.8718 48.525C18.6295 48.525 11.9863 39.3267 11.9863 39.3267L9.17572 35.4941H6.62065V37.5382L10.4533 45.4589L4.83211 54.9126H0.999512Z" stroke={stroke} stroke-width="0.8" />
      <path d="M30.6383 48.5242C43.7618 48.5242 54.4004 37.8856 54.4004 24.7621C54.4004 11.6387 43.7618 1 30.6383 1C17.5149 1 6.87622 11.6387 6.87622 24.7621C6.87622 37.8856 17.5149 48.5242 30.6383 48.5242Z" stroke={stroke} stroke-width="0.8" />
    </svg>
  )
}

export default FlatMixer
