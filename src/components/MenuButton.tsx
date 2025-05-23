import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks/useTheme.js'
import { getLocalThemeColor } from '../theme/utils.js'

interface MenuButtonProps {
  className: string
  onToggle: (isOpen: boolean) => void
  state: boolean
}

export default function MenuButton({ className, onToggle, state }: MenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const theme = useTheme()
  const isDark = theme.name === 'dark'
  
  const textColor = getLocalThemeColor(isDark, '#FFFFFF', '#2A3242')
  
  const genericHamburgerLine = `h-[4px] w-[24px] my-[3px] transition ease transform duration-300
  ${isDark ? 'bg-white' : 'bg-[#2A3242]'}`
  const handleToggle = () => {
    setIsOpen(!isOpen)
    onToggle(!isOpen)
  }

  useEffect(() => {
    setIsOpen(state)
  }, [state])

  return (
    <div className={`${className} flex items-center`} onClick={handleToggle}>
      <button className='flex flex-col h-[24px] w-[24px] justify-center items-center group'>
        <div
          className={`${genericHamburgerLine} ${
            isOpen ? 'rotate-45 translate-y-[5px] group-hover:opacity-100' : 'group-hover:opacity-100'
          }`}
        />
        <div
          className={`${genericHamburgerLine} ${
            isOpen ? '-rotate-45 -translate-y-[5px] group-hover:opacity-100' : 'group-hover:opacity-100'
          }`}
        />
      </button>
      <span className={`font-labgrotesque text-[20px] text-[${textColor}] ml-3`}>{t('navBar.menu')}</span>
    </div>
  )
}
