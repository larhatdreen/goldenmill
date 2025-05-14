import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '@mui/material'
import LogoIcon from './customIcons/LogoIcon'
import { getColor, getLocalThemeColor } from '../theme/utils'
import { useTheme } from '../hooks/useTheme';

function Section3() {
    const { t } = useTranslation()
    const isLG = useMediaQuery('(min-width:768px)')
    const theme = useTheme();
    const isDark = theme.name === 'dark';

    // Определяем для стилизации локально

    const firstSensorColor = getLocalThemeColor(isDark, '#82643F', '#ABB4C3')
    const secondSensorColor = getLocalThemeColor(isDark, '#D5CDBD', '#82653F')
    const externalLinesColor = getLocalThemeColor(isDark, '#CACBC9', '#353436')
    const gridColor = getLocalThemeColor(isDark, '#BFBFBF', '#404040')
    const diagramColor = getLocalThemeColor(isDark, '#82643F', '#ABB4C3')
    const loupeColor = getLocalThemeColor(isDark, '#D5CDBD', '#2A3242')


    return (
        <section className='flex flex-col tablet:flex-row justify-center mt-[15%] w-full px-[5%] max-w-[1920px]'>
            <svg
                id='section3'
                className='w-[100%] tablet:w-[40%]'
                viewBox={`0 0 650 ${isLG ? '733' : '300'}`}
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                style={{ position: isLG ? 'absolute' : undefined, left: '10.5%' }}
            >
                <svg className='hidden tablet:block '>
                    <g filter='url(#filter0_b_20_1296)'>
                        <circle cx='122' cy='350' r='121' fill={theme.colors.decorative} />
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
                        <span className='w-full font-["Bebas_Neue"] text-[18px] whitespace-normal uppercase tracking-[.2em]'
                          style={{color: getColor(theme, 'svg.fill')} }>
                            {t('diagrams.millGranulator.vibrationBlock.descriptionBg')}
                        </span>
                    </foreignObject>
                </svg>

                <path id='my_path' d='M 20,20 C 40,40 80,40 100,20' />

                <text className='font-["Bebas_Neue"] text-[90px] whitespace-normal uppercase translate-x-[35px] translate-y-[93px]'
                    fill={getColor(theme, 'title')}
                >
                    {t('diagrams.millGranulator.vibrationBlock.title.sensor')}
                </text>
                <text className='font-["Bebas_Neue"] text-[90px] whitespace-normal uppercase translate-x-[35px] translate-y-[183px]'
                    fill={getColor(theme, 'title')}
                >
                    {t('diagrams.millGranulator.vibrationBlock.title.option')}
                </text>
                <foreignObject x={35} y={200} width={280} height={80}>
                    <text
                        className='font-adventpro text-[29px] uppercase'
                        style={{ color: getColor(theme, 'subtitle') }}
                    >
                        {t('diagrams.millGranulator.vibrationBlock.subtitle')}
                    </text>
                </foreignObject>

                <path className='section3stroke' d='M15 30L15 93' stroke={getColor(theme, 'particle')} strokeWidth='24' />
                <path className='section3stroke' d='M15 120L15 183' stroke={getColor(theme, 'particle')} strokeWidth='24' />

            </svg>

            {/* SVG-блок */}

            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${isLG ? '1300' : '1100'} ${isLG ? '1200' : '1100'}`}
                fill="none"
                className='w-[100%] tablet:w-[70%]'
            >
                <g transform="translate(100, 200)">
                <foreignObject x={0} y={0} width={280} height={80}>
                    <text
                        className='font-adventpro text-[25px]'
                        style={{ color: getColor(theme, 'textOnSvg')}}
                    >
                        {t('diagrams.millGranulator.vibrationBlock.frequency')}
                    </text>
                </foreignObject>
                <foreignObject x={830} y={570} width={280} height={80}>
                    <text
                        className='font-adventpro text-[25px]'
                        style={{ color: getColor(theme, 'textOnSvg')}}
                    >
                        {t('diagrams.millGranulator.vibrationBlock.period')}
                    </text>
                </foreignObject>
                <foreignObject x={145} y={595} width={280} height={80}>
                    <text
                        className='font-adventpro text-[25px]'
                        style={{ color: getColor(theme, 'textOnSvg')}}
                    >
                        {t('diagrams.millGranulator.vibrationBlock.sensor1')}
                    </text>
                </foreignObject>
                <foreignObject x={145} y={650} width={280} height={80}>
                    <text
                        className='font-adventpro text-[25px]'
                        style={{ color: getColor(theme, 'textOnSvg')}}
                    >
                        {t('diagrams.millGranulator.vibrationBlock.sensor2')}
                    </text>
                </foreignObject>
                <foreignObject x={350} y={750} width={300} height={120} style={{ textAlign: 'end' }}>
                    <text
                        className='font-adventpro text-[25px]'
                        style={{ color: getColor(theme, 'textOnSvg')}}
                    >
                        {t('diagrams.millGranulator.vibrationBlock.notification')}
                    </text>
                </foreignObject>
                    <path d="M131.431 651.602H52.2314V687.602H131.431V651.602Z" fill={secondSensorColor} />
                    <path d="M131.431 597.602H52.2314V633.602H131.431V597.602Z" fill={firstSensorColor} />
                    <path d="M50.6841 44.7494C50.2161 44.2814 49.4601 44.2814 48.9921 44.7494L41.3481 52.3934C40.8801 52.8614 40.8801 53.6174 41.3481 54.0854C41.8161 54.5534 42.5721 54.5534 43.0401 54.0854L49.8321 47.2934L56.6241 54.0854C57.0921 54.5534 57.8481 54.5534 58.3161 54.0854C58.7841 53.6174 58.7841 52.8614 58.3161 52.3934L50.6841 44.7614V44.7494ZM51.0321 562.801V45.6014H48.6321V562.801H51.0321Z" fill={externalLinesColor}/>
                    <path d="M881.263 561.624C881.731 561.156 881.731 560.401 881.263 559.921L873.631 552.288C873.163 551.821 872.407 551.821 871.927 552.288C871.459 552.756 871.459 553.513 871.927 553.981L878.719 560.773L871.927 567.565C871.459 568.033 871.459 568.789 871.927 569.257C872.395 569.725 873.151 569.725 873.631 569.257L881.263 561.624ZM50.3115 561.985H880.411V559.585H50.3115V561.985Z" fill={externalLinesColor}/>
                    <path d="M50.3115 480.227H694.688" stroke={gridColor} stroke-width="1.2" />
                    <path d="M50.3115 399.684H694.688" stroke={gridColor} stroke-width="1.2" />
                    <path d="M50.3115 318.191H694.688" stroke={gridColor} stroke-width="1.2" />
                    <path d="M50.3115 237.648H694.688" stroke={gridColor} stroke-width="1.2" />
                    <path d="M50.3115 156.156H694.688" stroke={gridColor} stroke-width="1.2" />
                    <path d="M128.012 156.156V560.784" stroke={gridColor} stroke-width="1.2" />
                    <path d="M208.556 156.156V560.784" stroke={gridColor} stroke-width="1.2" />
                    <path d="M289.111 156.156V560.784" stroke={gridColor} stroke-width="1.2" />
                    <path d="M369.656 156.156V560.784" stroke={gridColor} stroke-width="1.2" />
                    <path d="M451.148 156.156V560.784" stroke={gridColor} stroke-width="1.2" />
                    <path d="M532.641 156.156V560.784" stroke={gridColor} stroke-width="1.2" />
                    <path d="M614.133 156.156V560.784" stroke={gridColor} stroke-width="1.2" />
                    <path d="M693.74 156.156V560.784" stroke={gridColor} stroke-width="1.2" />
                    <path d="M49.832 381.275C60.656 381.203 70.232 385.799 70.232 385.799L95.432 381.083L127.232 388.199L155.432 373.799L175.232 388.199L199.832 373.799L226.832 388.199L246.632 373.799L282.032 388.199L307.232 373.799L340.832 388.199L361.232 370.199L393.032 391.799L422.432 366.599L444.032 394.199L480.032 364.199L504.032 394.199L536.432 364.199L569.432 398.399L598.832 366.599L624.632 400.199L652.832 364.199L676.232 398.399L702.032 366.599L724.232 398.399L754.832 370.199L777.032 391.799L805.832 370.199" stroke="url(#paint0_linear_151_87)" stroke-width="7.2" stroke-miterlimit="10" />
                    <path d="M631.832 296.402L627.296 226.994L621.26 443.258L609.188 251.438L599.12 427.286L587.708 164.906L580.328 477.098L569.924 131.99L560.192 422.99L549.464 180.89L540.74 464.87L532.016 126.59L521.276 428.21L512.552 214.73L501.824 445.178L491.084 164.882L481.688 464.858L472.964 193.094L462.896 457.178L459.548 250.466L451.496 443.234L440.756 322.178L432.032 422.978L421.964 332.978L413.912 410.978L403.172 332.978L392.444 401.978L385.064 345.578L366.716 393.578L342.716 369.866L334.316 389.63L314.156 373.01L301.316 389.63C301.316 389.63 295.4 361.478 292.4 361.478C289.4 361.478 282.536 389.63 282.536 389.63L269.108 368.378L261.2 382.118L251.528 373.022L238.388 382.118L222.788 373.022L207.188 380.354L198.788 369.878L185.588 380.354L168.188 368.822L159.788 375.11L134.576 366.722L103.364 380.342L91.3644 366.722L71.5524 384.542L49.9404 373.01" stroke={diagramColor} stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M631.832 297.001L638.708 409.405L653.432 270.001L661.232 465.001L676.232 252.001L685.832 459.001L692.432 208.801L706.832 452.401L718.232 148.201L727.832 428.401L738.032 241.801L743.432 449.401L750.632 208.801L759.632 468.001L764.432 124.801L775.832 490.801L786.032 213.001L792.032 465.001L809.432 241.801" stroke="url(#paint1_linear_151_87)" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4.8 4.8" />
                    <foreignObject x="401.432" y="72" width="289.2" height="289.199">
                        <div
                            style={{
                                backdropFilter: 'blur(3px)',
                                clipPath: 'url(#bgblur_1_151_87_clip_path)',
                                height: '100%',
                                width: '100%'
                            }}>
                        </div>
                    </foreignObject>
                    <path data-figma-bg-blur-radius="6" d="M546.032 355.2C622.578 355.2 684.632 293.147 684.632 216.6C684.632 140.053 622.578 78 546.032 78C469.485 78 407.432 140.053 407.432 216.6C407.432 293.147 469.485 355.2 546.032 355.2Z" fill="white" fill-opacity="0.01" />
                    <path d="M545.432 356.998C468.344 356.998 405.632 294.286 405.632 217.198C405.632 140.11 468.344 77.3984 545.432 77.3984C622.52 77.3984 685.232 140.11 685.232 217.198C685.232 294.286 622.52 356.998 545.432 356.998ZM545.432 78.7904C469.112 78.7904 407.024 140.878 407.024 217.198C407.024 293.518 469.112 355.606 545.432 355.606C621.752 355.606 683.84 293.518 683.84 217.198C683.84 140.878 621.752 78.7904 545.432 78.7904Z" fill={loupeColor} stroke={loupeColor} stroke-width="1.2" />
                    <path d="M551 357.602V360.429H553.4V357.602H551ZM551 366.065V371.72H553.4V366.065H551ZM551 377.375V383.01H553.4V377.375H551ZM551 388.665V394.32H553.4V388.665H551ZM551 399.956V405.611H553.4V399.956H551ZM551 411.247V416.902H553.4V411.247H551ZM551 422.538V428.193H553.4V422.538H551ZM551 433.828V439.483H553.4V433.828H551ZM551 445.138V450.793H553.4V445.138H551ZM551 456.429V462.084H553.4V456.429H551ZM551 467.72V473.375H553.4V467.72H551ZM551 479.01V484.665H553.4V479.01H551ZM551 490.301V495.956H553.4V490.301H551ZM551 501.611V507.266H553.4V501.611H551ZM551 512.902V518.557H553.4V512.902H551ZM551 524.193V529.828H553.4V524.193H551ZM551 535.483V541.138H553.4V535.483H551ZM551 546.774V552.429H553.4V546.774H551ZM551 558.065V563.72H553.4V558.065H551ZM551 569.375V575.01H553.4V569.375H551ZM551 580.665V586.32H553.4V580.665H551ZM551 591.956V597.611H553.4V591.956H551ZM551 603.247V608.902H553.4V603.247H551ZM551 614.538V620.193H553.4V614.538H551ZM551 625.828V631.483H553.4V625.828H551ZM551 637.138V642.793H553.4V637.138H551ZM551 648.429V654.084H553.4V648.429H551ZM551 659.72V665.375H553.4V659.72H551ZM551 671.01V676.665H553.4V671.01H551ZM551 682.301V687.956H553.4V682.301H551ZM551 693.611V699.266H553.4V693.611H551ZM551 704.902V710.557H553.4V704.902H551ZM551 716.193V721.848H553.4V716.193H551ZM551 727.483V733.138H553.4V727.483H551ZM551 738.774V741.602H553.4V738.774H551Z" fill={loupeColor} />
                  <defs>
                    <clipPath id="bgblur_1_151_87_clip_path" transform="translate(-401.432 -72)">
                      <path d="M546.032 355.2C622.578 355.2 684.632 293.147 684.632 216.6C684.632 140.053 622.578 78 546.032 78C469.485 78 407.432 140.053 407.432 216.6C407.432 293.147 469.485 355.2 546.032 355.2Z" />
                    </clipPath>
                    <linearGradient id="paint0_linear_151_87" x1="49.808" y1="382.091" x2="805.808" y2="382.091" gradientUnits="userSpaceOnUse">
                        <stop offset="0.85" stop-color={isDark ? "#D5CDBD" : '#82653F '} />
                        <stop offset="1" stop-color={isDark ? "#E3EFF2" : '#1C100D '} stop-opacity="0.05" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_151_87" x1="631.832" y1="307.801" x2="809.432" y2="307.801" gradientUnits="userSpaceOnUse">
                        <stop stop-color={isDark ? "#544B3C" : '#ABB4C3'}/>
                        <stop offset="1" stop-color={isDark ? "#544B3C" : '#ABB4C3'} stop-opacity="0.05" />
                    </linearGradient>
                    <clipPath id="clip0_151_87">
                        <rect width="874.032" height="687.6" fill="white" transform="translate(41)" />
                    </clipPath>
                  </defs>
                </g>
            </svg>

        </section>
    )
}

export default Section3
