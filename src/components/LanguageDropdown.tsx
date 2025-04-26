import { useEffect, useState, useRef } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { lang } = useParams<{ lang: string }>()
  const [selectedLanguage, setSelectedLanguage] = useState(lang || 'de')
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const navigate = useNavigate()
  const { i18n } = useTranslation()

  const languages = ['de', 'en', 'ru']

  // Синхронизация с URL при изменении параметра lang
  useEffect(() => {
    if (lang && lang !== selectedLanguage) {
      setSelectedLanguage(lang)
    }
  }, [lang])

  // Обработчик клика вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Обработка смены языка
  const handleLanguageChange = (language: string) => {
    if (lang !== language) {
      // Меняем язык в i18n
      i18n.changeLanguage(language)
      
      // Обновляем URL
      const currentPath = window.location.pathname
      const newPath = currentPath.replace(`/${lang}`, `/${language}`)
      navigate(newPath, { replace: true })
      
      // Закрываем дропдаун
      setIsOpen(false)
      setSelectedLanguage(language)
    }
  }

  return (
    <div 
      ref={dropdownRef}
      className='relative text-navUnselect text-center min-w-[50px] cursor-pointer'
    >
      <div 
        className='text-xl text-navSelect uppercase flex items-center gap-1'
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLanguage}
        <ArrowDropDownIcon className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <ul className="absolute z-10 w-full flex flex-col items-center right-0 mt-2 
                      bg-[#ffffff08] rounded-[10px] backdrop-blur-[19px] backdrop-brightness-[100%] 
                      [-webkit-backdrop-filter:blur(19px)_brightness(100%)]
                      animate-fade-down">
          {languages.map(language => (
            <li
              key={language}
              className={`w-full py-2 hover:bg-[#ffffff15] transition-colors ${
                language === selectedLanguage ? 'text-navSelect' : ''
              }`}
              onClick={() => handleLanguageChange(language)}
            >
              {language}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LanguageDropdown
