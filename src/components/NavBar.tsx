import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import DropdownMenu from './Dropdown.js'
import LanguageDropdown from './LanguageDropdown.js'
import { useCallback, useEffect, useState, useRef } from 'react'
import MenuButton from './MenuButton.js'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useTranslation } from 'react-i18next'
import { getURLWithLang } from '../functions/get-url-with-lang.js'
import { ParamsType } from './NavigateProvider.js'
import ThemeToggle from './ThemeToggle'
// import { Snackbar, Alert } from '@mui/material'
import { useTheme } from '../hooks/useTheme.js'

export default function NavBar() {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const { lang } = useParams<ParamsType>()
  const [mobileLanguage, setMobileLanguage] = useState(lang || 'de')
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  // const [snackbarOpen, setSnackbarOpen] = useState(false)
  const theme = useTheme()
  const isDark = theme.name === 'dark'
  const menuRef = useRef<HTMLDivElement>(null)

  const languages = ['de', 'en', 'ru']
  
  const handleMenuToggle = (isOpen: boolean) => {
    setMenuIsOpen(isOpen)
  }

  useEffect(() => {
    if (lang && lang !== mobileLanguage) {
      setMobileLanguage(lang)
    }
  }, [lang])

  useEffect(() => {
    onClickLanguage()
  }, [mobileLanguage])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    // Проверяем, что клик не по меню и не по MenuButton
    if (
      menuRef.current &&
      !menuRef.current.contains(target) &&
      !target.closest('.menu-toggle-btn')
    ) {
      setMenuIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (menuIsOpen) {
      document.addEventListener('mousedown', handleClickOutside, { passive: true });
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [menuIsOpen, handleClickOutside]);

  const onClickLanguage = () => {
    if (lang !== mobileLanguage) {
      i18n.changeLanguage(mobileLanguage)
      
      const currentPath = window.location.pathname
      const newPath = currentPath.replace(`/${lang}`, `/${mobileLanguage}`)
      navigate(newPath, { replace: true })
    }
  }

  // const handleThemeChange = () => {
  //   setSnackbarOpen(true)
  // }

  // const handleSnackbarClose = () => {
  //   setSnackbarOpen(false)
  // }

  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === 'granulator' && location.pathname === `/${lang}`) return true;
    return location.pathname.includes(`/${lang}/${path}`);
  };

  return (
    <>
      <nav className='absolute top-0 left-0 right-0 z-[999]'>
        <div className='w-full h-[80px] flex flex-row justify-between items-center px-[3%] py-[28px]'>
          <Link to={getURLWithLang('granulator', lang!)} className="flex-shrink-0">
            <img alt='logo' className="w-full content-[url('/logo_mini.svg')] tablet:content-[url('/logo.svg')] " />
          </Link>

          {/* Desktop Menu */}
          <ul className={`hidden lg:flex lg:flex-row text-xl cursor-pointer shrink-0 gap-x-6 items-center font-labgrotesque
            ${isDark ? 'text-[#767676]' : 'text-[#767676]'}
          `}>
            <Link to={getURLWithLang('granulator', lang!)}>
              <li className={`ease-out duration-300 ${
                isActive('granulator') 
                  ? isDark ? 'text-[#D5CDBD]' : 'text-[#2A3242]'
                  : isDark ? 'hover:text-[#D5CDBD]' : 'hover:text-[#2A3242]'
              }`}>
                {t('navBar.main')}
              </li>
            </Link>
            <DropdownMenu close={dropdownIsOpen} open={state => setDropdownIsOpen(state)} />
            <Link to={getURLWithLang('about', lang!)}>
              <li className={`ease-out duration-300 ${
                isActive('about') 
                  ? isDark ? 'text-[#D5CDBD]' : 'text-[#2A3242]'
                  : isDark ? 'hover:text-[#D5CDBD]' : 'hover:text-[#2A3242]'
              }`}>
                {t('navBar.about')}
              </li>
            </Link>
            <Link to={getURLWithLang('contacts', lang!)}>
              <li className={`ease-out duration-300 ${
                isActive('contacts') 
                  ? isDark ? 'text-[#D5CDBD]' : 'text-[#2A3242]'
                  : isDark ? 'hover:text-[#D5CDBD]' : 'hover:text-[#2A3242]'
              }`}>
                {t('navBar.contacts')}
              </li>
            </Link>
            <div className="flex items-center gap-4 ml-6 md:ml-[15px] lg:ml-[30px] xl:ml-[125px]">
              <ThemeToggle/> {/* // deleted onToggle={handleThemeChange}  */}
              <LanguageDropdown />
            </div>
          </ul>

          {/* Mobile Menu Button */}
          <div className='lg:hidden flex items-center gap-4'>
            <div className="flex items-center gap-4">
              <ThemeToggle/> {/* // deleted onToggle={handleThemeChange}  */}
              <div className="flex items-center gap-2">
                {languages.map(language => (
                  <button
                    key={language}
                    className={`uppercase px-2 py-1 text-sm rounded transition-all ${
                      language === mobileLanguage
                        ? isDark
                          ? 'text-[#D5CDBD] bg-[#D5CDBD]/10'
                          : 'text-[#2A3242] bg-[#2A3242]/10'
                        : isDark
                          ? 'text-[#605C54] hover:text-[#D5CDBD] hover:bg-[#D5CDBD]/5'
                          : 'text-[#605C54] hover:text-[#2A3242] hover:bg-[#2A3242]/5'
                    }`}
                    onClick={() => setMobileLanguage(language)}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>
            <MenuButton className='flex items-center menu-toggle-btn' onToggle={handleMenuToggle} state={menuIsOpen} />
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          ref={menuRef}
          className={`${
            menuIsOpen ? 'block' : 'hidden'
          } lg:hidden top-[80px] left-0 right-0 bg-[#1A1A1A] backdrop-blur-md border-b border-t border-[#D5CDBD]/10`}
        >
          <ul className={`flex flex-col text-xl text-navUnselect p-6 space-y-4 ${isDark ? 'bg-[#373739]' : 'bg-[#F2F1F0]'} font-labgrotesque`}>
            <Link to={getURLWithLang('/', lang!)}>
              <li
                className={`py-3 ease-out duration-300 ${
                  isActive('granulator') 
                    ? isDark ? 'text-[#D5CDBD]' : 'text-[#2A3242]'
                    : isDark ? 'hover:text-[#D5CDBD]' : 'hover:text-[#2A3242]'
                }`}
                onClick={() => setMenuIsOpen(false)}
              >
                {t('navBar.main')}
              </li>
            </Link>
            <details className='group'>
              <summary className={`flex items-center py-3 gap-2 marker:content-none hover:cursor-pointer ${
                isDark ? 'hover:text-[#D5CDBD]' : 'hover:text-[#2A3242]'
              }`}>
                <span>{t('navBar.products')}</span>
                <ArrowDropDownIcon className='transition group-open:rotate-180' />
              </summary>
              <article>
                <ul className='flex flex-col gap-3 pl-6'>
                  <Link to={getURLWithLang('granulator', lang!)}>
                    <li
                      className={`py-2 transition-colors ${
                        isActive('granulator') 
                          ? isDark ? 'text-[#D5CDBD]' : 'text-[#2A3242]'
                          : isDark ? 'hover:text-[#D5CDBD]' : 'hover:text-[#2A3242]'
                      }`}
                      onClick={() => setMenuIsOpen(false)}
                    >
                      {t('granulator')}
                    </li>
                  </Link>
                  <Link to={getURLWithLang('mixer', lang!)}>
                    <li
                      className={`py-2 transition-colors ${
                        isActive('mixer') 
                          ? isDark ? 'text-[#D5CDBD]' : 'text-[#2A3242]'
                          : isDark ? 'hover:text-[#D5CDBD]' : 'hover:text-[#2A3242]'
                      }`}
                      onClick={() => setMenuIsOpen(false)}
                    >
                      {t('mixer')}
                    </li>
                  </Link>
                  <Link to={getURLWithLang('spare-parts', lang!)}>
                    <li
                      className={`py-2 transition-colors ${
                        isActive('spare-parts') 
                          ? isDark ? 'text-[#D5CDBD]' : 'text-[#2A3242]'
                          : isDark ? 'hover:text-[#D5CDBD]' : 'hover:text-[#2A3242]'
                      }`}
                      onClick={() => setMenuIsOpen(false)}
                    >
                      {t('nav.spareParts')}
                    </li>
                  </Link>
                </ul>
              </article>
            </details>
            <Link to={getURLWithLang('about', lang!)} className='shrink-0'>
              <li
                className={`py-3 ease-out duration-300 ${
                  isActive('about') 
                    ? isDark ? 'text-[#D5CDBD]' : 'text-[#2A3242]'
                    : isDark ? 'hover:text-[#D5CDBD]' : 'hover:text-[#2A3242]'
                }`}
                onClick={() => setMenuIsOpen(false)}
              >
                {t('navBar.about')}
              </li>
            </Link>
            <Link to={getURLWithLang('contacts', lang!)}>
              <li
                className={`py-3 ease-out duration-300 ${
                  isActive('contacts') 
                    ? isDark ? 'text-[#D5CDBD]' : 'text-[#2A3242]'
                    : isDark ? 'hover:text-[#D5CDBD]' : 'hover:text-[#2A3242]'
                }`}
                onClick={() => setMenuIsOpen(false)}
              >
                {t('navBar.contacts')}
              </li>
            </Link>
          </ul>
        </div>
      </nav>
      
      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-[80px]" />

      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="info"
          sx={{ 
            bgcolor: 'rgba(36, 36, 36, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(213, 205, 189, 0.1)',
            color: '#D5CDBD',
            '& .MuiAlert-icon': {
              color: '#D5CDBD'
            }
          }}
        >
          {t('common.inDevelopment')}
        </Alert>
      </Snackbar> */}
    </>
  )
}
