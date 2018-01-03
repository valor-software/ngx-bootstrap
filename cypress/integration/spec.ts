import { AccordionPo } from '../support/accordion.po';

describe('Accordion Component', () => {

  const page = new AccordionPo();
  const accordionTypes = page.locators;

  beforeEach(page.navigateTo);

  it('should navigate to accordion page', () => {
    cy.url().should('include', 'ngx-bootstrap/#/accordion');
  });

  it('should open accordion basic', () => {
    // cy.get('.sidebar-content').contains('Accordion').click();
    //
    page.getFirstPanel(accordionTypes.BASIC).as('firstItem').click();
    cy.get('@firstItem').should('have.class', 'panel-open');
  });

  it('should open accordion-dynamic', () => {
    page.getFirstPanel(accordionTypes.DYNAMIC).as('firstItem').click();
    cy.get('@firstItem').should('have.class', 'panel-open');
  });

  it('should disable/enable accordion panel', () => {
    page.clickButton(accordionTypes.DISABLED);
    page.getFirstPanel(accordionTypes.DISABLED).find('.text-muted');

    page.clickByText(accordionTypes.DISABLED, 'Enable / Disable first panel');
    page.getFirstPanel(accordionTypes.DISABLED).find('.text-muted').should('not.exist');

  });


});
