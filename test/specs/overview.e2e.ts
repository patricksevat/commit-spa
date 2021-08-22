import OverviewPage from '../pages/overview.page'
import { getLastYearInIsoString } from '../../src/utils/date-time'
import { setInputValueAndTriggerOnChange } from '../utils/inputs'

describe('OverviewPage', () => {
  it('should render', async () => {
    await OverviewPage.open()
    expect(await OverviewPage.isRendered()).toBe(true)
  })

  it('should check that the since datepicker works', async function () {
    await OverviewPage.open()
    expect(await OverviewPage.isRendered()).toBe(true)
    const beforePageText = await OverviewPage.getNumberOfPagesText()
    await setInputValueAndTriggerOnChange(OverviewPage.datepickerSinceSelector, getLastYearInIsoString())

    await browser.waitUntil(
      async () => {
        const afterPageText = await OverviewPage.getNumberOfPagesText()
        return afterPageText && afterPageText !== beforePageText
      },
      {
        timeoutMsg: `Pagination did not change despite changing since datepicker: before ${beforePageText}, after: ${await OverviewPage.getNumberOfPagesText()}`,
        timeout: 5000,
      }
    )

    console.log({ beforePageText, after: await OverviewPage.getNumberOfPagesText() })
  })

  it('should check that the until datepicker works', async function () {
    await OverviewPage.open()
    expect(await OverviewPage.isRendered()).toBe(true)
    const beforePageText = await OverviewPage.getNumberOfPagesText()
    await setInputValueAndTriggerOnChange(OverviewPage.datepickerUntilSelector, getLastYearInIsoString())

    await browser.waitUntil(
      async () => {
        const afterPageText = await OverviewPage.getNumberOfPagesText()
        return afterPageText && afterPageText !== beforePageText
      },
      {
        timeoutMsg: `Pagination did not change despite changing since datepicker: before ${beforePageText}, after: ${await OverviewPage.getNumberOfPagesText()}`,
        timeout: 5000,
      }
    )

    console.log({ beforePageText, after: await OverviewPage.getNumberOfPagesText() })
  })

  it('should change the language', async function () {
    const translatedBeforeMessage = await OverviewPage.getTranslatedMessage()
    await setInputValueAndTriggerOnChange(OverviewPage.translateSelectInput, 'nl-nl')
    await browser.waitUntil(
      async () => {
        const translatedAfterMessage = await OverviewPage.getTranslatedMessage()
        return translatedAfterMessage && translatedAfterMessage !== translatedBeforeMessage
      },
      { timeout: 5000, timeoutMsg: 'Translation was not applied' }
    )
  })

  it('should click on a commit and go the detail page', async function () {
    await OverviewPage.navigateToDetailPage()
  })
})
