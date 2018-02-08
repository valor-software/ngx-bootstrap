import { AlertsPo } from '../support/alerts.po';

describe('Alerts page test suite', () => {
  const alerts = new AlertsPo();
  const alertsDemos = alerts.exampleDemosArr;

  let alertTypes: string[];
  let stylesColors: string[];

  beforeEach(() => alerts.navigateTo());

  it('alerts page loads and displays it\'s content', () => {
    cy.get('.content')
      .should('be.visible');
  });

  it('content header contains title and link to accordion component at github', () => {
    cy.get('.content-header').children('h1').as('title')
      .should('be.visible')
      .and('to.contain', alerts.pageTitle);

    cy.get('@title').children('a')
      .should('be.enabled')
      .and('have.attr', 'href', alerts.ghLinkToComponent);
  });

  it('usage code example is displayed at demo top section', () => {
    cy.get('demo-top-section').as('demoTop').children('h2')
      .should('be.visible')
      .and('to.contain', alerts.titleDefaultExample);

    cy.get('@demoTop').children('.prettyprint')
      .should('be.visible')
      .and('not.to.be.empty');
  });

  it('basic alert example displays success, info, warning and danger types of alerts', () => {
    alertTypes = [
      'alert-success',
      'alert-info',
      'alert-warning',
      'alert-danger'
    ];

    cy.get(alertsDemos[0]).find('div').as('alertsBasic').each(($alert, i) => {
      expect($alert).to.have.class(alertTypes[i]);
      cy.get('@alertsBasic').eq(i)
        .should('be.visible');
    });
  });

  it('link in alerts can be provided by class alert-link', () => {
    cy.get(alertsDemos[1]).find('div').as('alertsLink').each(() => {
      cy.get('@alertsLink').find(alerts.linkClass)
        .should('have.attr', 'href', '#');
    });
  });

  it('alert with additional content contains html elements', () => {
    cy.get(alertsDemos[2]).find('div')
      .should('to.have.descendants', 'h4')
      .and('to.have.descendants', 'p');
  });

  it('alerts in dismissing example can stop being dismissible', () => {
    cy.get(alertsDemos[3]).find('alert').as('dismissAlert').last()
      .should('to.have.descendants', '.close');

    alerts.clickByText(alertsDemos[3], alerts.buttonToggler);
    cy.get('@dismissAlert').last()
      .should('not.to.have.descendants', '.close');
  });

  it('alerts in dismissible example can all be closed and then resetting to default state', () => {
    cy.get(alertsDemos[3]).find('alert').as('dismissAlert').each(($alert, i) => {
      cy.get('@dismissAlert').eq(i).find('.close').click();
    });
    cy.get('@dismissAlert')
      .should('not.to.have.descendants', 'div');

    alerts.clickByText(alertsDemos[3], alerts.buttonReset);
    cy.get('@dismissAlert')
      .should('to.have.descendants', 'div');
  });

  it('alerts in dynamic html example contains style and content from component', () => {
    alertTypes = [
      'alert-success',
      'alert-info',
      'alert-danger'
    ];

    cy.get(alertsDemos[4]).find('alert').children('div').as('alertsDynamic').each(($alert, i) => {
      expect($alert).to.have.class(alertTypes[i]);
      cy.get('@alertsDynamic').eq(i)
        .should('be.visible')
        .and('to.have.descendants', 'span');
    });
  });

  it('dynamic content in alerts can be changed by click on button', () => {
    cy.get(alertsDemos[5]).find('.alert').as('alertDynamicText')
      .should('to.contain', alerts.dynamicAlertText[0]);

    alerts.clickByText(alertsDemos[5], alerts.buttonChangeText);
    cy.get('@alertDynamicText')
      .should('to.contain', alerts.dynamicAlertText[1])
      .and('not.to.contain', alerts.dynamicAlertText[0]);

    alerts.clickByText(alertsDemos[5], alerts.buttonChangeText);
    cy.get('@alertDynamicText')
      .should('to.contain', alerts.dynamicAlertText[2]);

    alerts.clickByText(alertsDemos[5], alerts.buttonReset);
    cy.get('@alertDynamicText')
      .should('to.contain', alerts.dynamicAlertText[0])
      .and('not.to.contain', alerts.dynamicAlertText[2]);
  });

  it('alert with global style has added style', () => {
    stylesColors = ['rgb(123, 31, 162)', 'rgb(74, 20, 140)', 'rgb(255, 255, 255)'];

    cy.get(alertsDemos[7]).find('.alert')
      .should('to.have.css', 'background-color', stylesColors[0])
      .and('to.have.css', 'border-color', stylesColors[1])
      .and('to.have.css', 'color', stylesColors[2]);
  });

  it('alert with component level styling has added style', () => {
    stylesColors = ['rgb(0, 150, 136)', 'rgb(0, 105, 92)', 'rgb(255, 255, 255)'];

    cy.get(alertsDemos[8]).find('.alert')
      .should('to.have.css', 'background-color', stylesColors[0])
      .and('to.have.css', 'border-color', stylesColors[1])
      .and('to.have.css', 'color', stylesColors[2]);
  });

  it('alerts with preconfigured defaults have added config', () => {
    alertTypes = [
      'alert-success',
      'alert-info'
    ];

    cy.get(alertsDemos[9]).find('.alert').as('configuredAlerts').eq(0)
      .should('to.have.class', alertTypes[0]);
    cy.get('@configuredAlerts').eq(1)
      .should('to.have.class', alertTypes[1]);
  });
});
