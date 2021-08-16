import { SupportedLanguages } from '../types/languages';

class TranslationServiceClass {
  translations: Record<string, string> = {}

  constructor() {
    this.setLanguage('en-us');
  }

  // TODO write to localStorage
  async setLanguage(language: SupportedLanguages) {
    const translationsDynamicImport = await import(`../assets/languages/${language}`);
    this.translations = {
      ...this.translations,
      ...translationsDynamicImport.default
    };
    return this.translations
  }

  translate(key: string) {
    return this.translations[key] || '';
  }
}

export const TranslationService = new TranslationServiceClass();
