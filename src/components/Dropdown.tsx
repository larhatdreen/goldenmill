import { useEffect, useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ParamsType } from './NavigateProvider'
import { getURLWithLang } from '../functions/get-url-with-lang'

const DropdownMenu = ({ close, open }: { close: boolean; open: (state: boolean) => void }) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [parentWidth, setParentWidth] = useState(0)
  const { lang } = useParams<ParamsType>()
  const location = useLocation()

  const options = [t('dieMatrix'), t('rollerShell'), t('nav.spareParts')]

  // Helper function to check if products section is active
  const isProductsActive = () => {
    return location.pathname.includes('/matrix') || 
           location.pathname.includes('/shell') || 
           location.pathname.includes('/spare-parts') ||
           location.pathname === `/${lang}`;
  };

  // Helper function to check if specific product type is active
  const isProductTypeActive = (type: string) => {
    if (type === t('dieMatrix')) {
      return location.pathname.includes('/matrix') || location.pathname === `/${lang}`;
    }
    if (type === t('rollerShell')) {
      return location.pathname.includes('/shell');
    }
    if (type === t('nav.spareParts')) {
      return location.pathname.includes('/spare-parts');
    }
    return false;
  };

  useEffect(() => {
    const element = document.querySelector('.products')
    const elementWidth = element!.clientWidth
    const element1 = document.querySelector('.products1') as HTMLElement
    element1.style.width = `${elementWidth}px`
    setParentWidth(elementWidth)
  }, [open])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const selectItem = () => {
    toggleMenu()
  }

  useEffect(() => {
    if (close) {
      setIsOpen(false)
    }
  }, [close])

  document.addEventListener('hashchange', () => {
    console.log('location changed!')
  })

  return (
    <>
      <div
        className={`products relative shrink-0 z-10 pl-3 pr-0 rounded-t-lg cursor-pointer 
                ease-out duration-500 ${isOpen ? ' animate-duration-500' : ''} 
                ${isProductsActive() ? 'text-navSelect' : 'hover:text-navSelect'}`}
        onClick={() => {
          toggleMenu()
          open(isOpen)
        }}
      >
        {t('navBar.products')}
        <ArrowDropDownIcon />
        <div
          className={`${isOpen ? 'visible' : 'hidden'} absolute -z-[1] left-0 bg-dropdown rounded-b-lg 
                pt-5 pb-1  animate-duration-500 animate-fade-down`}
          style={{ width: `${parentWidth}px` }}
        >
          <div className={`products1 absolute -top-[35px] w-[${parentWidth}px] h-[35px] rounded-t-lg bg-dropdown`} />
          {options.map(option => (
            <Link
              to={option === t('dieMatrix') 
                ? getURLWithLang('matrix', lang!) 
                : option === t('rollerShell')
                ? getURLWithLang('shell', lang!)
                : getURLWithLang('spare-parts', lang!)}
              key={option}
            >
              <div
                className={`before:content-[''] before:absolute before:left-0 before:w-[1px] before:h-[27px] hover:bg-[#ffffff20]
                            cursor-pointer py-2 pl-6 text-base ${
                              isProductTypeActive(option) ? 'text-[#FFFFFF] before:bg-white' : ''
                            }`}
                onClick={() => selectItem()}
              >
                {option}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default DropdownMenu
