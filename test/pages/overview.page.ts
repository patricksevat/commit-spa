class OverviewPage {
  async open() {
    await browser.url('http://localhost:3000')
  }

  async isRendered() {
    await browser.waitUntil(
      async () => {
        const skeletons = await browser.$$(this.skeletonSelector)
        return skeletons.length === 0
      },
      { timeout: 5000, timeoutMsg: 'Shimmers still appear after 5s' }
    )
    await browser.waitUntil(async () => {
      const tableElement = await browser.$(this.tableSelector)
      return tableElement.isDisplayed()
    })
    return true
  }

  async getNumberOfPagesText() {
    const captionElement = await browser.$(this.paginationCaptionSelector)
    return captionElement.getText()
  }

  async getSinceDatepicker() {
    return browser.$(this.datepickerSinceSelector)
  }

  async getTranslatedMessage() {
    const tableHeaderCell = await browser.$(this.messageTranslatedSelector)
    return tableHeaderCell.getText()
  }

  async navigateToDetailPage() {
    await this.open()
    await this.isRendered()
    const commit = await browser.$(this.commitItemSelector)
    await commit.click()
    await browser.waitUntil(
      async () => {
        const url = await browser.getUrl()
        return url.includes('http://localhost:3000/commit')
      },
      { timeout: 5000, timeoutMsg: 'Navigation from overview to detail page failed' }
    )
  }

  skeletonSelector = '[data-test="skeleton"]'
  tableSelector = '[data-test="commit-overview-table"]'
  paginationCaptionSelector = '.MuiTablePagination-caption'
  datepickerSinceSelector = '#datetime-since'
  datepickerUntilSelector = '#datetime-until'
  commitItemSelector = '.commit-overview-list-item'
  messageTranslatedSelector = '[data-test="message-translated"]'
  translateSelectInput = '#appbar__language-selector+input.MuiSelect-nativeInput'
}

export default new OverviewPage()
