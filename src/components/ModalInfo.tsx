import * as React from 'react'
import Modal from '@mui/material/Modal'
import { ChangeEvent, Fragment, useState } from 'react'
import CloseIcon from './customIcons/CloseIcon.tsx'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  styled,
  ThemeProvider,
} from '@mui/material'
import newTheme from './Text.tsx'
import CountButton from './CountButton.tsx'
import button from '../assets/UI/BtnBig.svg'
import PlaneIcon from './customIcons/PlaneIcon.tsx'
import UploadIcon from './customIcons/UploadIcon.tsx'
import { IMainData } from './MainSection.tsx'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { getURLWithLang } from '../functions/get-url-with-lang.ts'
import { ParamsType } from './NavigateProvider.tsx'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function ModalInfo({
  open,
  handleClose,
  data,
  type,
}: {
  open: boolean
  handleClose: () => void
  data: IMainData
  type: string
}) {
  const { lang } = useParams<ParamsType>()
  const [send, setSend] = useState(false)
  const [inputText, setInputText] = useState({
    manufacturer: '',
    model: '',
    serialNumber: '',
    manufactureYear: '',
    commentary: '',
    email: '',
    upload: null as File | null,
  })
  const [errorText, setErrorText] = useState({
    manufacturer: '',
    model: '',
    serialNumber: '',
    manufactureYear: '',
    commentary: '',
    email: '',
    upload: '',
  })
  const [checked, setChecked] = useState(false)
  const [bottomChecked, setBottomChecked] = useState(false)
  const [bottomCheckedError, setBottomCheckedError] = useState(false)
  const { t, i18n } = useTranslation()

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })

  function handleChange(event: React.SyntheticEvent<Element, Event>) {
    setErrorText(prevState => ({
      ...prevState,
      manufacturer: '',
      model: '',
      serialNumber: '',
      manufactureYear: '',
      commentary: '',
    }))
    const x = event as React.ChangeEvent<HTMLInputElement>
    setChecked(x.target.checked)
  }

  function handleBottomChange(event: React.SyntheticEvent<Element, Event>) {
    setBottomCheckedError(false)
    const x = event as React.ChangeEvent<HTMLInputElement>
    setBottomChecked(x.target.checked)
  }

  function inputErrorHandler() {
    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/
    let errorsCount = 0

    if (!checked) {
      if (inputText.manufacturer === '') {
        setErrorText(prevErrorText => ({
          ...prevErrorText,
          manufacturer: t('inputInfoBlock.errors.emptyFieldError'),
        }))
        errorsCount++
      }
      if (inputText.model === '') {
        setErrorText(prevErrorText => ({
          ...prevErrorText,
          model: t('inputInfoBlock.errors.emptyFieldError'),
        }))
        errorsCount++
      }
      if (inputText.serialNumber === '') {
        setErrorText(prevErrorText => ({
          ...prevErrorText,
          serialNumber: t('inputInfoBlock.errors.emptyFieldError'),
        }))
        errorsCount++
      }
      if (inputText.manufactureYear === '') {
        setErrorText(prevErrorText => ({
          ...prevErrorText,
          manufactureYear: t('inputInfoBlock.errors.emptyFieldError'),
        }))
        errorsCount++
      } else if (inputText.manufactureYear.length < 4) {
        setErrorText(prevErrorText => ({
          ...prevErrorText,
          manufactureYear: t('inputInfoBlock.errors.wrongFormat'),
        }))
        errorsCount++
      }
      if (inputText.commentary === '') {
        setErrorText(prevErrorText => ({
          ...prevErrorText,
          commentary: t('inputInfoBlock.errors.emptyFieldError'),
        }))
        errorsCount++
      }

      if (inputText.email === '') {
        setErrorText(prevErrorText => ({
          ...prevErrorText,
          email: t('inputInfoBlock.errors.emptyFieldError'),
        }))
        errorsCount++
      } else if (!inputText.email.match(emailFormat)) {
        setErrorText(prevErrorText => ({
          ...prevErrorText,
          email: t('inputInfoBlock.errors.emptyFieldError'),
        }))
        errorsCount++
      }
    } else {
      if (inputText.email === '') {
        setErrorText(prevErrorText => ({
          ...prevErrorText,
          email: t('inputInfoBlock.errors.emptyFieldError'),
        }))
        errorsCount++
      } else if (!inputText.email.match(emailFormat)) {
        setErrorText(prevErrorText => ({
          ...prevErrorText,
          email: t('inputInfoBlock.errors.wrongFormat'),
        }))
        errorsCount++
      }
    }
    if (!bottomChecked) {
      errorsCount++
    }

    setBottomCheckedError(!bottomChecked)

    if (!checked && errorsCount === 0) {
      setSend(true)
      sendToEmail()
    } else if (checked && errorsCount === 0) {
      setSend(true)
      sendToEmail()
    }
  }

  async function sendToEmail() {
    try {
      const formData = new FormData();
      
      if (inputText.upload) {
        formData.append('upload', inputText.upload, inputText.upload.name);
      }
      
      formData.append('email', inputText.email);
      formData.append('name', inputText.email);
      
      const messageText = `
        ${t('emailContent.type')}: ${type === 'Shell' ? t('emailContent.shell') : t('emailContent.matrix')}
        ${t('emailContent.innerDiameter')}: ${data.innerDiameter}
        ${t('emailContent.outerDiameter')}: ${data.outerDiameter}
        ${t('emailContent.overallWidth')}: ${data.overallWidth}
        ${t('emailContent.workingWidth')}: ${data.workingWidth}
        ${t('emailContent.drillingDiameter')}: ${data.drillingDiameter}
        ${t('emailContent.manufacturer')}: ${inputText.manufacturer || t('emailContent.noData')}
        ${t('emailContent.model')}: ${inputText.model || t('emailContent.noData')}
        ${t('emailContent.serialNumber')}: ${inputText.serialNumber || t('emailContent.noData')}
        ${t('emailContent.manufactureYear')}: ${inputText.manufactureYear || t('emailContent.noData')}
        ${t('emailContent.commentary')}: ${inputText.commentary || t('emailContent.noData')}
      `;
      
      formData.append('message', messageText);

      const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            .header {
              text-align: center;
              padding: 20px 0;
              border-bottom: 2px solid #82653E;
            }
            .header h1 {
              color: #82653E;
              margin: 0;
              font-size: 24px;
              text-transform: uppercase;
            }
            .content {
              padding: 20px 0;
            }
            .section {
              margin-bottom: 20px;
              padding: 15px;
              background-color: #f8f8f8;
              border-radius: 5px;
            }
            .section-title {
              color: #82653E;
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 15px;
              text-transform: uppercase;
            }
            .field {
              margin-bottom: 10px;
            }
            .label {
              font-weight: bold;
              color: #82653E;
              min-width: 150px;
              display: inline-block;
            }
            .value {
              color: #4A4A4A;
            }
            .footer {
              text-align: center;
              padding-top: 20px;
              border-top: 1px solid #eee;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${t('emailContent.equipmentRequest')}</h1>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">${t('emailContent.about')}</div>
                <div class="field">
                  <span class="label">${t('emailContent.type')}:</span>
                  <span class="value">${type === 'Shell' ? t('emailContent.shell') : t('emailContent.matrix')}</span>
                </div>
              </div>
              <div class="section">
                <div class="section-title">${t('emailContent.info')}</div>
                <div class="field">
                  <span class="label">${t('emailContent.innerDiameter')}:</span>
                  <span class="value">${data.innerDiameter}</span>
                </div>
                <div class="field">
                  <span class="label">${t('emailContent.outerDiameter')}:</span>
                  <span class="value">${data.outerDiameter}</span>
                </div>
                <div class="field">
                  <span class="label">${t('emailContent.overallWidth')}:</span>
                  <span class="value">${data.overallWidth}</span>
                </div>
                <div class="field">
                  <span class="label">${t('emailContent.workingWidth')}:</span>
                  <span class="value">${data.workingWidth}</span>
                </div>
                <div class="field">
                  <span class="label">${t('emailContent.drillingDiameter')}:</span>
                  <span class="value">${data.drillingDiameter}</span>
                </div>
              </div>
              <div class="section">
                <div class="section-title">${t('emailContent.details')}</div>
                <div class="field">
                  <span class="label">${t('emailContent.manufacturer')}:</span>
                  <span class="value">${inputText.manufacturer || t('emailContent.noData')}</span>
                </div>
                <div class="field">
                  <span class="label">${t('emailContent.model')}:</span>
                  <span class="value">${inputText.model || t('emailContent.noData')}</span>
                </div>
                <div class="field">
                  <span class="label">${t('emailContent.serialNumber')}:</span>
                  <span class="value">${inputText.serialNumber || t('emailContent.noData')}</span>
                </div>
                <div class="field">
                  <span class="label">${t('emailContent.manufactureYear')}:</span>
                  <span class="value">${inputText.manufactureYear || t('emailContent.noData')}</span>
                </div>
                <div class="field">
                  <span class="label">${t('emailContent.commentary')}:</span>
                  <span class="value">${inputText.commentary || t('emailContent.noData')}</span>
                </div>
              </div>
            </div>
            <div class="footer">
              <p>© Meta Labs</p>
            </div>
          </div>
        </body>
        </html>
      `;

      formData.append('html', emailHtml);
      formData.append('subject', t('emailContent.equipmentRequest'));

      console.log('Sending form data:', Object.fromEntries(formData.entries()));

      const response = await fetch(`${API_URL}/send-email`, {
        method: 'POST',
        headers: {
          'X-Form-Type': 'equipment',
          'Accept-Language': i18n.language
        },
        body: formData,
      });

      let result;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        result = await response.json();
      } else {
        throw new Error('Server returned non-JSON response');
      }
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to send email');
      }

      setSend(true);
    } catch (error) {
      console.error('Error sending email:', error);
      setErrorText(prev => ({
        ...prev,
        email: error instanceof Error ? error.message : 'Failed to send email'
      }));
    }
  }

  function inputHandler(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const inputId = e.target.id as keyof typeof inputText
    const onlyLettersOrDigitsOrSymbolsOrEmpty = /^.{0}$|^[A-Za-z0-9]+$/
    const onlyLettersOrDigitsOrEmpty = /^.{0}$|^[A-Za-z0-9]+$/
    const onlyDigitsOrEmpty = /^.{0}$|^(\d+)$/

    if (inputId === 'manufacturer' || inputId === 'model') {
      if (e.target.value.match(onlyLettersOrDigitsOrSymbolsOrEmpty)) {
        setInputText(prevInputText => ({ ...prevInputText, [inputId]: e.target.value.toUpperCase() }))
      }
    } else if (inputId === 'serialNumber') {
      if (e.target.value.match(onlyLettersOrDigitsOrEmpty)) {
        setInputText(prevInputText => ({ ...prevInputText, [inputId]: e.target.value.toUpperCase() }))
      }
    } else if (inputId === 'manufactureYear') {
      if (e.target.value.toString().length <= 4 && e.target.value.match(onlyDigitsOrEmpty)) {
        setInputText(prevInputText => ({ ...prevInputText, [inputId]: e.target.value }))
      }
    } else {
      setInputText(prevInputText => ({ ...prevInputText, [inputId]: e.target.value }))
    }
    setErrorText(prevErrorText => ({ ...prevErrorText, [inputId]: '' }))
  }

  function handleButtonClick() {
    setInputText({
      manufacturer: '',
      model: '',
      serialNumber: '',
      manufactureYear: '',
      commentary: '',
      email: '',
      upload: null,
    })
    setErrorText({
      manufacturer: '',
      model: '',
      serialNumber: '',
      manufactureYear: '',
      commentary: '',
      email: '',
      upload: '',
    })
    setChecked(false)
    setBottomChecked(false)
    setBottomCheckedError(false)
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setInputText(prevState => ({
        ...prevState,
        upload: file
      }));
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose()
        setSend(false)
        handleButtonClick()
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Fragment>
        <div
          className='absolute w-[90%] max-w-[640px] h-[224px] bg-[#18191B] top-1/2 left-1/2
                    -translate-x-1/2 -translate-y-1/2 outline-0 rounded-xl flex flex-row items-center justify-center'
        >
          <CloseIcon
            className='absolute top-[20px] right-[20px] hover:fill-gold_'
            onClick={() => {
              handleClose()
              setSend(false)
              handleButtonClick()
            }}
          />

          <PlaneIcon />
          <div className='flex flex-col items-start'>
            <div className='font-labgrotesque text-footerBottomText text-[22px]'>
              {t('inputInfoBlock.success.first')}
            </div>
            <div className='font-labgrotesquebold text-gold_ text-[24px] uppercase'>
              {t('inputInfoBlock.success.second')}
            </div>
          </div>
        </div>
        {!send && (
          <div
            className='absolute w-[90%] max-w-[1285px] h-auto bg-[#18191B] top-1/2 left-1/2
                        -translate-x-1/2 -translate-y-1/2 outline-0 rounded-xl flex flex-col items-center
                        py-[5%] px-[2%] md:px-[5%]'
          >
            <ThemeProvider theme={newTheme}>
              <CloseIcon
                className='absolute top-[20px] right-[20px] hover:fill-gold_'
                onClick={() => {
                  handleClose()
                  handleButtonClick()
                }}
              />

              <div className='flex flex-wrap justify-center'>
                <div className='md:max-w-[30%]'>
                  <div className='flex flex-col items-start'>
                    <div className='font-labgrotesquebold text-gold_ text-[20px] lg:text-[24px] uppercase'>
                      {t('inputInfoBlock.title.info')}
                    </div>
                    <div className='font-labgrotesque text-gold_ text-[20px] lg:text-[24px]'>
                      {t('inputInfoBlock.title.about')}
                    </div>
                  </div>
                  <FormGroup className='mt-6 mb-6'>
                    <FormControlLabel
                      checked={checked}
                      onChange={e => handleChange(e)}
                      id='check'
                      required
                      control={<Checkbox />}
                      sx={{
                        alignItems: 'flex-start',
                        '& .MuiFormControlLabel-asterisk': { display: 'none' },
                        '& .MuiCheckbox-root': { paddingTop: '5px' },
                      }}
                      label={
                        <div className='font-adventpro text-[18px] lg:text-[22px]'>
                          {t('inputInfoBlock.noEquipmentData')}
                        </div>
                      }
                    />
                  </FormGroup>
                </div>

                <div className='flex flex-col justify-between gap-y-6'>
                  <div className='flex flex-row justify-between gap-x-2'>
                    <FormControl error={errorText.manufacturer !== ''} variant='standard' className='z-10 w-[45%]'>
                      <InputLabel htmlFor='manufacturer'>{t('inputInfoBlock.manufacturer')}</InputLabel>
                      <Input
                        id='manufacturer'
                        autoComplete='off'
                        value={inputText.manufacturer}
                        onChange={e => inputHandler(e)}
                      />
                      {errorText.manufacturer && (
                        <FormHelperText id='component-error-text'>{errorText.manufacturer}</FormHelperText>
                      )}
                    </FormControl>

                    <FormControl error={errorText.model !== ''} variant='standard' className='z-10 w-[45%]'>
                      <InputLabel htmlFor='model'>{t('inputInfoBlock.model')}</InputLabel>
                      <Input id='model' autoComplete='off' value={inputText.model} onChange={e => inputHandler(e)} />
                      {errorText.model && <FormHelperText id='component-error-text'>{errorText.model}</FormHelperText>}
                    </FormControl>
                  </div>

                  <div className='flex flex-row justify-between gap-x-2'>
                    <FormControl className='z-10 w-[45%]' error={errorText.serialNumber !== ''} variant='standard'>
                      <InputLabel htmlFor='serialNumber'>{t('inputInfoBlock.serialNumber')}</InputLabel>
                      <Input
                        id='serialNumber'
                        aria-describedby='component-error-text'
                        autoComplete='off'
                        value={inputText.serialNumber}
                        onChange={e => inputHandler(e)}
                      />
                      {errorText.serialNumber && (
                        <FormHelperText error id='component-error-text'>
                          {errorText.serialNumber}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl className='z-10 w-[45%]' error={errorText.manufactureYear !== ''} variant='standard'>
                      <InputLabel htmlFor='manufactureYear'>{t('inputInfoBlock.manufactureYear')}</InputLabel>
                      <Input
                        id='manufactureYear'
                        aria-describedby='component-error-text'
                        autoComplete='off'
                        value={inputText.manufactureYear}
                        onChange={e => inputHandler(e)}
                      />
                      {errorText.manufactureYear && (
                        <FormHelperText error id='component-error-text'>
                          {errorText.manufactureYear}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>

                  <div className='flex flex-row justify-between gap-x-2'>
                    <FormControl className='z-10 w-[45%]' error={errorText.commentary !== ''} variant='standard'>
                      <InputLabel htmlFor='commentary'>{t('inputInfoBlock.commentary')}</InputLabel>
                      <Input
                        multiline
                        id='commentary'
                        aria-describedby='component-error-text'
                        autoComplete='off'
                        maxRows='3'
                        onChange={e => inputHandler(e)}
                      />
                      {errorText.commentary && (
                        <FormHelperText error id='component-error-text'>
                          {errorText.commentary}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl error={errorText.email !== ''} variant='standard' className='z-10 w-[45%]'>
                      <InputLabel htmlFor='email'>{t('inputInfoBlock.email')}</InputLabel>
                      <Input
                        type='email'
                        id='email'
                        aria-describedby='component-error-text'
                        onChange={e => inputHandler(e)}
                        autoComplete='off'
                      />
                      {errorText.email && <FormHelperText id='component-error-text'>{errorText.email}</FormHelperText>}
                    </FormControl>
                  </div>
                  <FormControl className='z-10'>
                    <Button
                      component='label'
                      startIcon={<UploadIcon className={inputText.upload ? 'fill-[#82653E30]' : 'fill-[#202020]'} />}
                      sx={{
                        justifyContent: 'space-between',
                        color: '#4A4A4A',
                        ':hover': { backgroundColor: '#82653E30' },
                        fontFamily: 'AdventProRegular',
                        fontSize: 15,
                        '@media (min-width:768px)': {
                          fontSize: '18px',
                        },
                        '@media (min-width:1024px)': {
                          fontSize: '20px',
                        },
                        textTransform: 'none',
                      }}
                    >
                      {!inputText.upload ? (
                        <span>
                          {t('inputInfoBlock.upload')}
                          <br />
                          PDF, Word, Excel, CSV, JPG, PNG
                        </span>
                      ) : (
                        <span>{inputText.upload.name}</span>
                      )}
                      <VisuallyHiddenInput
                        type='file'
                        accept='.pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png'
                        onChange={handleFileUpload}
                      />
                    </Button>
                  </FormControl>

                  <FormGroup className=''>
                    <FormControlLabel
                      checked={bottomChecked}
                      onChange={e => handleBottomChange(e)}
                      id='check'
                      required
                      control={<Checkbox id='checkb' />}
                      sx={{
                        '& .MuiTypography-root': { color: bottomCheckedError ? '#d32f2f' : '#4A4A4A' },
                        '& .MuiFormControlLabel-asterisk': { display: 'none' },
                      }}
                      label={
                        <div className='flex flex-row gap-2'>
                          {lang === 'ru' && (
                            <>
                              <Link to={getURLWithLang('privacypolicy', lang)}>
                                <u>Соглашение</u>
                              </Link>
                              на обработку персональных данных
                            </>
                          )}
                          {lang === 'de' && (
                            <>
                              Ich habe die
                              <Link to={getURLWithLang('privacypolicy', lang)}>
                                <u>Datenschutzerklärung</u>
                              </Link>
                              gelesen und stimme dieser zu
                            </>
                          )}
                          {lang === 'en' && (
                            <>
                              I have read and agree to the
                              <Link to={getURLWithLang('privacypolicy', lang)}>
                                <u>Privacy Policy</u>
                              </Link>
                            </>
                          )}
                        </div>
                      }
                    />
                  </FormGroup>

                  <CountButton
                    src={button}
                    className='relative z-[1] w-full aspect-[507/59] font-bebas text-white text-[16px] md:text-[18px] lg:text-[22px]
                                         flex items-center justify-center bg-contain bg-no-repeat'
                    defaultValue={t('inputInfoBlock.ready')}
                    onClick={() => {
                      inputErrorHandler()
                    }}
                  />
                </div>
              </div>
            </ThemeProvider>
          </div>
        )}
      </Fragment>
    </Modal>
  )
}

