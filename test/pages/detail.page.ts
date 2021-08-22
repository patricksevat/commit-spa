class DetailPage {
  async isRendered() {
    const card = await browser.$(this.detailCardSelector)
    return browser.waitUntil(async () => {
      return (await card.isDisplayed()) === true
    })
  }

  async clickBackButton() {
    const backButton = await browser.$(this.backButtonSelector)
    return backButton.click()
  }

  async clickExternalLink() {
    const externalLink = await browser.$(this.externalLinkSelector)
    return externalLink.click()
  }

  detailCardSelector = '[data-test="detail-card"]'
  backButtonSelector = '[data-test="back-button"]'
  externalLinkSelector = '[data-test="external-link"]'
}

export default new DetailPage()
