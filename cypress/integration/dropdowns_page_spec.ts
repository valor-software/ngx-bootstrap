import { DropdownsPo } from '../support/dropdowns.po';

describe('Dropdowns demo page test suite', () => {
  const dropdowns = new DropdownsPo();
  const dropdownDemos = dropdowns.exampleDemosArr;
  const dropdownTitles = dropdowns.exampleTitlesArr;

  beforeEach(() => dropdowns.navigateTo());

  it('dropdowns page loads and displays it\'s content', () => {
    cy.get('.content')
      .should('be.visible');
  });

  it('content header contains title and link to dropdown component at github', () => {
    cy.get('.content-header').children('h1').as('title')
      .should('be.visible')
      .and('to.contain', dropdowns.pageTitle);

    cy.get('@title').children('a')
      .should('be.enabled')
      .and('have.attr', 'href', dropdowns.ghLinkToComponent);
  });

  it('usage code example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', dropdowns.titleDefaultExample);

    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('single button dropdown is shown after click on toggler', () => {
    const togglerText = 'Button dropdown';
    const showIndicator = 'show';

    dropdowns.clickByText(dropdownDemos[0], togglerText);
    cy.get(dropdownDemos[0]).find('.dropdown-menu').as('dropdownMenu')
      .should('to.have.class', showIndicator);

    dropdowns.clickByText(dropdownDemos[0], togglerText);
    cy.get('@dropdownMenu')
      .should('not.to.have.class', showIndicator);
  });

  it('dropdowns can be triggered by tag a', () => {
    cy.get(dropdownDemos[1]).children('span').as('triggerTag')
      .should('not.to.have.descendants', '.dropdown-menu');

    cy.get('@triggerTag').children('a').as('link').click();
    cy.get('@triggerTag').children('.dropdown-menu').as('dropdownMenu')
      .should('to.have.class', 'show');

    cy.get('@link').click();
    cy.get('@dropdownMenu')
      .should('not.to.have.class', 'show');
  });

  it('dropdown could have split button', () => {
    const buttonText = 'Action';
    const showIndicator = 'show';

    dropdowns.clickByText(dropdownDemos[2], buttonText);
    cy.get(dropdownDemos[2]).children('.btn-group').as('splitButton').children('.dropdown-menu')
      .should('not.to.have.class', showIndicator);

    cy.get('@splitButton').children('.dropdown-toggle').click();
    cy.get('@splitButton').children('.dropdown-menu')
      .should('to.have.class', showIndicator);
  });

  it('dropdown button can be disabled', () => {
    const btnEnableDisable = 'Enable/Disable';

    dropdowns.clickByText(dropdownDemos[4], btnEnableDisable);
    cy.get(dropdownDemos[4]).find('.dropdownToggle')
      .should('not.to.be.enabled');
  });
});
