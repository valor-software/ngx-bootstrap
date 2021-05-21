import { AlertsPo } from '../support/alerts.po';

describe('Alerts page testing suite', () => {
  const alerts = new AlertsPo();

  beforeEach(() => {
    cy.clock();
    alerts.navigateTo();
  });

  describe('Link color', () => {
    const linkColor = alerts.exampleDemosArr.link;

    it(`example contains 4 alerts with types: success, info, warning, danger
                   each alert have clickable link with class alert-link`, () => {
      alerts.scrollToMenu('Link color');
      alerts.isAlertVisible(linkColor, 'success');
      alerts.isAlertHaveLink(linkColor, 'success');
      alerts.isAlertVisible(linkColor, 'info');
      alerts.isAlertHaveLink(linkColor, 'info');
      alerts.isAlertVisible(linkColor, 'warning');
      alerts.isAlertHaveLink(linkColor, 'warning');
      alerts.isAlertVisible(linkColor, 'danger');
      alerts.isAlertHaveLink(linkColor, 'danger');
    });
  });

  describe('Additional content', () => {
    const additionalContent = alerts.exampleDemosArr.content;

    it(`example contains 1 alert with type: success, content inside contains header h4 and 2 paragraphs`, () => {
      alerts.scrollToMenu('Additional content');
      alerts.isAlertVisible(additionalContent, 'success');
      alerts.isAlertContentContains(additionalContent, 'success', 'h4');
      alerts.isAlertContentContains(additionalContent, 'success', 'p');
      alerts.isAlertContentContains(additionalContent, 'success', '.mb-0');
    });
  });

  describe('Dismissing', () => {
    const dismissing = alerts.exampleDemosArr.dismissing;

    beforeEach(() => alerts.scrollToMenu('Dismissing'));

    it(`example contains 3 alerts with types: success, info, danger,
                   2 clickable buttons: "Toggle dismissible", "Reset`, () => {
      alerts.isAlertVisible(dismissing, 'success');
      alerts.isAlertVisible(dismissing, 'info');
      alerts.isAlertVisible(dismissing, 'danger');
      alerts.isBtnTxtEqual(dismissing, 'Toggle dismissible', 3);
      alerts.isBtnTxtEqual(dismissing, 'Reset', 4);
    });

    it(`when user click on close button, then alert disappeared`, () => {
      alerts.clickOnBtn(dismissing, 2);
      alerts.isAlertVisible(dismissing, 'danger', false);
      alerts.clickOnBtn(dismissing, 1);
      alerts.isAlertVisible(dismissing, 'info', false);
      alerts.clickOnBtn(dismissing, 0);
      alerts.isAlertVisible(dismissing, 'success', false);
    });

    it(`when user click "Reset" - then alerts back to default (3 alert with close buttons)`, () => {
      alerts.clickOnBtn(dismissing, 2);
      alerts.clickOnBtn(dismissing, 1);
      alerts.clickOnBtn(dismissing, 0);
      alerts.clickOnBtn(dismissing, 1);
      alerts.isAlertVisible(dismissing, 'success');
      alerts.isAlertVisible(dismissing, 'info');
      alerts.isAlertVisible(dismissing, 'danger');
      alerts.isButtonExist(dismissing, '×Close', 0);
      alerts.isButtonExist(dismissing, '×Close', 1);
      alerts.isButtonExist(dismissing, '×Close', 2);
    });

    it(`when user click "Toggle dismissible", then close buttons disappeared`, () => {
      alerts.clickOnBtn(dismissing, 3);
      alerts.isAlertVisible(dismissing, 'success');
      alerts.isAlertVisible(dismissing, 'info');
      alerts.isAlertVisible(dismissing, 'danger');
      alerts.isButtonExist(dismissing, '×Close', 0, false);
      alerts.isButtonExist(dismissing, '×Close', 1, false);
      alerts.isButtonExist(dismissing, '×Close', 2, false);
    });

    it(`when user click "Toggle dismissible" again, then close buttons appeared`, () => {
      alerts.dblClickOnBtn(dismissing, 3);
      alerts.isAlertVisible(dismissing, 'success');
      alerts.isAlertVisible(dismissing, 'info');
      alerts.isAlertVisible(dismissing, 'danger');
      alerts.isButtonExist(dismissing, '×Close', 0);
      alerts.isButtonExist(dismissing, '×Close', 1);
      alerts.isButtonExist(dismissing, '×Close', 2);
    });
  });

  describe('Dynamic html', () => {
    const dynamicHtml = alerts.exampleDemosArr.dynamicHtml;

    it(`example contains 3 alerts with types: success, info, danger,
                   src of component code should contain DomSanitizer for sanitizing html`, () => {
      alerts.scrollToMenu('Dynamic html');
      alerts.isAlertVisible(dynamicHtml, 'success');
      alerts.isAlertVisible(dynamicHtml, 'info');
      alerts.isAlertVisible(dynamicHtml, 'danger');
      alerts.isAlertContentContains(dynamicHtml, 'success', 'span');
      alerts.isAlertContentContains(dynamicHtml, 'info', 'span');
      alerts.isAlertContentContains(dynamicHtml, 'danger', 'span');
      alerts.isComponentSrcContain('Dynamic html', 'DomSanitizer');
    });
  });

  describe('Dynamic content', () => {
    const dynamicContent = alerts.exampleDemosArr.dynamicContent;

    it(`example contains 1 alert with type: success and "Change text" button`, () => {
      alerts.isAlertVisible(dynamicContent, 'success');
      alerts.isBtnTxtEqual(dynamicContent, 'Change text');
    });

    it(`when user click on this button, alert content changed, after click on it 2d, content changed again,
                   when click on it 3d, then button changed to "Reset" and after click on it - content form 1t`, () => {
      alerts.isAlertTextContains(dynamicContent, 'success', 'You successfully read this important alert');
      alerts.clickOnBtn(dynamicContent);
      alerts.isAlertVisible(dynamicContent, 'success');
      alerts.isAlertTextContains(dynamicContent, 'success', 'Now this text is different from what it was before');
      alerts.clickOnBtn(dynamicContent);
      alerts.isAlertVisible(dynamicContent, 'success');
      alerts.isAlertTextContains(dynamicContent, 'success', 'Well done! Click reset button');
      alerts.isBtnTxtEqual(dynamicContent, 'Reset');
      alerts.clickOnBtn(dynamicContent);
      alerts.isAlertTextContains(dynamicContent, 'success', 'You successfully read this important alert');
    });
  });

  describe('Dismiss on timeout', () => {
    const dismissTimeout = alerts.exampleDemosArr.dismissTimeout;

    it('example contains 1 success alert and "Add more" button', () => {
      alerts.isAlertVisible(dismissTimeout, 'success');
      alerts.isBtnTxtEqual(dismissTimeout, 'Add more');
      cy.tick(6000);
      alerts.isAlertVisible(dismissTimeout, 'success', false);
    });

    it('when user click on "Add more" button, then info alert shown', () => {
      cy.tick(6000);
      alerts.isAlertVisible(dismissTimeout, 'success', false);
      alerts.clickOnBtn(dismissTimeout);
      alerts.isAlertVisible(dismissTimeout, 'info');
    });

    it('when user in a short time (up to 5 sec) click on button a few times, then a few alerts shown', () => {
      alerts.clickOnBtn(dismissTimeout);
      alerts.clickOnBtn(dismissTimeout);
      alerts.clickOnBtn(dismissTimeout);
      alerts.isAlertLengthEqual(dismissTimeout, 4);
      cy.tick(6000);
      alerts.isAlertLengthEqual(dismissTimeout, 0);
    });
  });

  describe('Global styling', () => {
    const globalStyling = alerts.exampleDemosArr.globalStyling;

    it(`example contains 1 alert with specific style, differs from default, template src contains this style`, () => {
      alerts.scrollToMenu('Global styling');
      alerts.isAlertVisible(globalStyling, 'colored');
      alerts.isAlertHaveCss(globalStyling, 'background-color', 'rgb(123, 31, 162)');
      alerts.isAlertHaveCss(globalStyling, 'border-color', 'rgb(74, 20, 140)');
      alerts.isAlertHaveCss(globalStyling, 'color', 'rgb(255, 255, 255)');
      alerts.isTemplateSrcContain('Global styling', '<style>');
    });
  });

  describe('Component level styling', () => {
    const componentStyling = alerts.exampleDemosArr.componentStyling;

    it(`example contains 1 alert with specific style, which differs from default,
                   src of component should contain this style`, () => {
      alerts.scrollToMenu('Component level styling');
      alerts.isAlertVisible(componentStyling, 'local');
      alerts.isAlertHaveCss(componentStyling, 'background-color', 'rgb(0, 150, 136)');
      alerts.isAlertHaveCss(componentStyling, 'border-color', 'rgb(0, 105, 92)');
      alerts.isAlertHaveCss(componentStyling, 'color', 'rgb(255, 255, 255)');
      alerts.isComponentSrcContain('Component level styling', 'styles: [');
    });
  });

  describe('Configuring defaults', () => {
    const configDefault = alerts.exampleDemosArr.config;

    it(`example contains 2 alerts with type: success, info,
                   info alert should have type: info in html and in template src`, () => {
      cy.viewport(1440, 900);
      alerts.clickOnDemoMenu('Configuring defaults');
      alerts.isAlertVisible(configDefault, 'success');
      alerts.isAlertVisible(configDefault, 'info');
      alerts.isComponentSrcContain('Configuring defaults', 'new AlertConfig()');
      alerts.isComponentSrcContain('Configuring defaults', 'type: \'success\'');
      alerts.isTemplateSrcContain('Configuring defaults', 'alert type="info"');
    });
  });
});
