import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

export const initi18n =()=>{
  i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    () => {
      return {
        // debug: true,
        fallbackLang: "en",
        interpolation: {
          escapeValue: false
        }
      }
    }
  )
}

export default initi18n;