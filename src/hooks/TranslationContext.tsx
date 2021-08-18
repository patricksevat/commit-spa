import React, { createContext, FunctionComponent, useEffect, useState } from 'react';
import { TranslationService } from '../services/TranslationService';
import { ITranslationProvider, SupportedLanguages } from '../types/languages';

const initialState: ITranslationProvider = {
  translate(key: string): string {
    return TranslationService.translate(key)
  },
  translations: {},
};

export const TranslationContext = createContext(initialState);

export const TranslationsProvider: FunctionComponent = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en-us');
  // Not exactly sure what React magic is going on here, but without calling setTranslations, rerendering is not being performed
  const [, setTranslations] = useState(TranslationService.translations)

  useEffect(() => {
    async function setLanguageAndTranslations () {
      setTranslations(await TranslationService.setLanguage(language as SupportedLanguages))
    }
    setLanguageAndTranslations();
  }, [language])

  return (
    <TranslationContext.Provider value={{ setLanguage, language, translate: TranslationService.translate.bind(TranslationService) }}>
      { children }
    </TranslationContext.Provider>
  )
}
