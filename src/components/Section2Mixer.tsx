import { useTranslation } from 'react-i18next'
import { useTheme } from '../hooks/useTheme';
import LogoIcon from './customIcons/LogoIcon';
import { getColor, getLocalThemeColor } from '../theme/utils';
import { useMediaQuery } from '@mui/material';
function Section2() {
  const { t } = useTranslation()
  const isLG = useMediaQuery('(min-width:1220px)');

  const theme = useTheme();
  const isDark = theme.name === 'dark';
  // Определяем для стилизации локально
  const mainColor = getLocalThemeColor(isDark, '#2E3032', '#D4D4D4')
  const secondColor = getLocalThemeColor(isDark, '#212325', '#E9E9E9')
  const strokeColor = getLocalThemeColor(isDark, '#544B3C', '#ABB4C3')
  const decorColor = getLocalThemeColor(isDark, '#82643F', '#8DA3B0')
  const boltsColor = getLocalThemeColor(isDark, '#363636', '#B3B3B3')
  const particleColor = getLocalThemeColor(isDark, '#363636', '#D9D9D9')

  return (
    <section id='section2' className='flex justify-center mt-[15%] w-full'>
      <svg viewBox='0 0 1639 667' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g filter='url(#filter0_b_113_613)'>
          <circle cx='1000' cy='370' r='135.5' fill={getColor(theme, 'decorative')} />
          <foreignObject x="940" y="320" width="136" height="103">
            <LogoIcon
              className="w-[136px] h-[103px]"
              mainColor={getColor(theme, 'svg.darkColor')}
              secondaryColor={getColor(theme, 'svg.lightColor')}
              crossColor={getColor(theme, 'svg.crossColor')}
            />
          </foreignObject>
        </g>
        <path d='M856 350L856 585' style={{ transform: 'translateX(10px)' }} stroke={getColor(theme, 'svg.fill')} strokeWidth='0.5' />
        <path d='M1126 350L1126 587' style={{ transform: 'translateX(10px)' }} stroke={getColor(theme, 'svg.fill')} strokeWidth='0.5' />
        <path
          d='M855.47 563.53C855.177 563.237 855.177 562.763 855.47 562.47L860.243 557.697C860.536 557.404 861.01 557.404 861.303 557.697C861.596 557.99 861.596 558.464 861.303 558.757L857.061 563L861.303 567.243C861.596 567.536 861.596 568.01 861.303 568.303C861.01 568.596 860.536 568.596 860.243 568.303L855.47 563.53ZM1126.53 562.47C1126.82 562.763 1126.82 563.237 1126.53 563.53L1121.76 568.303C1121.46 568.596 1120.99 568.596 1120.7 568.303C1120.4 568.01 1120.4 567.536 1120.7 567.243L1124.94 563L1120.7 558.757C1120.4 558.464 1120.4 557.99 1120.7 557.697C1120.99 557.404 1121.46 557.404 1121.76 557.697L1126.53 562.47ZM856 562.25H857.5V563.75H856V562.25ZM860.5 562.25H863.5V563.75H860.5V562.25ZM866.5 562.25H869.5V563.75H866.5V562.25ZM872.5 562.25H875.5V563.75H872.5V562.25ZM878.5 562.25H881.5V563.75H878.5V562.25ZM884.5 562.25H887.5V563.75H884.5V562.25ZM890.5 562.25H893.5V563.75H890.5V562.25ZM896.5 562.25H899.5V563.75H896.5V562.25ZM902.5 562.25H905.5V563.75H902.5V562.25ZM908.5 562.25H911.5V563.75H908.5V562.25ZM914.5 562.25H917.5V563.75H914.5V562.25ZM920.5 562.25H923.5V563.75H920.5V562.25ZM926.5 562.25H929.5V563.75H926.5V562.25ZM932.5 562.25H935.5V563.75H932.5V562.25ZM938.5 562.25H941.5V563.75H938.5V562.25ZM944.5 562.25H947.5V563.75H944.5V562.25ZM950.5 562.25H953.5V563.75H950.5V562.25ZM956.5 562.25H959.5V563.75H956.5V562.25ZM962.5 562.25H965.5V563.75H962.5V562.25ZM968.5 562.25H971.5V563.75H968.5V562.25ZM974.5 562.25H977.5V563.75H974.5V562.25ZM980.5 562.25H983.5V563.75H980.5V562.25ZM986.5 562.25H989.5V563.75H986.5V562.25ZM992.5 562.25H995.5V563.75H992.5V562.25ZM998.5 562.25H1001.5V563.75H998.5V562.25ZM1004.5 562.25H1007.5V563.75H1004.5V562.25ZM1010.5 562.25H1013.5V563.75H1010.5V562.25ZM1016.5 562.25H1019.5V563.75H1016.5V562.25ZM1022.5 562.25H1025.5V563.75H1022.5V562.25ZM1028.5 562.25H1031.5V563.75H1028.5V562.25ZM1034.5 562.25H1037.5V563.75H1034.5V562.25ZM1040.5 562.25H1043.5V563.75H1040.5V562.25ZM1046.5 562.25H1049.5V563.75H1046.5V562.25ZM1052.5 562.25H1055.5V563.75H1052.5V562.25ZM1058.5 562.25H1061.5V563.75H1058.5V562.25ZM1064.5 562.25H1067.5V563.75H1064.5V562.25ZM1070.5 562.25H1073.5V563.75H1070.5V562.25ZM1076.5 562.25H1079.5V563.75H1076.5V562.25ZM1082.5 562.25H1085.5V563.75H1082.5V562.25ZM1088.5 562.25H1091.5V563.75H1088.5V562.25ZM1094.5 562.25H1097.5V563.75H1094.5V562.25ZM1100.5 562.25H1103.5V563.75H1100.5V562.25ZM1106.5 562.25H1109.5V563.75H1106.5V562.25ZM1112.5 562.25H1115.5V563.75H1112.5V562.25ZM1118.5 562.25H1121.5V563.75H1118.5V562.25ZM1124.5 562.25H1126V563.75H1124.5V562.25Z'
          style={{ transform: 'translateX(10px)' }}
          fill={getColor(theme, 'svg.fill')}
        />
        <foreignObject className='text-center' x='872' y='532' width='258' height='25'>
          <span className='font-["Bebas_Neue"] text-[18px] whitespace-normal uppercase tracking-[.2em]'
            style={{ color: getColor(theme, 'textOnSvg')}}
          >
            {t('diagrams.millMixer.steamSystemBlock.descriptionBg')}
          </span>
        </foreignObject>

        <text className='font-adventpro text-[29px] uppercase translate-x-[898px] translate-y-[290px]'
          style={{ fill: getColor(theme, 'subtitle') }}
        >
          {t('diagrams.millMixer.steamSystemBlock.subtitle')}
        </text>

        <text className='font-["Bebas_Neue"] text-[90px] whitespace-normal uppercase translate-x-[897px] translate-y-[70px]'
          style={{ fill: getColor(theme, 'title') }}
        >
          {t('diagrams.millMixer.steamSystemBlock.title.system')}
        </text>
        <text className='font-["Bebas_Neue"] text-[90px] whitespace-normal uppercase translate-x-[897px] translate-y-[160px]'
          style={{ fill: getColor(theme, 'title') }}
        >
          {t('diagrams.millMixer.steamSystemBlock.title.intelligent')}
        </text>
        <text className='font-["Bebas_Neue"] text-[90px] whitespace-normal uppercase translate-x-[897px] translate-y-[250px]'
          style={{ fill: getColor(theme, 'title') }}
        >
          {t('diagrams.millMixer.steamSystemBlock.title.steam')}
        </text>

        <path className='section2stroke' d='M878 5L878 70' stroke={getColor(theme, 'particle')} strokeWidth='24' />
        <path className='section2stroke' d='M878 95L878 160' stroke={getColor(theme, 'particle')} strokeWidth='24' />
        <path className='section2stroke' d='M878 185L878 250' stroke={getColor(theme, 'particle') }strokeWidth='24' />

        {/* SVG */}

        <svg xmlns="http://www.w3.org/2000/svg" x={isLG ? 250 : 200} y={100} width="697" height="806" viewBox="0 0 697 906" fill="none">
          <path d="M205.724 552.753H213.214L214.711 569.231H219.205L220.204 552.753L229.691 553.752V536.275H205.724V552.753Z" fill="#171717" />
          <path d="M406.832 378.01H399.821C399.821 378.01 398.263 292.326 398.263 254.157C398.263 239.314 385.844 227.673 371 227.673H324.263V230.01H310.242V216.768H324.263V219.104H371C390.575 219.104 406.832 234.582 406.832 254.157V378.01Z" fill={decorColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M46.1795 400.599H54.7479V337.505C54.7479 322.661 78.8518 311.02 93.6952 311.02H140.432V313.357H154.453V300.115H140.432V302.452H93.6952C74.1199 302.452 46.1795 317.929 46.1795 337.505V400.599Z" fill="#878787" fill-opacity="0.55" stroke={decorColor} stroke-width="1.716" />
          <path d="M46.1796 399.82H54.748V543.925C54.748 558.768 78.8519 570.409 93.6954 570.409H186.39V568.072H200.411V581.314H186.39V578.978H93.6954C74.12 578.978 46.1796 563.5 46.1796 543.925V399.82Z" fill="#878787" fill-opacity="0.55" stroke={decorColor} stroke-width="1.716" />
          <path d="M169.253 53.9707H178.6V61.7602H254.158V53.9707H263.505L275.19 192.623H304.011V210.539L309.463 213.655V228.455L304.011 231.571V238.581H276.747L272.074 234.686H247.147V237.802H244.032L243.253 272.076L246.369 275.192H273.632V315.697L268.179 321.929V326.602L260.39 325.823L259.611 328.939H248.705V325.823L243.253 322.707H229.232V290.771L226.116 287.655V275.192L222.221 274.413V289.213L226.116 290.771V295.444L222.221 297.002L209.758 287.655V275.192L205.863 274.413V286.097L202.747 289.213V322.707H190.284L189.505 325.823H184.832L183.274 328.939H173.147L171.59 326.602L163.021 325.823V320.371L159.126 319.592L158.347 275.192H182.495L186.39 272.076L185.611 237.802C185.611 237.802 176.623 236.469 170.811 233.908C165.32 231.488 156.79 225.339 156.79 225.339H126.411V192.623H156.79L169.253 53.9707Z" fill={secondColor} stroke={decorColor} stroke-width="1.1" />
          <path d="M171.589 194.956L164.579 191.062L171.589 80.451L179.379 75.7773H195.737L200.41 80.451V89.0194H230.789V80.451L234.684 75.7773H252.6L258.831 80.451L267.4 189.504L257.273 194.956H171.589Z" fill={mainColor} />
          <path d="M178.6 61.757V55.5254H253.379V61.757H178.6Z" fill={getLocalThemeColor(isDark, '#82643F', '##C0C0C0')} />
          <path d="M223.779 46.1785V17.3574H206.642V46.1785H209.758M223.779 46.1785H222.221M223.779 46.1785H230.79V54.7469H222.221M209.758 46.1785V54.7469M209.758 46.1785H200.411V54.7469H209.758M209.758 46.1785H222.221M209.758 54.7469H222.221M222.221 54.7469V46.1785" stroke={mainColor} stroke-width="1.716" />
          <path d="M208.2 12.6842V16.5789H222.221V12.6842M208.2 12.6842L215.6 11.1263M208.2 12.6842H203.526M215.6 11.1263L222.221 12.6842M215.6 11.1263V4.11579M222.221 12.6842H203.526M222.221 12.6842H227.673V4.11579M203.526 4.11579L208.2 1H215.21H223L227.673 4.11579M203.526 4.11579V12.6842M203.526 4.11579H215.6M227.673 4.11579H215.6" stroke={mainColor} stroke-width="1.716" />
          <circle cx="194.178" cy="187.168" r="3.34474" fill={strokeColor} stroke={secondColor} stroke-width="1.1" />
          <circle cx="237.8" cy="187.168" r="3.34474" fill={strokeColor} stroke={secondColor} stroke-width="1.1" />
          <circle cx="194.178" cy="103.041" r="3.34474" fill={strokeColor} stroke={secondColor} stroke-width="1.1" />
          <circle cx="237.8" cy="103.041" r="3.34474" fill={strokeColor} stroke={secondColor} stroke-width="1.1" />
          <rect x="190.081" y="168.292" width="51.8684" height="8.24737" rx="4.12368" transform="rotate(5.26424 190.081 168.292)" fill={strokeColor} stroke={secondColor} stroke-width="1.1" />
          <rect x="190.081" y="154.27" width="51.8684" height="8.24737" rx="4.12368" transform="rotate(5.26424 190.081 154.27)" fill={strokeColor} stroke={secondColor} stroke-width="1.1" />
          <rect x="190.081" y="138.692" width="51.8684" height="8.24737" rx="4.12368" transform="rotate(5.26424 190.081 138.692)" fill={strokeColor} stroke={secondColor} stroke-width="1.1" />
          <rect x="190.081" y="123.114" width="51.8684" height="8.24737" rx="4.12368" transform="rotate(5.26424 190.081 123.114)" fill={strokeColor} stroke={secondColor} stroke-width="1.1" />
          <rect x="190.081" y="107.534" width="51.8684" height="8.24737" rx="4.12368" transform="rotate(5.26424 190.081 107.534)" fill={strokeColor} stroke={secondColor} stroke-width="1.1" />
          <rect x="188.726" y="92.918" width="54.5263" height="4.67368" fill={strokeColor} />
          <rect x="201.19" y="97.5898" width="4.67368" height="4.67368" fill={strokeColor} />
          <rect x="226.116" y="97.5898" width="4.67368" height="4.67368" fill={strokeColor} />
          <rect x="208.979" y="97.5898" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="97.5898" width="12.4632" height="1.55789" fill={strokeColor} />
          <rect x="208.979" y="83.5684" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="80.4512" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="77.3379" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="74.2207" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="71.1035" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="67.9902" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="64.873" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="61.7598" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="99.1465" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="85.127" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="99.1465" width="12.4632" height="1.55789" fill="#8B97AC" />
          <rect x="208.979" y="78.8945" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="75.7773" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="72.6621" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="69.5469" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="66.4316" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="82.0117" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="63.3164" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="27.4824" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="41.502" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="44.6172" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="38.3867" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="32.1523" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="35.2695" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="29.0371" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="25.9238" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="22.8086" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="19.6914" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="208.979" y="36.8262" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="33.7129" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="43.0605" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="39.9434" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="30.5957" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="24.3652" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="21.248" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="208.979" y="18.1348" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="212.094" y="100.707" width="6.23158" height="1.55789" fill="#4D4D4D" />
          <rect x="212.094" y="100.707" width="6.23158" height="1.55789" fill="#596271" />
          <path d="M208.979 86.6855L221.442 86.6855L215.211 91.3592L208.979 86.6855Z" fill="#4D4D4D" />
          <rect x="212.095" y="102.264" width="6.23158" height="1.55789" fill="#596271" />
          <path d="M152.037 185.69V193.321H131.943V185.69H152.037Z" fill={particleColor} stroke={mainColor} stroke-width="1.716" />
          <path d="M298.478 185.69V193.321H278.385V185.69H298.478Z" fill={particleColor} stroke={mainColor} stroke-width="1.716" />
          <path d="M181.636 268.259V275.89H161.542V268.259H181.636Z" fill={particleColor} stroke={mainColor} stroke-width="1.716" />
          <path d="M270.437 268.259V275.89H250.343V268.259H270.437Z" fill={particleColor} stroke={mainColor} stroke-width="1.716" />
          <path d="M6.45215 409.169V378.011H137.315V369.442H170.031L184.831 351.527V325.821L190.284 322.706H201.968V291.548L206.642 286.874V275.969H225.336V286.874L229.231 289.99V322.706H242.473L247.926 325.821L249.484 351.527L261.947 366.327L251.821 379.569L249.484 390.474H180.936L167.694 417.737L137.315 416.179V409.169H6.45215Z" fill={secondColor} stroke={decorColor} stroke-width="1.1" />
          <path d="M1 388.678C1 388.678 1.32685 398.536 5.67415 398.804C10.157 399.08 10.9904 393.167 11.1265 388.678C11.2707 383.919 10.4276 377.493 5.67449 377.772C1.04893 378.044 1 388.678 1 388.678Z" fill={particleColor} stroke={getLocalThemeColor(isDark, '#544B3C',"#B7B7B7")} stroke-width="1.716" />
          <path d="M251.821 400.598L255.926 393.866L289.688 414.801L265.063 414.801L251.821 400.598Z" fill={decorColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M117.842 362.432V376.453H138.094V369.442H166.137L184.052 346.853V332.053H170.81V328.158H164.579V343.737H175.484V348.411L162.242 362.432H138.094L133.421 357.758H121.737L117.842 362.432Z" fill={mainColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M117.842 423.969V410.727H138.095V416.959H166.137L181.716 391.254H209.758V399.043H184.832L173.926 416.959V427.864L180.937 434.875H192.621V447.338H181.716L162.242 423.969H138.095L133.421 428.643H121.737L117.842 423.969Z" fill={mainColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M313.358 423.969V410.727H293.105V416.959H265.063L249.484 391.254H221.442V399.043H246.368L257.274 416.959V427.864L250.263 434.875H238.579V447.338H249.484L268.958 423.969H293.105L297.779 428.643H309.463L313.358 423.969Z" fill={mainColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M314.137 362.432V375.674H293.884V369.442H265.842L247.926 346.853V332.053H261.168V328.158H267.4V343.737H256.495V348.411L269.737 362.432H293.884L298.558 357.758H310.242L314.137 362.432Z" fill={mainColor} stroke={decorColor} stroke-width="1.716" />
          <rect x="93.6948" y="522.895" width="15.5789" height="1.55789" fill="#767676" />
          <rect x="93.6951" y="536.914" width="15.5789" height="1.55789" fill={boltsColor} />
          <rect x="93.6951" y="540.027" width="15.5789" height="1.55789" fill={boltsColor} />
          <rect x="93.6951" y="533.799" width="15.5789" height="1.55789" fill={boltsColor} />
          <rect x="93.6951" y="527.562" width="15.5789" height="1.55789" fill={boltsColor} />
          <rect x="93.6951" y="530.68" width="15.5789" height="1.55789" fill={boltsColor} />
          <rect x="93.6951" y="524.447" width="15.5789" height="1.55789" fill={boltsColor} />
          <rect x="93.6951" y="521.332" width="15.5789" height="1.55789" fill={boltsColor} />
          <rect x="93.6951" y="518.219" width="15.5789" height="1.55789" fill={boltsColor} />
          <rect x="93.6951" y="515.102" width="15.5789" height="1.55789" fill={boltsColor} />
          <rect x="93.6951" y="532.238" width="15.5789" height="1.55789" fill="#767676" />
          <rect x="93.6951" y="529.123" width="15.5789" height="1.55789" fill="#767676" />
          <rect x="93.6951" y="538.471" width="15.5789" height="1.55789" fill="#767676" />
          <rect x="93.6951" y="535.354" width="15.5789" height="1.55789" fill="#767676" />
          <rect x="93.6951" y="526.006" width="15.5789" height="1.55789" fill="#767676" />
          <rect x="93.6951" y="519.775" width="15.5789" height="1.55789" fill="#767676" />
          <rect x="93.6951" y="516.658" width="15.5789" height="1.55789" fill="#767676" />
          <rect x="324.263" y="522.895" width="17.1368" height="1.55789" fill="#767676" />
          <rect x="324.263" y="536.914" width="17.1368" height="1.55789" fill={boltsColor} />
          <rect x="324.263" y="540.027" width="17.1368" height="1.55789" fill={boltsColor} />
          <rect x="324.263" y="533.799" width="17.1368" height="1.55789" fill={boltsColor} />
          <rect x="324.263" y="527.562" width="17.1368" height="1.55789" fill={boltsColor} />
          <rect x="324.263" y="530.68" width="17.1368" height="1.55789" fill={boltsColor} />
          <rect x="324.263" y="524.447" width="17.1368" height="1.55789" fill={boltsColor} />
          <rect x="324.263" y="521.332" width="17.1368" height="1.55789" fill={boltsColor} />
          <rect x="324.263" y="518.219" width="17.1368" height="1.55789" fill={boltsColor} />
          <rect x="324.263" y="515.102" width="17.1368" height="1.55789" fill={boltsColor} />
          <rect x="324.263" y="532.238" width="17.1368" height="1.55789" fill="#767676" />
          <rect x="324.263" y="529.123" width="17.1368" height="1.55789" fill="#767676" />
          <rect x="324.263" y="538.471" width="17.1368" height="1.55789" fill="#767676" />
          <rect x="324.263" y="535.354" width="17.1368" height="1.55789" fill="#767676" />
          <rect x="324.263" y="526.006" width="17.1368" height="1.55789" fill="#767676" />
          <rect x="324.263" y="519.775" width="17.1368" height="1.55789" fill="#767676" />
          <rect x="324.263" y="516.658" width="17.1368" height="1.55789" fill="#767676" />
          <path d="M250.263 431.757H182.495L177.821 427.083V415.399L184.832 399.041H247.148L256.495 415.399L255.716 427.083L250.263 431.757Z" fill={decorColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M192.621 452.012H180.158V467.591C180.158 480.054 164.579 498.749 156.789 498.749H146.663V502.643H134.979V498.749H80.4526V517.443H121.737H133.421V514.328H146.663H159.126V508.096H159.905C171.589 508.096 189.502 487.878 192.621 467.591C193.546 461.577 192.621 452.012 192.621 452.012Z" fill={mainColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M146.663 522.895H159.126V527.568L196.516 530.684L209.758 526.011V550.937L187.168 551.716V564.958L184.832 593H169.253L166.916 564.958V551.716H163.8V546.263L144.326 538.474H134.979H80.4526V519.779H121.737H133.421V522.895H146.663Z" fill={mainColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M287.653 522.895H275.189V527.568L237.8 530.684L224.558 526.011V550.937L289.21 551.716V564.958L291.547 593H307.126L309.463 564.958V551.716H312.579V546.263L332.053 538.474H341.4H353.863V519.779H312.579H300.895V522.895H287.653Z" fill={mainColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M237.432 452.012H249.895V467.591C249.895 480.054 265.474 498.749 273.264 498.749H283.39V502.643H295.074V498.749H349.601V517.443H308.316H296.632V514.328H283.39H270.927V508.096H270.148C258.464 508.096 240.552 487.878 237.432 467.591C236.508 461.577 237.432 452.012 237.432 452.012Z" fill={mainColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M268.179 371.777H291.547V411.504L258.832 391.251L268.179 371.777Z" fill={decorColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M316.474 378.01H425.527V408.389H316.474V405.273H293.885V381.126H316.474V378.01Z" fill={decorColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M201.189 564.959H204.305V552.496H213.653V564.959C213.653 564.959 213.653 569.633 216.768 569.633C219.884 569.633 219.884 564.959 219.884 564.959V552.496H229.232V564.959C229.232 564.959 229.232 568.854 229.232 577.422C229.232 581.317 225.338 583.654 221.442 583.654C214.432 583.654 201.189 583.654 201.189 583.654V564.959Z" fill="#878787" fill-opacity="0.55" stroke={decorColor} stroke-width="1.716" />
          <path d="M162.242 521.335H133.421V524.451H300.895V521.335H268.958V515.103H235.463L230.79 510.43V493.293H201.19V510.43L196.516 515.103H162.242V521.335Z" fill={mainColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M205.863 490.178V485.504H212.874L213.653 367.883H218.326L219.105 485.504H226.116V490.178H205.863Z" fill={mainColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M196.516 470.705V422.41L199.632 418.516H209.758V473.821H204.306V470.705H196.516Z" fill={mainColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M234.684 470.705V422.41L231.568 418.516H221.442V473.821H226.895V470.705H234.684Z" fill={mainColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M286.874 360.873H277.526V343.736C277.526 337.504 286.095 325.82 297.779 325.82H308.684C311.816 325.82 311.8 318.81 311.8 318.81C311.8 318.81 311.816 311.799 308.684 311.799H292.326V304.01H308.684C316.474 304.01 319.59 311.63 319.59 318.81C319.59 325.989 315.864 333.61 308.684 333.61H302.453C292.326 333.61 286.874 339.062 286.874 347.631V360.873Z" fill={decorColor} />
          <path d="M277.526 360.873H286.874C286.874 360.873 286.874 356.199 286.874 347.631C286.874 339.062 292.326 333.61 302.453 333.61C307.624 333.61 304.011 333.61 308.684 333.61C315.864 333.61 319.59 325.989 319.59 318.81C319.59 311.63 316.474 304.01 308.684 304.01C302.296 304.01 292.326 304.01 292.326 304.01V311.799C292.326 311.799 302.453 311.799 308.684 311.799C311.816 311.799 311.8 318.81 311.8 318.81C311.8 318.81 311.816 325.82 308.684 325.82C303.232 325.82 303.232 325.82 297.779 325.82C286.095 325.82 277.526 337.504 277.526 343.736C277.526 352.304 277.526 361.652 277.526 361.652" stroke={decorColor} stroke-width="1.716" />
          <path d="M160.684 213.654H268.178C268.178 213.654 262.202 223.106 256.494 226.117C251.007 229.012 240.915 229.233 240.915 229.233V221.444H196.515H187.947V229.233C187.947 229.233 177.194 228.126 171.589 224.56C163.02 219.107 160.684 213.654 160.684 213.654Z" fill={decorColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M422.41 388.678C422.41 388.678 422.737 398.536 427.084 398.804C431.567 399.08 432.401 393.167 432.537 388.678C432.681 383.919 431.838 377.493 427.085 377.772C422.459 378.044 422.41 388.678 422.41 388.678Z" fill={particleColor} stroke={getLocalThemeColor(isDark, '#544B3C',"#B7B7B7")} stroke-width="1.716" />
          <rect x="297.779" y="215.988" width="10.9053" height="12.4632" fill={particleColor} />
          <path d="M289.989 216.77H297.779V228.454H289.989L283.758 226.117H268.179H253.379L262.726 213.654H268.179V219.107H283.758L289.989 216.77Z" fill={decorColor} stroke={decorColor} stroke-width="1.716" />
          <path d="M194.958 237.803H205.864V278.308H200.411C200.411 278.308 194.958 277.529 194.958 286.876C194.958 294.666 194.958 310.245 194.958 310.245H184.832H170.032V311.803H154.453V310.245V301.676H170.032V303.234H186.39C186.39 303.234 186.39 295.445 186.39 285.319C186.39 273.634 194.958 272.855 194.958 272.855V237.803Z" fill={particleColor} fill-opacity="0.55" stroke={getLocalThemeColor(isDark, '#544B3C',"#B7B7B7")} stroke-width="1.716" />
          <path d="M237.021 237.803H226.116V278.308H231.568C231.568 278.308 237.021 277.529 237.021 286.876C237.021 294.666 237.021 310.245 237.021 310.245H247.147H261.947V311.803H277.526V310.245V301.676H261.947V303.234H245.59C245.59 303.234 245.59 295.445 245.59 285.319C245.59 273.634 237.021 272.855 237.021 272.855V237.803Z" fill={decorColor} stroke={decorColor} stroke-width="1.716" />
          <rect x="277.526" y="300.115" width="14.0211" height="12.4632" fill={particleColor} />
          <rect x="154.453" y="300.115" width="15.5789" height="12.4632" fill={particleColor} />
          <rect x="86.7628" y="486.364" width="6.07347" height="10.7472" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="136.616" y="486.364" width="6.07347" height="10.7472" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="94.5518" y="486.364" width="13.8629" height="10.7472" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="110.131" y="486.364" width="4.51558" height="10.7472" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="116.363" y="486.364" width="4.51558" height="10.7472" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="122.594" y="486.364" width="12.3051" height="10.7472" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="87.4624" y="483.949" width="54.5263" height="1.55789" fill={mainColor} />
          <rect x="292.405" y="486.364" width="6.07347" height="10.7472" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="342.258" y="486.364" width="6.07347" height="10.7472" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="300.194" y="486.364" width="13.8629" height="10.7472" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="315.773" y="486.364" width="4.51558" height="10.7472" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="322.005" y="486.364" width="4.51558" height="10.7472" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="328.236" y="486.364" width="12.3051" height="10.7472" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="293.105" y="483.949" width="54.5263" height="1.55789" fill={mainColor} />
          <rect x="0.858" y="-0.858" width="6.07347" height="10.7472" transform="matrix(1 0 0 -1 85.9048 550.778)" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="0.858" y="-0.858" width="6.07347" height="10.7472" transform="matrix(1 0 0 -1 135.758 550.778)" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="0.858" y="-0.858" width="13.8629" height="10.7472" transform="matrix(1 0 0 -1 93.6938 550.778)" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="0.858" y="-0.858" width="4.51558" height="10.7472" transform="matrix(1 0 0 -1 109.273 550.778)" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="0.858" y="-0.858" width="4.51558" height="10.7472" transform="matrix(1 0 0 -1 115.505 550.778)" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="0.858" y="-0.858" width="12.3051" height="10.7472" transform="matrix(1 0 0 -1 121.736 550.778)" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect width="54.5263" height="1.55789" transform="matrix(1 0 0 -1 87.4624 554.051)" fill={mainColor} />
          <rect x="0.858" y="-0.858" width="2.49453" height="10.7472" transform="matrix(1 0 0 -1 318.031 550.778)" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="0.858" y="-0.858" width="2.49453" height="10.7472" transform="matrix(1 0 0 -1 344.979 550.778)" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="0.858" y="-0.858" width="6.70505" height="10.7472" transform="matrix(1 0 0 -1 322.242 550.778)" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect x="0.842105" y="-0.842105" width="1.68421" height="10.7789" transform="matrix(1 0 0 -1 330.662 550.81)" fill="#8E8E8E" stroke={mainColor} stroke-width="1.68421" />
          <rect x="0.842105" y="-0.842105" width="1.68421" height="10.7789" transform="matrix(1 0 0 -1 334.031 550.81)" fill="#8E8E8E" stroke={mainColor} stroke-width="1.68421" />
          <rect x="0.858" y="-0.858" width="5.86295" height="10.7472" transform="matrix(1 0 0 -1 337.4 550.778)" fill="#8E8E8E" stroke={mainColor} stroke-width="1.716" />
          <rect width="29.4737" height="1.55789" transform="matrix(1 0 0 -1 318.873 554.051)" fill={mainColor} />
          <rect x="194.258" y="385.1" width="43.4629" height="2.95768" fill={mainColor} stroke="#C3C3C3" stroke-width="1.716" />
          <rect x="194.258" y="385.1" width="43.4629" height="2.95768" fill="#A8A8A8" stroke="#C3C3C3" stroke-width="1.716" />
          <rect x="194.958" y="378.01" width="40.5053" height="4.67368" fill="#A8A8A8" />
          <rect x="198.073" y="373.338" width="35.8316" height="4.67368" fill="#838383" />
          <rect x="198.073" y="365.549" width="35.8316" height="4.67368" fill="#707070" />
          <rect x="198.073" y="359.316" width="35.8316" height="4.67368" fill="#707070" />
          <rect x="196.516" y="353.082" width="4.67368" height="4.67368" fill="#888888" />
          <rect x="229.231" y="353.082" width="4.67368" height="4.67368" fill="#888888" />
          <rect x="196.516" y="346.854" width="4.67368" height="4.67368" fill="#888888" />
          <rect x="229.231" y="346.854" width="4.67368" height="4.67368" fill="#888888" />
          <rect x="196.516" y="340.621" width="4.67368" height="4.67368" fill="#888888" />
          <rect x="229.231" y="340.621" width="4.67368" height="4.67368" fill="#888888" />
          <circle cx="216.768" cy="301.674" r="4.67368" fill="#6E6E6E" />
          <rect x="190.284" y="328.158" width="54.5263" height="7.78947" fill={particleColor} />
          <rect x="190.284" y="335.949" width="9.34737" height="3.11579" fill="#A9A9A9" />
          <rect x="232.348" y="335.949" width="9.34737" height="3.11579" fill="#A9A9A9" />
          <rect x="205.863" y="335.949" width="20.2526" height="3.11579" fill="#A9A9A9" />
          <rect x="210.537" y="533.799" width="14.0211" height="3.11579" fill="#596271" />
          <rect x="210.537" y="538.473" width="14.0211" height="3.11579" fill="#596271" />
          <rect x="95.252" y="508.875" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="95.252" y="522.896" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="95.252" y="526.012" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="95.252" y="529.129" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="95.252" y="532.242" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="95.252" y="535.359" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="95.252" y="519.781" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="95.252" y="513.547" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="95.252" y="516.664" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="95.252" y="510.432" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="95.252" y="507.318" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="95.252" y="504.203" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="95.252" y="501.086" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="95.252" y="518.221" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="95.252" y="515.107" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="95.252" y="524.455" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="95.252" y="527.57" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="95.252" y="533.799" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="95.252" y="536.916" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="95.252" y="530.688" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="95.252" y="521.338" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="95.252" y="511.99" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="95.252" y="505.76" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="95.252" y="502.643" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="327.379" y="507.318" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="327.378" y="521.342" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="327.378" y="524.455" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="327.378" y="527.572" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="327.378" y="530.686" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="327.378" y="533.803" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="327.378" y="536.92" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="327.378" y="518.227" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="327.378" y="511.992" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="327.378" y="515.107" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="327.378" y="508.875" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="327.378" y="505.76" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="327.378" y="502.646" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="327.378" y="499.529" width="12.4632" height="1.55789" fill={boltsColor} />
          <rect x="327.378" y="516.666" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="327.378" y="513.551" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="327.378" y="522.898" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="327.378" y="526.014" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="327.378" y="532.244" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="327.378" y="535.359" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="327.378" y="538.477" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="327.378" y="529.131" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="327.378" y="519.781" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="327.378" y="510.434" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="327.378" y="504.203" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="327.378" y="501.086" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="95.2527" y="499.527" width="12.4632" height="1.55789" fill="#767676" />
          <rect x="117.063" y="378.012" width="21.8105" height="32.7158" fill="#CFCFCF" />
          <path d="M117.843 382.686L119.401 378.791" stroke={decorColor} stroke-width="1.716" />
          <path d="M132.643 411.506L138.095 398.264" stroke={decorColor} stroke-width="1.716" />
          <path d="M117.843 388.138L121.738 378.791" stroke={decorColor} stroke-width="1.716" />
          <path d="M135.758 410.728L138.095 405.275" stroke={decorColor} stroke-width="1.716" />
          <path d="M130.306 410.728L138.095 391.254" stroke={decorColor} stroke-width="1.716" />
          <path d="M117.843 393.591L124.074 378.791" stroke={decorColor} stroke-width="1.716" />
          <path d="M117.843 399.823L126.411 378.791" stroke={decorColor} stroke-width="1.716" />
          <path d="M127.969 409.949L138.095 383.465" stroke={decorColor} stroke-width="1.716" />
          <path d="M117.843 406.832L128.748 379.568" stroke={decorColor} stroke-width="1.716" />
          <path d="M118.621 409.949L131.863 378.791" stroke={decorColor} stroke-width="1.716" />
          <path d="M121.737 409.947L134.2 379.568" stroke={decorColor} stroke-width="1.716" />
          <path d="M124.853 409.949L137.316 378.791" stroke={decorColor} stroke-width="1.716" />
          <rect x="117.921" y="378.87" width="20.0945" height="30.9998" stroke={mainColor} stroke-width="1.716" />
          <rect width="21.8105" height="32.7158" transform="matrix(-1 0 0 1 314.916 378.012)" fill="#CFCFCF" />
          <path d="M314.137 382.686L312.579 378.791" stroke={decorColor} stroke-width="1.716" />
          <path d="M299.337 411.506L293.884 398.264" stroke={decorColor} stroke-width="1.716" />
          <path d="M314.137 388.138L310.242 378.791" stroke={decorColor} stroke-width="1.716" />
          <path d="M296.222 410.728L293.885 405.275" stroke={decorColor} stroke-width="1.716" />
          <path d="M301.674 410.728L293.884 391.254" stroke={decorColor} stroke-width="1.716" />
          <path d="M314.137 393.591L307.905 378.791" stroke={decorColor} stroke-width="1.716" />
          <path d="M314.137 399.823L305.568 378.791" stroke={decorColor} stroke-width="1.716" />
          <path d="M304.011 409.949L293.885 383.465" stroke={decorColor} stroke-width="1.716" />
          <path d="M314.137 406.832L303.231 379.568" stroke={decorColor} stroke-width="1.716" />
          <path d="M313.358 409.949L300.116 378.791" stroke={decorColor} stroke-width="1.716" />
          <path d="M310.242 409.947L297.779 379.568" stroke={decorColor} stroke-width="1.716" />
          <path d="M307.126 409.949L294.663 378.791" stroke={decorColor} stroke-width="1.716" />
          <rect x="-0.858" y="0.858" width="20.0945" height="30.9998" transform="matrix(-1 0 0 1 313.2 378.012)" stroke={mainColor} stroke-width="1.716" />
          <rect x="397.464" y="316.572" width="10.9852" height="1.9973" fill={particleColor} />
          <path d="M95.6729 401.365L95.6729 388.568L106.756 394.967L95.6729 401.365Z" fill={getLocalThemeColor(isDark, '#82643F','#FFFFFF')} stroke={strokeColor} stroke-width="1.1" />
          <rect x="65.4636" y="392.023" width="29.8582" height="5.89055" fill={getLocalThemeColor(isDark, '#82643F','#FFFFFF')} stroke={strokeColor} stroke-width="1.1" />
          <rect x="94.873" y="392.471" width="2.99595" height="4.99325" fill={getLocalThemeColor(isDark, '#82643F','#FFFFFF')} />
          <path d="M376.293 401.365L376.293 388.568L387.376 394.967L376.293 401.365Z" fill={getLocalThemeColor(isDark, '#000000','#FFFFFF')} stroke={strokeColor} stroke-width="1.1" />
          <rect x="346.084" y="392.023" width="29.8582" height="5.89055" fill={getLocalThemeColor(isDark, '#000000','#FFFFFF')} stroke={strokeColor} stroke-width="1.1" />
          <rect x="375.494" y="392.471" width="2.99595" height="4.99325" fill={getLocalThemeColor(isDark, '#000000','#FFFFFF')} />
          <foreignObject className='text-start' x='390' y='530' width='300' height='180'>
          <span className='font-adventpro text-[25px] whitespace-normal leading-[49%]'
            style={{ color: getColor(theme, 'textOnSvg')}}         
          >
            {t('diagrams.millMixer.steamSystemBlock.notification')}
          </span>
        </foreignObject>
        </svg>

      </svg>
    </section>
  )
}

export default Section2
