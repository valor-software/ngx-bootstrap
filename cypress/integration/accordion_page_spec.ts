import { AccordionPo } from '../support/accordion.po';

describe('Accordion page test suite', () => {
  const accordion = new AccordionPo();
  const accordionExamples = accordion.accordionDemosArr;

  beforeEach(() => accordion.navigateTo());

  it('accordion page loads and displays it\'s content', () => {
    cy.get('.content')
      .should('be.visible');
  });

  it('content header contains title and link to accordion component at github', () => {
    cy.get('.content-header').children('h1').as('title')
      .should('be.visible')
      .and('to.contain', accordion.pageTitle);

    cy.get('@title').children('a')
      .should('be.enabled')
      .and('have.attr', 'href', accordion.ghLinkToComponent);
  });

  it('usage code example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', accordion.titleDefaultExample);

    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('each panel at simple accordion opens content at first click', () => {
    cy.get(accordionExamples[0]).children('.panel-group').children('.panel').each(($panel, i) => {
      accordion.getAccordionPanel(accordionExamples[0], i).as('currPanel').click();

      cy.get('@currPanel')
        .should('have.class', 'panel-open');
    });
  });

  it('double click leaves all panels closed at simple accordion', () => {
    cy.get(accordionExamples[0]).children('.panel-group').children('.panel').each(($panel, i) => {
      accordion.getAccordionPanel(accordionExamples[0], i).as('currPanel').dblclick();

      cy.get('@currPanel')
        .should('not.have.class', 'panel-open');
    });
  });

  it('first panel can be disabled or enabled at disabled example', () => {
    accordion.clickByText(accordionExamples[1], accordion.buttonEnableDisable);

    accordion.getAccordionPanel(accordionExamples[1], 0).as('firstPanel').find('.text-muted')
      .should('to.be.exist');

    accordion.clickByText(accordionExamples[1], accordion.buttonEnableDisable);

    cy.get('@firstPanel').find('.text-muted')
      .should('not.to.be.exist');
  });

  it('last panel can be controlled by toggler button at dynamic example', () => {
    accordion.clickByText(accordionExamples[4], accordion.buttonPanelToggler);

    accordion.getAccordionPanel(accordionExamples[4], 2).as('dynamicPanel')
      .should('not.have.class', 'panel-open');

    accordion.clickByText(accordionExamples[4], accordion.buttonPanelToggler);

    cy.get('@dynamicPanel')
      .should('have.class', 'panel-open');
  });

  it('items in collapse-panel can be added dynamic at dynamic example', () => {
    accordion.getAccordionPanel(accordionExamples[3], 0).as('dynamicItemsPanel').click();

    cy.get('@dynamicItemsPanel').find('.panel-body').children('div')
      .should('have.length', 3);

    accordion.clickByText('@dynamicItemsPanel', accordion.buttonAddItem);

    cy.get('@dynamicItemsPanel').find('.panel-body').children('div')
      .should('have.length', 4);
  });

  it('open only one panel at a time if closeOthers property sets as true', () => {
    cy.get(accordionExamples[5]).find('input').check();

    accordion.getAccordionPanel(accordionExamples[5], 0).as('firstPanel').click()
      .should('have.class', 'panel-open');
    accordion.getAccordionPanel(accordionExamples[5], 1).as('secondPanel')
      .should('not.have.class', 'panel-open');
    accordion.getAccordionPanel(accordionExamples[5], 2).as('thirdPanel')
      .should('not.have.class', 'panel-open');

    cy.get('@thirdPanel').click()
      .should('have.class', 'panel-open');
    cy.get('@firstPanel')
      .should('not.have.class', 'panel-open');
    cy.get('@secondPanel')
      .should('not.have.class', 'panel-open');
  });

  it('other panels are not closed if closeOthers property sets as false', () => {
    cy.get(accordionExamples[5]).find('input').uncheck();

    accordion.getAccordionPanel(accordionExamples[5], 0).as('firstPanel').click()
      .should('have.class', 'panel-open');
    accordion.getAccordionPanel(accordionExamples[5], 1).as('secondPanel')
      .should('not.have.class', 'panel-open');
    accordion.getAccordionPanel(accordionExamples[5], 2).as('thirdPanel')
      .should('not.have.class', 'panel-open');

    cy.get('@thirdPanel').click()
      .should('have.class', 'panel-open');
    cy.get('@firstPanel')
      .should('have.class', 'panel-open');
    cy.get('@secondPanel')
      .should('not.have.class', 'panel-open');
  });

  it('first and third panel at styling accordion contains customClass style', () => {
    const stylesPanel = ['rgb(91, 192, 222)', 'rgb(255, 255, 255)'];
    const stylePanelBody = 'rgb(51, 122, 167)';

    accordion.getAccordionPanel(accordionExamples[6], 0).children('.card').as('firstPanel')
      .should('to.have.css', 'background-color', stylesPanel[0])
      .and('to.have.css', 'color', stylesPanel[1]);
    cy.get('@firstPanel').find('.panel-body')
      .should('to.have.css', 'background-color', stylePanelBody);

    accordion.getAccordionPanel(accordionExamples[6], 2).children('.card').as('thirdPanel')
      .should('to.have.css', 'background-color', stylesPanel[0])
      .and('to.have.css', 'color', stylesPanel[1]);
    cy.get('@thirdPanel').find('.panel-body')
      .should('to.have.css', 'background-color', stylePanelBody);
  });

  it('configuring defaults example opens only one panel at a time', () => {
    accordion.getAccordionPanel(accordionExamples[5], 0).as('firstPanel').click()
      .should('have.class', 'panel-open');
    accordion.getAccordionPanel(accordionExamples[5], 1).as('secondPanel')
      .should('not.have.class', 'panel-open');
    accordion.getAccordionPanel(accordionExamples[5], 2).as('thirdPanel')
      .should('not.have.class', 'panel-open');

    cy.get('@secondPanel').click()
      .should('have.class', 'panel-open');
    cy.get('@firstPanel')
      .should('not.have.class', 'panel-open');
    cy.get('@thirdPanel')
      .should('not.have.class', 'panel-open');
  });
});
