import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      // debug: true,
      fallbackLang: "en",
      interpolation:{
        escapeValue: false
      }
    }

  )

  

// i18n.use(initReactI18next).init({
  // fallbackLng: 'en',
  // lng: 'en',
  // resources: {
  //   en: {
  //     translations: require('../locales/en/translations.json')
  //   },
  //   nb: {
  //     translations: require('../locales/nb/translations.json')
  //   }
  // },
  // ns: ['translations'],
  // defaultNS: 'translations'
// });

// i18n.languages = ['en', 'nb'];


export default i18n;