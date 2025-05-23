import QuestionIcon from './customIcons/QuestionIcon.js';
import CountButton from './CountButton.js';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
} from '@mui/material';

import { ChangeEvent, lazy, Suspense, useState, memo } from 'react';
import GranulatorModel1 from './customIcons/Model(GM420-GM520).js';
import GranulatorModel2 from './customIcons/Model(GM650).js';
import GranulatorModel3 from './customIcons/Model(GM850).js';
import Modal from './Modal.js';
import FlatMixer from './customIcons/FlatMixer.js';
import RingMixer from './customIcons/RingMixer.js';
import TwinTrackMixer from './customIcons/TwinTrackMixer.js';
import TwinTrackMixer2 from './customIcons/TwinTrackMixer2.js';
import ModalInfo from './ModalInfo.js';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { createMuiTheme } from '../theme/muiTheme';
import { getColor } from '../theme/utils';
import ButtonIcon from './customIcons/ButtonIcon';
import Shimmer from './Shimmer.js';


// Memoized lazy components
const Granulator1 = memo(lazy(() => import('./Granulator1')));
const Granulator2 = memo(lazy(() => import('./Granulator2')));
const Granulator3 = memo(lazy(() => import('./Granulator3')));
const Mixer1 = memo(lazy(() => import('./Mixer1')));
const Mixer2 = memo(lazy(() => import('./Mixer2')));
const Mixer3 = memo(lazy(() => import('./Mixer3')));
const Mixer4 = memo(lazy(() => import('./Mixer4')));

export interface IMainData {
  innerDiameter: string;
  outerDiameter: string;
  overallWidth: string;
  workingWidth: string;
  drillingDiameter: string;
}

function MainSection({ type }: { type: 'Granulator' | 'Mixer' }) {
  const [open, setOpen] = useState(false);
  const [countWindow, setCountWindow] = useState(false);
  const [inputText, setInputText] = useState<IMainData>({
    innerDiameter: '',
    outerDiameter: '',
    overallWidth: '',
    workingWidth: '',
    drillingDiameter: '',
  });
  const [errorText, setErrorText] = useState<IMainData>({
    innerDiameter: '',
    outerDiameter: '',
    overallWidth: '',
    workingWidth: '',
    drillingDiameter: '',
  });
  const [granulator, setGranulator] = useState(1);
  const [mixer, setMixer] = useState(1);
  const [modalInfo, setModalInfo] = useState(false);
  const [data, setData] = useState<IMainData>({
    innerDiameter: '',
    outerDiameter: '',
    overallWidth: '',
    workingWidth: '',
    drillingDiameter: '',
  });

  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.name === 'dark';
  const muiTheme = createMuiTheme(theme);

  const handleOpenModalInfo = () => setModalInfo(true);
  const handleCloseModalInfo = () => setModalInfo(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  function inputErrorHandler() {
    if (!countWindow) return;

    let errorsCount = 0;

    Object.keys(inputText).forEach((key) => {
      if (inputText[key as keyof typeof inputText] === '') {
        setErrorText((prevErrorText) => ({
          ...prevErrorText,
          [key]: t('inputSizesBlock.errors.emptyFieldError'),
        }));
        errorsCount++;
      }
    });

    if (errorsCount === 0) {
      setData(inputText);
      setTimeout(() => {
        handleButtonClick();
        setCountWindow(false);
      }, 200);
      handleOpenModalInfo();
    }
  }

  function inputHandler(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const inputId = e.target.id as keyof typeof inputText;
    setInputText((prevInputText) => ({
      ...prevInputText,
      [inputId]: e.target.value,
    }));
    setErrorText((prevErrorText) => ({ ...prevErrorText, [inputId]: '' }));
  }

  function handleButtonClick() {
    setInputText({
      innerDiameter: '',
      outerDiameter: '',
      overallWidth: '',
      workingWidth: '',
      drillingDiameter: '',
    });
    setErrorText({
      innerDiameter: '',
      outerDiameter: '',
      overallWidth: '',
      workingWidth: '',
      drillingDiameter: '',
    });
  }

  function selectGranulator() {
    if (type === 'Granulator') {
      switch (granulator) {
        case 1:
          return <Granulator1 />;
        case 2:
          return <Granulator2 />;
        case 3:
          return <Granulator3 />;

        default:
          return <Granulator1 />;
      }
    } else if (type === 'Mixer') {
      switch (mixer) {
        case 1:
          return <Mixer1 />;
        case 2:
          return <Mixer2 />;
        case 3:
          return <Mixer3 />;
        case 4:
          return <Mixer4 />;

        default:
          return <Mixer1 />;
      }
    }
  }

  return (
    <section className='w-full max-w-[1920px] select-none'>
      <ModalInfo open={modalInfo} handleClose={handleCloseModalInfo} data={data} type={type} />

      <div
        className='grid grid-rows-1 laptop:grid-cols-[0%_50%_auto] desktopLg:grid-cols-[5%_45%_auto]
            desktopFHD:grid-cols-[6%_44%_auto] px-4 sm:px-6 md:px-8'
      >
        <div className='firstHelpColumn' />
        <Suspense fallback={
          <div className="w-full" style={{
            height: 'calc(250px + (915 - 250) * ((100vw - 320px) / (1219 - 320)))',
            minHeight: '250px',
            maxHeight: '650px'
          }}>
            <Shimmer width="100%" height="100%" />
          </div>
        }>
          <div className="relative w-full h-full">
            {selectGranulator()}
            {!isDark ? '' :
              <>
                <div className="absolute left-20 bottom-10 w-48 h-16 bg-[#AC8956] rounded-full blur-3xl opacity-70 pointer-events-none z-0"></div>
                <div className="absolute right-0 bottom-20 w-[80%] h-[40%] bg-[#7B7F7F] rounded-full blur-3xl opacity-30 pointer-events-none z-0 rotate-145"></div>
              </>
            }
          </div>
        </Suspense>

        <div className={`flex flex-col justify-between mt-6 laptop:mt-12 order-first laptop:order-2 ${type === 'Mixer' ? 'pb-0' : 'pb-12'} laptop:pb-0 laptop:min-h-[520px]`}>
          <div>
            <div className='flex flex-col tablet:flex-row gap-4 ml-0 laptop:ml-[8%]'>
              <div
                className={`font-labgrotesque text-[16px] sm:text-[18px] laptop:text-[20px] flex flex-row items-center group ${isDark ? 'text-[#D5CDBD] hover:text-[#82653E]' : 'text-[#2A3242] hover:text-[#2A3242]'
                  } ${!open ? 'cursor-pointer' : ''
                  }`}
                onMouseUp={handleOpen}
              >
                <QuestionIcon className='w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] laptop:w-[40px] laptop:h-[40px] mt-[8px] mr-2' />
                {t('titleBlock.needHelp')}
                <Modal open={open} handleClose={handleClose} />
              </div>
            </div>

            {!countWindow && (
              <div className='flex justify-between items-start flex-col mt-4 laptop:mt-16 ml-0 laptop:ml-[8%]'>
                <div className='flex flex-col'>
                  <div className="font-['Bebas_Neue'] text-[60px] sm:text-[80px] mobileLg:text-[100px] tablet:text-[143px] laptop:text-[143px] uppercase leading-none"
                    style={{ color: getColor(theme, 'mainSection.title') }}
                  >
                    {type === 'Granulator' ? t('granulatorTitle') : t('mixer')}
                  </div>
                  <div className="font-['Bebas_Neue'] text-[60px] sm:text-[80px] mobileLg:text-[100px] tablet:text-[106px] laptop:text-[106px] uppercase leading-none"
                    style={{ color: getColor(theme, 'mainSection.subtitle') }}
                  >
                    {type === 'Granulator' ? t('granulatorSubtitle') : t('mixerSubtitle')}
                  </div>
                </div>
                <div
                  className='font-adventpro text-[20px] sm:text-[28px] laptop:text-[32px] uppercase font-normal mt-2 laptop:mt-0 whitespace-pre-line'
                  style={{ color: getColor(theme, 'mainSection.description') }}
                >
                  {type === 'Granulator' ? t('titleBlock.granulatorProductDescription') : t('titleBlock.mixerProductDescription')}
                </div>
                <CountButton
                  className='relative z-[1] w-full sm:w-[282px] mt-8 laptop:mt-[36px] aspect-[282/58] font-bebas
                                      text-[18px] sm:text-[20px] laptop:text-[22px] flex items-center justify-center bg-contain
                                      bg-no-repeat'
                  src={<ButtonIcon />}
                  onClick={() => {
                    handleButtonClick();
                    inputErrorHandler();
                    setCountWindow(true);
                  }}
                  defaultValue={t('titleBlock.countPrice')}
                />
              </div>
            )}

            {countWindow && (
              <div
                className='ml-0 laptop:ml-[4.8%] w-full sm:w-[320px] h-[400px] mobileLg:w-[440px] mobileLg:h-[400px] tablet:w-[561px] desktopMd:w-[597px]
                              tablet:h-[468px] z-[0] rounded-[10px]'
                style={{
                  backgroundColor: theme.colors.mui.form.background.paper,
                  backdropFilter: 'blur(19px) brightness(100%)',
                  WebkitBackdropFilter: 'blur(19px) brightness(100%)',
                  outline: `1px solid ${theme.colors.mui.form.border.form}`,
                  outlineOffset: '-1px'
                }}
              >
                <ThemeProvider theme={muiTheme}>
                  <div className='w-full h-full px-[5%] pt-[50px] pb-[60px] flex flex-col justify-between'>
                    <div className='flex flex-row justify-between gap-x-[10%]'>
                      <FormControl
                        error={errorText.innerDiameter !== ''}
                        variant='standard'
                        className='z-10 w-full'
                      >
                        <InputLabel htmlFor='innerDiameter'>
                          {t('inputSizesBlock.innerDiameter')}
                        </InputLabel>
                        <Input
                          className='text-[10px]'
                          type='number'
                          id='innerDiameter'
                          aria-describedby='component-error-text'
                          onChange={(e) => inputHandler(e)}
                          // onFocus={() => onPointerEnterCircle('circle1')}
                          // onBlur={() => onPointerLeaveCircle('circle1')}
                          autoComplete='off'
                        />
                        {errorText.innerDiameter && (
                          <FormHelperText id='component-error-text'>
                            {errorText.innerDiameter}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl
                        error={errorText.outerDiameter !== ''}
                        variant='standard'
                        className='z-10 w-full'
                      >
                        <InputLabel htmlFor='outerDiameter'>
                          {t('inputSizesBlock.outerDiameter')}
                        </InputLabel>
                        <Input
                          type='number'
                          id='outerDiameter'
                          aria-describedby='component-error-text'
                          onChange={(e) => inputHandler(e)}
                        // onFocus={() => onPointerEnterCircle('circle2')}
                        // onBlur={() => onPointerLeaveCircle('circle2')}
                        />
                        {errorText.outerDiameter && (
                          <FormHelperText id='component-error-text'>
                            {errorText.outerDiameter}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>

                    <div className='flex flex-row justify-between gap-x-[10%]'>
                      <FormControl
                        error={errorText.overallWidth !== ''}
                        variant='standard'
                        className='z-10 w-full'
                      >
                        <InputLabel htmlFor='overallWidth'>
                          {t('inputSizesBlock.overallWidth')}
                        </InputLabel>
                        <Input
                          type='number'
                          id='overallWidth'
                          aria-describedby='component-error-text'
                          onChange={(e) => inputHandler(e)}
                        // onFocus={() => onPointerEnterCircle('circle3')}
                        // onBlur={() => onPointerLeaveCircle('circle3')}
                        />
                        {errorText.overallWidth && (
                          <FormHelperText id='component-error-text'>
                            {errorText.overallWidth}
                          </FormHelperText>
                        )}
                      </FormControl>

                      <FormControl
                        error={errorText.workingWidth !== ''}
                        variant='standard'
                        className='z-10 w-full'
                      >
                        <InputLabel htmlFor='workingWidth'>
                          {t('inputSizesBlock.workingWidth')}
                        </InputLabel>
                        <Input
                          type='number'
                          id='workingWidth'
                          aria-describedby='component-error-text'
                          onChange={(e) => inputHandler(e)}
                        // onFocus={() => onPointerEnterCircle('circle4')}
                        // onBlur={() => onPointerLeaveCircle('circle4')}
                        />
                        {errorText.workingWidth && (
                          <FormHelperText id='component-error-text'>
                            {errorText.workingWidth}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>

                    <div className='flex flex-row justify-between w-[45%]'>
                      {type === 'Granulator' && (
                        <FormControl
                          error={errorText.drillingDiameter !== ''}
                          variant='standard'
                          className='z-10 w-full'
                        >
                          <InputLabel htmlFor='drillingDiameter'>
                            {t('inputSizesBlock.drillingDiameter')}
                          </InputLabel>
                          <Input
                            type='number'
                            id='drillingDiameter'
                            aria-describedby='component-error-text'
                            onChange={(e) => inputHandler(e)}
                          // onFocus={() => onPointerEnterCircle('circle5')}
                          // onBlur={() => onPointerLeaveCircle('circle5')}
                          />
                          {errorText.drillingDiameter && (
                            <FormHelperText id='component-error-text'>
                              {errorText.drillingDiameter}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )}
                      {type === 'Mixer' && (
                        <FormControl
                          error={errorText.drillingDiameter !== ''}
                          variant='standard'
                          className='z-10 w-full'
                        >
                          <InputLabel htmlFor='drillingDiameter'>
                            {t('inputSizesBlock.surfaceType')}
                          </InputLabel>
                          <Select
                            id='drillingDiameter'
                            defaultValue=''
                            onChange={(e: SelectChangeEvent) => {
                              setInputText((prevInputText) => ({
                                ...prevInputText,
                                drillingDiameter: e.target.value,
                              }));
                              setErrorText((prevErrorText) => ({
                                ...prevErrorText,
                                drillingDiameter: '',
                              }));
                            }}
                            sx={{
                              '& .MuiSelect-icon': {
                                color: errorText.drillingDiameter
                                  ? `${theme.colors.mui.form.error} !important`
                                  : theme.colors.mui.form.secondary,
                                fill: errorText.drillingDiameter
                                  ? `${theme.colors.mui.form.error} !important`
                                  : theme.colors.mui.form.secondary,
                                transition: 'color 0.3s, fill 0.3s',
                              },
                              '&:hover .MuiSelect-icon': {
                                color: errorText.drillingDiameter
                                  ? `${theme.colors.mui.form.error} !important`
                                  : theme.colors.mui.form.hover.primary,
                                fill: errorText.drillingDiameter
                                  ? `${theme.colors.mui.form.error} !important`
                                  : theme.colors.mui.form.hover.primary,
                              },
                            }}
                            MenuProps={{
                              PaperProps: {
                                className: 'selectMenuPaper',
                                sx: {
                                  '& .MuiMenuItem-root': {
                                    '&.Mui-selected': {
                                      backgroundColor: 'transparent',
                                      color: 'inherit',
                                    },
                                  },
                                },
                              },
                            }}
                          // onFocus={() => onPointerEnterCircle('circle5')}
                          // onBlur={() => onPointerLeaveCircle('circle5')}
                          >
                            <MenuItem value=''>
                              <em className='text-footerBottomText'>
                                {t('inputSizesBlock.surfaceTypes.default')}
                              </em>
                            </MenuItem>
                            <MenuItem value='1'>
                              {t('inputSizesBlock.surfaceTypes.perforated')}
                            </MenuItem>
                            <MenuItem value='2'>
                              {t('inputSizesBlock.surfaceTypes.ribbedClosed')}
                            </MenuItem>
                            <MenuItem value='3'>
                              {t('inputSizesBlock.surfaceTypes.ribbedOpen')}
                            </MenuItem>
                            <MenuItem value='4'>
                              {t('inputSizesBlock.surfaceTypes.slantGrooved')}
                            </MenuItem>
                            <MenuItem value='5'>
                              {t('inputSizesBlock.surfaceTypes.fishBone')}
                            </MenuItem>
                            <MenuItem value='6'>
                              {t('inputSizesBlock.surfaceTypes.arc')}
                            </MenuItem>
                          </Select>
                          {errorText.drillingDiameter && (
                            <FormHelperText id='component-error-text'>
                              {errorText.drillingDiameter}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )}
                    </div>
                    <CountButton
                      className='relative mt-[5%] z-[1] w-[282px] aspect-[282/58] font-bebas
                        text-[22px] flex items-center justify-center bg-contain bg-no-repeat'
                      src={<ButtonIcon />}
                      onClick={() => {
                        inputErrorHandler();
                        setCountWindow(true);
                      }}
                      defaultValue={t('titleBlock.countPrice')}
                    />
                  </div>
                </ThemeProvider>
              </div>
            )}
          </div>
        </div>
      </div>

      {/*Select Product Carousel*/}
      <div className='w-full flex justify-center px-2 mobileMd:px-4 '>
        <div className='w-[10%] hidden laptop:block' />
        <div
          className='flex flex-wrap justify-center laptop:justify-between mt-6 laptop:mt-0 pt-5 gap-x-8 sm:gap-x-12 laptop:gap-x-32 gap-y-6 px-4 sm:px-6 laptop:px-6
                relative top-0 laptop:top-5'
        >
          {type === 'Granulator' && (
            <>
              <div
                className='relative w-[20vw] max-w-[132px] max-h-[132px] min-w-[100px] z-10 cursor-pointer'
                onClick={() => {
                  setGranulator(1);
                  setCountWindow(false);
                }}
              >
                <div
                  className='absolute -top-5 left-[50%] -translate-x-[50%] font-adventpro
                            text-[10px] md:text-[12px] lg:text-[15px] whitespace-nowrap'
                  style={{ color: getColor(theme, 'mainSection.models') }}
                >
                  {t('granulatorTypes.GM420—GM520')}
                </div>
                <div
                  className='absolute -left-[12%] top-[50%] -translate-y-[50%] font-labrotesque
                            text-[14px] md:text-[17px] lg:text-[20px]'
                  style={{ color: getColor(theme, 'mainSection.numbers') }}
                >
                  1
                </div>
                <Suspense fallback={<Shimmer />}>
                  <div
                    className={`flex justify-center items-center aspect-square rounded-full transition-colors 
                      ${isDark
                        ? `${granulator === 1 ? 'bg-[#ffffff08]' : 'bg-transparent'} hover:bg-white/20`
                        : `${granulator === 1 ? 'bg-gray-300/20' : 'bg-transparent'} hover:bg-gray-300/20`
                      }
                    `}
                  >
                    <GranulatorModel1
                      className="h-[90%]"
                      stroke={
                        granulator === 1
                          ? (isDark ? '#D5CDBD' : '#2A3242')
                          : (isDark ? '#82643F' : '#ABB4C3')
                      }
                    />
                  </div>
                </Suspense>
              </div>

              <div
                className='relative w-[20vw] max-w-[132px] max-h-[132px] min-w-[100px] z-10 cursor-pointer'
                onClick={() => {
                  setGranulator(2);
                  setCountWindow(false);
                }}
              >
                <div
                  className='absolute -top-5 left-[50%] -translate-x-[50%] font-adventpro
                            text-[10px] md:text-[12px] lg:text-[15px] whitespace-nowrap'
                  style={{ color: getColor(theme, 'mainSection.models') }}
                >
                  {t('granulatorTypes.GM650')}
                </div>
                <div
                  className='absolute -left-[12%] top-[50%] -translate-y-[50%] font-labgrotesque
                            text-[14px] md:text-[17px] lg:text-[20px]'
                  style={{ color: getColor(theme, 'mainSection.numbers') }}
                >
                  2
                </div>
                <Suspense fallback={<Shimmer />}>
                  <div
                    className={`flex justify-center items-center aspect-square rounded-full transition-colors 
                    ${isDark
                        ? `${granulator === 2 ? 'bg-[#ffffff08]' : 'bg-transparent'} hover:bg-white/20`
                        : `${granulator === 2 ? 'bg-gray-300/20' : 'bg-transparent'} hover:bg-gray-300/20`
                      }
                  `}
                  >
                    <GranulatorModel2
                      className='h-[90%]'
                      stroke={
                        granulator === 2
                          ? (isDark ? '#D5CDBD' : '#2A3242')
                          : (isDark ? '#82643F' : '#ABB4C3')
                      }
                    />
                  </div>
                </Suspense>
              </div>

              <div
                className='relative w-[20vw] max-w-[132px] max-h-[132px] min-w-[100px] z-10 cursor-pointer'
                onClick={() => {
                  setGranulator(3);
                  setCountWindow(false);
                }}
              >
                <div
                  className='absolute -top-5 left-[50%] -translate-x-[50%] font-adventpro
                            text-[10px] md:text-[12px] lg:text-[15px] whitespace-nowrap'
                  style={{ color: getColor(theme, 'mainSection.models') }}
                >
                  {t('granulatorTypes.GM850')}
                </div>
                <div
                  className='absolute -left-[12%] top-[50%] -translate-y-[50%] font-labgrotesque text-white text-[14px]
                            md:text-[17px] lg:text-[20px]'
                  style={{ color: getColor(theme, 'mainSection.numbers') }}
                >
                  3
                </div>
                <Suspense fallback={<Shimmer />}>
                  <div
                    className={`flex justify-center items-center aspect-square rounded-full transition-colors 
                    ${isDark
                        ? `${granulator === 3 ? 'bg-[#ffffff08]' : 'bg-transparent'} hover:bg-white/20`
                        : `${granulator === 3 ? 'bg-gray-300/20' : 'bg-transparent'} hover:bg-gray-300/20`
                      }
                  `}
                  >
                    <GranulatorModel3
                      className='h-[90%]'
                      stroke={
                        granulator === 3
                          ? (isDark ? '#D5CDBD' : '#2A3242')
                          : (isDark ? '#82643F' : '#ABB4C3')
                      }
                    />
                  </div>
                </Suspense>
              </div>
            </>
          )}

          {type === 'Mixer' && (
            <>
              <div
                className='relative w-[20vw] max-w-[132px] max-h-[132px] min-w-[100px] z-10 cursor-pointer'
                onClick={() => {
                  setMixer(1);
                  setCountWindow(false);
                }}
              >
                <div
                  className='absolute -top-5 left-[50%] -translate-x-[50%] font-adventpro
                            text-[10px] md:text-[12px] lg:text-[15px] whitespace-nowrap'
                  style={{ color: getColor(theme, 'mainSection.models') }}
                >
                  {t('mixerTypes.GM-520')}
                </div>

                <div
                  className='absolute -left-[12%] top-[50%] -translate-y-[50%] font-labgrotesque
                            text-[14px] md:text-[17px] lg:text-[20px]'
                  style={{ color: getColor(theme, 'mainSection.numbers') }}
                >
                  1
                </div>
                <Suspense fallback={<Shimmer />}>
                <div
                  className={`flex justify-center items-center aspect-square rounded-full transition-colors 
                    ${isDark
                      ? `${mixer === 1 ? 'bg-[#ffffff08]' : 'bg-transparent'} hover:bg-white/20`
                      : `${mixer === 1 ? 'bg-gray-300/20' : 'bg-transparent'} hover:bg-gray-300/20`
                    }
                  `}
                >
                  <FlatMixer
                    className='h-[90%]'
                    stroke={
                      mixer === 1
                        ? (isDark ? '#D5CDBD' : '#2A3242')
                        : (isDark ? '#82643F' : '#ABB4C3')
                    }
                  />
                </div>
                </Suspense>
              </div>

              <div
                className='relative w-[20vw] max-w-[132px] max-h-[132px] min-w-[100px] z-10 cursor-pointer'
                onClick={() => {
                  setMixer(2);
                  setCountWindow(false);
                }}
              >
                <div
                  className='absolute -top-5 left-[50%] -translate-x-[50%] font-adventpro
                            text-[10px] md:text-[12px] lg:text-[15px] whitespace-nowrap'
                  style={{ color: getColor(theme, 'mainSection.models') }}
                >
                  {t('mixerTypes.GM650')}
                </div>

                <div
                  className='absolute -left-[12%] top-[50%] -translate-y-[50%] font-labgrotesque
                            text-[14px] md:text-[17px] lg:text-[20px]'
                  style={{ color: getColor(theme, 'mainSection.numbers') }}
                >
                  2
                </div>
                <Suspense fallback={<Shimmer />}>
                <div
                  className={`flex justify-center items-center aspect-square rounded-full transition-colors 
                    ${isDark
                      ? `${mixer === 2 ? 'bg-[#ffffff08]' : 'bg-transparent'} hover:bg-white/20`
                      : `${mixer === 2 ? 'bg-gray-300/20' : 'bg-transparent'} hover:bg-gray-300/20`
                    }
                  `}
                >
                  <RingMixer
                    className='h-[90%]'
                    stroke={
                      mixer === 2
                        ? (isDark ? '#D5CDBD' : '#2A3242')
                        : (isDark ? '#82643F' : '#ABB4C3')
                    }
                  />
                </div>
                </Suspense>
              </div>

              <div
                className='relative w-[20vw] max-w-[132px] max-h-[132px] min-w-[100px] z-10 cursor-pointer'
                onClick={() => {
                  setMixer(3);
                  setCountWindow(false);
                }}
              >
                <div
                  className='absolute -top-5 left-[50%] -translate-x-[50%] font-adventpro
                            text-[10px] md:text-[12px] lg:text-[15px] whitespace-nowrap'
                  style={{ color: getColor(theme, 'mainSection.models') }}
                >
                  {t('mixerTypes.GM850')}
                </div>

                <div
                  className='absolute -left-[16%] top-[50%] -translate-y-[50%] font-labgrotesque
                            text-[14px] md:text-[17px] lg:text-[20px]'
                  style={{ color: getColor(theme, 'mainSection.numbers') }}
                >
                  3
                </div>
                <Suspense fallback={<Shimmer />}>
                <div
                  className={`flex justify-center items-center aspect-square rounded-full transition-colors 
                    ${isDark
                      ? `${mixer === 3 ? 'bg-[#ffffff08]' : 'bg-transparent'} hover:bg-white/20`
                      : `${mixer === 3 ? 'bg-gray-300/20' : 'bg-transparent'} hover:bg-gray-300/20`
                    }
                  `}
                >
                  <TwinTrackMixer
                    className='h-[90%]'
                    stroke={
                      mixer === 3
                        ? (isDark ? '#D5CDBD' : '#2A3242')
                        : (isDark ? '#82643F' : '#ABB4C3')
                    }
                  />
                </div>
                </Suspense>
              </div>

              <div
                className='relative w-[20vw] max-w-[132px] max-h-[132px] min-w-[100px] z-10 cursor-pointer'
                onClick={() => {
                  setMixer(4);
                  setCountWindow(false);
                }}
              >
                <div
                  className='absolute -top-5 left-[50%] -translate-x-[50%] font-adventpro
                            text-[10px] md:text-[12px] lg:text-[15px] whitespace-nowrap'
                  style={{ color: getColor(theme, 'mainSection.models') }}
                >
                  {t('mixerTypes.GM850D')}
                </div>

                <div
                  className='absolute -left-[16%] lg:-left-[22%] top-[50%] -translate-y-[50%] font-labgrotesque
                            text-[14px] md:text-[17px] lg:text-[20px]'
                  style={{ color: getColor(theme, 'mainSection.numbers') }}
                >
                  4
                </div>
                <Suspense fallback={<Shimmer />}>
                <div
                  className={`flex justify-center items-center aspect-square rounded-full transition-colors 
                    ${isDark
                      ? `${mixer === 4 ? 'bg-[#ffffff08]' : 'bg-transparent'} hover:bg-white/20`
                      : `${mixer === 4 ? 'bg-gray-300/20' : 'bg-transparent'} hover:bg-gray-300/20`
                    }
                  `}
                >
                  <TwinTrackMixer2
                    className='h-[90%]'
                    stroke={
                      mixer === 4
                        ? (isDark ? '#D5CDBD' : '#2A3242')
                        : (isDark ? '#82643F' : '#ABB4C3')
                    }
                  />
                </div>
                </Suspense>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default MainSection;
