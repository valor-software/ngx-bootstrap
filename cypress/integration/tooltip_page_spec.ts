import { TooltipPo } from '../support/tooltip.po';

describe('Tooltip demo page test suite', () => {
  const tooltip = new TooltipPo();

  beforeEach(() => tooltip.navigateTo());

  describe('Basic tooltip', () => {
    const basic = tooltip.exampleDemosArr.basic;

    it('basic tooltip appears after hovering on trigger button', () => {
      cy.get(basic).as('basicDemo').find(tooltip.togglerTooltip).focus();
      cy.get('@basicDemo')
        .should('to.have.descendants', tooltip.containerTooltip);
    });
  });
});
