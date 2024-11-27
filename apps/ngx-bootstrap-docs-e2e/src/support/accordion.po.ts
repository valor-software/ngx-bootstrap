import { expect, ConsoleMessage } from '@playwright/test';
import { BasePo } from './base.po';

export class AccordionPo extends BasePo {
  override pageUrl = '/ngx-bootstrap/components/accordion';
  pageTitle = 'Accordion';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/accordion';
  additionalHtml = '.badge';

  exampleDemosArr = {
    basic: ' demo-accordion-basic',
    openEvent: ' demo-accordion-open-event',
    customHtml: ' demo-accordion-custom-html',
    disabled: ' demo-accordion-disabled',
    initiallyOpened: ' demo-accordion-opened',
    dynamicAccordion: ' demo-accordion-dynamic',
    dynamicBody: ' demo-accordion-dynamic-body',
    manualToggle: ' demo-accordion-manual-toggle',
    oneAtATime: ' demo-accordion-one-time',
    styling: ' demo-accordion-styling',
    config: ' demo-accordion-config'
  };

  async expectAccordionGroupCountEqual(baseSelector: string, expectedCount: number) {
    await expect(this.page
      .locator(baseSelector)
      .first()
      .locator('accordion-group')
    ).toHaveCount(expectedCount);
  }

  async expectAccordionItemExpanded(baseSelector: string, itemIndex: number, expanded: boolean) {
    await expect(this.page
      .locator(baseSelector + ' accordion-group')
      .nth(itemIndex)
      .locator('.accordion-toggle')
    ).toHaveAttribute('aria-expanded', `${expanded}`);
  }

  async clickOnAccordionGroup(baseSelector: string, itemIndex: number) {
    await this.page
      .locator(baseSelector + ' accordion-group button')
      .nth(itemIndex)
      .click();
  }

  async expectItemContentVisible(baseSelector: string, itemIndex: number, visible: boolean) {
    await expect(await this.page
      .locator(baseSelector + ' .panel-body')
      .nth(itemIndex)
    ).toBeVisible({ visible: visible });
  }

  async getConsoleLogs(): Promise<ConsoleMessage[]> {
    const consoleMessages: ConsoleMessage[] = [];
    this.page.on('console', (message) => {
      if (message.type() === 'log') {
        consoleMessages.push(message);
      }
    });
    return consoleMessages;
  }

  async expectConsoleLogCalled(consoleMessages: ConsoleMessage[], isCalled: boolean, expectedLog?: string) {
    if (!isCalled) {
      await expect(consoleMessages.length).toBe(0);
    } else {
      await expect(consoleMessages.map((message) => message.text())).toContain(expectedLog);
    }
  }

  async expectAccordionItemContainTxt(baseSelector: string, additionalSelector: string, itemIndex: number, expectedContent: string, visible: boolean) {
    const accordionItem = await this.page
      .locator(baseSelector + ' accordion-group')
      .nth(itemIndex)
      .locator(additionalSelector);
    await expect (accordionItem).toBeVisible({ visible: visible });
    await expect(accordionItem).toContainText(expectedContent);
  }

  async expectAccordionItemHaveCorrectStyle(baseSelector: string, itemIndex: number, backColor: string, color: string) {
    const accordionItem = await this.page
      .locator(baseSelector + ' accordion-group')
      .nth(itemIndex)
      .locator('.card');
    await expect (accordionItem).toHaveCSS('background-color', backColor);
    await expect (accordionItem).toHaveCSS('color', color);
  }

  async expectAccordionBodyHaveCorrectStyle(baseSelector: string, itemIndex: number, backColor: string, color: string) {
    const accordionBody = await this.page
      .locator(baseSelector + ' accordion-group')
      .nth(itemIndex)
      .locator('.panel-body');
    await expect (accordionBody).toHaveCSS('background-color', backColor);
    await expect (accordionBody).toHaveCSS('color', color);
  }
}
