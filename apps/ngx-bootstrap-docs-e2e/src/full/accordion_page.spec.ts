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

  test.describe('Group opening event', () => {
    let groupOpenEvent: string;

    test.beforeEach(async ({ accordionPo }) => {
      groupOpenEvent = tabSelector + accordionPo.exampleDemosArr.openEvent;
      await accordionPo.scrollToMenu('Group opening event');
    });

    test('example contains 3 accordion items, initially not expanded', async ({ accordionPo }) => {
      await accordionPo.expectAccordionGroupCountEqual(groupOpenEvent, 3);
      await accordionPo.expectAccordionItemExpanded(groupOpenEvent, 0, false);
      await accordionPo.expectAccordionItemExpanded(groupOpenEvent, 1, false);
      await accordionPo.expectAccordionItemExpanded(groupOpenEvent, 2, false);
      await accordionPo.expectItemContentVisible(groupOpenEvent, 0, false);
      await accordionPo.expectItemContentVisible(groupOpenEvent, 1, false);
      await accordionPo.expectItemContentVisible(groupOpenEvent, 2, false);
    });

    test(`when user click on item without event listener, item opened, in the browser console - nothing happens
                   after click on item again, it closes and in the browser console - nothing happens`, async ({ accordionPo }) => {
      const consoleMessages = await accordionPo.getConsoleLogs();
      await accordionPo.clickOnAccordionGroup(groupOpenEvent, 0);
      await accordionPo.expectAccordionItemExpanded(groupOpenEvent, 0, true);
      await accordionPo.expectItemContentVisible(groupOpenEvent, 0, true);
      await accordionPo.expectConsoleLogCalled(consoleMessages, false);
      await accordionPo.clickOnAccordionGroup(groupOpenEvent, 0);
      await accordionPo.expectAccordionItemExpanded(groupOpenEvent, 0, false);
      await accordionPo.expectItemContentVisible(groupOpenEvent, 0, false);
      await accordionPo.expectConsoleLogCalled(consoleMessages, false);
    });

    test(`when user click on item with event listener, it opens and in the console - "Accordion has been opened"`, async({ accordionPo }) => {
      const openLog = 'Accordion has been opened';
      const consoleMessages = await accordionPo.getConsoleLogs();
      await accordionPo.expectConsoleLogCalled(consoleMessages, false);
      await accordionPo.clickOnAccordionGroup(groupOpenEvent, 1);
      await accordionPo.expectAccordionItemExpanded(groupOpenEvent, 1, true);
      await accordionPo.expectItemContentVisible(groupOpenEvent, 1, true);
      await accordionPo.expectConsoleLogCalled(consoleMessages, true, openLog);
    });

    test(`when user click on item again, it closes and in the console - "Accordion has been closed"`, async ({ accordionPo }) => {
      const closeLog = 'Accordion has been closed';
      await accordionPo.clickOnAccordionGroup(groupOpenEvent, 1);
      await accordionPo.expectAccordionItemExpanded(groupOpenEvent, 1, true);
      await accordionPo.expectItemContentVisible(groupOpenEvent, 1, true);
      const consoleMessages = await accordionPo.getConsoleLogs();
      await accordionPo.clickOnAccordionGroup(groupOpenEvent, 1);
      await accordionPo.expectAccordionItemExpanded(groupOpenEvent, 1, false);
      await accordionPo.expectItemContentVisible(groupOpenEvent, 1, false);
      await accordionPo.expectConsoleLogCalled(consoleMessages, true, closeLog);
    });
  });

  test.describe('Custom HTML', () => {
    let customHTML: string;

    test.beforeEach(async ({ accordionPo }) => {
      customHTML = tabSelector + accordionPo.exampleDemosArr.customHtml;
      await accordionPo.scrollToMenu('Custom HTML');
    });

    test(`example contains 2 accordion items, initially not expanded, 1st have span with "Some HTML here" text,
                   second item don't have any additional html with closed state`, async({ accordionPo }) => {
      await accordionPo.expectAccordionGroupCountEqual(customHTML, 2);
      await accordionPo.expectAccordionItemExpanded(customHTML, 0, false);
      await accordionPo.expectAccordionItemExpanded(customHTML, 1, false);
      await accordionPo.expectItemContentVisible(customHTML, 0, false);
      await accordionPo.expectItemContentVisible(customHTML, 1, false);
      await accordionPo.expectAccordionItemContainTxt(customHTML, accordionPo.additionalHtml, 0, 'Some HTML here', true);
      await accordionPo.expectAccordionItemContainTxt(customHTML, accordionPo.additionalHtml, 1, 'And some HTML here', false);
    });

    test(`when user click on the first item, it is opened and content shown
                   after second click on item it is closed`, async({ accordionPo }) => {
      await accordionPo.clickOnAccordionGroup(customHTML, 0);
      await accordionPo.expectAccordionItemExpanded(customHTML, 0, true);
      await accordionPo.expectAccordionItemExpanded(customHTML, 1, false);
      await accordionPo.expectItemContentVisible(customHTML, 0, true);
      await accordionPo.expectItemContentVisible(customHTML, 1, false);
      await accordionPo.clickOnAccordionGroup(customHTML, 0);
      await accordionPo.expectAccordionItemExpanded(customHTML, 0, false);
    });

    test(`when user click on the second item, it is opened and there is a span with "And some HTML here"
                   after second click on item it is closed`, async({ accordionPo }) => {
      await accordionPo.clickOnAccordionGroup(customHTML, 1);
      await accordionPo.expectAccordionItemExpanded(customHTML, 1, true);
      await accordionPo.expectAccordionItemExpanded(customHTML, 0, false);
      await accordionPo.expectItemContentVisible(customHTML, 1, true);
      await accordionPo.expectItemContentVisible(customHTML, 0, false);
      await accordionPo.expectAccordionItemContainTxt(customHTML, accordionPo.additionalHtml, 1, 'And some HTML here', true);
      await accordionPo.clickOnAccordionGroup(customHTML, 1);
      await accordionPo.expectAccordionItemExpanded(customHTML, 1, false);
    });
  });

  test.describe('Disabled', () => {
    let disabled: string;

    test.beforeEach(async ({ accordionPo }) => {
      disabled = tabSelector + accordionPo.exampleDemosArr.disabled;
      await accordionPo.scrollToMenu('Disabled');
    });

    test(`example contains 3 accordion items, initially not expanded and btn "Enable / Disable first panel"`, async({ accordionPo }) => {
      await accordionPo.expectAccordionGroupCountEqual(disabled, 3);
      await accordionPo.expectAccordionItemExpanded(disabled, 0, false);
      await accordionPo.expectAccordionItemExpanded(disabled, 1, false);
      await accordionPo.expectAccordionItemExpanded(disabled, 2, false);
      await accordionPo.expectItemContentVisible(disabled, 0, false);
      await accordionPo.expectItemContentVisible(disabled, 1, false);
      await accordionPo.expectItemContentVisible(disabled, 2, false);
      await accordionPo.expectBtnTxtEqual(disabled, ' Enable / Disable first panel ');
    });

    test('when user click on "Enable/Disable first panel" button then the first item is not clickable', async({ accordionPo }) => {
      await accordionPo.clickOnBtn(disabled);
      await accordionPo.clickOnAccordionGroup(disabled, 0);
      await accordionPo.expectAccordionItemExpanded(disabled, 0, false);
    });

    test(`when user click on "Enable/Disable first panel" second time
                   and click on first item, then item opened and user see content`, async({ accordionPo }) => {
      await accordionPo.clickOnBtn(disabled);
      await accordionPo.clickOnBtn(disabled);
      await accordionPo.clickOnAccordionGroup(disabled, 0);
      await accordionPo.expectAccordionItemExpanded(disabled, 0, true);
      await accordionPo.expectItemContentVisible(disabled, 0, true);
    });

    test('when user click on "Enable/Disable first panel" third time then the first item is not clickable again', async({ accordionPo }) => {
      await accordionPo.clickOnBtn(disabled);
      await accordionPo.clickOnBtn(disabled);
      await accordionPo.clickOnBtn(disabled);
      await accordionPo.clickOnAccordionGroup(disabled, 0);
      await accordionPo.expectAccordionItemExpanded(disabled, 0, false);
      await accordionPo.expectItemContentVisible(disabled, 0, false);
    });

    test('when user click on 2d and 3d item, they open and content inside shown', async({ accordionPo }) => {
      await accordionPo.clickOnAccordionGroup(disabled, 1);
      await accordionPo.clickOnAccordionGroup(disabled, 2);
      await accordionPo.expectAccordionItemExpanded(disabled, 1, true);
      await accordionPo.expectAccordionItemExpanded(disabled, 2, true);
      await accordionPo.expectItemContentVisible(disabled, 1, true);
      await accordionPo.expectItemContentVisible(disabled, 2, true);
    });
  });

  test.describe('Initially opened', () => {
    let initiallyOpened: string;

    test.beforeEach(async ({ accordionPo }) => {
      initiallyOpened = tabSelector + accordionPo.exampleDemosArr.initiallyOpened;
      await accordionPo.scrollToMenu('Initially opened');
    });

    test(`example contains 3 accordion items, 2d initially expanded, other - not`, async({ accordionPo }) => {
      await accordionPo.expectAccordionGroupCountEqual(initiallyOpened, 3);
      await accordionPo.expectAccordionItemExpanded(initiallyOpened, 0, false);
      await accordionPo.expectAccordionItemExpanded(initiallyOpened, 1, true);
      await accordionPo.expectAccordionItemExpanded(initiallyOpened, 2, false);
      await accordionPo.expectItemContentVisible(initiallyOpened, 0, false);
      await accordionPo.expectItemContentVisible(initiallyOpened, 1, true);
      await accordionPo.expectItemContentVisible(initiallyOpened, 2, false);
    });

    test('when user click on 2d item, it should be closed', async({ accordionPo }) => {
      await accordionPo.clickOnAccordionGroup(initiallyOpened, 1);
      await accordionPo.expectAccordionItemExpanded(initiallyOpened, 1, false);
      await accordionPo.expectItemContentVisible(initiallyOpened, 1, false);
    });

    test('when user click on 1t or 3d item, it should be opened', async({ accordionPo }) => {
      await accordionPo.clickOnAccordionGroup(initiallyOpened, 0);
      await accordionPo.clickOnAccordionGroup(initiallyOpened, 2);
      await accordionPo.expectAccordionItemExpanded(initiallyOpened, 0, true);
      await accordionPo.expectAccordionItemExpanded(initiallyOpened, 2, true);
      await accordionPo.expectItemContentVisible(initiallyOpened, 0, true);
      await accordionPo.expectItemContentVisible(initiallyOpened, 2, true);
    });

    test('when user click on 2d item, it should be closed, after reload page, it become expanded', async({ accordionPo, page }) => {
      await accordionPo.clickOnAccordionGroup(initiallyOpened, 1);
      await accordionPo.expectAccordionItemExpanded(initiallyOpened, 1, false);
      await accordionPo.expectItemContentVisible(initiallyOpened, 1, false);
      await page.reload();
      await accordionPo.expectAccordionItemExpanded(initiallyOpened, 1, true);
      await accordionPo.expectItemContentVisible(initiallyOpened, 1, true);
    });
  });

  test.describe('Dynamic accordion', () => {
    let dynamicAccordion: string;

    test.beforeEach(async ({ accordionPo }) => {
      dynamicAccordion = tabSelector + accordionPo.exampleDemosArr.dynamicAccordion;
      await accordionPo.scrollToMenu('Dynamic accordion');
    });

    test(`example contains 2 accordion items, initially not expanded and button "Add Group Item"`, async({ accordionPo }) => {
      await accordionPo.expectAccordionGroupCountEqual(dynamicAccordion, 2);
      await accordionPo.expectAccordionItemExpanded(dynamicAccordion, 0, false);
      await accordionPo.expectAccordionItemExpanded(dynamicAccordion, 1, false);
      await accordionPo.expectItemContentVisible(dynamicAccordion, 0, false);
      await accordionPo.expectItemContentVisible(dynamicAccordion, 1, false);
      await accordionPo.expectBtnTxtEqual(dynamicAccordion, ' Add Group Item ');
    });

    test(`when user click on each item, it opens and content inside shown`, async({ accordionPo }) => {
      await accordionPo.clickOnAccordionGroup(dynamicAccordion, 0);
      await accordionPo.clickOnAccordionGroup(dynamicAccordion, 1);
      await accordionPo.expectAccordionItemExpanded(dynamicAccordion, 0, true);
      await accordionPo.expectAccordionItemExpanded(dynamicAccordion, 1, true);
      await accordionPo.expectItemContentVisible(dynamicAccordion, 0, true);
      await accordionPo.expectItemContentVisible(dynamicAccordion, 1, true);
    });

    test(`when user click on "Add Group Item" button then new item added,
                   when user click on just added new item, then shown content inside`, async({ accordionPo }) => {
      await accordionPo.clickOnBtn(dynamicAccordion);
      await accordionPo.expectAccordionGroupCountEqual(dynamicAccordion, 3);
      await accordionPo.expectAccordionItemExpanded(dynamicAccordion, 2, false);
      await accordionPo.expectItemContentVisible(dynamicAccordion, 2, false);
      await accordionPo.clickOnAccordionGroup(dynamicAccordion, 2);
      await accordionPo.expectAccordionItemExpanded(dynamicAccordion, 2, true);
      await accordionPo.expectItemContentVisible(dynamicAccordion, 2, true);
    });

    test(`when user click on "Add Group Item" N times, the amount of items increased on N
                   when user reload page, amount of items in Accordion dynamic block should be 2`, async({ accordionPo, page }) => {
      await accordionPo.clickOnBtn(dynamicAccordion);
      await accordionPo.clickOnBtn(dynamicAccordion);
      await accordionPo.clickOnBtn(dynamicAccordion);
      await accordionPo.clickOnBtn(dynamicAccordion);
      await accordionPo.expectAccordionGroupCountEqual(dynamicAccordion, 6);
      await page.reload();
      await accordionPo.expectAccordionGroupCountEqual(dynamicAccordion, 2);
    });
  });

  test.describe('Dynamic body content', () => {
    let dynamicBody: string;
    const itemBody = '.panel-body';

    test.beforeEach(async ({ accordionPo }) => {
      dynamicBody = tabSelector + accordionPo.exampleDemosArr.dynamicBody;
      await accordionPo.scrollToMenu('Dynamic body content');
    });

    test(`example contains 3 accordion items, initially not expanded`, async({ accordionPo }) => {
      await accordionPo.expectAccordionGroupCountEqual(dynamicBody, 3);
      await accordionPo.expectAccordionItemExpanded(dynamicBody, 0, false);
      await accordionPo.expectAccordionItemExpanded(dynamicBody, 1, false);
      await accordionPo.expectAccordionItemExpanded(dynamicBody, 2, false);
      await accordionPo.expectItemContentVisible(dynamicBody, 0, false);
      await accordionPo.expectItemContentVisible(dynamicBody, 1, false);
      await accordionPo.expectItemContentVisible(dynamicBody, 2, false);
    });

    test(`when user click on 1st item, then user see "Add Item" button, there is 3 div-blocks`, async({ accordionPo }) => {
      await accordionPo.clickOnAccordionGroup(dynamicBody, 0);
      await accordionPo.expectAccordionItemExpanded(dynamicBody, 0, true);
      await accordionPo.expectItemContentVisible(dynamicBody, 0, true);
      await accordionPo.expectBtnExist(dynamicBody, 'Add Item ', 1);
      await accordionPo.expectAccordionItemContainTxt(dynamicBody, '.panel-body', 0, 'Item 1Item 2Item 3', true);
    });

    test(`when user click on "Add Item" button, amount of div-blocks inside should be increased to 4,
                   when click on "Add Item" again, amount of div-blocks inside should be increased to 5`, async({ accordionPo }) => {
      await accordionPo.clickOnAccordionGroup(dynamicBody, 0);
      await accordionPo.clickOnBtn(dynamicBody, 1);
      await accordionPo.expectAccordionItemContainTxt(dynamicBody, itemBody, 0, 'Item 1Item 2Item 3Item 4', true);
      await accordionPo.clickOnBtn(dynamicBody, 1);
      await accordionPo.expectAccordionItemContainTxt(dynamicBody, itemBody, 0, 'Item 1Item 2Item 3Item 4Item 5', true);
      await accordionPo.clickOnBtn(dynamicBody, 1);
      await accordionPo.expectAccordionItemContainTxt(dynamicBody, itemBody, 0, 'Item 1Item 2Item 3Item 4Item 5Item 6', true);
    });

    test(`when user click on "Add Item" button a few times, and then reload page,
                   then amount of items should back to default (3 items and 3 div-blocks inside first item)`, async({ accordionPo, page }) => {
      await accordionPo.clickOnAccordionGroup(dynamicBody, 0);
      await accordionPo.clickOnBtn(dynamicBody, 1);
      await accordionPo.clickOnBtn(dynamicBody, 1);
      await accordionPo.expectAccordionItemExpanded(dynamicBody, 0, true);
      await accordionPo.expectAccordionItemContainTxt(dynamicBody, itemBody, 0, 'Item 1Item 2Item 3Item 4Item 5', true);
      await page.reload();
      await accordionPo.expectAccordionItemExpanded(dynamicBody, 0, false);
      await accordionPo.clickOnAccordionGroup(dynamicBody, 0);
      await accordionPo.expectAccordionItemExpanded(dynamicBody, 0, true);
      await accordionPo.expectAccordionItemContainTxt(dynamicBody, itemBody, 0, 'Item 1Item 2Item 3', true);
    });
  });

  test.describe('Manual toggle', () => {
    let manualToggle: string;

    test.beforeEach(async ({ accordionPo }) => {
      manualToggle = tabSelector + accordionPo.exampleDemosArr.manualToggle;
      await accordionPo.scrollToMenu('Manual toggle');
    });

    test(`example contains 3 accordion items, only 3d initially expanded and 1 button "Toggle last panel"`, async({ accordionPo }) => {
      await accordionPo.expectAccordionGroupCountEqual(manualToggle, 3);
      await accordionPo.expectAccordionItemExpanded(manualToggle, 0, false);
      await accordionPo.expectAccordionItemExpanded(manualToggle, 1, false);
      await accordionPo.expectAccordionItemExpanded(manualToggle, 2, true);
      await accordionPo.expectItemContentVisible(manualToggle, 0, false);
      await accordionPo.expectItemContentVisible(manualToggle, 1, false);
      await accordionPo.expectItemContentVisible(manualToggle, 2, true);
      await accordionPo.expectBtnTxtEqual(manualToggle, 'Toggle last panel ');
    });

    test('when user click on "Toggle last panel" button, then last item closed and user see content inside', async({ accordionPo }) => {
      await accordionPo.clickOnBtn(manualToggle);
      await accordionPo.expectAccordionItemExpanded(manualToggle, 2, false);
      await accordionPo.expectItemContentVisible(manualToggle, 2, false);
    });

    test('when user click on "Toggle last panel" button second time, then last item opened again', async({ accordionPo }) => {
      await accordionPo.clickOnBtn(manualToggle);
      await accordionPo.clickOnBtn(manualToggle);
      await accordionPo.expectAccordionItemExpanded(manualToggle, 2, true);
      await accordionPo.expectItemContentVisible(manualToggle, 2, true);
    });
  });

  test.describe('Open only one at a time', () => {
    let oneAtATime: string;

    test.beforeEach(async ({ accordionPo }) => {
      oneAtATime = tabSelector + accordionPo.exampleDemosArr.oneAtATime;
      await accordionPo.scrollToMenu('Open only one at a time');
    });

    test(`example contains 3 accordion items, initially not expanded and 1 checkbox "Open only one at a time"`, async({ accordionPo }) => {
      await accordionPo.expectAccordionGroupCountEqual(oneAtATime, 3);
      await accordionPo.expectAccordionItemExpanded(oneAtATime, 0, false);
      await accordionPo.expectAccordionItemExpanded(oneAtATime, 1, false);
      await accordionPo.expectAccordionItemExpanded(oneAtATime, 2, false);
      await accordionPo.expectItemContentVisible(oneAtATime, 0, false);
      await accordionPo.expectItemContentVisible(oneAtATime, 1, false);
      await accordionPo.expectItemContentVisible(oneAtATime, 2, false);
      await accordionPo.expectLabelTxtEqual(oneAtATime, ' Open only one at a time ');
    });

    test(`when user click on 1st item, it opened, when user click on 2d item, it opened and 1st is closed
                   when user click on 3d item, it opened and 2d is closed`, async({ accordionPo }) => {
      await accordionPo.clickOnAccordionGroup(oneAtATime, 0);
      await accordionPo.expectAccordionItemExpanded(oneAtATime, 0, true);
      await accordionPo.expectAccordionItemExpanded(oneAtATime, 1, false);
      await accordionPo.expectAccordionItemExpanded(oneAtATime, 2, false);
      await accordionPo.clickOnAccordionGroup(oneAtATime, 1);
      await accordionPo.expectItemContentVisible(oneAtATime, 0, false);
      await accordionPo.expectItemContentVisible(oneAtATime, 1, true);
      await accordionPo.expectItemContentVisible(oneAtATime, 2, false);
      await accordionPo.clickOnAccordionGroup(oneAtATime, 2);
      await accordionPo.expectItemContentVisible(oneAtATime, 0, false);
      await accordionPo.expectItemContentVisible(oneAtATime, 1, false);
      await accordionPo.expectItemContentVisible(oneAtATime, 2, true);
    });

    test(`when user uncheck the check-box, then after click on each item, it stay opened`, async({ accordionPo }) => {
      await accordionPo.setCheckboxState(oneAtATime, false);
      await accordionPo.clickOnAccordionGroup(oneAtATime, 0);
      await accordionPo.clickOnAccordionGroup(oneAtATime, 1);
      await accordionPo.clickOnAccordionGroup(oneAtATime, 2);
      await accordionPo.expectAccordionItemExpanded(oneAtATime, 0, true);
      await accordionPo.expectAccordionItemExpanded(oneAtATime, 1, true);
      await accordionPo.expectAccordionItemExpanded(oneAtATime, 2, true);
    });
  });

  test.describe('Styling', () => {
    let styling: string;

    test.beforeEach(async ({ accordionPo }) => {
      styling = tabSelector + accordionPo.exampleDemosArr.styling;
      await accordionPo.scrollToMenu('Styling');
    });

    test(`example contains 3 accordion items, only 1st initially expanded`, async({ accordionPo }) => {
      await accordionPo.expectAccordionGroupCountEqual(styling, 3);
      await accordionPo.expectAccordionItemExpanded(styling, 0, true);
      await accordionPo.expectAccordionItemExpanded(styling, 1, false);
      await accordionPo.expectAccordionItemExpanded(styling, 2, false);
      await accordionPo.expectItemContentVisible(styling, 0, true);
      await accordionPo.expectItemContentVisible(styling, 1, false);
      await accordionPo.expectItemContentVisible(styling, 2, false);
    });

    test(`styles for the 1st and 3d items and it content should be the same (from the customClass styles)
                   styling for the 2d item and content should be default`, async({ accordionPo }) => {
      const colors = [
        'rgb(91, 192, 222)', // light blue (malibu)
        'rgb(255, 255, 255)', // white
        'rgb(51, 122, 167)', // dark blue (lochmara)
        'rgb(33, 37, 41)', // grey
        'rgba(0, 0, 0, 0)' // black
      ];
      await accordionPo.expectAccordionItemHaveCorrectStyle(styling, 0, colors[0], colors[1]);
      await accordionPo.expectAccordionBodyHaveCorrectStyle(styling, 0, colors[2], colors[1]);
      await accordionPo.expectAccordionItemHaveCorrectStyle(styling, 2, colors[0], colors[1]);
      await accordionPo.expectAccordionBodyHaveCorrectStyle(styling, 2, colors[2], colors[1]);
      await accordionPo.expectAccordionItemHaveCorrectStyle(styling, 1, colors[1], colors[3]);
      await accordionPo.expectAccordionBodyHaveCorrectStyle(styling, 1, colors[4], colors[3]);
    });
  });

  test.describe('Configuring defaults', () => {
    let configDefaults: string;

    test.beforeEach(async ({ accordionPo, page }) => {
      configDefaults = accordionPo.exampleDemosArr.config;
      await page.setViewportSize({ width: 1440, height: 900 });
      await accordionPo.scrollToMenu('Configuring defaults');
    });

    test(`example contains 3 accordion items, initially not expanded
                   src of component contains info how to override AccordionConfig`, async({ accordionPo }) => {
      await accordionPo.expectAccordionGroupCountEqual(configDefaults, 3);
      await accordionPo.expectAccordionItemExpanded(configDefaults, 0, false);
      await accordionPo.expectAccordionItemExpanded(configDefaults, 1, false);
      await accordionPo.expectAccordionItemExpanded(configDefaults, 2, false);
      await accordionPo.expectItemContentVisible(configDefaults, 0, false);
      await accordionPo.expectItemContentVisible(configDefaults, 1, false);
      await accordionPo.expectItemContentVisible(configDefaults, 2, false);
      await accordionPo.expectComponentSrcContain('Configuring defaults', 'provide: AccordionConfig');
      await accordionPo.expectComponentSrcContain('Configuring defaults', 'closeOthers: true');
    });

    test(`when user click on 1st item, it opened, when user click on 2d item, it opened and 1st is closed
                   when user click on 3d item, it opened and 2d is closed`, async({ accordionPo }) => {
      await accordionPo.clickOnAccordionGroup(configDefaults, 0);
      await accordionPo.expectAccordionItemExpanded(configDefaults, 0, true);
      await accordionPo.expectAccordionItemExpanded(configDefaults, 1, false);
      await accordionPo.expectAccordionItemExpanded(configDefaults, 2, false);
      await accordionPo.clickOnAccordionGroup(configDefaults, 1);
      await accordionPo.expectItemContentVisible(configDefaults, 0, false);
      await accordionPo.expectItemContentVisible(configDefaults, 1, true);
      await accordionPo.expectItemContentVisible(configDefaults, 2, false);
      await accordionPo.clickOnAccordionGroup(configDefaults, 2);
      await accordionPo.expectItemContentVisible(configDefaults, 0, false);
      await accordionPo.expectItemContentVisible(configDefaults, 1, false);
      await accordionPo.expectItemContentVisible(configDefaults, 2, true);
    });
  });
});
