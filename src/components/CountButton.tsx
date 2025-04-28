import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface CountButtonProps extends React.HTMLProps<HTMLDivElement> {}
function CountButton({ ...props }: CountButtonProps) {
  const [filled, setFilled] = useState(false)
  const { t } = useTranslation()

  const handleMouseEnter = () => {
    setFilled(true)
  }

  const handleMouseLeave = () => {
    setFilled(false)
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
      style={{ backgroundImage: `url(${props.src})`, cursor: 'pointer' }}
    >
      {filled ? t('products.buttons.details') : props.defaultValue}
      <div
        className='absolute z-[-1] top-0 left-0 h-full bg-[#544B3C]'
        style={{ width: filled ? '100%' : '0%', transition: 'width 0.5s ease' }}
      />
      {/*<img className="absolute top-0 object-cover" src={props.src} alt="button"/>*/}
    </div>
  )
}

export default CountButton
