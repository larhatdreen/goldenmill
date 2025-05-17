import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationRussian from './ru.json'
import translationDeutsch from './de.json'
import translationEnglish from './en.json'
import cookieEnTranslation from '../../locales/en/translation.json'
import cookieRuTranslation from '../../locales/ru/translation.json'
import cookieDeTranslation from '../../locales/de/translation.json'

export enum LanguagesEnum {
  RUSSIAN = 'ru',
  GERMANY = 'de',
  ENGLISH = 'en',
}

export const LOCAL_STORAGE_LANGUAGE_KEY = 'language'

export const activeLanguages = ['en', 'de', 'ru']
export const redirectedLanguages = []

// Безопасное получение языка из localStorage
const getStoredLanguage = (): LanguagesEnum => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const stored = window.localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY)
    if (stored && Object.values(LanguagesEnum).includes(stored as LanguagesEnum)) {
      return stored as LanguagesEnum
    }
  }
  return LanguagesEnum.ENGLISH
}

const resources = {
  ru: {
    translation: {
      ...translationRussian,
      ...cookieRuTranslation,
      emailContent: {
        subject: 'Новая заявка с сайта',
        contactRequest: 'Запрос на связь',
        contactInformation: 'Контактная информация',
        name: 'Имя',
        email: 'Email',
        phone: 'Телефон',
        country: 'Страна',
        companyName: 'Название компании',
        commentary: 'Комментарий',
        equipmentRequest: 'Запрос на информацию об оборудовании',
        productInfo: 'Информация о продукте',
        productId: 'ID продукта',
        productName: 'Название продукта',
        productCategory: 'Категория продукта',
        type: 'Тип',
        shell: 'Обечайка',
        matrix: 'Матрица',
        innerDiameter: 'Внутренний диаметр',
        outerDiameter: 'Внешний диаметр',
        overallWidth: 'Общая ширина',
        workingWidth: 'Рабочая ширина',
        drillingDiameter: 'Диаметр сверления',
        manufacturer: 'Производитель',
        model: 'Модель',
        serialNumber: 'Серийный номер',
        manufactureYear: 'Год производства',
        noData: 'Нет данных'
      },
    },
  },
  de: {
    translation: {
      ...translationDeutsch,
      ...cookieDeTranslation,
      emailContent: {
        subject: 'Neue Anfrage von der Website',
        contactRequest: 'Kontaktanfrage',
        contactInformation: 'Kontaktinformationen',
        name: 'Name',
        email: 'Email',
        phone: 'Telefon',
        country: 'Land',
        companyName: 'Firmenname',
        commentary: 'Kommentar',
        equipmentRequest: 'Anfrage zu Geräteinformationen',
        productInfo: 'Produktinformationen',
        productId: 'Produkt-ID',
        productName: 'Produktname',
        productCategory: 'Produktkategorie',
        type: 'Typ',
        shell: 'Schale',
        matrix: 'Matrix',
        innerDiameter: 'Innendurchmesser',
        outerDiameter: 'Außendurchmesser',
        overallWidth: 'Gesamtbreite',
        workingWidth: 'Arbeitsbreite',
        drillingDiameter: 'Bohrdurchmesser',
        manufacturer: 'Hersteller',
        model: 'Modell',
        serialNumber: 'Seriennummer',
        manufactureYear: 'Herstellungsjahr',
        noData: 'Keine Daten'
      },
    },
  },
  en: {
    translation: {
      ...translationEnglish,
      ...cookieEnTranslation,
      emailContent: {
        subject: 'New request from website',
        contactRequest: 'Contact Request',
        contactInformation: 'Contact Information',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        country: 'Country',
        companyName: 'Company Name',
        commentary: 'Commentary',
        equipmentRequest: 'Equipment Information Request',
        productInfo: 'Product Information',
        productId: 'Product ID',
        productName: 'Product Name',
        productCategory: 'Product Category',
        type: 'Type',
        shell: 'Shell',
        matrix: 'Matrix',
        innerDiameter: 'Inner Diameter',
        outerDiameter: 'Outer Diameter',
        overallWidth: 'Overall Width',
        workingWidth: 'Working Width',
        drillingDiameter: 'Drilling Diameter',
        manufacturer: 'Manufacturer',
        model: 'Model',
        serialNumber: 'Serial Number',
        manufactureYear: 'Manufacture Year',
        noData: 'No data'
      },
    },
  },
}

const currentLanguage = getStoredLanguage()

i18next.use(initReactI18next).init({
  resources,
  lng: currentLanguage,
  fallbackLng: LanguagesEnum.ENGLISH,
  interpolation: {
    escapeValue: false,
  },
})

export default i18next
