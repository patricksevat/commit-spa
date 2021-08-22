import { Dispatch, SetStateAction } from 'react'

export type SupportedLanguages = 'en-us' | 'nl-nl'

export interface ITranslationState {
  translations?: Record<string, string>
  translate(key: string): string
}

export interface ITranslationProvider extends ITranslationState {
  setLanguage?: Dispatch<SetStateAction<string>>
  language?: string
}
