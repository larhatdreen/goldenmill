import { onInputFocus, onPointerEnterCircle, onPointerLeaveCircle } from '../functions/Functions.js'
import { useTranslation } from 'react-i18next'
import matrix1 from '../assets/Matrix/matrix1.webp'
import AnimatedCircle from './AnimatedCircle.js'

function Matrix1({ handleOpen }: { handleOpen: () => void }) {
  const { t } = useTranslation()

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

        {/*Circle1*/}
        <path className='circle1' d='M711 490L711 260' stroke='#605C53' strokeWidth='1' />
        <path
          className='circle1'
          d='M711.53 282.53C711.823 282.237 711.823 281.762 711.53 281.47L706.757 276.697C706.464 276.404 705.99 276.404 705.697 276.697C705.404 276.989 705.404 277.464 705.697 277.757L709.939 282L705.697 286.243C705.404 286.535 705.404 287.01 705.697 287.303C705.99 287.596 706.464 287.596 706.757 287.303L711.53 282.53ZM444.47 281.47C444.177 281.762 444.177 282.237 444.47 282.53L449.243 287.303C449.536 287.596 450.01 287.596 450.303 287.303C450.596 287.01 450.596 286.535 450.303 286.243L446.061 282L450.303 277.757C450.596 277.464 450.596 276.989 450.303 276.697C450.01 276.404 449.536 276.404 449.243 276.697L444.47 281.47ZM711 281.25H709.489V282.75H711V281.25ZM706.466 281.25H703.443V282.75H706.466V281.25ZM700.42 281.25H697.398V282.75H700.42V281.25ZM694.375 281.25H691.352V282.75H694.375V281.25ZM688.33 281.25H685.307V282.75H688.33V281.25ZM682.284 281.25H679.261V282.75H682.284V281.25ZM676.239 281.25H673.216V282.75H676.239V281.25ZM670.193 281.25H667.17V282.75H670.193V281.25ZM664.148 281.25H661.125V282.75H664.148V281.25ZM658.102 281.25H655.08V282.75H658.102V281.25ZM652.057 281.25H649.034V282.75H652.057V281.25ZM646.011 281.25H642.989V282.75H646.011V281.25ZM639.966 281.25H636.943V282.75H639.966V281.25ZM633.92 281.25H630.898V282.75H633.92V281.25ZM627.875 281.25H624.852V282.75H627.875V281.25ZM621.83 281.25H618.807V282.75H621.83V281.25ZM615.784 281.25H612.761V282.75H615.784V281.25ZM609.739 281.25H606.716V282.75H609.739V281.25ZM603.693 281.25H600.67V282.75H603.693V281.25ZM597.648 281.25H594.625V282.75H597.648V281.25ZM591.602 281.25H588.58V282.75H591.602V281.25ZM585.557 281.25H582.534V282.75H585.557V281.25ZM579.511 281.25H576.489V282.75H579.511V281.25ZM573.466 281.25H570.443V282.75H573.466V281.25ZM567.42 281.25H564.398V282.75H567.42V281.25ZM561.375 281.25H558.352V282.75H561.375V281.25ZM555.33 281.25H552.307V282.75H555.33V281.25ZM549.284 281.25H546.261V282.75H549.284V281.25ZM543.239 281.25H540.216V282.75H543.239V281.25ZM537.193 281.25H534.171V282.75H537.193V281.25ZM531.148 281.25H528.125V282.75H531.148V281.25ZM525.102 281.25H522.08V282.75H525.102V281.25ZM519.057 281.25H516.034V282.75H519.057V281.25ZM513.012 281.25H509.989V282.75H513.012V281.25ZM506.966 281.25H503.943V282.75H506.966V281.25ZM500.921 281.25H497.898V282.75H500.921V281.25ZM494.875 281.25H491.852V282.75H494.875V281.25ZM488.83 281.25H485.807V282.75H488.83V281.25ZM482.784 281.25H479.762V282.75H482.784V281.25ZM476.739 281.25H473.716V282.75H476.739V281.25ZM470.693 281.25H467.671V282.75H470.693V281.25ZM464.648 281.25H461.625V282.75H464.648V281.25ZM458.603 281.25H455.58V282.75H458.603V281.25ZM452.557 281.25H449.534V282.75H452.557V281.25ZM446.512 281.25H445V282.75H446.512V281.25Z'
          fill='#605C53'
        />
        <path className='circle1 circle3' d='M445 492L445 258' stroke='#605C53' strokeWidth='1' />

        {/*Circle4*/}
        <path className='circle4' d='M844 495L844 259' stroke='#605C53' strokeWidth='1' />
        <path
          className='circle4'
          d='M844.53 282.53C844.823 282.237 844.823 281.763 844.53 281.47L839.757 276.697C839.464 276.404 838.99 276.404 838.697 276.697C838.404 276.99 838.404 277.464 838.697 277.757L842.939 282L838.697 286.243C838.404 286.536 838.404 287.01 838.697 287.303C838.99 287.596 839.464 287.596 839.757 287.303L844.53 282.53ZM779.47 281.47C779.177 281.763 779.177 282.237 779.47 282.53L784.243 287.303C784.536 287.596 785.01 287.596 785.303 287.303C785.596 287.01 785.596 286.536 785.303 286.243L781.061 282L785.303 277.757C785.596 277.464 785.596 276.99 785.303 276.697C785.01 276.404 784.536 276.404 784.243 276.697L779.47 281.47ZM844 281.25H842.545V282.75H844V281.25ZM839.636 281.25H836.727V282.75H839.636V281.25ZM833.818 281.25H830.909V282.75H833.818V281.25ZM828 281.25H825.091V282.75H828V281.25ZM822.182 281.25H819.273V282.75H822.182V281.25ZM816.364 281.25H813.455V282.75H816.364V281.25ZM810.545 281.25H807.636V282.75H810.545V281.25ZM804.727 281.25H801.818V282.75H804.727V281.25ZM798.909 281.25H796V282.75H798.909V281.25ZM793.091 281.25H790.182V282.75H793.091V281.25ZM787.273 281.25H784.364V282.75H787.273V281.25ZM781.455 281.25H780V282.75H781.455V281.25Z'
          fill='#605C53'
        />
        <path className='circle4' d='M780 492L780 258' stroke='#605C53' strokeWidth='1' />

        {/*Circle2*/}
        <path className='circle2' d='M874 508L874 142' stroke='#605C53' strokeWidth='1' />
        <path
          className='circle2'
          d='M874.53 165.53C874.823 165.237 874.823 164.763 874.53 164.47L869.757 159.697C869.464 159.404 868.99 159.404 868.697 159.697C868.404 159.99 868.404 160.464 868.697 160.757L872.939 165L868.697 169.243C868.404 169.536 868.404 170.01 868.697 170.303C868.99 170.596 869.464 170.596 869.757 170.303L874.53 165.53ZM282.47 164.47C282.177 164.763 282.177 165.237 282.47 165.53L287.243 170.303C287.536 170.596 288.01 170.596 288.303 170.303C288.596 170.01 288.596 169.536 288.303 169.243L284.061 165L288.303 160.757C288.596 160.464 288.596 159.99 288.303 159.697C288.01 159.404 287.536 159.404 287.243 159.697L282.47 164.47ZM874 164.25H872.508V165.75H874V164.25ZM869.523 164.25H866.538V165.75H869.523V164.25ZM863.553 164.25H860.568V165.75H863.553V164.25ZM857.583 164.25H854.598V165.75H857.583V164.25ZM851.614 164.25H848.629V165.75H851.614V164.25ZM845.644 164.25H842.659V165.75H845.644V164.25ZM839.674 164.25H836.689V165.75H839.674V164.25ZM833.705 164.25H830.72V165.75H833.705V164.25ZM827.735 164.25H824.75V165.75H827.735V164.25ZM821.765 164.25H818.78V165.75H821.765V164.25ZM815.795 164.25H812.811V165.75H815.795V164.25ZM809.826 164.25H806.841V165.75H809.826V164.25ZM803.856 164.25H800.871V165.75H803.856V164.25ZM797.886 164.25H794.902V165.75H797.886V164.25ZM791.917 164.25H788.932V165.75H791.917V164.25ZM785.947 164.25H782.962V165.75H785.947V164.25ZM779.977 164.25H776.992V165.75H779.977V164.25ZM774.008 164.25H771.023V165.75H774.008V164.25ZM768.038 164.25H765.053V165.75H768.038V164.25ZM762.068 164.25H759.083V165.75H762.068V164.25ZM756.098 164.25H753.114V165.75H756.098V164.25ZM750.129 164.25H747.144V165.75H750.129V164.25ZM744.159 164.25H741.174V165.75H744.159V164.25ZM738.189 164.25H735.205V165.75H738.189V164.25ZM732.22 164.25H729.235V165.75H732.22V164.25ZM726.25 164.25H723.265V165.75H726.25V164.25ZM720.28 164.25H717.295V165.75H720.28V164.25ZM714.311 164.25H711.326V165.75H714.311V164.25ZM708.341 164.25H705.356V165.75H708.341V164.25ZM702.371 164.25H699.386V165.75H702.371V164.25ZM696.402 164.25H693.417V165.75H696.402V164.25ZM690.432 164.25H687.447V165.75H690.432V164.25ZM684.462 164.25H681.477V165.75H684.462V164.25ZM678.492 164.25H675.508V165.75H678.492V164.25ZM672.523 164.25H669.538V165.75H672.523V164.25ZM666.553 164.25H663.568V165.75H666.553V164.25ZM660.583 164.25H657.598V165.75H660.583V164.25ZM654.614 164.25H651.629V165.75H654.614V164.25ZM648.644 164.25H645.659V165.75H648.644V164.25ZM642.674 164.25L639.689 164.25V165.75L642.674 165.75V164.25ZM636.705 164.25H633.72V165.75H636.705V164.25ZM630.735 164.25H627.75V165.75H630.735V164.25ZM624.765 164.25H621.78V165.75H624.765V164.25ZM618.795 164.25H615.811V165.75H618.795V164.25ZM612.826 164.25H609.841V165.75H612.826V164.25ZM606.856 164.25H603.871V165.75H606.856V164.25ZM600.886 164.25H597.901V165.75H600.886V164.25ZM594.917 164.25H591.932V165.75H594.917V164.25ZM588.947 164.25H585.962V165.75H588.947V164.25ZM582.977 164.25H579.992V165.75H582.977V164.25ZM577.007 164.25H574.023V165.75H577.007V164.25ZM571.038 164.25H568.053V165.75H571.038V164.25ZM565.068 164.25H562.083V165.75H565.068V164.25ZM559.098 164.25H556.113V165.75H559.098V164.25ZM553.129 164.25H550.144V165.75H553.129V164.25ZM547.159 164.25H544.174V165.75H547.159V164.25ZM541.189 164.25H538.204V165.75H541.189V164.25ZM535.219 164.25H532.234V165.75H535.219V164.25ZM529.25 164.25H526.265V165.75H529.25V164.25ZM523.28 164.25H520.295V165.75H523.28V164.25ZM517.31 164.25H514.325V165.75H517.31V164.25ZM511.34 164.25H508.356V165.75H511.34V164.25ZM505.371 164.25H502.386V165.75H505.371V164.25ZM499.401 164.25H496.416V165.75H499.401V164.25ZM493.431 164.25H490.446V165.75H493.431V164.25ZM487.462 164.25H484.477V165.75H487.462V164.25ZM481.492 164.25H478.507V165.75H481.492V164.25ZM475.522 164.25H472.537V165.75H475.522V164.25ZM469.552 164.25H466.567V165.75H469.552V164.25ZM463.583 164.25H460.598V165.75H463.583V164.25ZM457.613 164.25H454.628V165.75H457.613V164.25ZM451.643 164.25H448.658V165.75H451.643V164.25ZM445.673 164.25H442.689V165.75H445.673V164.25ZM439.704 164.25H436.719V165.75H439.704V164.25ZM433.734 164.25H430.749V165.75H433.734V164.25ZM427.764 164.25H424.779V165.75H427.764V164.25ZM421.794 164.25H418.81V165.75H421.794V164.25ZM415.825 164.25H412.84V165.75H415.825V164.25ZM409.855 164.25H406.87V165.75H409.855V164.25ZM403.885 164.25H400.9V165.75H403.885V164.25ZM397.916 164.25H394.931V165.75H397.916V164.25ZM391.946 164.25H388.961V165.75H391.946V164.25ZM385.976 164.25H382.991V165.75H385.976V164.25ZM380.006 164.25H377.022V165.75H380.006V164.25ZM374.037 164.25H371.052V165.75H374.037V164.25ZM368.067 164.25H365.082V165.75H368.067V164.25ZM362.097 164.25H359.112V165.75H362.097V164.25ZM356.128 164.25H353.143V165.75H356.128V164.25ZM350.158 164.25H347.173V165.75H350.158V164.25ZM344.188 164.25H341.203V165.75H344.188V164.25ZM338.218 164.25H335.234V165.75H338.218V164.25ZM332.249 164.25H329.264V165.75H332.249V164.25ZM326.279 164.25H323.294V165.75H326.279V164.25ZM320.309 164.25H317.324V165.75H320.309V164.25ZM314.339 164.25H311.355V165.75H314.339V164.25ZM308.37 164.25H305.385V165.75H308.37V164.25ZM302.4 164.25H299.415V165.75H302.4V164.25ZM296.43 164.25H293.445V165.75H296.43V164.25ZM290.461 164.25H287.476V165.75H290.461V164.25ZM284.491 164.25H283V165.75H284.491V164.25Z'
          fill='#605C53'
        />
        <path className='circle2 circle3' d='M283 520L283 141' stroke='#605C53' strokeWidth='1' />

        {/*Circle5*/}
        <path
          className='circle5'
          d='M313.53 487.53C313.823 487.237 313.823 486.763 313.53 486.47L308.757 481.697C308.464 481.404 307.99 481.404 307.697 481.697C307.404 481.99 307.404 482.464 307.697 482.757L311.939 487L307.697 491.243C307.404 491.536 307.404 492.01 307.697 492.303C307.99 492.596 308.464 492.596 308.757 492.303L313.53 487.53ZM313 486.25H242V487.75H313V486.25Z'
          fill='#605C53'
        />

        {/*Circle3*/}
        <path
          className='circle3'
          d='M445.53 282.53C445.823 282.237 445.823 281.763 445.53 281.47L440.757 276.697C440.464 276.404 439.99 276.404 439.697 276.697C439.404 276.99 439.404 277.464 439.697 277.757L443.939 282L439.697 286.243C439.404 286.536 439.404 287.01 439.697 287.303C439.99 287.596 440.464 287.596 440.757 287.303L445.53 282.53ZM282.47 281.47C282.177 281.763 282.177 282.237 282.47 282.53L287.243 287.303C287.536 287.596 288.01 287.596 288.303 287.303C288.596 287.01 288.596 286.536 288.303 286.243L284.061 282L288.303 277.757C288.596 277.464 288.596 276.99 288.303 276.697C288.01 276.404 287.536 276.404 287.243 276.697L282.47 281.47ZM445 281.25H443.5V282.75H445V281.25ZM440.5 281.25H437.5V282.75H440.5V281.25ZM434.5 281.25H431.5V282.75H434.5V281.25ZM428.5 281.25H425.5V282.75H428.5V281.25ZM422.5 281.25H419.5V282.75H422.5V281.25ZM416.5 281.25H413.5V282.75H416.5V281.25ZM410.5 281.25H407.5V282.75H410.5V281.25ZM404.5 281.25H401.5V282.75H404.5V281.25ZM398.5 281.25H395.5V282.75H398.5V281.25ZM392.5 281.25H389.5V282.75H392.5V281.25ZM386.5 281.25H383.5V282.75H386.5V281.25ZM380.5 281.25H377.5V282.75H380.5V281.25ZM374.5 281.25H371.5V282.75H374.5V281.25ZM368.5 281.25H365.5V282.75H368.5V281.25ZM362.5 281.25H359.5V282.75H362.5V281.25ZM356.5 281.25H353.5V282.75H356.5V281.25ZM350.5 281.25H347.5V282.75H350.5V281.25ZM344.5 281.25H341.5V282.75H344.5V281.25ZM338.5 281.25H335.5V282.75H338.5V281.25ZM332.5 281.25H329.5V282.75H332.5V281.25ZM326.5 281.25H323.5V282.75H326.5V281.25ZM320.5 281.25H317.5V282.75H320.5V281.25ZM314.5 281.25H311.5V282.75H314.5V281.25ZM308.5 281.25H305.5V282.75H308.5V281.25ZM302.5 281.25H299.5V282.75H302.5V281.25ZM296.5 281.25H293.5V282.75H296.5V281.25ZM290.5 281.25H287.5V282.75H290.5V281.25ZM284.5 281.25H283V282.75H284.5V281.25Z'
          fill='#605C53'
        />

        <defs>
          <filter
            id='filter0_f_12_58'
            x='97'
            y='306'
            width='999.87'
            height='678.236'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feGaussianBlur stdDeviation='117.5' result='effect1_foregroundBlur_12_58' />
          </filter>
          <filter
            id='filter1_f_12_58'
            x='195'
            y='483'
            width='646.733'
            height='335.499'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feGaussianBlur stdDeviation='31' result='effect1_foregroundBlur_12_58' />
          </filter>
          <filter
            id='filter2_f_12_58'
            x='-38'
            y='-69'
            width='883.446'
            height='964.477'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
            <feGaussianBlur stdDeviation='1' result='effect1_foregroundBlur_12_58' />
          </filter>
          <filter
            id='filter3_d_12_58'
            x='271'
            y='217'
            width='616'
            height='618'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='1' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_12_58' />
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_12_58' result='shape' />
          </filter>
          <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
            <use xlinkHref='#image0_12_58' transform='scale(0.0005)' />
          </pattern>
          <filter
            id='filter4_d_12_58'
            x='773.968'
            y='197.197'
            width='76.9958'
            height='76.7633'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='2' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_12_58' />
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_12_58' result='shape' />
          </filter>
          <filter
            id='filter5_d_12_58'
            x='498.585'
            y='80.56'
            width='75.9615'
            height='76.9875'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='2' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_12_58' />
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_12_58' result='shape' />
          </filter>
          <filter
            id='filter6_d_12_58'
            x='166.968'
            y='451.845'
            width='76.9987'
            height='76.4369'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='2' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_12_58' />
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_12_58' result='shape' />
          </filter>
          <filter
            id='filter7_d_12_58'
            x='293.701'
            y='198.705'
            width='76.9925'
            height='76.9961'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='2' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_12_58' />
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_12_58' result='shape' />
          </filter>
          <filter
            id='filter8_d_12_58'
            x='301.201'
            y='206.201'
            width='62'
            height='62'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dy='4' />
            <feGaussianBlur stdDeviation='2' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_12_58' />
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_12_58' result='shape' />
          </filter>
        </defs>

        <AnimatedCircle x='501' y='196' stroke='#969284' />
        <AnimatedCircle x='501' y='80' stroke='#969284' />
        <AnimatedCircle x='297' y='196' stroke='#969284' />
        <AnimatedCircle x='777' y='196' stroke='#969284' />
        <AnimatedCircle x='175' y='451' stroke='#969284' />

        {/*Circle1*/}
        <foreignObject x='501' y='196' width='200' height='70'>
          <div className='flex items-center gap-x-2'>
            <div className='w-[70px] h-[70px] flex justify-center items-center shrink-0'>
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
                              group-hover:text-white'
            >
              {t('productBlock.innerDiameter')}
            </span>
          </div>
        </foreignObject>

        {/*Circle2*/}
        <foreignObject x='501' y='80' width='200' height='70'>
          <div className='flex items-center gap-x-2'>
            <div className='w-[70px] h-[70px] flex justify-center items-center shrink-0'>
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
                              group-hover:text-white text-left'
            >
              {t('productBlock.outerDiameter')}
            </span>
          </div>
        </foreignObject>

        {/*Circle3*/}
        <foreignObject x='297' y='196' width='200' height='70'>
          <div className='flex items-center gap-x-2'>
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
                              group-hover:text-white text-left'
            >
              {t('productBlock.overallWidth')}
            </span>
          </div>
        </foreignObject>

        {/*Circle4*/}
        <foreignObject x='777' y='196' width='180' height='70'>
          <div className='flex items-center gap-x-8'>
            <div className='w-[70px] h-[70px] flex justify-center items-center'>
              <div
                id='circle4'
                className='w-[54px] h-[54px] bg-[#292929] rounded-full font-labgrotesque text-[30px]
                text-[#767676] flex justify-center items-center'
                onMouseEnter={event => onPointerEnterCircle(event.currentTarget.id)}
                onMouseLeave={event => onPointerLeaveCircle(event.currentTarget.id)}
                onClick={() => {
                  handleOpen()
                  setTimeout(() => onInputFocus('workingWidth'), 100)
                }}
              >
                4
              </div>
            </div>
            <span
              id='circle4text'
              className='max-w-[43%] break-words font-adventpro font-medium text-footerBottomText text-[20px] laptop:text-[15px]
                              group-hover:text-white'
            >
              {t('productBlock.workingWidth')}
            </span>
          </div>
        </foreignObject>

        {/*Circle5*/}
        <foreignObject x='145' y='451' width='130' height='140'>
          <div className='flex h-full flex-col items-center gap-y-2'>
            <div className='w-[70px] h-[70px] flex justify-center items-center shrink-0'>
              <div
                id='circle5'
                className='w-[54px] h-[54px] bg-[#292929] rounded-full font-labgrotesque text-[30px]
                text-[#767676] flex justify-center items-center'
                onMouseEnter={event => onPointerEnterCircle(event.currentTarget.id)}
                onMouseLeave={event => onPointerLeaveCircle(event.currentTarget.id)}
                onClick={() => {
                  handleOpen()
                  setTimeout(() => onInputFocus('drillingDiameter'), 100)
                }}
              >
                5
              </div>
            </div>
            <span
              id='circle5text'
              className='font-adventpro font-medium text-footerBottomText text-[20px] laptop:text-[15px]
                               group-hover:text-white text-center'
            >
              {t('productBlock.drillingDiameter')}
            </span>
          </div>
        </foreignObject>
      </svg>
    </div>
  )
}

export default Matrix1
