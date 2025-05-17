import { useEffect, useState, useRef } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { LOCAL_STORAGE_LANGUAGE_KEY, LanguagesEnum } from './translation/i18n'

// Безопасное получение языка из localStorage
const getStoredLanguage = (): LanguagesEnum | null => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const stored = window.localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY)
    if (stored && Object.values(LanguagesEnum).includes(stored as LanguagesEnum)) {
      return stored as LanguagesEnum
    }
  }
  return null
}

// Безопасное сохранение языка в localStorage
const setStoredLanguage = (language: LanguagesEnum): void => {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, language)
  }
}

const getCurrentPath = () => {
  if (typeof window === 'undefined') return '';
  return window.location.pathname;
}

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { lang } = useParams<{ lang: string }>()
  const [selectedLanguage, setSelectedLanguage] = useState<LanguagesEnum>(() => {
    // Сначала проверяем localStorage
    const savedLanguage = getStoredLanguage()
    // Если есть сохраненный язык, используем его, иначе используем язык из URL или дефолтный
    return savedLanguage || (lang as LanguagesEnum) || LanguagesEnum.ENGLISH
  })
  const dropdownRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()
  const isDark = theme.name === 'dark'
  
  const navigate = useNavigate()
  const { i18n } = useTranslation()

  const languages = Object.values(LanguagesEnum)

  // Синхронизация с URL при изменении параметра lang
  useEffect(() => {
    if (lang && lang !== selectedLanguage && Object.values(LanguagesEnum).includes(lang as LanguagesEnum)) {
      setSelectedLanguage(lang as LanguagesEnum)
      setStoredLanguage(lang as LanguagesEnum)
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
  const handleLanguageChange = (language: LanguagesEnum) => {
    if (lang !== language) {
      // Меняем язык в i18n
      i18n.changeLanguage(language)
      
      // Сохраняем выбранный язык в localStorage
      setStoredLanguage(language)
      
      // Обновляем URL
      const currentPath = getCurrentPath()
      const pathParts = currentPath.split('/')
      const newPath = currentPath.replace(`/${pathParts[1]}`, `/${language}`)
      navigate(newPath, { replace: true })
      
      // Закрываем дропдаун
      setIsOpen(false)
      setSelectedLanguage(language)
    }
  }

  useEffect(() => {
    const currentPath = getCurrentPath();
    const pathParts = currentPath.split('/');
    if (pathParts[1] && Object.values(LanguagesEnum).includes(pathParts[1] as LanguagesEnum)) {
      setSelectedLanguage(pathParts[1] as LanguagesEnum);
    }
  }, []);

  return (
    <div 
      ref={dropdownRef}
      className='relative text-center min-w-[50px] cursor-pointer'
    >
      <div 
        className='text-xl uppercase flex items-center gap-1'
        style={{ color: isDark ? '#F1F1F1' : '#0E0E0E' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLanguage}
        <ArrowDropDownIcon className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <ul className="absolute z-10 left-0 mt-2 w-max min-w-full flex flex-col rounded-[10px] backdrop-blur-[19px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(19px)_brightness(100%)] animate-fade-down">
          {languages.map(language => (
            <li
              key={language}
              className="py-2 transition-colors uppercase text-left w-full"
              style={{ color: '#767676' }}
              onMouseEnter={e => e.currentTarget.style.color = isDark ? '#F1F1F1' : '#2A3242'}
              onMouseLeave={e => e.currentTarget.style.color = '#767676'}
              onClick={() => handleLanguageChange(language as LanguagesEnum)}
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
