import React from 'react';
import matrix2 from '../assets/Matrix/matrix2.webp';
// import { onInputFocus, onPointerEnterCircle, onPointerLeaveCircle } from '../functions/Functions.js';
// import { useTranslation } from 'react-i18next';
// import AnimatedCircle from './AnimatedCircle.js';

const Matrix2: React.FC = () => {
  // const { t } = useTranslation();

  return (
    <div className='relative tablet:w-full tablet:left-0 aspect-[100/80] z-0 mt-6 laptop:mt-12 desktopMd:mt-0 overflow-x-clip'>
      <svg
        className='absolute -top-[11%] -left-[13%] laptop:-left-[11%] w-[127%]'
        viewBox='0 0 1097 985'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <image x='273' y='217' width='612' height='612' href={matrix2} />

        {/* Закомментированные интерактивные элементы */}
        {/* <path className='circle1' d='M711 490L711 260' stroke='#605C53' strokeWidth='1' />
        <path className='circle1 circle3' d='M445 492L445 258' stroke='#605C53' strokeWidth='1' /> */}

        {/* Circle1 */}
        {/* <foreignObject x='221' y='368' width='130' height='140'>
          <div className='flex h-full flex-col items-center gap-y-2'>
            <div className='w-[70px] h-[70px] flex justify-center items-center'>
              <div
                id='circle1'
                className='w-[54px] h-[54px] bg-[#292929] rounded-full font-labgrotesque text-[30px] text-[#767676] flex justify-center items-center'
                onMouseEnter={event => onPointerEnterCircle(event.currentTarget.id)}
                onMouseLeave={event => onPointerLeaveCircle(event.currentTarget.id)}
                onClick={() => {
                  handleOpen()
                  setTimeout(() => onInputFocus('innerDiameter'), 100)
                }}
              >
                1
              </div>
            </div>
            <span
              id='circle1text'
              className='font-adventpro font-medium text-footerBottomText text-[20px] laptop:text-[15px] group-hover:text-white text-center break-words'
            >
              {t('productBlock.innerDiameter')}
            </span>
          </div>
        </foreignObject> */}

        {/* Circle2 */}
        {/* <foreignObject x='87' y='388' width='120' height='140'>
          <div className='flex h-full flex-col items-center gap-y-2'>
            <div className='w-[70px] h-[70px] flex justify-center items-center'>
              <div
                id='circle2'
                className='w-[54px] h-[54px] bg-[#292929] rounded-full font-labgrotesque text-[30px] text-[#767676] flex justify-center items-center'
                onMouseEnter={event => onPointerEnterCircle(event.currentTarget.id)}
                onMouseLeave={event => onPointerLeaveCircle(event.currentTarget.id)}
                onClick={() => {
                  handleOpen()
                  setTimeout(() => onInputFocus('outerDiameter'), 100)
                }}
              >
                2
              </div>
            </div>
            <span
              id='circle2text'
              className='font-adventpro font-medium text-footerBottomText text-[20px] laptop:text-[15px] group-hover:text-white text-center break-words'
            >
              {t('productBlock.outerDiameter')}
            </span>
          </div>
        </foreignObject> */}

        {/* Circle3 */}
        {/* <foreignObject x='525' y='13' width='180' height='100'>
          <div className='flex h-full flex-col items-center gap-y-1'>
            <div className='w-[70px] h-[70px] flex justify-center items-center shrink-0'>
              <div
                id='circle3'
                className='w-[54px] h-[54px] bg-[#292929] rounded-full font-labgrotesque text-[30px] text-[#767676] flex justify-center items-center'
                onMouseEnter={event => onPointerEnterCircle(event.currentTarget.id)}
                onMouseLeave={event => onPointerLeaveCircle(event.currentTarget.id)}
                onClick={() => {
                  handleOpen()
                  setTimeout(() => onInputFocus('overallWidth'), 100)
                }}
              >
                3
              </div>
            </div>
            <span
              id='circle3text'
              className='font-adventpro font-medium text-footerBottomText text-[20px] laptop:text-[15px] group-hover:text-white text-center'
            >
              {t('productBlock.overallWidth')}
            </span>
          </div>
        </foreignObject> */}

        {/* AnimatedCircle components */}
        {/* <AnimatedCircle x='501' y='196' stroke='#969284' />
        <AnimatedCircle x='501' y='80' stroke='#969284' />
        <AnimatedCircle x='297' y='196' stroke='#969284' />
        <AnimatedCircle x='777' y='196' stroke='#969284' />
        <AnimatedCircle x='175' y='451' stroke='#969284' /> */}

        <defs>
          <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
            <use xlinkHref='#image0_12_58' transform='scale(0.0005)' />
          </pattern>
        </defs>
      </svg>
    </div>
  );
};

export default Matrix2;
