import { LanguagesEnum } from '../components/translation/i18n'

export const getURLWithLang = (url: string, lang: LanguagesEnum) => {
  if (url === '/') return `/${lang}`

  return `/${lang}/${url}`
}
