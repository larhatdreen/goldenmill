import LogoIcon from './about/LogoIcon.js'
import Arrow from './about/Arrow.js'
import TimeLine from './about/TimeLine.js'
import { useMediaQuery } from '@mui/material'
import history_ru from '../assets/UI/history_ru.png'
import history_de from '../assets/UI/history_de.png'
import history_en from '../assets/UI/history_en.png'
import SEO from './SEO'
import { useSEO } from '../hooks/useSEO'
import { useTranslation } from 'react-i18next'

export default function About() {
  const isLG = useMediaQuery('(min-width:1120px)')
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language
  const seoData = useSEO('about');

  return (
    <>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />
      <section
        className='w-full h-auto px-[30px] md:px-[100px] gap-y-6'
        style={{
          display: !isLG ? 'flex' : '',
          flexDirection: !isLG ? 'column' : 'row',
        }}
      >
        <div className={`${!isLG ? 'hidden' : ''} w-full h-[1100px]`}>
          <Arrow />
          <div className='absolute left-[200px] top-[225px] w-[271px] h-[271px] bg-[#2E3032] rounded-full flex justify-center items-center'>
            <LogoIcon />
          </div>
          <div className='absolute left-[200px] top-[810px] w-[271px] h-[271px] bg-[#2E3032] rounded-full flex justify-center items-center'>
            <LogoIcon />
          </div>
          <span className="absolute w-[258px] left-[208px] top-[116px] font-['Bebas_Neue'] text-[17px] text-[#3F4042] tracking-widest text-center">
            {t('about.about.descriptionBg')}
          </span>
          <span className="absolute w-[258px] left-[208px] top-[654px] font-['Bebas_Neue'] text-[17px] text-[#3F4042] tracking-widest text-center">
            {t('about.history.descriptionBg')}
          </span>
          <div className='absolute left-[200px] top-[235px] flex flex-col items-start'>
            <div className='flex items-start'>
              <div className='w-[24px] h-[63px] bg-[#82643F]' />
              <span className="relative left-[12px] font-['Bebas_Neue'] text-[60px] md:text-[70px] lg:text-[80px] text-[#D5CDBD] leading-[100%]">
                {t('about.about.title')}
              </span>
            </div>
            <span className="relative left-[42px] md:text-[24px] lg:text-[26px] font-[AdventProLight] text-[29px] text-[#D5CDBD] uppercase">
              {t('about.about.description')}
            </span>
          </div>
          <div className='absolute left-[200px] top-[835px] flex flex-col items-start'>
            <div className='flex items-start'>
              <div className='w-[24px] h-[63px] bg-[#82643F]' />
              <span className="relative left-[12px] font-['Bebas_Neue'] text-[60px] md:text-[70px] lg:text-[80px] text-[#D5CDBD] whitespace-nowrap leading-[100%]">
                {t('about.history.title')}
              </span>
            </div>
            {/* <div className='relative font-adventpro left-[30px]  text-[20px] md:text-[24px] lg:text-[26px] text-[#D5CDBD] whitespace-nowrap'>
              {t('about.history.description')}
            </div> */}
          </div>
        </div>

        {!isLG && (
          <div className='flex flex-col items-start'>
            <div className='flex items-center gap-x-4'>
              <div className='w-[24px] h-[63px] bg-[#544B3C]' />
              <span className='relative left-[10px] font-bebas text-[60px] md:text-[70px] lg:text-[80px] text-[#544B3C]'>
                {t('about.about.title')}
              </span>
            </div>
            <span className='relative text-[20px] md:text-[24px] lg:text-[26px] font-adventpro text-[#D5CDBD]'>
              {t('about.about.description')}
            </span>
          </div>
        )}

        <div
          className='right-0 w-1/2 font-adventpro text-[18px] md:text-[22px] lg:text-[24px] text-[#ACACAC] whitespace-pre-wrap'
          style={{
            width: !isLG ? '100%' : '50%',
            marginTop: !isLG ? '' : '223px ',
            marginRight: !isLG ? '' : '100px',
            paddingLeft: !isLG ? '' : '110px',
            position: !isLG ? 'static' : 'absolute',
            top: !isLG ? '' : '0',
            right: !isLG ? '' : '0',
          }}
        >
          {t('about.about.text')}
        </div>

        {isLG && <TimeLine />}

        {!isLG && (
          <div className='flex flex-col items-start'>
            <div className='flex items-center gap-x-4'>
              <div className='w-[24px] h-[63px] bg-[#544B3C]' />
              <span className='relative font-bebas text-[60px] md:text-[70px] lg:text-[80px] text-[#544B3C]'>
                {t('about.history.title')}
              </span>
            </div>
            <div className=' font-adventpro text-[20px] md:text-[24px] lg:text-[26px] text-[#D5CDBD] whitespace-nowrap'>
              {t('about.history.description')}
            </div>
          </div>
        )}

        {!isLG && currentLanguage === 'ru' && (
          <div className='h-auto'>
            <img src={history_ru} alt='' className='h-full w-auto' />
          </div>
        )}
        {!isLG && currentLanguage === 'de' && (
          <div className='h-auto'>
            <img src={history_de} alt='' className='h-full w-auto' />
          </div>
        )}
        {!isLG && currentLanguage === 'en' && (
          <div className='h-auto'>
            <img src={history_en} alt='' className='h-full w-auto' />
          </div>
        )}
      </section>
    </>
  )
}
