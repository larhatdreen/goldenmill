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
import { useTheme } from '../hooks/useTheme';
import { getColor, getThemeStyles, getLocalThemeColor } from '../theme/utils';


export default function About() {
  const isLG = useMediaQuery('(min-width:1120px)');
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const seoData = useSEO('about');
  const theme = useTheme();
  const styles = getThemeStyles(theme);
  const isDark = theme.name === 'dark';

  // Определяем для стилизации TimeLine локально
  const timelineStyles = {
    smallCircle: getLocalThemeColor(isDark, '#82643F', '#7D9BC0'),
    bigCircle: getLocalThemeColor(isDark, '#2E3032', '#D1CFCD'),
    wand: getLocalThemeColor(isDark, '#82643F', '#7D9BC0'),
    mainDirectFill: getLocalThemeColor(isDark, '#212325', '#DEDCDA'),
    mainSides: getLocalThemeColor(isDark, '#383838', '#C7C7C7'),
    mainArrowOnLine: getLocalThemeColor(isDark, '#82643F', ''),
    textYear: getLocalThemeColor(isDark, '#82643F', '#7D9BC0'),
    textOnLine: getLocalThemeColor(isDark, '#737373', ''),
    textUnderLogo: getLocalThemeColor(isDark, '#969284', '#696D7B'),
    logosDecorativeUpArrow: getLocalThemeColor(isDark, '#4390BD', '#4391BB'),
    logosDecorativeDownArrow: '#1D5781',
    lkt: '#235C82',
    die: '#605C54',
    mill: '#82653F',
  };

  return (
    <>
      <SEO title={seoData.title} description={seoData.description} keywords={seoData.keywords} />
      <section
        className='w-full h-auto px-[30px] md:px-[100px] gap-y-6'
        style={{
          display: !isLG ? 'flex' : '',
          flexDirection: !isLG ? 'column' : 'row',
          ...styles.background,
        }}
      >
        <div className={`${!isLG ? 'hidden' : ''} w-full h-[1100px]`}>
          <Arrow fillColor={getColor(theme, 'svg.fill')} />
          <div
            className='absolute left-[200px] top-[225px] w-[271px] h-[271px] rounded-full flex justify-center items-center'
            style={styles.decorative}
          >
            <LogoIcon
              mainColor={getColor(theme, 'svg.darkColor')}
              secondaryColor={getColor(theme, 'svg.lightColor')}
              crossColor={getColor(theme, 'svg.crossColor')}
            />
          </div>
          <div
            className='absolute left-[200px] top-[810px] w-[271px] h-[271px] rounded-full flex justify-center items-center'
            style={styles.decorative}
          >
            <LogoIcon
              mainColor={getColor(theme, 'svg.darkColor')}
              secondaryColor={getColor(theme, 'svg.lightColor')}
              crossColor={getColor(theme, 'svg.crossColor')}
            />
          </div>
          <span
            className="absolute w-[258px] left-[208px] top-[116px] font-['Bebas_Neue'] text-[17px] tracking-widest text-center"
            style={{ color: getColor(theme, 'svg.fill') }}
          >
            {t('about.about.descriptionBg')}
          </span>
          <span
            className="absolute w-[258px] left-[208px] top-[654px] font-['Bebas_Neue'] text-[17px] tracking-widest text-center"
            style={{ color: getColor(theme, 'svg.fill') }}
          >
            {t('about.history.descriptionBg')}
          </span>
          <div className='absolute left-[200px] top-[235px] flex flex-col items-start'>
            <div className='flex items-start'>
              <div
                className='w-[24px] h-[63px]'
                style={styles.particle}
              />
              <span
                className="relative left-[12px] font-['Bebas_Neue'] text-[60px] md:text-[70px] lg:text-[80px] leading-[100%]"
                style={styles.title}
              >
                {t('about.about.title')}
              </span>
            </div>
            <span
              className='relative left-[42px] md:text-[24px] lg:text-[26px] font-[AdventProLight] text-[29px] uppercase'
              style={styles.subtitle}
            >
              {t('about.about.description')}
            </span>
          </div>
          <div className='absolute left-[200px] top-[835px] flex flex-col items-start'>
            <div className='flex items-start'>
              <div
                className='w-[24px] h-[63px]'
                style={styles.particle}
              />
              <span
                className="relative left-[12px] font-['Bebas_Neue'] text-[60px] md:text-[70px] lg:text-[80px] whitespace-nowrap leading-[100%]"
                style={styles.title}
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
              <div
                className='w-[24px] h-[63px]'
                style={styles.particle}
              />
              <span
                className='relative left-[10px] font-bebas text-[60px] md:text-[70px] lg:text-[80px]'
                style={styles.title}
              >
                {t('about.about.title')}
              </span>
            </div>
            <span
              className='relative text-[20px] md:text-[24px] lg:text-[26px] font-adventpro'
              style={styles.subtitle}
            >
              {t('about.about.description')}
            </span>
          </div>
        )}

        <div
          className='right-0 w-1/2 font-adventpro text-[18px] md:text-[22px] lg:text-[24px] whitespace-pre-wrap'
          style={{
            width: !isLG ? '100%' : '50%',
            marginTop: !isLG ? '' : '223px ',
            marginRight: !isLG ? '' : '100px',
            paddingLeft: !isLG ? '' : '110px',
            position: !isLG ? 'static' : 'absolute',
            top: !isLG ? '' : '0',
            right: !isLG ? '' : '0',
            ...styles.text,
          }}
        >
          {t('about.about.text')}
        </div>

        {isLG && <TimeLine colors={timelineStyles} />}

        {!isLG && (
          <div className='flex flex-col items-start'>
            <div className='flex items-center gap-x-4'>
              <div
                className='w-[24px] h-[63px]'
                style={styles.particle}
              />
              <span
                className='relative font-bebas text-[60px] md:text-[70px] lg:text-[80px]'
                style={styles.text}
              >
                {t('about.history.title')}
              </span>
            </div>
            <div
              className='font-adventpro text-[20px] md:text-[24px] lg:text-[26px] whitespace-nowrap'
              style={styles.subtitle}
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
