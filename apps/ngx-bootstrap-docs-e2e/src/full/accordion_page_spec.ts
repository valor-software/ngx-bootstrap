import { AccordionPo } from '../support/accordion.po';

describe('Accordion page testing suite', () => {
  const accordion = new AccordionPo();

  beforeEach(() => accordion.navigateTo());

  describe('Group opening event', () => {
    const groupOpenEvent = accordion.exampleDemosArr.openEvent;

    beforeEach(() => accordion.scrollToMenu('Group opening event'));

    it(`example contains 3 accordion items, initially not expanded`, () => {
      accordion.isAccordionLengthEqual(groupOpenEvent, 3);
      accordion.isAccordionItemExpanded(groupOpenEvent, 0, false);
      accordion.isAccordionItemExpanded(groupOpenEvent, 1, false);
      accordion.isAccordionItemExpanded(groupOpenEvent, 2, false);
      accordion.isItemContentVisible(groupOpenEvent, 0, false);
      accordion.isItemContentVisible(groupOpenEvent, 1, false);
      accordion.isItemContentVisible(groupOpenEvent, 2, false);
    });

    it(`when user click on item without event listener, item opened, in the browser console - nothing happens
                   after click on item again, it closes and in the browser console - nothing happens`, () => {
      accordion.createBrowserLogSpy().then(consoleSpy => {
        accordion.clickOnAccordionGroup(groupOpenEvent, 0);
        accordion.isAccordionItemExpanded(groupOpenEvent, 0, true);
        accordion.isItemContentVisible(groupOpenEvent, 0, true);
        accordion.isConsoleLogCalled(consoleSpy, false);
        accordion.clickOnAccordionGroup(groupOpenEvent, 0);
        accordion.isAccordionItemExpanded(groupOpenEvent, 0, false);
        accordion.isItemContentVisible(groupOpenEvent, 0, false);
        accordion.isConsoleLogCalled(consoleSpy, false);
      });
    });

    it(`when user click on item with event listener, it opens and in the console - "Accordion has been opened"`, () => {
      const openLog = 'Accordion has been opened';
      accordion.createBrowserLogSpy().then(consoleSpy => {
        accordion.isConsoleLogCalled(consoleSpy, false);
        accordion.clickOnAccordionGroup(groupOpenEvent, 1);
        accordion.isAccordionItemExpanded(groupOpenEvent, 1, true);
        accordion.isItemContentVisible(groupOpenEvent, 1, true);
        accordion.isConsoleLogCalled(consoleSpy, true, openLog);
      });
    });

    it(`when user click on item again, it closes and in the console - "Accordion has been closed"`, () => {
      const closeLog = 'Accordion has been closed';
      accordion.clickOnAccordionGroup(groupOpenEvent, 1);
      accordion.isAccordionItemExpanded(groupOpenEvent, 1, true);
      accordion.isItemContentVisible(groupOpenEvent, 1, true);
      accordion.createBrowserLogSpy().then(consoleSpy => {
        accordion.clickOnAccordionGroup(groupOpenEvent, 1);
        accordion.isAccordionItemExpanded(groupOpenEvent, 1, false);
        accordion.isItemContentVisible(groupOpenEvent, 1, false);
        accordion.isConsoleLogCalled(consoleSpy, true, closeLog);
      });
    });
  });

  describe('Custom HTML', () => {
    const customHTML = accordion.exampleDemosArr.customHtml;

    beforeEach(() => accordion.scrollToMenu('Custom HTML'));

    it(`example contains 2 accordion items, initially not expanded, 1st have span with "Some HTML here" text,
                   second item don't have any additional html with closed state`, () => {
      accordion.isAccordionLengthEqual(customHTML, 2);
      accordion.isAccordionItemExpanded(customHTML, 0, false);
      accordion.isAccordionItemExpanded(customHTML, 1, false);
      accordion.isItemContentVisible(customHTML, 0, false);
      accordion.isItemContentVisible(customHTML, 1, false);
      accordion.isAccordionItemContain(customHTML, accordion.additionalHtml, 0, 'Some HTML here', true);
      accordion.isAccordionItemContain(customHTML, accordion.additionalHtml, 1, 'And some HTML here', false);
    });

    it(`when user click on the first item, it is opened and content shown
                   after second click on item it is closed`, () => {
      accordion.clickOnAccordionGroup(customHTML, 0);
      accordion.isAccordionItemExpanded(customHTML, 0, true);
      accordion.isAccordionItemExpanded(customHTML, 1, false);
      accordion.isItemContentVisible(customHTML, 0, true);
      accordion.isItemContentVisible(customHTML, 1, false);
      accordion.clickOnAccordionGroup(customHTML, 0);
      accordion.isAccordionItemExpanded(customHTML, 0, false);
    });

    it(`when user click on the second item, it is opened and there is a span with "And some HTML here"
                   after second click on item it is closed`, () => {
      accordion.clickOnAccordionGroup(customHTML, 1);
      accordion.isAccordionItemExpanded(customHTML, 1, true);
      accordion.isAccordionItemExpanded(customHTML, 0, false);
      accordion.isItemContentVisible(customHTML, 1, true);
      accordion.isItemContentVisible(customHTML, 0, false);
      accordion.isAccordionItemContain(customHTML, accordion.additionalHtml, 1, 'And some HTML here', true);
      accordion.clickOnAccordionGroup(customHTML, 1);
      accordion.isAccordionItemExpanded(customHTML, 1, false);
    });
  });

  describe('Disabled', () => {
    const disabled = accordion.exampleDemosArr.disabled;

    beforeEach(() => accordion.scrollToMenu('Disabled'));

    it(`example contains 3 accordion items, initially not expanded and btn "Enable / Disable first panel"`, () => {
      accordion.isAccordionLengthEqual(disabled, 3);
      accordion.isAccordionItemExpanded(disabled, 0, false);
      accordion.isAccordionItemExpanded(disabled, 1, false);
      accordion.isAccordionItemExpanded(disabled, 2, false);
      accordion.isItemContentVisible(disabled, 0, false);
      accordion.isItemContentVisible(disabled, 1, false);
      accordion.isItemContentVisible(disabled, 2, false);
      accordion.isBtnTxtEqual(disabled, ' Enable / Disable first panel ');
    });

    it('when user click on "Enable/Disable first panel" button then the first item is not clickable', () => {
      accordion.clickOnBtn(disabled);
      accordion.clickOnAccordionGroup(disabled, 0);
      accordion.isAccordionItemExpanded(disabled, 0, false);
    });

    it(`when user click on "Enable/Disable first panel" second time
                   and click on first item, then item opened and user see content`, () => {
      accordion.clickOnBtn(disabled);
      accordion.clickOnBtn(disabled);
      accordion.clickOnAccordionGroup(disabled, 0);
      accordion.isAccordionItemExpanded(disabled, 0, true);
      accordion.isItemContentVisible(disabled, 0, true);
    });

    it('when user click on "Enable/Disable first panel" third time then the first item is not clickable again', () => {
      accordion.clickOnBtn(disabled);
      accordion.clickOnBtn(disabled);
      accordion.clickOnBtn(disabled);
      accordion.clickOnAccordionGroup(disabled, 0);
      accordion.isAccordionItemExpanded(disabled, 0, false);
      accordion.isItemContentVisible(disabled, 0, false);
    });

    it('when user click on 2d and 3d item, they open and content inside shown', () => {
      accordion.clickOnAccordionGroup(disabled, 1);
      accordion.clickOnAccordionGroup(disabled, 2);
      accordion.isAccordionItemExpanded(disabled, 1, true);
      accordion.isAccordionItemExpanded(disabled, 2, true);
      accordion.isItemContentVisible(disabled, 1, true);
      accordion.isItemContentVisible(disabled, 2, true);
    });
  });

  describe('Initially opened', () => {
    const initiallyOpened = accordion.exampleDemosArr.initiallyOpened;

    beforeEach(() => accordion.scrollToMenu('Initially opened'));

    it(`example contains 3 accordion items, 2d initially expanded, other - not`, () => {
      accordion.isAccordionLengthEqual(initiallyOpened, 3);
      accordion.isAccordionItemExpanded(initiallyOpened, 0, false);
      accordion.isAccordionItemExpanded(initiallyOpened, 1, true);
      accordion.isAccordionItemExpanded(initiallyOpened, 2, false);
      accordion.isItemContentVisible(initiallyOpened, 0, false);
      accordion.isItemContentVisible(initiallyOpened, 1, true);
      accordion.isItemContentVisible(initiallyOpened, 2, false);
    });

    it('when user click on 2d item, it should be closed', () => {
      accordion.clickOnAccordionGroup(initiallyOpened, 1);
      accordion.isAccordionItemExpanded(initiallyOpened, 1, false);
      accordion.isItemContentVisible(initiallyOpened, 1, false);
    });

    it('when user click on 1t or 3d item, it should be opened', () => {
      accordion.clickOnAccordionGroup(initiallyOpened, 0);
      accordion.clickOnAccordionGroup(initiallyOpened, 2);
      accordion.isAccordionItemExpanded(initiallyOpened, 0, true);
      accordion.isAccordionItemExpanded(initiallyOpened, 2, true);
      accordion.isItemContentVisible(initiallyOpened, 0, true);
      accordion.isItemContentVisible(initiallyOpened, 2, true);
    });

    it('when user click on 2d item, it should be closed, after reload page, it become expanded', () => {
      accordion.clickOnAccordionGroup(initiallyOpened, 1);
      accordion.isAccordionItemExpanded(initiallyOpened, 1, false);
      accordion.isItemContentVisible(initiallyOpened, 1, false);
      cy.reload();
      accordion.isAccordionItemExpanded(initiallyOpened, 1, true);
      accordion.isItemContentVisible(initiallyOpened, 1, true);
    });
  });

  describe('Dynamic accordion', () => {
    const dynamicAccordion = accordion.exampleDemosArr.dynamicAccordion;

    beforeEach(() => accordion.scrollToMenu('Dynamic accordion'));

    it(`example contains 2 accordion items, initially not expanded and button "Add Group Item"`, () => {
      accordion.isAccordionLengthEqual(dynamicAccordion, 2);
      accordion.isAccordionItemExpanded(dynamicAccordion, 0, false);
      accordion.isAccordionItemExpanded(dynamicAccordion, 1, false);
      accordion.isItemContentVisible(dynamicAccordion, 0, false);
      accordion.isItemContentVisible(dynamicAccordion, 1, false);
      accordion.isBtnTxtEqual(dynamicAccordion, ' Add Group Item ');
    });

    it(`when user click on each item, it opens and content inside shown`, () => {
      accordion.clickOnAccordionGroup(dynamicAccordion, 0);
      accordion.clickOnAccordionGroup(dynamicAccordion, 1);
      accordion.isAccordionItemExpanded(dynamicAccordion, 0, true);
      accordion.isAccordionItemExpanded(dynamicAccordion, 1, true);
      accordion.isItemContentVisible(dynamicAccordion, 0, true);
      accordion.isItemContentVisible(dynamicAccordion, 1, true);
    });

    it(`when user click on "Add Group Item" button then new item added,
                   when user click on just added new item, then shown content inside`, () => {
      accordion.clickOnBtn(dynamicAccordion);
      accordion.isAccordionLengthEqual(dynamicAccordion, 3);
      accordion.isAccordionItemExpanded(dynamicAccordion, 2, false);
      accordion.isItemContentVisible(dynamicAccordion, 2, false);
      accordion.clickOnAccordionGroup(dynamicAccordion, 2);
      accordion.isAccordionItemExpanded(dynamicAccordion, 2, true);
      accordion.isItemContentVisible(dynamicAccordion, 2, true);
    });

    it(`when user click on "Add Group Item" N times, the amount of items increased on N
                   when user reload page, amount of items in Accordion dynamic block should be 2`, () => {
      accordion.clickOnBtn(dynamicAccordion);
      accordion.clickOnBtn(dynamicAccordion);
      accordion.clickOnBtn(dynamicAccordion);
      accordion.clickOnBtn(dynamicAccordion);
      accordion.isAccordionLengthEqual(dynamicAccordion, 6);
      cy.reload();
      accordion.isAccordionLengthEqual(dynamicAccordion, 2);
    });
  });

  describe('Dynamic body content', () => {
    const dynamicBody = accordion.exampleDemosArr.dynamicBody;
    const itemBody = '.panel-body';

    beforeEach(() => accordion.scrollToMenu('Dynamic body content'));

    it(`example contains 3 accordion items, initially not expanded`, () => {
      accordion.isAccordionLengthEqual(dynamicBody, 3);
      accordion.isAccordionItemExpanded(dynamicBody, 0, false);
      accordion.isAccordionItemExpanded(dynamicBody, 1, false);
      accordion.isAccordionItemExpanded(dynamicBody, 2, false);
      accordion.isItemContentVisible(dynamicBody, 0, false);
      accordion.isItemContentVisible(dynamicBody, 1, false);
      accordion.isItemContentVisible(dynamicBody, 2, false);
    });

    it(`when user click on 1st item, then user see "Add Item" button, there is 3 div-blocks`, () => {
      accordion.clickOnAccordionGroup(dynamicBody, 0);
      accordion.isAccordionItemExpanded(dynamicBody, 0, true);
      accordion.isItemContentVisible(dynamicBody, 0, true);
      accordion.isButtonExist(dynamicBody, 'Add Item ', 1);
      accordion.isAccordionItemContain(dynamicBody, '.panel-body', 0, 'Item 1Item 2Item 3', true);
    });

    it(`when user click on "Add Item" button, amount of div-blocks inside should be increased to 4,
                   when click on "Add Item" again, amount of div-blocks inside should be increased to 5`, () => {
      accordion.clickOnAccordionGroup(dynamicBody, 0);
      accordion.clickOnBtn(dynamicBody, 1);
      accordion.isAccordionItemContain(dynamicBody, itemBody, 0, 'Item 1Item 2Item 3Item 4', true);
      accordion.clickOnBtn(dynamicBody, 1);
      accordion.isAccordionItemContain(dynamicBody, itemBody, 0, 'Item 1Item 2Item 3Item 4Item 5', true);
      accordion.clickOnBtn(dynamicBody, 1);
      accordion.isAccordionItemContain(dynamicBody, itemBody, 0, 'Item 1Item 2Item 3Item 4Item 5Item 6', true);
    });

    it(`when user click on "Add Item" button a few times, and then reload page,
                   then amount of items should back to default (3 items and 3 div-blocks inside first item)`, () => {
      accordion.clickOnAccordionGroup(dynamicBody, 0);
      accordion.clickOnBtn(dynamicBody, 1);
      accordion.clickOnBtn(dynamicBody, 1);
      accordion.isAccordionItemExpanded(dynamicBody, 0, true);
      accordion.isAccordionItemContain(dynamicBody, itemBody, 0, 'Item 1Item 2Item 3Item 4Item 5', true);
      cy.reload();
      accordion.isAccordionItemExpanded(dynamicBody, 0, false);
      accordion.clickOnAccordionGroup(dynamicBody, 0);
      accordion.isAccordionItemExpanded(dynamicBody, 0, true);
      accordion.isAccordionItemContain(dynamicBody, itemBody, 0, 'Item 1Item 2Item 3', true);
    });
  });

  describe('Manual toggle', () => {
    const manualToggle = accordion.exampleDemosArr.manualToggle;

    beforeEach(() => accordion.scrollToMenu('Manual toggle'));

    it(`example contains 3 accordion items, only 3d initially expanded and 1 button "Toggle last panel"`, () => {
      accordion.isAccordionLengthEqual(manualToggle, 3);
      accordion.isAccordionItemExpanded(manualToggle, 0, false);
      accordion.isAccordionItemExpanded(manualToggle, 1, false);
      accordion.isAccordionItemExpanded(manualToggle, 2, true);
      accordion.isItemContentVisible(manualToggle, 0, false);
      accordion.isItemContentVisible(manualToggle, 1, false);
      accordion.isItemContentVisible(manualToggle, 2, true);
      accordion.isBtnTxtEqual(manualToggle, 'Toggle last panel ');
    });

    it('when user click on "Toggle last panel" button, then last item closed and user see content inside', () => {
      accordion.clickOnBtn(manualToggle);
      accordion.isAccordionItemExpanded(manualToggle, 2, false);
      accordion.isItemContentVisible(manualToggle, 2, false);
    });

    it('when user click on "Toggle last panel" button second time, then last item opened again', () => {
      accordion.clickOnBtn(manualToggle);
      accordion.clickOnBtn(manualToggle);
      accordion.isAccordionItemExpanded(manualToggle, 2, true);
      accordion.isItemContentVisible(manualToggle, 2, true);
    });
  });

  describe('Open only one at a time', () => {
    const oneAtATime = accordion.exampleDemosArr.oneAtATime;

    beforeEach(() => accordion.scrollToMenu('Open only one at a time'));

    it(`example contains 3 accordion items, initially not expanded and 1 checkbox "Open only one at a time"`, () => {
      accordion.isAccordionLengthEqual(oneAtATime, 3);
      accordion.isAccordionItemExpanded(oneAtATime, 0, false);
      accordion.isAccordionItemExpanded(oneAtATime, 1, false);
      accordion.isAccordionItemExpanded(oneAtATime, 2, false);
      accordion.isItemContentVisible(oneAtATime, 0, false);
      accordion.isItemContentVisible(oneAtATime, 1, false);
      accordion.isItemContentVisible(oneAtATime, 2, false);
      accordion.isLabelTxtEqual(oneAtATime, ' Open only one at a time ');
    });

    it(`when user click on 1st item, it opened, when user click on 2d item, it opened and 1st is closed
                   when user click on 3d item, it opened and 2d is closed`, () => {
      accordion.clickOnAccordionGroup(oneAtATime, 0);
      accordion.isAccordionItemExpanded(oneAtATime, 0, true);
      accordion.isAccordionItemExpanded(oneAtATime, 1, false);
      accordion.isAccordionItemExpanded(oneAtATime, 2, false);
      accordion.clickOnAccordionGroup(oneAtATime, 1);
      accordion.isItemContentVisible(oneAtATime, 0, false);
      accordion.isItemContentVisible(oneAtATime, 1, true);
      accordion.isItemContentVisible(oneAtATime, 2, false);
      accordion.clickOnAccordionGroup(oneAtATime, 2);
      accordion.isItemContentVisible(oneAtATime, 0, false);
      accordion.isItemContentVisible(oneAtATime, 1, false);
      accordion.isItemContentVisible(oneAtATime, 2, true);
    });

    it(`when user uncheck the check-box, then after click on each item, it stay opened`, () => {
      accordion.clickCheckbox(oneAtATime, false);
      accordion.clickOnAccordionGroup(oneAtATime, 0);
      accordion.clickOnAccordionGroup(oneAtATime, 1);
      accordion.clickOnAccordionGroup(oneAtATime, 2);
      accordion.isAccordionItemExpanded(oneAtATime, 0, true);
      accordion.isAccordionItemExpanded(oneAtATime, 1, true);
      accordion.isAccordionItemExpanded(oneAtATime, 2, true);
    });
  });

  describe('Styling', () => {
    const styling = accordion.exampleDemosArr.styling;

    beforeEach(() => accordion.scrollToMenu('Styling'));

    it(`example contains 3 accordion items, only 1st initially expanded`, () => {
      accordion.isAccordionLengthEqual(styling, 3);
      accordion.isAccordionItemExpanded(styling, 0, true);
      accordion.isAccordionItemExpanded(styling, 1, false);
      accordion.isAccordionItemExpanded(styling, 2, false);
      accordion.isItemContentVisible(styling, 0, true);
      accordion.isItemContentVisible(styling, 1, false);
      accordion.isItemContentVisible(styling, 2, false);
    });

    it(`styles for the 1st and 3d items and it content should be the same (from the customClass styles)
                   styling for the 2d item and content should be default`, () => {
      const colors = [
        'rgb(91, 192, 222)', // light blue (malibu)
        'rgb(255, 255, 255)', // white
        'rgb(51, 122, 167)', // dark blue (lochmara)
        'rgb(33, 37, 41)', // grey
        'rgba(0, 0, 0, 0)' // black
      ];
      accordion.isAccordionItemHaveCorrectStyle(styling, 0, colors[0], colors[1]);
      accordion.isAccordionBodyHaveCorrectStyle(styling, 0, colors[2], colors[1]);
      accordion.isAccordionItemHaveCorrectStyle(styling, 2, colors[0], colors[1]);
      accordion.isAccordionBodyHaveCorrectStyle(styling, 2, colors[2], colors[1]);
      accordion.isAccordionItemHaveCorrectStyle(styling, 1, colors[1], colors[3]);
      accordion.isAccordionBodyHaveCorrectStyle(styling, 1, colors[4], colors[3]);
    });
  });

  describe('Configuring defaults', () => {
    const configDefaults = accordion.exampleDemosArr.config;

    beforeEach(() => {
      cy.viewport(1440, 900);
      accordion.clickOnDemoMenu('Configuring defaults');
    });

    it(`example contains 3 accordion items, initially not expanded
                   src of component contains info how to override AccordionConfig`, () => {
      accordion.isAccordionLengthEqual(configDefaults, 3);
      accordion.isAccordionItemExpanded(configDefaults, 0, false);
      accordion.isAccordionItemExpanded(configDefaults, 1, false);
      accordion.isAccordionItemExpanded(configDefaults, 2, false);
      accordion.isItemContentVisible(configDefaults, 0, false);
      accordion.isItemContentVisible(configDefaults, 1, false);
      accordion.isItemContentVisible(configDefaults, 2, false);
      accordion.isComponentSrcContain('Configuring defaults', 'provide: AccordionConfig');
      accordion.isComponentSrcContain('Configuring defaults', 'closeOthers: true');
    });

    it(`when user click on 1st item, it opened, when user click on 2d item, it opened and 1st is closed
                   when user click on 3d item, it opened and 2d is closed`, () => {
      accordion.clickOnAccordionGroup(configDefaults, 0);
      accordion.isAccordionItemExpanded(configDefaults, 0, true);
      accordion.isAccordionItemExpanded(configDefaults, 1, false);
      accordion.isAccordionItemExpanded(configDefaults, 2, false);
      accordion.clickOnAccordionGroup(configDefaults, 1);
      accordion.isItemContentVisible(configDefaults, 0, false);
      accordion.isItemContentVisible(configDefaults, 1, true);
      accordion.isItemContentVisible(configDefaults, 2, false);
      accordion.clickOnAccordionGroup(configDefaults, 2);
      accordion.isItemContentVisible(configDefaults, 0, false);
      accordion.isItemContentVisible(configDefaults, 1, false);
      accordion.isItemContentVisible(configDefaults, 2, true);
    });
  });
});
