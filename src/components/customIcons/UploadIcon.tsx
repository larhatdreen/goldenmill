import { useTheme } from '../../hooks/useTheme'; 
interface UploadIconProps {
  className?: string
  style?: React.CSSProperties
}

function UploadIcon({ className, style,}: UploadIconProps) {
  const theme = useTheme();
  const isDark = theme.name === 'dark';
  const fillColor = isDark ? '#5D5D5D' : '#CFCDCB';
  const pinColor = isDark ? '#FFFFFF' : '#8E8E8E';

  return (
    <svg className='w-8 h-8 md:w-10 md:h-10 lg:w-[45px] lg:h-[45px]' viewBox='0 0 45 45' fill='none' xmlns='http://www.w3.org/2000/svg' style={style}>
      <circle className={className} cx='22.5' cy='22.5' r='22.5' fill={fillColor} />
      <path
        d='M13.5625 30.6488C15.636 32.774 18.9993 32.774 21.0828 30.6488L32.1648 19.335C33.5935 17.8879 33.5935 15.5401 32.1648 14.093C30.7461 12.6358 28.4444 12.6358 27.0256 14.093L15.9337 25.3967C15.1697 26.1759 15.1697 27.4409 15.9337 28.2201C16.6976 29.0094 17.9377 29.0094 18.7017 28.2201L27.8094 18.9302C27.9185 18.829 27.9185 18.6368 27.8193 18.5254C27.7102 18.4242 27.5217 18.4242 27.4225 18.5356L18.3148 27.8254C17.7592 28.382 16.8861 28.382 16.3305 27.8254C15.7749 27.2587 15.7749 26.3682 16.3305 25.8015L27.4225 14.4877C28.6229 13.2531 30.5675 13.2531 31.7779 14.4877C32.9883 15.7223 32.9883 17.7057 31.7779 18.9302L20.6859 30.244C18.8207 32.1465 15.8245 32.1465 13.9593 30.244C12.0842 28.3415 12.0842 25.2854 13.9593 23.3829L23.0571 14.093C23.1663 13.9817 23.1663 13.7894 23.067 13.6781C22.9579 13.5769 22.7694 13.5769 22.6702 13.6882L13.5625 22.9781C11.479 25.0931 11.479 28.5237 13.5625 30.6488Z'
        fill={pinColor}
      />
    </svg>
  )
}

export default UploadIcon
