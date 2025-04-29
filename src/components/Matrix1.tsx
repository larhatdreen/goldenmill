import React from 'react';
import matrix1 from '../assets/Matrix/matrix1.webp';
// import { onInputFocus, onPointerEnterCircle, onPointerLeaveCircle } from '../functions/Functions.js';
// import { useTranslation } from 'react-i18next';
// import AnimatedCircle from './AnimatedCircle.js';

const Matrix1: React.FC = () => {
  // const { t } = useTranslation();
  // const handleOpen = () => {};

  return (
    <div className='relative tablet:w-full tablet:left-0 aspect-[100/80] z-0 mt-6 laptop:mt-12 desktopMd:mt-0 overflow-x-clip'>
      <svg
        className='absolute -top-[11%] -left-[13%] laptop:-left-[11%] w-[127%]'
        viewBox='0 0 1097 985'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <image x='273' y='217' width='612' height='612' href={matrix1} />

        {/* Закомментированные интерактивные элементы */}
        {/* <path className='circle1' d='M711 490L711 260' stroke='#605C53' strokeWidth='1' />
        <path
          className='circle1'
          d='M711.53 282.53C711.823 282.237 711.823 281.762 711.53 281.47L706.757 276.697C706.464 276.404 705.99 276.404 705.697 276.697C705.404 276.989 705.404 277.464 705.697 277.757L709.939 282L705.697 286.243C705.404 286.535 705.404 287.01 705.697 287.303C705.99 287.596 706.464 287.596 706.757 287.303L711.53 282.53ZM444.47 281.47C444.177 281.762 444.177 282.237 444.47 282.53L449.243 287.303C449.536 287.596 450.01 287.596 450.303 287.303C450.596 287.01 450.596 286.535 450.303 286.243L446.061 282L450.303 277.757C450.596 277.464 450.596 276.989 450.303 276.697C450.01 276.404 449.536 276.404 449.243 276.697L444.47 281.47ZM711 281.25H709.489V282.75H711V281.25Z' fill='#605C53' />
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
              className='font-adventpro font-medium text-footerBottomText text-[20px] laptop:text-[15px]
                               group-hover:text-white text-center break-words'
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
                className='w-[54px] h-[54px] bg-[#292929] rounded-full font-labgrotesque text-[30px]
                text-[#767676] flex justify-center items-center'
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
              className='font-adventpro font-medium text-footerBottomText text-[20px] laptop:text-[15px]
                               group-hover:text-white text-center break-words'
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
                className='w-[54px] h-[54px] bg-[#292929] rounded-full font-labgrotesque text-[30px]
                text-[#767676] flex justify-center items-center'
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
              className='font-adventpro font-medium text-footerBottomText text-[20px] laptop:text-[15px]
                               group-hover:text-white text-center'
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

export default Matrix1;
