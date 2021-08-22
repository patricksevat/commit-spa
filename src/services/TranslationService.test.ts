import { TranslationService } from './TranslationService'

describe('TranslationService', function () {
  describe('setLanguage()', function () {
    it('should set correct language', async function () {
      await TranslationService.setLanguage('en-us')
      expect(TranslationService.translations.message).toBe('Message')
    })

    it('should save set language to LocalStorage', async function () {
      await TranslationService.setLanguage('nl-nl')
      expect(localStorage.getItem('language')).toBe('nl-nl')
    })

    it('should fall back to existing translations if the provided language does not have that entry', async function () {
      TranslationService.translations['doesNotExist'] = 'foo'
      await TranslationService.setLanguage('en-us')
      expect(TranslationService.translations['doesNotExist']).toBe('foo')
    })
  })

  describe('translate()', function () {
    it('should return the correct translation', async function () {
      await TranslationService.setLanguage('nl-nl')
      expect(TranslationService.translate('message')).toBe('Tekst')
    })
  })
})
