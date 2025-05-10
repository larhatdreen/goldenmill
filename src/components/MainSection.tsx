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

import { ChangeEvent, lazy, Suspense, useState } from 'react';
import GranulatorModel1 from './customIcons/Model(GM420-GM520).js';
import GranulatorModel2 from './customIcons/Model(GM650).js';
import GranulatorModel3 from './customIcons/Model(GM850).js';
import Modal from './Modal.js';
// import { onPointerEnterCircle, onPointerLeaveCircle } from '../functions/Functions.js';
import FlatShell from './customIcons/FlatShell.js';
import RingShell from './customIcons/RingShell.js';
import TwinTrackShell from './customIcons/TwinTrackShell.js';
import TwinTrackShell2 from './customIcons/TwinTrackShell2.js';
import ModalInfo from './ModalInfo.js';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { createMuiTheme } from '../theme/muiTheme';
import { getColor } from '../theme/utils';
import ButtonIcon from './customIcons/ButtonIcon';


// lazy load
const Shell1 = lazy(() => import('./Shell1.js'));
const Shell2 = lazy(() => import('./Shell2.js'));
const Shell3_1 = lazy(() => import('./Shell3_1.js'));
const Shell3_2 = lazy(() => import('./Shell3_2.js'));

const Matrix1 = lazy(() => import('./Matrix1.js'));
const Matrix2 = lazy(() => import('./Matrix2.js'));
const Matrix3 = lazy(() => import('./Matrix3.js'));

export interface IMainData {
  innerDiameter: string;
  outerDiameter: string;
  overallWidth: string;
  workingWidth: string;
  drillingDiameter: string;
}

function MainSection({ type }: { type: 'Matrix' | 'Shell' }) {
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
  const [matrix, setMatrix] = useState(1);
  const [shell, setShell] = useState(1);
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

  function selectMatrix() {
    if (type === 'Matrix') {
      switch (matrix) {
        case 1:
          return <Matrix1 />;
        case 2:
          return <Matrix2 />;
        case 3:
          return <Matrix3 />;

        default:
          return <Matrix1 />;
      }
    } else if (type === 'Shell') {
      switch (shell) {
        case 1:
          return <Shell1 />;
        case 2:
          return <Shell2 />;
        case 3:
          return <Shell3_1 />;
        case 4:
          return <Shell3_2 />;

        default:
          return <Shell1 />;
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
        <Suspense fallback='loading'>
          <div className="relative">
            {selectMatrix()}
            <div className="absolute left-20 bottom-10 w-48 h-16 bg-[#AC8956] rounded-full blur-3xl opacity-70 pointer-events-none z-0"/>
            <div className="absolute right-0 bottom-20 w-[80%] h-[40%] bg-[#7B7F7F] rounded-full blur-3xl opacity-30 pointer-events-none z-0 rotate-145"/>
          </div>
        </Suspense>

        <div className='flex flex-col justify-between mt-6 laptop:mt-12 order-first laptop:order-2 min-h-[420px] laptop:min-h-[520px]'>
          <div>
            <div className='flex flex-col tablet:flex-row gap-4 ml-0 laptop:ml-[8%]'>
              <div
                className={`font-labgrotesque text-[16px] sm:text-[18px] laptop:text-[20px] flex flex-row items-center group ${
                  theme.name === 'dark' ? 'text-[#D5CDBD] hover:text-[#82653E]' : 'text-[#2A3242] hover:text-[#2A3242]'
                } ${
                  !open ? 'cursor-pointer' : ''
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
                    style={{color: getColor(theme, 'mainSection.title')}}
                  >
                    {type === 'Matrix' ? t('granulatorTitle') : t('mixer')}
                  </div>
                  <div className="font-['Bebas_Neue'] text-[60px] sm:text-[80px] mobileLg:text-[100px] tablet:text-[106px] laptop:text-[106px] uppercase leading-none"
                    style={{color: getColor(theme, 'mainSection.subtitle')}}
                  >
                    {type === 'Matrix' ? t('granulatorSubtitle') : t('mixerSubtitle')}
                  </div>
                </div>
                <div
                  className='font-adventpro text-[20px] sm:text-[28px] laptop:text-[32px] uppercase font-normal mt-2 laptop:mt-0 whitespace-pre-line'
                  style={{color: getColor(theme, 'mainSection.description')}}
                >
                  {t('titleBlock.productDescription')}
                </div>
                <CountButton
                  className='relative z-[1] w-full sm:w-[282px] mt-8 laptop:mt-[36px] aspect-[282/58] font-bebas text-white
                                      text-[18px] sm:text-[20px] laptop:text-[22px] flex items-center justify-center bg-contain
                                      bg-no-repeat'
                  src={<ButtonIcon />}
                  onClick={() => {
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
                      {type === 'Matrix' && (
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
                      {type === 'Shell' && (
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
                            <MenuItem value='6'>{t('inputSizesBlock.surfaceTypes.arc')}</MenuItem>
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
                      className='relative mt-[5%] z-[1] w-[282px] aspect-[282/58] font-bebas text-white
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
          {type === 'Matrix' && (
            <>
              <div
                className='relative w-[20vw] max-w-[132px] max-h-[132px] min-w-[100px] z-10 cursor-pointer'
                onClick={() => {
                  setMatrix(1);
                  setCountWindow(false);
                }}
              >
                <div
                  className='absolute -top-5 left-[50%] -translate-x-[50%] font-adventpro
                            text-[10px] md:text-[12px] lg:text-[15px] whitespace-nowrap'
                  style={{color: getColor(theme, 'mainSection.models')}}
                >
                  {t('granulatorTypes.GM420—GM520')}
                </div>
                <div
                  className='absolute -left-[12%] top-[50%] -translate-y-[50%] font-labrotesque
                            text-[14px] md:text-[17px] lg:text-[20px]'
                  style={{color: getColor(theme, 'mainSection.numbers')}}
                >
                  1
                </div>
                  <div
                    className={`flex justify-center items-center aspect-square rounded-full transition-colors 
                      ${theme.name === 'dark'
                        ? `${matrix === 1 ? 'bg-[#ffffff08]' : 'bg-transparent'} hover:bg-white/20`
                        : `${matrix === 1 ? 'bg-gray-300/20' : 'bg-transparent'} hover:bg-gray-300/20`
                      }
                    `}
                  >
                  <GranulatorModel1 
                    className="h-[90%]" 
                    stroke={
                      matrix === 1
                        ? (theme.name === 'dark' ? '#D5CDBD' : '#2A3242')
                        : (theme.name === 'dark' ? '#82643F' : '#ABB4C3')
                    }
                  />
                </div>
              </div>

              <div
                className='relative w-[20vw] max-w-[132px] max-h-[132px] min-w-[100px] z-10 cursor-pointer'
                onClick={() => {
                  setMatrix(2);
                  setCountWindow(false);
                }}
              >
                <div
                  className='absolute -top-5 left-[50%] -translate-x-[50%] font-adventpro
                            text-[10px] md:text-[12px] lg:text-[15px] whitespace-nowrap'
                  style={{color: getColor(theme, 'mainSection.models')}}
                >
                  {t('granulatorTypes.GM650')}
                </div>
                <div
                  className='absolute -left-[12%] top-[50%] -translate-y-[50%] font-labgrotesque
                            text-[14px] md:text-[17px] lg:text-[20px]'
                  style={{color: getColor(theme, 'mainSection.numbers')}}
                >
                  2
                </div>
                <div
                  className={`flex justify-center items-center aspect-square rounded-full transition-colors 
                    ${theme.name === 'dark'
                      ? `${matrix === 2 ? 'bg-[#ffffff08]' : 'bg-transparent'} hover:bg-white/20`
                      : `${matrix === 2 ? 'bg-gray-300/20' : 'bg-transparent'} hover:bg-gray-300/20`
                    }
                  `}
                >
                  <GranulatorModel2 
                    className='h-[90%]' 
                    stroke={
                      matrix === 2
                        ? (theme.name === 'dark' ? '#D5CDBD' : '#2A3242')
                        : (theme.name === 'dark' ? '#82643F' : '#ABB4C3')
                    }
                  />
                </div>
              </div>

              <div
                className='relative w-[20vw] max-w-[132px] max-h-[132px] min-w-[100px] z-10 cursor-pointer'
                onClick={() => {
                  setMatrix(3);
                  setCountWindow(false);
                }}
              >
                <div
                  className='absolute -top-5 left-[50%] -translate-x-[50%] font-adventpro
                            text-[10px] md:text-[12px] lg:text-[15px] whitespace-nowrap'
                  style={{color: getColor(theme, 'mainSection.models')}}
                >
                  {t('granulatorTypes.GM850')}
                </div>
                <div
                  className='absolute -left-[12%] top-[50%] -translate-y-[50%] font-labgrotesque text-white text-[14px]
                            md:text-[17px] lg:text-[20px]'
                  style={{color: getColor(theme, 'mainSection.numbers')}}
                >
                  3
                </div>
                <div
                  className={`flex justify-center items-center aspect-square rounded-full transition-colors 
                    ${theme.name === 'dark'
                      ? `${matrix === 3 ? 'bg-[#ffffff08]' : 'bg-transparent'} hover:bg-white/20`
                      : `${matrix === 3 ? 'bg-gray-300/20' : 'bg-transparent'} hover:bg-gray-300/20`
                    }
                  `}
                >
                  <GranulatorModel3 
                    className='h-[90%]' 
                    stroke={
                      matrix === 3
                        ? (theme.name === 'dark' ? '#D5CDBD' : '#2A3242')
                        : (theme.name === 'dark' ? '#82643F' : '#ABB4C3')
                    }
                  />
                </div>
              </div>
            </>
          )}

          {type === 'Shell' && (
            <>
              <div
                className='relative w-[20vw] max-w-[132px] max-h-[132px] min-w-[100px] z-10 cursor-pointer'
                onClick={() => {
                  setShell(1);
                  setCountWindow(false);
                }}
              >
                <div
                  className='absolute -top-5 left-[50%] -translate-x-[50%] font-adventpro text-navSelect
                            text-[10px] md:text-[12px] lg:text-[15px] whitespace-nowrap'
                >
                  {t('rollerShellTypes.forFlatDie')}
                </div>

                <div
                  className='absolute -left-[12%] top-[50%] -translate-y-[50%] font-labgrotesque text-white text-[14px]
                            md:text-[17px] lg:text-[20px]'
                >
                  1
                </div>
                <div
                  className={`flex justify-center items-center aspect-square
                        rounded-full bg-[${shell === 1 ? '#ffffff08' : 'transparent'
                    }] hover:bg-[#544B3C50]`}
                >
                  <FlatShell className='h-[90%]' stroke={shell === 1 ? '#D5CDBD' : '#605C54'} />
                </div>
              </div>

              <div
                className='relative w-[20vw] max-w-[132px] max-h-[132px] min-w-[100px] z-10 cursor-pointer'
                onClick={() => {
                  setShell(2);
                  setCountWindow(false);
                }}
              >
                <div
                  className='absolute -top-5 left-[50%] -translate-x-[50%] font-adventpro text-navSelect
                            text-[10px] md:text-[12px] lg:text-[15px] whitespace-nowrap'
                >
                  {t('rollerShellTypes.forRingDie')}
                </div>

                <div
                  className='absolute -left-[12%] top-[50%] -translate-y-[50%] font-labgrotesque text-white text-[14px]
                            md:text-[17px] lg:text-[20px]'
                >
                  2
                </div>
                <div
                  className={`flex justify-center items-center aspect-square
                        rounded-full bg-[${shell === 2 ? '#ffffff08' : 'transparent'
                    }] hover:bg-[#544B3C50]`}
                >
                  <RingShell className='h-[90%]' stroke={shell === 2 ? '#D5CDBD' : '#605C54'} />
                </div>
              </div>

              <div
                className='relative w-[20vw] max-w-[132px] max-h-[132px] min-w-[100px] z-10 cursor-pointer'
                onClick={() => {
                  setShell(3);
                  setCountWindow(false);
                }}
              >
                <div
                  className='absolute -top-5 left-[50%] -translate-x-[50%] font-adventpro text-navSelect
                            text-[10px] md:text-[12px] lg:text-[15px] whitespace-nowrap'
                >
                  {t('rollerShellTypes.forTwinTrack')}
                </div>

                <div
                  className='absolute -left-[16%] top-[50%] -translate-y-[50%] font-labgrotesque text-white text-[14px]
                            md:text-[17px] lg:text-[20px]'
                >
                  3
                </div>
                <div
                  className={`flex justify-center items-center aspect-square
                        rounded-full bg-[${shell === 3 ? '#ffffff08' : 'transparent'
                    }] hover:bg-[#544B3C50]`}
                >
                  <TwinTrackShell
                    className='h-[90%]'
                    stroke={shell === 3 ? '#D5CDBD' : '#605C54'}
                  />
                </div>
              </div>

              <div
                className='relative w-[20vw] max-w-[132px] max-h-[132px] min-w-[100px] z-10 cursor-pointer'
                onClick={() => {
                  setShell(4);
                  setCountWindow(false);
                }}
              >
                <div
                  className='absolute -top-5 left-[50%] -translate-x-[50%] font-adventpro text-navSelect
                            text-[10px] md:text-[12px] lg:text-[15px] whitespace-nowrap'
                >Сюда тоже текст</div>

                <div
                  className='absolute -left-[16%] lg:-left-[22%] top-[50%] -translate-y-[50%] font-labgrotesque text-white text-[14px]
                            md:text-[17px] lg:text-[20px]'
                >
                  4
                </div>
                <div
                  className={`flex justify-center items-center aspect-square
                        rounded-full bg-[${shell === 4 ? '#ffffff08' : 'transparent'
                    }] hover:bg-[#544B3C50]`}
                >
                  <TwinTrackShell2
                    className='h-[90%]'
                    stroke={shell === 4 ? '#D5CDBD' : '#605C54'}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default MainSection;
