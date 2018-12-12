import { PopoverPo } from '../support/popover.po';

describe('Popover demo page test suite', () => {
  const popover = new PopoverPo();

  beforeEach(() => popover.navigateTo());

  describe('Basic', () => {
    const basicPopover = popover.exampleDemosArr.basic;

    it('basic popover appears after clicking on trigger button', () => {
      const buttonText = 'Live demo';

      popover.clickByText(basicPopover, buttonText);
      cy.get(basicPopover).should('to.have.descendants', 'popover-container');
    });
  });
});
