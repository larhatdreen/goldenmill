import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '../hooks/useTheme';
import { useState } from 'react'
import LogoIcon from './customIcons/LogoIcon';
import { getColor, getLocalThemeColor } from '../theme/utils';
const items = [
  {
    number: '01',
    textKey: 'diagrams.millGranulator.mainFeatures.features.1'
  },
  {
    number: '02',
    textKey: 'diagrams.millGranulator.mainFeatures.features.2'
  },
  {
    number: '03',
    textKey: 'diagrams.millGranulator.mainFeatures.features.3'
  },
  {
    number: '04',
    textKey: 'diagrams.millGranulator.mainFeatures.features.4'
  },
  {
    number: '05',
    textKey: 'diagrams.millGranulator.mainFeatures.features.5'
  },
];

function GMFeaturesSVG() {
  const [active, setActive] = useState(0);
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.name === 'dark';

  // Определяем для стилизации локально
  const numberColor = getLocalThemeColor(isDark, '#5B5B5B', '#A4A4A4');
  const numberActiveColor = getLocalThemeColor(isDark, '#82643F', '#ABB4C3');
  const textColor = getLocalThemeColor(isDark, '#5B5B5B', '#A4A4A4');
  const textActiveColor = getLocalThemeColor(isDark, '#D5CDBD', '#2A3242');
  const sliderColor = getLocalThemeColor(isDark, '#82643F', '#7D9BC1');

  // Параметры для динамического расчета
  const topPadding = 100;
  const bottomPadding = 100;
  const itemGap = 25;
  const sectionHeight = 109;
  const sectionCount = items.length;
  const svgHeight = topPadding + sectionCount * sectionHeight + (sectionCount - 1) * itemGap + bottomPadding;

  const barX = 120;
  const barY = topPadding;
  const barHeight = svgHeight - topPadding - bottomPadding;
  const barWidth = 0.5;
  const numberX = barX - 100;
  const textX = barX + 2 + 17;
  const maxTextWidth = 650;

  return (
    <svg
      viewBox={`0 0 800 ${svgHeight}`}
      className='w-[100%] tablet:w-[40%]'
      height="auto"
      style={{ display: 'block' }}
    >
      {/* Вертикальный бар */}
      <rect x={barX} y={barY} width={barWidth} height={barHeight} rx={2} fill={numberColor} />
      {/* Активная линия */}
      <rect
        x={barX}
        y={barY + active * (sectionHeight + itemGap)}
        width={2}
        height={sectionHeight}
        rx={2}
        fill={sliderColor}
        style={{ transition: 'all 0.4s cubic-bezier(.4,0,.2,1)' }}
      />
     {items.map((item, i) => {
  const isActive = i === active;
  const y = topPadding + i * (sectionHeight + itemGap) + sectionHeight / 2;
  const color = isActive ? numberActiveColor : numberColor;
  const fontSize = isActive ? 108 : 45;
  return (
    <g
      key={i}
      style={{ transition: 'all 0.4s cubic-bezier(.4,0,.2,1)', cursor: 'pointer' }}
      onMouseEnter={() => setActive(i)} // 💡 активация при ховере
    >
      <text
        x={numberX}
        y={y}
        fill={color}
        fontSize={fontSize}
        className='font-["Bebas_Neue"]'
        alignmentBaseline="middle"
      >
        {item.number}
      </text>
      <foreignObject x={textX} y={y - sectionHeight / 2} width={maxTextWidth} height={sectionHeight}>
        <div
          style={{
            fontSize: 25,
            color: isActive ? textActiveColor : textColor,
            lineHeight: '100%',
            wordBreak: 'break-word',
            whiteSpace: 'pre-line',
            height: sectionHeight,
            display: 'flex',
            alignItems: 'center',
          }}
          className="font-adventpro"
        >
          {t(item.textKey)}
        </div>
      </foreignObject>
    </g>
  );
})}
    </svg>
  );
}

function Section1() {
  const { t } = useTranslation()
  const isLG = useMediaQuery('(min-width:768px)')
  const theme = useTheme();
  return (
    <section className='flex flex-col tablet:flex-row justify-center mt-[15%] w-full px-[5%] max-w-[1920px] tablet:gap-[20px]'>
      <svg
        id='section1'
        className='w-[100%] tablet:w-[40%]'
        viewBox={`0 0 850 ${isLG ? '833' : '250'}`}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        // style={{position: isLG ? undefined : 'absolute'}}
      >
        <svg className='hidden tablet:block '>
          <g filter='url(#filter0_b_20_1296)'>
            <circle cx='122' cy='350' r='121' fill={getColor(theme, 'decorative')} />
            <foreignObject x="54" y="300" width="136" height="103">
              <LogoIcon
                className="w-[136px] h-[103px]"
                mainColor={getColor(theme, 'svg.darkColor')}
                secondaryColor={getColor(theme, 'svg.lightColor')}
                crossColor={getColor(theme, 'svg.crossColor')}
              />
            </foreignObject>
          </g>
          <path d='M242 330L242 631' stroke={getColor(theme, 'svg.fill')} strokeWidth='0.5' />
          <path
            d='M242.53 609.53C242.823 609.237 242.823 608.763 242.53 608.47L237.757 603.697C237.464 603.404 236.99 603.404 236.697 603.697C236.404 603.99 236.404 604.464 236.697 604.757L240.939 609L236.697 613.243C236.404 613.536 236.404 614.01 236.697 614.303C236.99 614.596 237.464 614.596 237.757 614.303L242.53 609.53ZM0.469666 608.47C0.176773 608.763 0.176773 609.237 0.469666 609.53L5.24265 614.303C5.53554 614.596 6.01041 614.596 6.3033 614.303C6.59619 614.01 6.59619 613.536 6.3033 613.243L2.06067 609L6.3033 604.757C6.59619 604.464 6.59619 603.99 6.3033 603.697C6.01041 603.404 5.53554 603.404 5.24265 603.697L0.469666 608.47ZM242 608.25H240.494V609.75H242V608.25ZM237.481 608.25H234.469V609.75H237.481V608.25ZM231.456 608.25H228.444V609.75H231.456V608.25ZM225.431 608.25H222.419V609.75H225.431V608.25ZM219.406 608.25H216.394V609.75H219.406V608.25ZM213.381 608.25H210.369V609.75H213.381V608.25ZM207.356 608.25H204.344V609.75H207.356V608.25ZM201.331 608.25H198.319V609.75H201.331V608.25ZM195.306 608.25H192.294V609.75H195.306V608.25ZM189.281 608.25H186.269V609.75H189.281V608.25ZM183.256 608.25H180.244V609.75H183.256V608.25ZM177.231 608.25H174.219V609.75H177.231V608.25ZM171.206 608.25H168.194V609.75H171.206V608.25ZM165.181 608.25H162.169V609.75H165.181V608.25ZM159.156 608.25H156.144V609.75H159.156V608.25ZM153.131 608.25H150.119V609.75H153.131V608.25ZM147.106 608.25H144.094V609.75H147.106V608.25ZM141.081 608.25H138.069V609.75H141.081V608.25ZM135.056 608.25H132.044V609.75H135.056V608.25ZM129.031 608.25H126.019V609.75H129.031V608.25ZM123.006 608.25H119.994V609.75H123.006V608.25ZM116.981 608.25H113.969V609.75H116.981V608.25ZM110.956 608.25H107.944V609.75H110.956V608.25ZM104.931 608.25H101.919V609.75H104.931V608.25ZM98.9063 608.25H95.8938V609.75H98.9063V608.25ZM92.8813 608.25H89.8688V609.75H92.8813V608.25ZM86.8563 608.25H83.8438V609.75H86.8563V608.25ZM80.8313 608.25H77.8188V609.75H80.8313V608.25ZM74.8063 608.25H71.7938V609.75H74.8063V608.25ZM68.7813 608.25H65.7688V609.75H68.7813V608.25ZM62.7563 608.25H59.7439V609.75H62.7563V608.25ZM56.7314 608.25H53.7189V609.75H56.7314V608.25ZM50.7064 608.25H47.6939V609.75H50.7064V608.25ZM44.6814 608.25H41.6689V609.75H44.6814V608.25ZM38.6564 608.25H35.6439V609.75H38.6564V608.25ZM32.6314 608.25H29.6189V609.75H32.6314V608.25ZM26.6064 608.25H23.5939V609.75H26.6064V608.25ZM20.5814 608.25H17.5689V609.75H20.5814V608.25ZM14.5564 608.25H11.5439V609.75H14.5564V608.25ZM8.53142 608.25H5.51892V609.75H8.53142V608.25ZM2.50642 608.25H1V609.75H2.50642V608.25Z'
            fill={getColor(theme, 'svg.fill')}
          />
          <path d='M0.999985 330L1 633' stroke={getColor(theme, 'svg.fill')} strokeWidth='0.5' />

          <foreignObject className='text-center' x='7' y='580' width='230' height='25'>
            <span className='w-full font-["Bebas_Neue"] text-[#3F4042] text-[18px] whitespace-normal uppercase tracking-[.2em]'
              style={{color: getColor(theme, 'svg.fill')}}
            >
              {t('diagrams.millGranulator.mainFeatures.descriptionBg')}
            </span>
          </foreignObject>
        </svg>

        <path id='my_path' d='M 20,20 C 40,40 80,40 100,20' />

        <text className='font-["Bebas_Neue"] text-[90px] whitespace-normal uppercase translate-x-[35px] translate-y-[93px]'
        fill={getColor(theme, 'title')}
        >
          {t('diagrams.millGranulator.mainFeatures.title.model')}
        </text>
        <text className='font-["Bebas_Neue"] text-[90px] whitespace-normal uppercase translate-x-[35px] translate-y-[183px]'
        fill={getColor(theme, 'title')}>
          {t('diagrams.millGranulator.mainFeatures.title.features')}
        </text>
        <foreignObject x={35} y={200} width={250} height={80}>
          <text 
            className='font-adventpro text-[29px] uppercase'
            style={{color: getColor(theme, 'subtitle')}}
          >
            {t('diagrams.millGranulator.mainFeatures.subtitle')}
          </text>
        </foreignObject>

        <path className='section1stroke' d='M15 30L15 93' stroke={getColor(theme, 'particle')} strokeWidth='24' />
        <path className='section1stroke' d='M15 120L15 183' stroke={getColor(theme, 'particle')} strokeWidth='24' />

      </svg>

      {/* Интерактивный SVG-блок с характеристиками */}
      <GMFeaturesSVG />
    </section>
  )
}

export default Section1
