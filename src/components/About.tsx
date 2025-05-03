import LogoIcon from './about/LogoIcon.js';
import Arrow from './about/Arrow.js';
import TimeLine from './about/TimeLine.js';
import { useMediaQuery } from '@mui/material';
import history_ru from '../assets/UI/history_ru.png';
import history_de from '../assets/UI/history_de.png';
import history_en from '../assets/UI/history_en.png';
import SEO from './SEO';
import { useSEO } from '../hooks/useSEO';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { text } from 'express';

export default function About() {
  const isLG = useMediaQuery('(min-width:1120px)');
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const seoData = useSEO('about');
  const isDark = useSelector((state: RootState) => state.theme.shadowTheme);

  const textColor = isDark ? '#ACACAC' : '#535353';
  const fillСolor = isDark ? '#3f4042' : '#c0bfbd';
  const bgColor = isDark ? '#292A2C' : '#F8F8F9';
  const decorativeColor = isDark ? '#2E3032' : '#F2F2F2';
  const titleColor = isDark ? '#D5CDBD' : '#82653F';
  const subTitleColor = isDark ? '#D5CDBD' : '#2A3242';
  const particleColor = isDark ? '#82643F' : '#ABB4C3';
  const svgFillArrow = isDark ? '#3F4042' : '#C0BFBD';

  const darkLogoColor = isDark ? '#2D2D2D' : '#E8E8E8';
  const lightLogoColor = isDark ? '#343637' : '#F6F6F6';

  return (
    <>
      <SEO title={seoData.title} description={seoData.description} keywords={seoData.keywords} />
      <section
        className='w-full h-auto px-[30px] md:px-[100px] gap-y-6'
        style={{
          display: !isLG ? 'flex' : '',
          flexDirection: !isLG ? 'column' : 'row',
          backgroundColor: bgColor,
        }}
      >
        <div className={`${!isLG ? 'hidden' : ''} w-full h-[1100px]`}>
          <Arrow fillColor={svgFillArrow} />
          <div
            className='absolute left-[200px] top-[225px] w-[271px] h-[271px] rounded-full flex justify-center items-center'
            style={{ backgroundColor: decorativeColor }}
          >
            <LogoIcon
              mainColor={darkLogoColor}
              secondaryColor={lightLogoColor}
              crossColor={isDark ? lightLogoColor : darkLogoColor}
            />
          </div>
          <div
            className='absolute left-[200px] top-[810px] w-[271px] h-[271px] rounded-full flex justify-center items-center'
            style={{ backgroundColor: decorativeColor }}
          >
            <LogoIcon
              mainColor={darkLogoColor}
              secondaryColor={lightLogoColor}
              crossColor={isDark ? lightLogoColor : darkLogoColor}
            />
          </div>
          <span
            className="absolute w-[258px] left-[208px] top-[116px] font-['Bebas_Neue'] text-[17px] tracking-widest text-center"
            style={{ color: fillСolor }}
          >
            {t('about.about.descriptionBg')}
          </span>
          <span
            className="absolute w-[258px] left-[208px] top-[654px] font-['Bebas_Neue'] text-[17px] tracking-widest text-center"
            style={{ color: fillСolor }}
          >
            {t('about.history.descriptionBg')}
          </span>
          <div className='absolute left-[200px] top-[235px] flex flex-col items-start'>
            <div className='flex items-start'>
              <div className='w-[24px] h-[63px]' style={{ backgroundColor: particleColor }} />
              <span
                className="relative left-[12px] font-['Bebas_Neue'] text-[60px] md:text-[70px] lg:text-[80px] leading-[100%]"
                style={{ color: titleColor }}
              >
                {t('about.about.title')}
              </span>
            </div>
            <span
              className='relative left-[42px] md:text-[24px] lg:text-[26px] font-[AdventProLight] text-[29px] uppercase'
              style={{ color: subTitleColor }}
            >
              {t('about.about.description')}
            </span>
          </div>
          <div className='absolute left-[200px] top-[835px] flex flex-col items-start'>
            <div className='flex items-start'>
              <div className='w-[24px] h-[63px]' style={{ backgroundColor: particleColor }} />
              <span
                className="relative left-[12px] font-['Bebas_Neue'] text-[60px] md:text-[70px] lg:text-[80px] whitespace-nowrap leading-[100%]"
                style={{ color: titleColor }}
              >
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
              <div className='w-[24px] h-[63px]' style={{ backgroundColor: particleColor }} />
              <span
                className='relative left-[10px] font-bebas text-[60px] md:text-[70px] lg:text-[80px]'
                style={{ color: titleColor }}
              >
                {t('about.about.title')}
              </span>
            </div>
            <span
              className='relative text-[20px] md:text-[24px] lg:text-[26px] font-adventpro'
              style={{ color: subTitleColor }}
            >
              {t('about.about.description')}
            </span>
          </div>
        )}

        <div
          className='right-0 w-1/2 font-adventpro text-[18px] md:text-[22px] lg:text-[24px]  whitespace-pre-wrap'
          style={{
            width: !isLG ? '100%' : '50%',
            marginTop: !isLG ? '' : '223px ',
            marginRight: !isLG ? '' : '100px',
            paddingLeft: !isLG ? '' : '110px',
            position: !isLG ? 'static' : 'absolute',
            top: !isLG ? '' : '0',
            right: !isLG ? '' : '0',
            color: textColor,
          }}
        >
          {t('about.about.text')}
        </div>

        {isLG && (
          <TimeLine
            smallCircleColor={isDark ? '#82643F' : '#7D9BC0'}
            bigCircleColor={isDark ? '#2E3032' : '#D1CFCD'}
            wandColor={isDark ? '#82643F' : '#7D9BC0'}
            mainDirectFillColor={isDark ? '#212325' : '#DEDCDA'}
            mainSidesColor={isDark ? '#383838' : '#C7C7C7'}
            mainArrowOnLineColor={isDark ? '#82643F' : ''}
            textYearColor={isDark ? '#82643F' : '#7D9BC0'}
            textOnLineColor={isDark ? '#737373' : ''}
            textUnderLogoColor={isDark ? '#969284' : '#696D7B'}
            lktColor={'#235C82'}
            dieColor={'#605C54'}
            millColor={'#82653E'}
            logosDecorativeUpArrowColor={isDark ? '#4390BD' : '#4391BB'}
            logosDecorativeDownArrowColor={isDark ? '#265C84' : '#1D5781'}
          />
        )}

        {!isLG && (
          <div className='flex flex-col items-start'>
            <div className='flex items-center gap-x-4'>
              <div className='w-[24px] h-[63px]' style={{ backgroundColor: particleColor }} />
              <span
                className='relative font-bebas text-[60px] md:text-[70px] lg:text-[80px]'
                style={{ color: titleColor }}
              >
                {t('about.history.title')}
              </span>
            </div>
            <div
              className=' font-adventpro text-[20px] md:text-[24px] lg:text-[26px] whitespace-nowrap'
              style={{ color: subTitleColor }}
            >
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
  );
}
