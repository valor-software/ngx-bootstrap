import { AlertsPo } from '../support/alerts.po';

describe('Alerts page test suite', () => {
  const alerts = new AlertsPo();

  beforeEach(() => alerts.navigateTo());

  describe('Basic', () => {
    const basicDemo = alerts.exampleDemosArr.basic;
    const alertTypes = [
      'alert-success',
      'alert-info',
      'alert-warning',
      'alert-danger'
    ];

    it('success, info, warning and danger types of alerts are displayed', () => {
      alertTypes.forEach(type => cy.get(`${ basicDemo } .${ type }`)
        .should('be.visible'));
    });
  });

  describe('Link color', () => {
    const linkDemo = alerts.exampleDemosArr.link;
    const alertTypes = [
      'alert-success',
      'alert-info',
      'alert-warning',
      'alert-danger'
    ];

    it('links can be provided by class alert-link', () => {
      alertTypes.forEach(type => cy.get(`${ linkDemo } .${ type }`).find(alerts.linkClass)
        .should('have.attr', 'href', '#'));
    });
  });

  describe('Additional content', () => {
    const contentDemo = alerts.exampleDemosArr.content;

    it('alert with additional content contains html elements', () => {
      cy.get(contentDemo).find(alerts.alertClass)
        .should('to.have.descendants', 'h4')
        .and('to.have.descendants', 'p')
        .and('to.have.descendants', alerts.heading);
    });
  });

  describe('Dismissing', () => {
    const dismissingDemo = alerts.exampleDemosArr.dismissing;
    const alertTypes = [
      'alert-success',
      'alert-info',
      'alert-danger'
    ];
    const buttonToggler = 'Toggle dismissible';
    const buttonReset = 'Reset';

    it('alerts can stop being dismissible', () => {
      cy.get(dismissingDemo).find(alerts.alertClass).last().as('dismissAlert')
        .should('to.have.descendants', alerts.dismissOption);

      alerts.clickByText(dismissingDemo, buttonToggler);
      cy.get('@dismissAlert')
        .should('not.to.have.descendants', alerts.dismissOption);

      alerts.clickByText(dismissingDemo, buttonToggler);
      cy.get('@dismissAlert')
        .should('to.have.descendants', alerts.dismissOption);
    });

    it('alerts can all be closed and then resetting to default state', () => {
      alertTypes.forEach(type => {
        cy.get(`${ dismissingDemo } .${ type } ${alerts.dismissOption}`).click();
        cy.get(`${ dismissingDemo } .${ type }`)
          .should('not.to.exist');
      });

      alerts.clickByText(dismissingDemo, buttonReset);
      alertTypes.forEach(type => cy.get(`${ dismissingDemo } .${ type }`)
        .should('to.exist'));
    });
  });

  describe('Dynamic html', () => {
    const dynamicHtml = alerts.exampleDemosArr.dynamicHtml;
    const alertTypes = [
      'alert-success',
      'alert-info',
      'alert-danger'
    ];

    it('each alert contains style and content from component', () => {
      alertTypes.forEach(type => cy.get(`${ dynamicHtml} .${ type }`)
        .should('be.visible')
        .and('to.have.descendants', alerts.textWrapper));
    });
  });

  describe('Dynamic content', () => {
    const dynamicContent = alerts.exampleDemosArr.dynamicContent;
    const dynamicAlertText = [
      'You successfully read this important alert message.',
      'Now this text is different from what it was before. Go ahead and click the button one more time',
      'Well done! Click reset button'
    ];

    it('alert\'s content can be changed dynamicly', () => {
      dynamicAlertText.forEach(text => {
        cy.get(dynamicContent).find(alerts.alertClass)
          .should('to.contain', text);
        cy.get(dynamicContent).find('button').click();
      });
    });
  });

  describe('Dismiss on timeout', () => {
    const dismisTimeout = alerts.exampleDemosArr.dismissTimeout;
    const timeoutLength = 5000;

    it('After timeout in 5 seconds, default alert disappears', () => {
      cy.get(`${ dismisTimeout } ${ alerts.alertClass }`).as('defaultAlert')
        .should('to.be.visible');
      cy.wait(timeoutLength);
      cy.get('@defaultAlert').should('not.to.exist');
    });
  });

  describe('Global styling', () => {
    const globalStyle = alerts.exampleDemosArr.globalStyling;
    const stylesColors = [
      'rgb(123, 31, 162)', // violet
      'rgb(74, 20, 140)', // indigo
      'rgb(255, 255, 255)' // white
    ];

    it('alert is displayed with added style', () => {
      cy.get(globalStyle).find(alerts.alertClass)
        .should('to.have.css', 'background-color', stylesColors[0])
        .and('to.have.css', 'border-color', stylesColors[1])
        .and('to.have.css', 'color', stylesColors[2]);
    });
  });

  describe('Component level styling', () => {
    const componentStyle = alerts.exampleDemosArr.localStyling;
    const stylesColors = [
      'rgb(0, 150, 136)', // dark cyan
      'rgb(0, 105, 92)', // mosque
      'rgb(255, 255, 255)' // white
    ];

    it('alert is displayed with added style', () => {
      cy.get(componentStyle).find(alerts.alertClass)
        .should('to.have.css', 'background-color', stylesColors[0])
        .and('to.have.css', 'border-color', stylesColors[1])
        .and('to.have.css', 'color', stylesColors[2]);
    });
  });

  describe('Configuring defaults', () => {
    const configDemo = alerts.exampleDemosArr.config;
    const alertTypes = [
      'alert-success',
      'alert-info'
    ];

    it('each alert contains added config', () => {
      alertTypes.forEach(type => cy.get(`${ configDemo } .${ type }`)
        .should('be.visible'));
    });
  });
});
