import { DropdownsPo } from '../support/dropdowns.po';

describe('Dropdowns demo page test suite', () => {
  const dropdowns = new DropdownsPo();
  const dropdownDemos = dropdowns.exampleDemosArr;

  beforeEach(() => dropdowns.navigateTo());

  it('dropdowns can be triggered by manual triggers', () => {
    const btnEnableDisable = 'Toggle';
    const btnEnable = 'Show';
    const btnDisable = 'Hide';
    const showIndicator = 'show';

    dropdowns.clickByText(dropdownDemos[3], btnEnableDisable);
    cy.get(dropdownDemos[3]).find('.dropdown-menu').as('dropdownMenu')
      .should('to.have.class', showIndicator);

    dropdowns.clickByText(dropdownDemos[3], btnEnableDisable);
    cy.get('@dropdownMenu')
      .should('not.to.have.class', showIndicator);

    dropdowns.clickByText(dropdownDemos[3], btnEnable);
    cy.get('@dropdownMenu')
      .should('to.have.class', showIndicator);

    dropdowns.clickByText(dropdownDemos[3], btnDisable);
    cy.get('@dropdownMenu')
      .should('to.not.have.class', showIndicator);
  });
});
