import { expect } from '@playwright/test';
import { BasePo } from './base.po';

export class AlertsPo extends BasePo {
  override pageUrl = '/ngx-bootstrap/components/alerts';
  pageTitle = 'Alerts';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/alert';

  linkClass = '.alert-link';
  heading = '.alert-heading';

  exampleDemosArr = {
    basic: ' demo-alert-basic',
    link: ' demo-alert-link',
    content: ' demo-alert-content',
    dismissing: ' demo-alert-dismiss',
    dynamicHtml: ' demo-alert-dynamic-html',
    dynamicContent: ' demo-alert-content-html',
    dismissTimeout: ' demo-alert-timeout',
    globalStyling: ' demo-alert-styling-global',
    componentStyling: ' demo-alert-styling-local',
    config: ' demo-alert-config'
  };

  alertType = {
    success: '.alert-success',
    info: '.alert-info',
    warning: '.alert-warning',
    danger: '.alert-danger',
    colored: '.alert-md-color',
    local: '.alert-md-local',
  };

  async expectAlertVisible(baseSelector: string, alertType: string, visible = true, timeout = 5000) {
    await expect(await this.page
      .locator(baseSelector + ` ${this.alertType[alertType]}`)
    ).toBeVisible({ timeout: timeout, visible: visible });
  }

  async expectBtnNotExist(baseSelector: string, buttonName: string) {
    const btn = this.page
      .locator(baseSelector)
      .getByText(buttonName);
    await expect(btn).toHaveCount(0);
  }

  async expectAlertHaveLink(baseSelector: string, alertType: string) {
    const alert = await this.page
      .locator(baseSelector + ` ${this.alertType[alertType]} ` + this.linkClass);
    await expect (await alert.getAttribute('href')).toBe('#');
  }

  async expectAlertHaveDescendants(baseSelector: string, alertType: string, expectedDescendantsClass: string) {
    const descendants = this.page
      .locator(baseSelector + ` ${this.alertType[alertType]} ` + expectedDescendantsClass);
    await expect(descendants).not.toHaveCount(0);
  }

  async expectAlertCountEqual(baseSelector: string, expectedCount: number, timeout = 5000) {
    await expect(this.page
      .locator(baseSelector + ' alert')
    ).toHaveCount(expectedCount, { timeout: timeout });
  }

  async expectAlertHaveCss(baseSelector: string, cssName: string , cssValue: string) {
    const alert = await this.page
      .locator(baseSelector + ' alert div');
    await expect (alert).toHaveCSS(cssName, cssValue);
  }

  async expectAlertTextContains(baseSelector: string, alertType: string, expectedTxt: string) {
    await expect(await this.page
      .locator(baseSelector + ` ${this.alertType[alertType]}`)
    ).toContainText(expectedTxt);
  }
}
