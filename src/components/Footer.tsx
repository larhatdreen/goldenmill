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

function Footer() {
  const { t } = useTranslation()
  const { lang } = useParams<{ lang: LanguagesEnum }>()

  function scrollToTop(duration: number) {
    if (document.scrollingElement!.scrollTop === 0) return

    const cosParameter = document.scrollingElement!.scrollTop / 2
    let scrollCount = 0
    let oldTimestamp: number | null = null

    function step(newTimestamp: number) {
      if (oldTimestamp !== null) {
        scrollCount += (Math.PI * (newTimestamp - oldTimestamp)) / duration
        if (scrollCount >= Math.PI) return (document.scrollingElement!.scrollTop = 0)
        document.scrollingElement!.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount)
      }
      oldTimestamp = newTimestamp
      window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
  }

  return (
    <footer className='mt-auto w-full bg-footerBase opacity-60 bottom-0 cursor-default'>
      <div className='w-full px-[30px] py-[50px] lg:px-[100px] flex flex-wrap justify-between items-start gap-y-5 gap-x-5 '>
        <div className='w-auto flex items-start'>
          <img id='logo' src={logo} alt='logo' className='w-full cursor-pointer' onClick={() => scrollToTop(1000)} />
        </div>
        <div className='w-auto flex flex-col justify-between'>
          <div className='font-labgrotesquebold font-bold text-[28px] text-navUnselect'>
            {t('footer.requisites.title')}
          </div>
          <div className='font-adventprolight text-navSelect text-[20px] leading-tight'>
            {t('footer.requisites.companyName')}
            <br />
            {t('footer.requisites.vat')}
            <br />
            {t('footer.requisites.bank')}
            <br />
            {t('footer.requisites.swift')}
            <br />
            {t('footer.requisites.konto')}
          </div>
        </div>
        <div className='w-auto flex flex-col justify-between'>
          <div className='font-labgrotesquebold font-bold text-[28px] text-navUnselect'>
            {t('footer.contacts.title')}
          </div>
          <div className='font-adventprolight text-navSelect hover:text-gold_ text-[20px] flex flex-row items-center'>
            <GeoPinIcon className='mr-3 w-[25px] h-[25px]' />
            {t('footer.contacts.geo')}
          </div>
          <div className='font-adventprolight text-navSelect hover:text-gold_ text-[20px] flex flex-row items-center'>
            <MessageIcon className='mr-3 w-[25px]' />
            {t('footer.contacts.email')}
          </div>
          <div className='font-adventprolight text-navSelect hover:text-gold_ text-[20px] flex flex-row items-center'>
            <PhoneIcon className='mr-3 w-[25px]' />
            {t('footer.contacts.phone')}
          </div>
        </div>
        <div className='w-auto'>
          <div className='font-labgrotesquebold font-bold text-[28px] text-navUnselect'>{t('footer.social.title')}</div>
          <br />
          <div className='flex flex-row items-center'>
            <InstagramIcon className='mr-7 hover:scale-125 transition-transform' />
            <LinkedinIcon className='mr-6 hover:scale-125 transition-transform' />
            <YouTubeIcon className='mr-7 hover:scale-125 transition-transform' />
          </div>
        </div>
      </div>

      <div
        className='flex flex-wrap items-center justify-around w-full h-[15%] bg-footerBottom
            text-footerBottomText font-labgrotesque font-light lg:px-[100px] px-[30px] py-[20px] text-base gap-y-5 gap-x-10 '
      >
        <span className='text-start'>{t('subFooter.copyright')}</span>
        <Link to={getURLWithLang('serviceinformation', lang!)} onClick={() => scrollToTop(1000)}>
          <span className='text-start hover:text-navSelect'>{t('subFooter.serviceInfo')}</span>
        </Link>

        <Link to={getURLWithLang('privacypolicy', lang!)} onClick={() => scrollToTop(1000)}>
          <span className='text-end hover:text-navSelect'>{t('subFooter.privacyPolicy')}</span>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
