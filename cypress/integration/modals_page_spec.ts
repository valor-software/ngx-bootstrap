import { ModalsPo } from '../support/modals.po';

describe('Modals demo page test suite', () => {
  const modals = new ModalsPo();
  const modalDemos = modals.exampleDemosArr;

  beforeEach(() => modals.navigateTo());

  it('modals page loads and displays it\'s content', () => {
    cy.get('.content')
      .should('be.visible');
  });

  it('content header contains title and link to modals component at github', () => {
    cy.get('.content-header').children('h1').as('title')
      .should('be.visible')
      .and('to.contain', modals.pageTitle);

    cy.get('@title').children('a')
      .should('be.enabled')
      .and('have.attr', 'href', modals.ghLinkToComponent);
  });

  it('usage code example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', modals.titleDefaultExample);

    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('template service modal can be opened by click on button and closed by backdrop-click', () => {
    const buttonText = 'Create template modal';

    modals.clickByText(modalDemos[0], buttonText);
    cy.get('modal-container')
      .should('to.be.visible');

    cy.get('modal-container').click();
    cy.get('modal-container')
      .should('not.to.be.visible');
  });

  it('component service modal can be opened by click on button and closed by clicking Close button', () => {
    const buttonText = 'Create modal with component';
    const modalCloseBtn = 'Close';

    modals.clickByText(modalDemos[1], buttonText);
    cy.get('modal-container')
      .should('to.be.visible');

    modals.clickByText('modal-content', modalCloseBtn);
    cy.get('modal-container')
      .should('not.to.be.visible');
  });

  it('directive static modal can be closed by clicking Close button', () => {
    const buttonText = 'Static modal';

    modals.clickByText(modalDemos[6], buttonText);
    cy.get('.modal-content')
      .should('to.be.visible');

    cy.get(modalDemos[6]).find('.modal-header').find('.close').click();
    cy.get('.modal-content')
      .should('not.to.be.visible');
  });

  it('directive child modal can be closed by backdrop click', () => {
    const buttonText = 'Open child modal';

    modals.clickByText(modalDemos[8], buttonText);
    cy.get('.modal-content')
      .should('to.be.visible');

    cy.get(modalDemos[8]).find('.modal').click();
    cy.get('.modal-content')
      .should('not.to.be.visible');
  });
});
