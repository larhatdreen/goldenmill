import SEO from './SEO';
import { useSEO } from '../hooks/useSEO';
import Arrow from './about/Arrow.js';
import LogoIcon from './customIcons/LogoIcon.js';
import Map from './contacts/Map.js';
import { useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { getColor, getLocalThemeColor } from '../theme/utils';

export default function Contacts() {
  const seoData = useSEO('contacts');
  const isLG = useMediaQuery('(min-width:1150px)');
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.name === 'dark';

  // Определяем для стилизации Map локально
  const mapStyles = {
    title: getLocalThemeColor(isDark, '#82653E', '#7D9AC1'),
    outline: getLocalThemeColor(isDark, '', '#292828'),
    invertMap: getLocalThemeColor(isDark, '0', '1'),
  };

  return (
    <>
      <SEO title={seoData.title} description={seoData.description} keywords={seoData.keywords} />
      <section
        className='w-full h-auto px-[30px] md:px-[100px] gap-y-6'
      >
        <div className={`${!isLG ? 'hidden' : ''}`}>
          <Arrow fillColor={getColor(theme, 'svg.fill')} />
          <div
            className='absolute left-[200px] top-[225px] w-[271px] h-[271px] rounded-full flex justify-center items-center'
            style={{ backgroundColor: getColor(theme, 'decorative') }}
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
            {t('contacts.descriptionBg')}
          </span>
          <span
            className="absolute w-[258px] left-[208px] top-[654px] font-['Bebas_Neue'] text-[17px] tracking-widest text-center"
            style={{ color: getColor(theme, 'svg.fill') }}
          >
            {t('contacts.descriptionBg1')}
          </span>

          <div className='absolute left-[200px] top-[200px] flex flex-col items-start'>
            <div className='flex items-start'>
              <div className='w-[24px] h-[63px]' style={{ backgroundColor: getColor(theme, 'particle') }} />
              <span
                className="relative left-[12px] font-['Bebas_Neue'] text-[60px] md:text-[70px] lg:text-[80px] leading-[100%]"
                style={{ color: getColor(theme, 'title') }}
              >
                {t('contacts.title')}
              </span>
            </div>
            <span
              className='relative left-[40px] md:text-[24px] lg:text-[26px] font-[AdventProLight] text-[29px]'
              style={{ color: getColor(theme, 'subtitle') }}
            >
              {t('contacts.description')}
            </span>
          </div>
        </div>

        <div className={`${!isLG ? '' : 'float-right'}`} style={{ paddingTop: '90px' }}>
          <div>
            <span
              className="font-['Bebas_Neue'] text-[40px] md:text-[60px] lg:text-[65px] leading-[100%]"
              style={{color: '#82653F'}}
            >
              {t('contacts.requisites.title')}
            </span>
            <div className='flex flex-col mt-4 justify-between'>
              <span
                className='text-[18px] md:text-[20px] lg:text-[23px] font-[AdventProLight] ml-1'
                style={{ color: getColor(theme, 'text') }}
              >
                {t('contacts.requisites.companyName')}
              </span>
              <span
                className='text-[18px] md:text-[20px] lg:text-[23px] font-[AdventProLight] ml-1'
                style={{ color: getColor(theme, 'text') }}
              >
                {t('contacts.requisites.vat')}
              </span>
              <span
                className='text-[18px] md:text-[20px] lg:text-[23px] font-[AdventProLight] ml-1'
                style={{ color: getColor(theme, 'text') }}
              >
                {t('contacts.requisites.bank')}
              </span>
              <span
                className='text-[18px] md:text-[20px] lg:text-[23px] font-[AdventProLight] ml-1'
                style={{ color: getColor(theme, 'text') }}
              >
                {t('contacts.requisites.swift')}
              </span>
              <span
                className='text-[18px] md:text-[20px] lg:text-[23px] font-[AdventProLight] ml-1'
                style={{ color: getColor(theme, 'text') }}
              >
                {t('contacts.requisites.konto')}
              </span>
            </div>
          </div>

          <div className='mt-10'>
            <span
              className="font-['Bebas_Neue'] text-[40px] md:text-[60px] lg:text-[65px] leading-[100%]"
              style={{color: '#82653F'}}
            >
              {t('contacts.geo.title')}
            </span>
            <div className='flex flex-col mt-4 justify-between'>
              <span
                className='text-[18px] md:text-[20px] lg:text-[23px] font-[AdventProLight] ml-1'
                style={{ color: getColor(theme, 'text') }}
              >
                {t('contacts.geo.address')}
              </span>
            </div>
          </div>

          <div className='mt-10 flex flex-row justify-start gap-x-6'>
            <div>
              <span
                className="font-['Bebas_Neue'] text-[40px] md:text-[60px] lg:text-[65px] leading-[100%]"
                style={{color: '#82653F'}}
              >
                {t('contacts.email.title')}
              </span>
              <div className='flex flex-col mt-4 justify-between'>
                <span
                  className='text-[18px] md:text-[20px] lg:text-[23px] font-[AdventProLight] ml-1'
                  style={{ color: getColor(theme, 'text') }}
                >
                  {t('contacts.email.email')}
                </span>
              </div>
            </div>

            <div>
              <span
                className="font-['Bebas_Neue'] text-[40px] md:text-[60px] lg:text-[65px] leading-[100%]"
                style={{color: '#82653F'}}
              >
                {t('contacts.phone.title')}
              </span>
              <div className='flex flex-col mt-4 justify-between'>
                <span
                  className='text-[18px] md:text-[20px] lg:text-[23px] font-[AdventProLight] ml-1'
                  style={{ color: getColor(theme, 'text') }}
                >
                  {t('contacts.phone.phone')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Map colors={mapStyles} />
      </section>
    </>
  );
}
