import SEO from './SEO';
import { useSEO } from '../hooks/useSEO';
import Arrow from './about/Arrow.js'
import LogoIcon from './about/LogoIcon.js'
import Map from './contacts/Map.js'
import { useMediaQuery } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function Contacts() {
  const seoData = useSEO('contacts');
  const isLG = useMediaQuery('(min-width:1150px)')
  const { t } = useTranslation()

  return (
    <>
      <SEO 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />
      <section className='w-full h-auto px-[30px] md:px-[100px] gap-y-6 max-w-[1920px]'>
        <div className={`${!isLG ? 'hidden' : ''}`}>
          <Arrow />
          <div className='absolute left-[200px] top-[225px] w-[271px] h-[271px] bg-[#1E1F20] rounded-full flex justify-center items-center'>
            <LogoIcon />
          </div>
          <span className='absolute w-[258px] left-[208px] top-[116px] font-bebas text-[17px] text-[#2C2D2F] tracking-widest text-center'>
            {t('contacts.descriptionBg')}
          </span>
          <span className='absolute w-[258px] left-[208px] top-[654px] font-bebas text-[17px] text-[#2C2D2F] tracking-widest text-center'>
            {t('contacts.descriptionBg1')}
          </span>

          <div className='absolute left-[200px] top-[200px] flex flex-col items-start'>
            <div className='flex items-center gap-x-4'>
              <div className='w-[24px] h-[63px] bg-[#544B3C]' />
              <span className='relative left-[10px] font-bebas text-[60px] md:text-[70px] lg:text-[80px] text-[#544B3C]'>
                {t('contacts.title')}
              </span>
            </div>
            <span className='relative left-[30px] md:text-[24px] lg:text-[26px] font-adventpro text-[29px] text-[#D5CDBD]'>
              {t('contacts.description')}
            </span>
          </div>
        </div>

        <div className={`${!isLG ? '' : 'float-right'}`}>
          <div>
            <span className='font-labgrotesque text-[40px] md:text-[60px] lg:text-[65px] text-[#544B3C]'>
              {t('contacts.requisites.title')}
            </span>
            <div className='flex flex-col mt-4 justify-between'>
              <span className='text-navSelect text-[18px] md:text-[20px] lg:text-[23px] font-adventpro ml-1'>
                {t('contacts.requisites.companyName')}
              </span>
              <span className='text-navSelect text-[18px] md:text-[20px] lg:text-[23px] font-adventpro ml-1'>
                {t('contacts.requisites.vat')}
              </span>
              <span className='text-navSelect text-[18px] md:text-[20px] lg:text-[23px] font-adventpro ml-1'>
                {t('contacts.requisites.bank')}
              </span>
              <span className='text-navSelect text-[18px] md:text-[20px] lg:text-[23px] font-adventpro ml-1'>
                {t('contacts.requisites.swift')}
              </span>
              <span className='text-navSelect text-[18px] md:text-[20px] lg:text-[23px] font-adventpro ml-1'>
                {t('contacts.requisites.konto')}
              </span>
            </div>
          </div>

          <div className='mt-10'>
            <span className='font-labgrotesque text-[40px] md:text-[60px] lg:text-[65px] text-[#544B3C]'>
              {t('contacts.geo.title')}
            </span>
            <div className='flex flex-col mt-4 justify-between'>
              <span className='text-navSelect text-[18px] md:text-[20px] lg:text-[23px] font-adventpro ml-1'>
                {t('contacts.geo.address')}
              </span>
            </div>
          </div>

          <div className='mt-10 flex flex-row justify-start gap-x-6'>
            <div>
              <span className='font-labgrotesque text-[40px] md:text-[60px] lg:text-[65px] text-[#544B3C]'>
                {t('contacts.email.title')}
              </span>
              <div className='flex flex-col mt-4 justify-between'>
                <span className='text-navSelect text-[18px] md:text-[20px] lg:text-[23px] font-adventpro ml-1'>
                  {t('contacts.email.email')}
                </span>
              </div>
            </div>

            <div>
              <span className='font-labgrotesque text-[40px] md:text-[60px] lg:text-[65px] text-[#544B3C]'>
                {t('contacts.phone.title')}
              </span>
              <div className='flex flex-col mt-4 justify-between'>
                <span className='text-navSelect text-[18px] md:text-[20px] lg:text-[23px] font-adventpro ml-1'>
                  {t('contacts.phone.phone')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Map />
      </section>
    </>
  )
}
