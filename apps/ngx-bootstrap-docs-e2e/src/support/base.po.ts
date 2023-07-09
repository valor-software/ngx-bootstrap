import { expect, Page } from '@playwright/test';

export class BasePo {
  page: Page;
  pageUrl: string;
  originalDateNow: number;

  constructor(page: Page) {
    this.page = page;
  }

  getTabSelector(tabName: string) {
    return `tab[heading="${tabName}"]`;
  }

  async navigateTo() {
    const bsVersionRoute = process.env['bsVersion'] ? `?_bsVersion=bs${process.env['bsVersion']}` : '';
    await this.page.goto(this.pageUrl + bsVersionRoute);
  }

  async scrollToMenu(menuTxt: string) {
    const activeTabText = await this.page.locator('a[aria-selected="true"]').first().textContent();
    await this.page
      .locator(`tab[heading="${activeTabText}"] examples h3:has-text("${menuTxt}")`)
      .scrollIntoViewIfNeeded();
  }

  async clickOnDemoMenu(menuTxt: string) {
    await this.page
      .locator('add-nav')
      .locator('a')
      .getByText(menuTxt)
      .click();
  }

  async clickByText(baseSelector: string, text: string, elemNumber?: number) {
    await this.page
      .locator(baseSelector)
      .getByText(text, { exact: true })
      .nth(elemNumber ? elemNumber : 0)
      .click();
  }

  async expectBtnTxtEqual(baseSelector: string, expectedBtnTxt: string, buttonIndex?: number) {
    const btn = await this.page
      .locator(baseSelector + ' button')
      .nth(buttonIndex ? buttonIndex : 0);
    await expect((await btn.innerText()).trim()).toEqual(expectedBtnTxt.trim());
  }

  async expectLabelTxtEqual(baseSelector: string, expectedLabelTxt: string, labelIndex?: number) {
    const elem = await this.page
      .locator(baseSelector + ' label')
      .nth(labelIndex ? labelIndex : 0);
    await expect(elem).toHaveText(expectedLabelTxt);
  }

  async clickOnBtn(baseSelector: string, buttonIndex?: number) {
    await this.page
      .locator(baseSelector + ' button')
      .nth(buttonIndex ? buttonIndex : 0)
      .click();
  }

  async dblClickOnBtn(baseSelector: string, buttonIndex?: number) {
    await this.page
      .locator(baseSelector + ' button')
      .nth(buttonIndex ? buttonIndex : 0)
      .dblclick();
  }

  async expectBtnExist(baseSelector: string, btnName: string, btnNumber?: number, exist = true) {
    if (exist) {
      const btn = await this.page
        .locator(baseSelector + ' button')
        .nth(btnNumber ? btnNumber : 0);
      await expect((await btn.textContent()).trim()).toEqual(btnName.trim());
    } else {
      const btn = this.page
        .locator(baseSelector + ' button')
        .getByText(btnName);
      await expect(btn).toHaveCount(0);
    }
  }

  async expectPreviewExist(baseSelector: string, previewText: string, previewNumber?: number) {
    const elem = await this.page
      .locator(baseSelector + ' .card.card-block')
      .nth(previewNumber ? previewNumber : 0);
    await expect(elem).toContainText(previewText);
  }

  async setCheckboxState(baseSelector: string, shouldBeChecked: boolean) {
    await this.page
      .locator(baseSelector + ' input[type="checkbox"]')
      .setChecked(shouldBeChecked);
  }

  async expectTemplateSrcContain(demoName: string, expectedTxt: string) {
    const component = await this.page
      .locator('examples h3')
      .getByText(demoName)
      .locator('..')
      .locator('tab[heading*="template"]');
    await expect(component).toContainText(expectedTxt);
  }

  async expectComponentSrcContain(demoName: string, expectedTxt: string) {
    const component = await this.page
      .locator('examples h3')
      .getByText(demoName)
      .locator('..')
      .locator('tab[heading*="component"]');
    await expect(component).toContainText(expectedTxt);
  }
}
