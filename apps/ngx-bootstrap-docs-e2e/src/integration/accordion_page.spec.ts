import { test as base } from '@playwright/test';
import { AccordionPo } from '../support/accordion.po';

const test = base.extend<{ accordionPo: AccordionPo }>({
  accordionPo: async ({ page }, use) => {
    const accordionPo = new AccordionPo(page);
    await use(accordionPo);
  },
});

test.describe('Accordion page testing suite', () => {
  let tabSelector: string;

  test.beforeEach(async ({ accordionPo }) => {
    tabSelector = accordionPo.getTabSelector('Overview');
    await accordionPo.navigateTo();
  });

  test.describe('Basic accordion', () => {
    let basic: string;

    test.beforeEach(async ({ accordionPo }) => {
      basic = tabSelector + accordionPo.exampleDemosArr.basic;
    });

    test('example contains 4 accordion items, initially not expanded', async ({ accordionPo }) => {
      await accordionPo.expectAccordionGroupCountEqual(basic, 4);
      await accordionPo.expectAccordionItemExpanded(basic, 0, false);
      await accordionPo.expectAccordionItemExpanded(basic, 1, false);
      await accordionPo.expectAccordionItemExpanded(basic, 2, false);
      await accordionPo.expectAccordionItemExpanded(basic, 3, false);
      await accordionPo.expectItemContentVisible(basic, 0, false);
      await accordionPo.expectItemContentVisible(basic, 1, false);
      await accordionPo.expectItemContentVisible(basic, 2, false);
      await accordionPo.expectItemContentVisible(basic, 3, false);
    });

    test('when user click on each item, then any content inside shown', async ({ accordionPo }) => {
      await accordionPo.clickOnAccordionGroup(basic, 0);
      await accordionPo.expectAccordionItemExpanded(basic, 0, true);
      await accordionPo.expectItemContentVisible(basic, 0, true);
      await accordionPo.clickOnAccordionGroup(basic, 1);
      await accordionPo.expectAccordionItemExpanded(basic, 1, true);
      await accordionPo.expectItemContentVisible(basic, 1, true);
      await accordionPo.clickOnAccordionGroup(basic, 2);
      await accordionPo.expectAccordionItemExpanded(basic, 2, true);
      await accordionPo.expectItemContentVisible(basic, 2, true);
      await accordionPo.clickOnAccordionGroup(basic, 3);
      await accordionPo.expectAccordionItemExpanded(basic, 3, true);
      await accordionPo.expectItemContentVisible(basic, 3, true);
    });

    test('when user double click on each item, content closed',   async ({ accordionPo }) => {
      await accordionPo.clickOnAccordionGroup(basic, 0);
      await accordionPo.clickOnAccordionGroup(basic, 0);
      await accordionPo.expectAccordionItemExpanded(basic, 0, false);
      await accordionPo.expectItemContentVisible(basic, 0, false);
      await accordionPo.clickOnAccordionGroup(basic, 1);
      await accordionPo.clickOnAccordionGroup(basic, 1);
      await accordionPo.expectAccordionItemExpanded(basic, 1, false);
      await accordionPo.expectItemContentVisible(basic, 1, false);
      await accordionPo.clickOnAccordionGroup(basic, 2);
      await accordionPo.clickOnAccordionGroup(basic, 2);
      await accordionPo.expectAccordionItemExpanded(basic, 2, false);
      await accordionPo.expectItemContentVisible(basic, 2, false);
      await accordionPo.clickOnAccordionGroup(basic, 3);
      await accordionPo.clickOnAccordionGroup(basic, 3);
      await accordionPo.expectAccordionItemExpanded(basic, 3, false);
      await accordionPo.expectItemContentVisible(basic, 3, false);
    });
  });
});
