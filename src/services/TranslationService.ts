import { SupportedLanguages } from '../types/languages'

class TranslationServiceClass {
  translations: Record<string, string> = {}

  constructor() {
    const languageSavedInLocalStorage = localStorage.getItem('language') as SupportedLanguages
    this.setLanguage(languageSavedInLocalStorage || 'en-us')
  }

  async setLanguage(language: SupportedLanguages) {
    localStorage.setItem('language', language)
    const translationsDynamicImport = await import(`../assets/languages/${language}`)
    this.translations = {
      ...this.translations,
      ...translationsDynamicImport.default,
    }
    return this.translations
  }

  translate(key: string) {
    return this.translations[key] || ''
  }
}

export const TranslationService = new TranslationServiceClass()
