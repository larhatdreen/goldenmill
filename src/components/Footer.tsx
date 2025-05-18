import logo from '../assets/UI/logo.svg'
import GeoPinIcon from './customIcons/GeoPinIcon'
import MessageIcon from './customIcons/MessageIcon'
import PhoneIcon from './customIcons/PhoneIcon'
import InstagramIcon from './customIcons/InstagramIcon'
import YouTubeIcon from './customIcons/YouTubeIcon'
import LinkedinIcon from './customIcons/LinkedinIcon'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getURLWithLang } from '../functions/get-url-with-lang'
import { LanguagesEnum } from './translation/i18n'
import { useTheme } from '../hooks/useTheme'
import { getColor } from '../theme/utils';
import { scrollToTop } from '../utils/scrollToTop';


function Footer() {
  const { t } = useTranslation()
  const { lang } = useParams<{ lang: LanguagesEnum }>()
  const theme = useTheme();
  const isDark = theme.name === 'dark';

  return (
    <footer className={`mt-auto w-full bottom-0 cursor-default`}
    style={{
      backgroundColor: getColor(theme, 'footer.background')
    }}
    >
      <div className='w-full px-[30px] py-[50px] lg:px-[100px] flex flex-wrap justify-between items-start gap-y-5 gap-x-5 '>
        <div className='w-auto flex items-start'>
          <img id='logo' src={logo} alt='logo' className='w-full cursor-pointer' onClick={() => scrollToTop(1000)} />
        </div>
        <div className='w-auto flex flex-col justify-between'>
          <div className='font-labgrotesquebold font-bold text-[28px]'
            style={{
              color: isDark ? '#5A5A5B' : '#A5A5A4'
            }}
            >
            {t('footer.requisites.title')}
          </div>
          <div className='font-adventprolight text-[20px] leading-tight mt-3'
          style={{
            color: getColor(theme, 'footer.text')
          }}
          >
            <div>{t('footer.requisites.companyName')}</div>
            <div>{t('footer.requisites.vat')}</div>
            <div>{t('footer.requisites.bank')}</div>
            <div>{t('footer.requisites.swift')}</div>
            <div>{t('footer.requisites.konto')}</div>
          </div>
        </div>
        <div className='w-auto flex flex-col justify-between'
          >
          <div className='font-labgrotesquebold font-bold text-[28px]'
            style={{
              color: isDark ? '#5A5A5B' : '#A5A5A4'
            }}>
              {t('footer.contacts.title')}
          </div>
          <div
            className={`font-adventprolight text-[20px] flex flex-row items-center cursor-pointer group mt-3
            ${isDark ? 'text-[#D5CDBD] hover:text-[#82653E]' : 'text-[#2A3242] hover:text-[#7D9AC1]'}`}
          >
            <span className="relative flex items-center justify-center w-[35px] h-[35px] mr-3">
              <span
                className={`absolute w-full h-full rounded-full transition-all duration-200
                  ${isDark ? 'bg-[#292A2C]' : 'bg-[#D6D5D3]'}
                  opacity-0 group-hover:opacity-100 pointer-events-none`}
              />
              <GeoPinIcon className={`w-[25px] z-10 transition-colors duration-200 ${isDark ? 'text-[#544B3D] group-hover:text-[#82653E]' : 'text-[#ABB4C2] group-hover:text-[#2A3242]'}`} />
            </span>
            {t('footer.contacts.geo')}
          </div>
          <div
            className={`font-adventprolight text-[20px] flex flex-row items-center cursor-pointer group
            ${isDark ? 'text-[#D5CDBD] hover:text-[#82653E]' : 'text-[#2A3242] hover:text-[#7D9AC1]'}`}
          >
            <span className="relative flex items-center justify-center w-[35px] h-[35px] mr-3">
              <span
                className={`absolute w-full h-full rounded-full transition-all duration-200
                  ${isDark ? 'bg-[#292A2C]' : 'bg-[#D6D5D3]'}
                  opacity-0 group-hover:opacity-100 pointer-events-none`}
              />
              <MessageIcon className={`w-[25px] z-10 transition-colors duration-200 ${isDark ? 'text-[#544B3D] group-hover:text-[#82653E]' : 'text-[#ABB4C2] group-hover:text-[#2A3242]'}`} />
            </span>
            {t('footer.contacts.email')}
          </div>
          <div
            className={`font-adventprolight text-[20px] flex flex-row items-center cursor-pointer group
            ${isDark ? 'text-[#D5CDBD] hover:text-[#82653E]' : 'text-[#2A3242] hover:text-[#7D9AC1]'}`}
          >
            <span className="relative flex items-center justify-center w-[35px] h-[35px] mr-3">
              <span
                className={`absolute w-full h-full rounded-full transition-all duration-200
                  ${isDark ? 'bg-[#292A2C]' : 'bg-[#D6D5D3]'}
                  opacity-0 group-hover:opacity-100 pointer-events-none`}
              />
              <PhoneIcon className={`w-[25px] z-10 transition-colors duration-200 ${isDark ? 'text-[#544B3D] group-hover:text-[#82653E]' : 'text-[#ABB4C2] group-hover:text-[#2A3242]'}`} />
            </span>
            {t('footer.contacts.phone')}
          </div>
        </div>
        <div className='w-auto flex flex-col'>
          <div className='font-labgrotesquebold font-bold text-[28px]'
          style={{
            color: isDark ? '#5A5A5B' : '#A5A5A4'
          }}
          >
            {t('footer.social.title')}
          </div>
          
          <div className='flex flex-row items-center mt-3'>
            <InstagramIcon className='mr-7 hover:scale-125 transition-transform cursor-pointer' />
            <LinkedinIcon className='mr-6 hover:scale-125 transition-transform cursor-pointer' />
            <YouTubeIcon className='mr-7 hover:scale-125 transition-transform cursor-pointer' />
          </div>
        </div>
      </div>

      <div
        className='flex flex-wrap items-center justify-around w-full h-[15%] 
           font-labgrotesque font-light lg:px-[100px] px-[30px] py-[20px] text-base gap-y-5 gap-x-10 '
        style={{
          backgroundColor: getColor(theme, 'footer.bottom'),
        }}
      >
        <span className={`text-start ${isDark ? 'text-[#767676]' : 'text-[#898989]'}`}>
          {t('subFooter.copyright')}
        </span>
        <Link to={getURLWithLang('serviceinformation', lang!)} onClick={(e) => {
          if (!e.ctrlKey && !e.metaKey) {
            scrollToTop(1000);
          }
        }}>
          <span className={`text-start ${isDark ? 'text-[#767676] hover:text-[#D5CDBD]' : 'text-[#898989] hover:text-[#2A3242]'}`}>
            {t('subFooter.serviceInfo')}
          </span>
        </Link>
        <Link to={getURLWithLang('privacypolicy', lang!)} onClick={(e) => {
          if (!e.ctrlKey && !e.metaKey) {
            scrollToTop(1000);
          }
        }}>
          <span className={`text-end ${isDark ? 'text-[#767676] hover:text-[#D5CDBD]' : 'text-[#898989] hover:text-[#2A3242]'}`}>
            {t('subFooter.privacyPolicy')}
          </span>
        </Link>
      </div>
    </footer>
  )
}
export default Footer
