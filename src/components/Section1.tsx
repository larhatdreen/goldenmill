import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '@mui/material'
import React, { useState } from 'react'

const items = [
  {
    number: '01',
    text: 'Усиленный корпус пресс-гранулятора GM гарантирует максимальную устойчивость и стабильность даже в самых тяжелых условиях.',
  },
  {
    number: '02',
    text: 'Пневматический клапан от перегрузки и система безопасности в виде срезного болта обеспечивают безопасную работу пресс-гранулятора GM даже в случае непредвиденных событий.',
  },
  {
    number: '03',
    text: 'Клиноременный привод пресс-гранулятора GM не только прост в обслуживании, но и снижает эксплуатационные расходы, делая ваши инвестиции еще более выгодными.',
  },
  {
    number: '04',
    text: 'Ротор и главный вал пресс-гранулятора GM специально разработаны для материалов высокой плотности и могут выдерживать высокие нагрузки.',
  },
  {
    number: '05',
    text: 'Пресс-гранулятор GM, оснащенный двигателем по стандарту IE4, обеспечивает высокий уровень эффективности, экономит энергию и защищает окружающую среду.',
  },
];

function GMFeaturesSVG() {
  const [active, setActive] = useState(0);

  // Параметры для динамического расчета
  const topPadding = 100;
  const bottomPadding = 100;
  const itemGap = 25;
  const sectionHeight = 109;
  const sectionCount = items.length;
  const svgHeight = topPadding + sectionCount * sectionHeight + (sectionCount - 1) * itemGap + bottomPadding;

  const barX = 120;
  const barY = topPadding + 20;
  const barHeight = svgHeight - topPadding - bottomPadding - 40;
  const barWidth = 0.5;
  const numberX = barX - 100;
  const textX = barX + 2 + 17;
  const maxTextWidth = 650;

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    if (e.deltaY > 0 && active < items.length - 1) setActive(active + 1);
    else if (e.deltaY < 0 && active > 0) setActive(active - 1);
  };

  return (
    <svg
      viewBox={`0 0 800 ${svgHeight}`}
      className='w-[60%] tablet:w-[60%]'
      height="auto"
      style={{ display: 'block', transform: 'translate(15%, 18%)' }}
      onWheel={handleWheel}
    >
      {/* Вертикальный бар */}
      <rect x={barX} y={barY} width={barWidth} height={barHeight} rx={2} fill="#5B5B5B" />
      {/* Активная линия */}
      <rect
        x={barX-0.75}
        y={barY + active * (sectionHeight + itemGap)}
        width={2}
        height={(active === 0 || active === 4) ? sectionHeight - 40 : sectionHeight}
        rx={2}
        fill="#82643F"
        style={{ transition: 'all 0.4s cubic-bezier(.4,0,.2,1)' }}
      />
      {items.map((item, i) => {
        const isActive = i === active;
        const y = topPadding + i * (sectionHeight + itemGap) + sectionHeight / 2;
        const color = isActive ? '#82643F' : '#BEB6A6';
        const fontSize = isActive ? 108 : 45;
        return (
          <g key={i} style={{ transition: 'all 0.4s cubic-bezier(.4,0,.2,1)' }}>
            <text
              x={numberX}
              y={y}
              fill={color}
              fontSize={fontSize}
              className='font-["Bebas_Neue"]'
              style={{ cursor: 'pointer', transition: 'all 0.4s cubic-bezier(.4,0,.2,1)' }}
              onClick={() => setActive(i)}
              alignmentBaseline="middle"
            >
              {item.number}
            </text>
            <foreignObject x={textX} y={y - sectionHeight / 2} width={maxTextWidth} height={sectionHeight}>
              <div
                style={{
                  fontSize: 25,
                  color: isActive ? '#D5CDBD' : '#5B5B5B',
                  lineHeight: '100%',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-line',
                  height: sectionHeight,
                  display: 'flex',
                  alignItems: 'center',
                }}
                className="font-adventpro"
              >
                {item.text}
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
  return (
    <section className='flex flex-col tablet:flex-row justify-center mt-[15%] w-full px-[5%] max-w-[1920px] gap-[20px]'>
      <svg
        id='section1'
        className='w-[60%] tablet:w-[40%]'
        viewBox={`0 0 650 ${isLG ? '633' : '450'}`}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        style={{position: isLG ? 'absolute' : undefined, left: '10.5%'}}
      >
        <svg className='hidden tablet:block '>
          <g filter='url(#filter0_b_20_1296)'>
            <circle cx='122' cy='350' r='121' fill='#2E3032' />
            <foreignObject x="54" y="300" width="136" height="103">
              <svg
                width="136"
                height="103"
                viewBox="0 0 136 103"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M55.3133 52.9636L97.5287 102.232H72.1318C60.342 102.232 50.7495 92.5907 50.7495 80.7408V53.0485H2.15323C2.15323 53.0485 1.26582 49.9905 0.970014 49.0136C-3.55155 33.3411 8.6609 29.3487 18.4647 34.0207L50.4537 49.226L16.6898 0L35.9171 2.50589C46.566 3.90749 54.5527 12.9967 54.5527 23.8272V49.1835H103.36C108.811 63.964 97.4441 70.2075 87.0065 65.9178L55.3133 52.9636Z"
                  fill="#343637"
                />
                <path
                  d="M41.4881 63.9629L4.04788 101.594C2.56887 100.744 1.55469 99.1729 1.55469 97.3465V66.3414C1.55469 63.6231 3.70983 61.457 6.41431 61.457H37.2624C39.0372 61.457 40.643 62.4764 41.4881 63.9629Z"
                  fill="#343637"
                />
                <path
                  d="M42.1288 66.3863V97.3914C42.1288 100.067 39.9314 102.276 37.2692 102.276H6.42112C5.53371 102.276 4.73081 102.063 4.05469 101.639L41.4949 64.0078C41.8753 64.6874 42.1288 65.4944 42.1288 66.3863Z"
                  fill="#2D2D2D"
                />
                <path
                  d="M130.822 0.0429688H78.1268H77.9578C75.6759 0.21286 73.5207 0.934901 71.9149 2.54887L68.154 6.32894C68.154 6.32894 68.154 6.32895 68.154 6.37142L64.4353 10.109C63.4634 11.0859 62.9141 12.4026 62.9141 13.8042V35.975C62.9141 37.8013 63.9283 39.4152 65.4073 40.2222L82.8597 22.3837C84.0851 21.1519 85.7332 20.4724 87.4657 20.4724H135.639V4.96982C135.682 2.20908 133.484 0.0429688 130.822 0.0429688Z"
                  fill="#343637"
                />
                <path
                  d="M87.5038 20.4292C85.7712 20.4292 84.1232 21.1088 82.8977 22.3405L65.4453 40.179C66.1214 40.5613 66.9243 40.7737 67.7695 40.7737H130.818C133.48 40.7737 135.677 38.6075 135.677 35.8893V20.3867H87.5038V20.4292Z"
                  fill="#2D2D2D"
                />
              </svg>
            </foreignObject>
          </g>
          <path d='M242 330L242 631' stroke='#3F4042' strokeWidth='0.5' />
          <path
            d='M242.53 609.53C242.823 609.237 242.823 608.763 242.53 608.47L237.757 603.697C237.464 603.404 236.99 603.404 236.697 603.697C236.404 603.99 236.404 604.464 236.697 604.757L240.939 609L236.697 613.243C236.404 613.536 236.404 614.01 236.697 614.303C236.99 614.596 237.464 614.596 237.757 614.303L242.53 609.53ZM0.469666 608.47C0.176773 608.763 0.176773 609.237 0.469666 609.53L5.24265 614.303C5.53554 614.596 6.01041 614.596 6.3033 614.303C6.59619 614.01 6.59619 613.536 6.3033 613.243L2.06067 609L6.3033 604.757C6.59619 604.464 6.59619 603.99 6.3033 603.697C6.01041 603.404 5.53554 603.404 5.24265 603.697L0.469666 608.47ZM242 608.25H240.494V609.75H242V608.25ZM237.481 608.25H234.469V609.75H237.481V608.25ZM231.456 608.25H228.444V609.75H231.456V608.25ZM225.431 608.25H222.419V609.75H225.431V608.25ZM219.406 608.25H216.394V609.75H219.406V608.25ZM213.381 608.25H210.369V609.75H213.381V608.25ZM207.356 608.25H204.344V609.75H207.356V608.25ZM201.331 608.25H198.319V609.75H201.331V608.25ZM195.306 608.25H192.294V609.75H195.306V608.25ZM189.281 608.25H186.269V609.75H189.281V608.25ZM183.256 608.25H180.244V609.75H183.256V608.25ZM177.231 608.25H174.219V609.75H177.231V608.25ZM171.206 608.25H168.194V609.75H171.206V608.25ZM165.181 608.25H162.169V609.75H165.181V608.25ZM159.156 608.25H156.144V609.75H159.156V608.25ZM153.131 608.25H150.119V609.75H153.131V608.25ZM147.106 608.25H144.094V609.75H147.106V608.25ZM141.081 608.25H138.069V609.75H141.081V608.25ZM135.056 608.25H132.044V609.75H135.056V608.25ZM129.031 608.25H126.019V609.75H129.031V608.25ZM123.006 608.25H119.994V609.75H123.006V608.25ZM116.981 608.25H113.969V609.75H116.981V608.25ZM110.956 608.25H107.944V609.75H110.956V608.25ZM104.931 608.25H101.919V609.75H104.931V608.25ZM98.9063 608.25H95.8938V609.75H98.9063V608.25ZM92.8813 608.25H89.8688V609.75H92.8813V608.25ZM86.8563 608.25H83.8438V609.75H86.8563V608.25ZM80.8313 608.25H77.8188V609.75H80.8313V608.25ZM74.8063 608.25H71.7938V609.75H74.8063V608.25ZM68.7813 608.25H65.7688V609.75H68.7813V608.25ZM62.7563 608.25H59.7439V609.75H62.7563V608.25ZM56.7314 608.25H53.7189V609.75H56.7314V608.25ZM50.7064 608.25H47.6939V609.75H50.7064V608.25ZM44.6814 608.25H41.6689V609.75H44.6814V608.25ZM38.6564 608.25H35.6439V609.75H38.6564V608.25ZM32.6314 608.25H29.6189V609.75H32.6314V608.25ZM26.6064 608.25H23.5939V609.75H26.6064V608.25ZM20.5814 608.25H17.5689V609.75H20.5814V608.25ZM14.5564 608.25H11.5439V609.75H14.5564V608.25ZM8.53142 608.25H5.51892V609.75H8.53142V608.25ZM2.50642 608.25H1V609.75H2.50642V608.25Z'
            fill='#3F4042'
          />
          <path d='M0.999985 330L1 633' stroke='#3F4042' strokeWidth='0.5' />

          <foreignObject className='text-center' x='7' y='580' width='230' height='25'>
            <span className='w-full font-["Bebas_Neue"] text-[#3F4042] text-[18px] whitespace-normal uppercase tracking-[.2em]'>
              {t('diagrams.dieMatrix.highHardness.descriptionBg')}
            </span>
          </foreignObject>
        </svg>

        <path id='my_path' d='M 20,20 C 40,40 80,40 100,20' />

        <text className='font-["Bebas_Neue"] fill-[#D5CDBD] text-[90px] whitespace-normal uppercase translate-x-[35px] translate-y-[93px]'>
          {t('diagrams.dieMatrix.highHardness.title.first')}
        </text>
        <text className='font-["Bebas_Neue"] fill-[#D5CDBD] text-[90px] whitespace-normal uppercase translate-x-[35px] translate-y-[183px]'>
          {t('diagrams.dieMatrix.highHardness.title.second')}
        </text>
        <foreignObject x={35} y={200} width={250} height={80}>
          <text 
            className='font-adventpro text-[29px] uppercase'
            style={{color: '#D5CDBD'}}
          >
            {t('diagrams.dieMatrix.highHardness.description')}
          </text>
        </foreignObject>

        <path className='section1stroke' d='M15 30L15 93' stroke='#82643F' strokeWidth='24' />
        <path className='section1stroke' d='M15 120L15 183' stroke='#82643F' strokeWidth='24' />

      </svg>

      {/* Интерактивный SVG-блок с характеристиками */}
      <GMFeaturesSVG />
    </section>
  )
}

export default Section1
