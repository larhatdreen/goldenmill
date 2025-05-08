import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks/useTheme'

interface CountButtonProps extends Omit<React.HTMLProps<HTMLDivElement>, 'src'> {
  src: React.ReactElement;
  defaultValue?: string;
}

function CountButton({ src, defaultValue, ...props }: CountButtonProps) {
  const [filled, setFilled] = useState(false)
  const { t } = useTranslation()
  const theme = useTheme()

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
      style={{ 
        cursor: 'pointer',
        position: 'relative',
        color: theme.colors.mui.form.button.text,
        fontSize: '22px'
      }}
    >
      {React.cloneElement(src, { className: 'absolute inset-0 w-full h-full z-0' })}
      <div
        className='absolute top-0 left-0 h-full z-10'
        style={{ 
          width: filled ? '100%' : '0%', 
          transition: 'width 0.5s ease',
          backgroundColor: theme.colors.mui.form.button.slider
        }}
      />
      <span className="relative z-20">
        {filled ? t('products.buttons.details') : defaultValue}
      </span>
    </div>
  )
}

export default CountButton
