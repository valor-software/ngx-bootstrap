import { AccordionPo } from '../support/accordion.po';

describe('Accordion page test suite', () => {
  const accordion = new AccordionPo();
  const demoExamples = accordion.accordionDemosArr;
  const demoTitles = accordion.exampleTitles;

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

  it('usage example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', accordion.titleDefaultExample);

    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('each panel at simple accordion opens content at first click', () => {
    cy.get(demoExamples[0]).children('.panel-group').children('.panel').each(($panel, i) => {
      accordion.getAccordionPanel(demoExamples[0], i).as('currPanel').click();

      cy.get('@currPanel')
        .should('have.class', 'panel-open');
    });
  });

  it('double click leaves all panels closed at simple accordion', () => {
    cy.get(demoExamples[0]).children('.panel-group').children('.panel').each(($panel, i) => {
      accordion.getAccordionPanel(demoExamples[0], i).as('currPanel').dblclick();

      cy.get('@currPanel')
        .should('not.have.class', 'panel-open');
    });
  });

  it('first panel can be disabled or enabled at disabled example', () => {
    accordion.clickByText(demoExamples[1], accordion.buttonEnableDisable);

    accordion.getAccordionPanel(demoExamples[1], 0).as('firstPanel').find('.text-muted')
      .should('to.be.exist');

    accordion.clickByText(demoExamples[1], accordion.buttonEnableDisable);

    cy.get('@firstPanel').find('.text-muted')
      .should('not.to.be.exist');
  });

  it('last panel can be controlled by toggler button at dynamic example', () => {
    accordion.clickByText(demoExamples[2], accordion.buttonPanelToggler);

    accordion.getAccordionPanel(demoExamples[2], 4).as('dynamicPanel')
      .should('not.have.class', 'panel-open');

    accordion.clickByText(demoExamples[2], accordion.buttonPanelToggler);

    cy.get('@dynamicPanel')
      .should('have.class', 'panel-open');
  });

  it('items in collapse-panel can be added dynamic at dynamic example', () => {
    accordion.getAccordionPanel(demoExamples[2], 3).as('dynamicItemsPanel').click();

    cy.get('@dynamicItemsPanel').find('.panel-body').children('div')
      .should('have.length', 3);

    accordion.clickByText('@dynamicItemsPanel', accordion.buttonAddItem);

    cy.get('@dynamicItemsPanel').find('.panel-body').children('div')
      .should('have.length', 4);
  });

  it('open only one panel at a time if closeOthers property sets as true', () => {
    cy.get(demoExamples[3]).find('input').check();

    accordion.getAccordionPanel(demoExamples[3], 0).as('firstPanel').click()
      .should('have.class', 'panel-open');
    accordion.getAccordionPanel(demoExamples[3], 1).as('secondPanel')
      .should('not.have.class', 'panel-open');
    accordion.getAccordionPanel(demoExamples[3], 2).as('thirdPanel')
      .should('not.have.class', 'panel-open');

    cy.get('@thirdPanel').click()
      .should('have.class', 'panel-open');
    cy.get('@firstPanel')
      .should('not.have.class', 'panel-open');
    cy.get('@secondPanel')
      .should('not.have.class', 'panel-open');
  });

  it('other panels are not closed if closeOthers property sets as false', () => {
    cy.get(demoExamples[3]).find('input').uncheck();

    accordion.getAccordionPanel(demoExamples[3], 0).as('firstPanel').click()
      .should('have.class', 'panel-open');
    accordion.getAccordionPanel(demoExamples[3], 1).as('secondPanel')
      .should('not.have.class', 'panel-open');
    accordion.getAccordionPanel(demoExamples[3], 2).as('thirdPanel')
      .should('not.have.class', 'panel-open');

    cy.get('@thirdPanel').click()
      .should('have.class', 'panel-open');
    cy.get('@firstPanel')
      .should('have.class', 'panel-open');
    cy.get('@secondPanel')
      .should('not.have.class', 'panel-open');
  });

  it('first and third panel at styling accordion contains customClass style', () => {
    accordion.getAccordionPanel(demoExamples[4], 0).children('.card')
      .should('have.class', 'customClass');
    accordion.getAccordionPanel(demoExamples[4], 1).children('.card')
      .should('not.have.class', 'customClass');
    accordion.getAccordionPanel(demoExamples[4], 2).children('.card')
      .should('have.class', 'customClass');
  });

  it('configuring defaults example opens only one panel at a time', () => {
    accordion.getAccordionPanel(demoExamples[5], 0).as('firstPanel').click()
      .should('have.class', 'panel-open');
    accordion.getAccordionPanel(demoExamples[5], 1).as('secondPanel')
      .should('not.have.class', 'panel-open');
    accordion.getAccordionPanel(demoExamples[5], 2).as('thirdPanel')
      .should('not.have.class', 'panel-open');

    cy.get('@secondPanel').click()
      .should('have.class', 'panel-open');
    cy.get('@firstPanel')
      .should('not.have.class', 'panel-open');
    cy.get('@thirdPanel')
      .should('not.have.class', 'panel-open');
  });

  it('each demo examples are not mixed up with each other and contains code examples', () => {
    cy.get('examples').find('h3').as('exampleTitles').each(($title, i) => {
      expect($title).to.contain(demoTitles[i]);

      cy.get('@exampleTitles').contains(demoTitles[i]).parent().as('currentBlock');

      cy.get('@currentBlock').find(demoExamples[i])
        .should('to.exist');
      cy.get('@currentBlock').find('.section').eq(1)
        .should('be.visible')
        .and('not.to.be.empty');
    });
  });
});
