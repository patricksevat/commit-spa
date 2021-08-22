import OverviewPage from '../pages/overview.page'
import DetailPage from '../pages/detail.page'

describe('DetailPage', function () {
  it('should render correctly', async function () {
    await OverviewPage.navigateToDetailPage()
    await DetailPage.isRendered()
  })

  it('should navigate back to overview page', async function () {
    await OverviewPage.navigateToDetailPage()
    await DetailPage.isRendered()
    await DetailPage.clickBackButton()

    await browser.waitUntil(
      async () => {
        const url = await browser.getUrl()
        return url === 'http://localhost:3000/'
      },
      { timeout: 5000, timeoutMsg: `Could not navigate back to overview current url: ${await browser.getUrl()}` }
    )
  })

  it('should click on external link and open in new window', async function () {
    await OverviewPage.navigateToDetailPage()
    await DetailPage.isRendered()
    await DetailPage.clickExternalLink()

    await browser.waitUntil(
      async () => {
        const githubWindow = await browser.switchWindow('github.com')
        return (await browser.getUrl()).includes('github.com')
      },
      {
        timeoutMsg: 'Could not find github window',
      }
    )
  })
})
