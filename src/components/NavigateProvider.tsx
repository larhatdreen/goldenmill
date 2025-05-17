import { FC, PropsWithChildren, useEffect } from 'react'
import i18next, { activeLanguages, LanguagesEnum, LOCAL_STORAGE_LANGUAGE_KEY } from './translation/i18n'
import { useNavigate, useParams } from 'react-router-dom'

export type ParamsType = {
  lang: LanguagesEnum
}

// Безопасное сохранение языка в localStorage
const setStoredLanguage = (language: LanguagesEnum): void => {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, language)
  }
}

export const NavigateProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate()
  const { lang } = useParams<ParamsType>()

  useEffect(() => {
    if (!lang || !activeLanguages.includes(lang)) {
      i18next.changeLanguage(LanguagesEnum.ENGLISH)
      setStoredLanguage(LanguagesEnum.ENGLISH)
      navigate(`/${LanguagesEnum.ENGLISH}`, { replace: true })
    }

    if (lang && i18next.language !== lang) {
      i18next.changeLanguage(lang)
      setStoredLanguage(lang)
    }
  }, [lang])

  return children
}
