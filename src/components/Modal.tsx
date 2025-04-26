import newTheme from './Text.tsx'
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
  ThemeProvider,
  Tooltip,
} from '@mui/material'
import CountButton from './CountButton.tsx'
import button from '../assets/UI/Btn.svg'
import CloseIcon from '@mui/icons-material/Close'
import React, { ChangeEvent, useState, useRef, useEffect } from 'react'
import PlaneIcon from './customIcons/PlaneIcon.tsx'
import type { ICountryData } from 'countries-list'
import { getCountryDataList } from 'countries-list'
import ReactPhoneInput from 'react-phone-input-material-ui'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { getURLWithLang } from '../functions/get-url-with-lang.ts'
import { ParamsType } from './NavigateProvider.tsx'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ProductInfo {
  id: string;
  title: string;
  category: string;
}

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  productInfo?: ProductInfo;
}

export default function BasicModal({ open, handleClose, productInfo }: ModalProps) {
  const [send, setSend] = useState(false)
  const { lang } = useParams<ParamsType>()
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'ru' | 'en' | 'de';
  const [inputText, setInputText] = useState({
    name: '',
    helpEmail: '',
    phone: '',
    country: '',
    companyName: '',
    commentary: '',
  })
  const [errorText, setErrorText] = useState({
    name: '',
    helpEmail: '',
    phone: '',
    country: '',
    companyName: '',
    commentary: '',
  })
  const [checked, setChecked] = useState(false)
  const [checkedError, setCheckedError] = useState(false)
  const countries: ICountryData[] = getCountryDataList()
  const modalRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && 
          formRef.current && 
          !formRef.current.contains(event.target as Node) &&
          modalRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, handleClose])

  useEffect(() => {
    if (!open) {
      setSend(false)
      setInputText({
        name: '',
        helpEmail: '',
        phone: '',
        country: '',
        companyName: '',
        commentary: '',
      })
      setErrorText({
        name: '',
        helpEmail: '',
        phone: '',
        country: '',
        companyName: '',
        commentary: '',
      })
      setChecked(false)
      setCheckedError(false)
    }
  }, [open])

  function handleChange(event: React.SyntheticEvent<Element, Event>) {
    const x = event as React.ChangeEvent<HTMLInputElement>
    setChecked(x.target.checked)
  }

  async function sendToEmail() {
    try {
      const formData = new FormData();
      
      formData.append('name', inputText.name);
      formData.append('email', inputText.helpEmail);
      
      // Добавляем информацию о товаре в сообщение, если она есть
      const messageText = `
        ${t('emailContent.name')}: ${inputText.name}
        ${t('emailContent.email')}: ${inputText.helpEmail}
        ${t('emailContent.phone')}: ${inputText.phone}
        ${t('emailContent.country')}: ${inputText.country}
        ${t('emailContent.companyName')}: ${inputText.companyName}
        ${t('emailContent.comment')}: ${inputText.commentary}
        ${productInfo ? `
        \n${t('emailContent.productInfo')}:
        ${t('emailContent.productId')}: ${productInfo.id}
        ${t('emailContent.productName')}: ${productInfo.title}
        ${t('emailContent.productCategory')}: ${t(`products.${productInfo.category}`)}
        ` : ''}
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
              <h1>${t('emailContent.contactRequest')}</h1>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">${t('emailContent.contactInformation')}</div>
                <div class="field">
                  <span class="label">${t('emailContent.name')}:</span>
                  <span class="value">${inputText.name}</span>
                </div>
                <div class="field">
                  <span class="label">${t('emailContent.email')}:</span>
                  <span class="value">${inputText.helpEmail}</span>
                </div>
                <div class="field">
                  <span class="label">${t('emailContent.phone')}:</span>
                  <span class="value">${inputText.phone}</span>
                </div>
                <div class="field">
                  <span class="label">${t('emailContent.country')}:</span>
                  <span class="value">${inputText.country}</span>
                </div>
                <div class="field">
                  <span class="label">${t('emailContent.companyName')}:</span>
                  <span class="value">${inputText.companyName}</span>
                </div>
                <div class="field">
                  <span class="label">${t('emailContent.comment')}:</span>
                  <span class="value">${inputText.commentary}</span>
                </div>
              </div>
              ${productInfo ? `
              <div class="section">
                <div class="section-title">${t('emailContent.productInfo')}</div>
                <div class="field">
                  <span class="label">${t('emailContent.productId')}:</span>
                  <span class="value">${productInfo.id}</span>
                </div>
                <div class="field">
                  <span class="label">${t('emailContent.productName')}:</span>
                  <span class="value">${productInfo.title}</span>
                </div>
                <div class="field">
                  <span class="label">${t('emailContent.productCategory')}:</span>
                  <span class="value">${t(`products.${productInfo.category}`)}</span>
                </div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Meta Labs</p>
            </div>
          </div>
        </body>
        </html>
      `;

      formData.append('html', emailHtml);
      formData.append('subject', t('emailContent.contactRequest', { lng: currentLanguage }));

      console.log('Sending form data:', Object.fromEntries(formData.entries()));
      
      const response = await fetch(`${API_URL}/send-email`, {
        method: 'POST',
        headers: {
          'X-Form-Type': 'contact',
          'Accept': 'application/json'
        },
        body: formData,
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

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
      setErrorText(prev => ({
        ...prev,
        helpEmail: error instanceof Error ? error.message : 'Failed to send email'
      }));
    }
  }

  function inputErrorHandler() {
    const emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/
    let errorsCount = 0
    if (inputText.name === '') {
      setErrorText(prevErrorText => ({
        ...prevErrorText,
        name: t('inputHelpBlock.errors.emptyFieldError'),
      }))
      errorsCount++
    }
    if (inputText.helpEmail === '') {
      setErrorText(prevErrorText => ({
        ...prevErrorText,
        helpEmail: t('inputHelpBlock.errors.emptyFieldError'),
      }))
      errorsCount++
    } else if (!inputText.helpEmail.match(emailFormat)) {
      setErrorText(prevErrorText => ({
        ...prevErrorText,
        helpEmail: t('inputHelpBlock.errors.wrongFormat'),
      }))
      errorsCount++
    }
    if (inputText.phone === '') {
      setErrorText(prevErrorText => ({
        ...prevErrorText,
        phone: t('inputHelpBlock.errors.emptyFieldError'),
      }))
      errorsCount++
    } else if (inputText.phone.length <= 5) {
      setErrorText(prevErrorText => ({
        ...prevErrorText,
        phone: t('inputHelpBlock.errors.wrongFormat'),
      }))
      errorsCount++
    }
    if (inputText.country === '') {
      setErrorText(prevErrorText => ({
        ...prevErrorText,
        country: t('inputHelpBlock.errors.emptyFieldError'),
      }))
      errorsCount++
    }
    if (inputText.companyName === '') {
      setErrorText(prevErrorText => ({
        ...prevErrorText,
        companyName: t('inputHelpBlock.errors.emptyFieldError'),
      }))
      errorsCount++
    }
    if (inputText.commentary === '') {
      setErrorText(prevErrorText => ({
        ...prevErrorText,
        commentary: t('inputHelpBlock.errors.emptyFieldError'),
      }))
      errorsCount++
    }

    setCheckedError(!checked)
    if (errorsCount === 0 && checked) {
      sendToEmail();
      setSend(true);
    }
  }

  function inputHandler(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const inputId = e.target.id as keyof typeof inputText
    setInputText(prevInputText => ({ ...prevInputText, [inputId]: e.target.value }))
    setErrorText(prevErrorText => ({ ...prevErrorText, [inputId]: '' }))
  }

  function inputAutocompleteHandler(e: React.SyntheticEvent<HTMLDivElement, Event>) {
    const x = e as React.ChangeEvent<HTMLInputElement>
    setInputText(prevInputText => ({ ...prevInputText, country: x.target.value }))
    setErrorText(prevErrorText => ({ ...prevErrorText, country: '' }))
  }

  function phoneHandler(e: string) {
    if (e !== '') {
      setErrorText(prevState => ({ ...prevState, phone: '' }))
    }
    setInputText({ ...inputText, phone: e })
  }

  if (!open) return null

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ backdropFilter: 'blur(5px)' }}
    >
      <form 
        ref={formRef}
        className="bg-[#202020] rounded-lg p-8 max-w-md w-full mx-4 relative"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#A19F9B] hover:text-[#D5CDBD] transition-colors"
        >
          <CloseIcon />
        </button>
        <div
          className='absolute w-[90%] md:w-[640px] h-[224px] bg-[#18191B] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    outline-0 rounded-xl flex flex-row items-center justify-center'
        >
          <PlaneIcon />
          <div className='flex flex-col items-start'>
            <div className='font-labgrotesque text-footerBottomText text-[22px]'>
              {t('inputHelpBlock.success.first')}
            </div>
            <div className='font-labgrotesquebold text-gold_ text-[24px] uppercase'>
              {t('inputHelpBlock.success.second')}
            </div>
          </div>
        </div>
        {!send && (
          <div
            className='absolute w-[90%] md:w-[640px] bg-[#18191B] top-1/2 left-1/2
                        -translate-x-1/2 -translate-y-1/2 outline-0 rounded-xl flex flex-col items-center'
          >
            <div className='mt-10 flex flex-col items-center'>
              <div className='font-labgrotesquebold text-gold_ text-[18px] md:text-[24px] uppercase text-center'>
                {t('inputHelpBlock.title.first')}
              </div>
              <div className='font-labgrotesque text-footerBottomText text-[16px] md:text-[22px] text-center'>
                {t('inputHelpBlock.title.second')}
              </div>
            </div>

            <ThemeProvider theme={newTheme}>
              <div className='w-full h-[300px] px-[10%] pt-6 pb-6  flex flex-col justify-between'>
                <div className='flex flex-row justify-between  gap-x-6'>
                  <FormControl className='z-10 flex-1'>
                    <InputLabel htmlFor='name'>{t('inputHelpBlock.name')}</InputLabel>
                    <Input
                      id='name'
                      aria-describedby='component-error-text'
                      autoComplete='off'
                      onChange={e => inputHandler(e)}
                    />
                    {errorText.name && (
                      <FormHelperText error id='component-error-text'>
                        {errorText.name}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl className='z-10 flex-1'>
                    <InputLabel htmlFor='helpEmail'>{t('inputHelpBlock.email')}</InputLabel>
                    <Input
                      id='helpEmail'
                      aria-describedby='component-error-text'
                      autoComplete='off'
                      onChange={e => inputHandler(e)}
                    />
                    {errorText.helpEmail && (
                      <FormHelperText error id='component-error-text'>
                        {errorText.helpEmail}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>

                <div className='flex flex-row justify-between  gap-x-6'>
                  <FormControl className='z-10 flex-1'>
                    <ReactPhoneInput
                      onChange={e => phoneHandler(e)}
                      component={TextField}
                      label={t('inputHelpBlock.phone')}
                      placeholder=''
                    />
                    {errorText.phone && (
                      <FormHelperText error id='component-error-text'>
                        {errorText.phone}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl className='flex-1'>
                    <Autocomplete
                      id='country'
                      onSelect={e => inputAutocompleteHandler(e)}
                      options={countries}
                      autoHighlight
                      isOptionEqualToValue={(option, value) => option.name === value.name}
                      getOptionLabel={option => option.name}
                      renderOption={(props, option) => {                        const { key, ...otherProps } = props;
                        return (
                          <Box 
                            component='li' 
                            key={option.iso2}
                            sx={{ '& > img': { mr: 2, flexShrink: 0 } }} 
                            {...otherProps}
                          >
                            <img
                              loading='lazy'
                              width='20'
                              srcSet={`https://flagcdn.com/w40/${option.iso2.toLowerCase()}.png 2x`}
                              src={`https://flagcdn.com/w20/${option.iso2.toLowerCase()}.png`}
                              alt=''
                            />
                            {option.name}
                          </Box>
                        );
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label={t('inputHelpBlock.country')}
                          inputProps={{ ...params.inputProps, autoComplete: 'new-password' }}
                        />
                      )}
                    />
                    {errorText.country && (
                      <FormHelperText error id='component-error-text'>
                        {errorText.country}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
                <div className='flex flex-row justify-between  gap-x-6'>
                  <FormControl className='z-10 flex-1'>
                    <InputLabel htmlFor='companyName'>{t('inputHelpBlock.companyName')}</InputLabel>
                    <Input
                      id='companyName'
                      aria-describedby='component-error-text'
                      autoComplete='off'
                      onChange={e => inputHandler(e)}
                    />
                    {errorText.companyName && (
                      <FormHelperText error id='component-error-text'>
                        {errorText.companyName}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl className='z-10 flex-1'>
                    <InputLabel htmlFor='commentary'>{t('inputHelpBlock.commentary')}</InputLabel>
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
                </div>
              </div>

              <FormGroup className='mt-3 mb-3'>
                <FormControlLabel
                  checked={checked}
                  onChange={e => handleChange(e)}
                  id='check'
                  required
                  control={<Checkbox id='checkb' />}
                  sx={{
                    '& .MuiTypography-root': {
                      color: checkedError ? '#d32f2f' : '#4A4A4A',
                    },
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
            </ThemeProvider>

            <Tooltip 
              title={t('inputHelpBlock.moreInfo')} 
              placement="top"
              arrow
              enterDelay={200}
              leaveDelay={200}
            >
              <div>
                <CountButton
                  src={button}
                  className='relative z-[1] w-[284px] h-[58px] font-bebas text-white text-[16px] md:text-[18px] lg:text-[22px]
                              flex items-center justify-center bg-no-repeat bg-contain mb-10'
                  defaultValue={t('inputHelpBlock.ready')}
                  onClick={() => {
                    inputErrorHandler()
                  }}
                />
              </div>
            </Tooltip>
          </div>
        )}
      </form>
    </div>
  )
}
