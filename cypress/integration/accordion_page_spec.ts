import { AccordionPo } from '../support/accordion.po';

describe('Accordion page testing suite', () => {
  const accordion = new AccordionPo();

  beforeEach(() => accordion.navigateTo());

  describe('Basic accordion', () => {
    const basic = accordion.exampleDemosArr.basic;

    it('example contains 4 accordion items, initially not expanded', () => {
      accordion.isAccordionLengthEqual(basic, 4);
      accordion.isAccordionItemExpanded(basic, 0, false);
      accordion.isAccordionItemExpanded(basic, 1, false);
      accordion.isAccordionItemExpanded(basic, 2, false);
      accordion.isAccordionItemExpanded(basic, 3, false);
      accordion.isItemContentVisible(basic, 0, false);
      accordion.isItemContentVisible(basic, 1, false);
      accordion.isItemContentVisible(basic, 2, false);
      accordion.isItemContentVisible(basic, 3, false);
    });

    it('when user click on each item, then any content inside shown', () => {
      accordion.clickOnAccordionGroup(basic, 0);
      accordion.isAccordionItemExpanded(basic, 0, true);
      accordion.isItemContentVisible(basic, 0, true);
      accordion.clickOnAccordionGroup(basic, 1);
      accordion.isAccordionItemExpanded(basic, 1, true);
      accordion.isItemContentVisible(basic, 1, true);
      accordion.clickOnAccordionGroup(basic, 2);
      accordion.isAccordionItemExpanded(basic, 2, true);
      accordion.isItemContentVisible(basic, 2, true);
      accordion.clickOnAccordionGroup(basic, 3);
      accordion.isAccordionItemExpanded(basic, 3, true);
      accordion.isItemContentVisible(basic, 3, true);
    });

    it('when user double click on each item, content closed', () => {
      accordion.clickOnAccordionGroup(basic, 0);
      accordion.clickOnAccordionGroup(basic, 0);
      accordion.isAccordionItemExpanded(basic, 0, false);
      accordion.isItemContentVisible(basic, 0, false);
      accordion.clickOnAccordionGroup(basic, 1);
      accordion.clickOnAccordionGroup(basic, 1);
      accordion.isAccordionItemExpanded(basic, 1, false);
      accordion.isItemContentVisible(basic, 1, false);
      accordion.clickOnAccordionGroup(basic, 2);
      accordion.clickOnAccordionGroup(basic, 2);
      accordion.isAccordionItemExpanded(basic, 2, false);
      accordion.isItemContentVisible(basic, 2, false);
      accordion.clickOnAccordionGroup(basic, 3);
      accordion.clickOnAccordionGroup(basic, 3);
      accordion.isAccordionItemExpanded(basic, 3, false);
      accordion.isItemContentVisible(basic, 3, false);
    });
  });
});
