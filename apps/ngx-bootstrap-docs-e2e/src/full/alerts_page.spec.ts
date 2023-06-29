import { test as base } from '@playwright/test';
import { AlertsPo } from '../support/alerts.po';

const test = base.extend<{ alertsPo: AlertsPo }>({
  alertsPo: async ({ page }, use) => {
    const alertsPo = new AlertsPo(page);
    await use(alertsPo);
  },
});

test.describe('Alerts page testing suite', () => {
  let tabName: string;
  let tabSelector: string;

  test.beforeEach(async ({ alertsPo }) => {
    tabName = 'Overview';
    tabSelector = `tab[heading="${tabName}"]`;
    await alertsPo.navigateTo();
  });

  test.describe('Link color', () => {
    let linkColor: string;

    test.beforeEach(async ({ alertsPo }) => {
      linkColor = tabSelector + alertsPo.exampleDemosArr.link;
      await alertsPo.scrollToMenu('Link color');
    });

    test(`example contains 4 alerts with types: success, info, warning, danger
                   each alert have clickable link with class alert-link`, async ({ alertsPo }) => {
      await alertsPo.expectAlertVisible(linkColor, 'success');
      await alertsPo.expectAlertHaveLink(linkColor, 'success');
      await alertsPo.expectAlertVisible(linkColor, 'info');
      await alertsPo.expectAlertHaveLink(linkColor, 'info');
      await alertsPo.expectAlertVisible(linkColor, 'warning');
      await alertsPo.expectAlertHaveLink(linkColor, 'warning');
      await alertsPo.expectAlertVisible(linkColor, 'danger');
      await alertsPo.expectAlertHaveLink(linkColor, 'danger');
    });
  });

  test.describe('Additional content', () => {
    let additionalContent: string;

    test.beforeEach(async ({ alertsPo }) => {
      additionalContent = tabSelector + alertsPo.exampleDemosArr.content;
      await alertsPo.scrollToMenu('Additional content');
    });

    test(`example contains 1 alert with type: success, content inside contains header h4 and 2 paragraphs`, async ({ alertsPo }) => {
      await alertsPo.expectAlertVisible(additionalContent, 'success');
      await alertsPo.expectAlertHaveDescendants(additionalContent, 'success', 'h4');
      await alertsPo.expectAlertHaveDescendants(additionalContent, 'success', 'p');
      await alertsPo.expectAlertHaveDescendants(additionalContent, 'success', '.mb-0');
    });
  });

  test.describe('Dismissing', () => {
    let dismissing: string;

    test.beforeEach(async ({ alertsPo }) => {
      dismissing = tabSelector + alertsPo.exampleDemosArr.dismissing;
      await alertsPo.scrollToMenu('Dismissing');
    });

    test(`example contains 3 alerts with types: success, info, danger,
                   2 clickable buttons: "Toggle dismissible", "Reset`, async ({ alertsPo }) => {
      await alertsPo.expectAlertVisible(dismissing, 'success');
      await alertsPo.expectAlertVisible(dismissing, 'info');
      await alertsPo.expectAlertVisible(dismissing, 'danger');
      await alertsPo.expectBtnTxtEqual(dismissing, 'Toggle dismissible', 3);
      await alertsPo.expectBtnTxtEqual(dismissing, 'Reset', 4);
    });

    test(`when user click on close button, then alert disappeared`, async ({ alertsPo }) => {
      await alertsPo.clickOnBtn(dismissing, 2);
      await alertsPo.expectAlertVisible(dismissing, 'danger', false);
      await alertsPo.clickOnBtn(dismissing, 1);
      await alertsPo.expectAlertVisible(dismissing, 'info', false);
      await alertsPo.clickOnBtn(dismissing, 0);
      await alertsPo.expectAlertVisible(dismissing, 'success', false);
    });

    test(`when user click "Reset" - then alerts back to default (3 alert with close buttons)`, async ({ alertsPo }) => {
      await alertsPo.clickOnBtn(dismissing, 2);
      await alertsPo.clickOnBtn(dismissing, 1);
      await alertsPo.clickOnBtn(dismissing, 0);
      await alertsPo.clickOnBtn(dismissing, 1);
      await alertsPo.expectAlertVisible(dismissing, 'success');
      await alertsPo.expectAlertVisible(dismissing, 'info');
      await alertsPo.expectAlertVisible(dismissing, 'danger');
      await alertsPo.expectBtnExist(dismissing, '×Close', 0);
      await alertsPo.expectBtnExist(dismissing, '×Close', 1);
      await alertsPo.expectBtnExist(dismissing, '×Close', 2);
    });

    test(`when user click "Toggle dismissible", then close buttons disappeared`, async ({ alertsPo }) => {
      await alertsPo.clickOnBtn(dismissing, 3);
      await alertsPo.expectAlertVisible(dismissing, 'success');
      await alertsPo.expectAlertVisible(dismissing, 'info');
      await alertsPo.expectAlertVisible(dismissing, 'danger');
      await alertsPo.expectBtnNotExist(dismissing, '×Close');
      await alertsPo.expectBtnNotExist(dismissing, '×Close');
      await alertsPo.expectBtnNotExist(dismissing, '×Close');
    });

    test(`when user click "Toggle dismissible" again, then close buttons appeared`, async ({ alertsPo }) => {
      await alertsPo.dblClickOnBtn(dismissing, 3);
      await alertsPo.expectAlertVisible(dismissing, 'success');
      await alertsPo.expectAlertVisible(dismissing, 'info');
      await alertsPo.expectAlertVisible(dismissing, 'danger');
      await alertsPo.expectBtnExist(dismissing, '×Close', 0);
      await alertsPo.expectBtnExist(dismissing, '×Close', 1);
      await alertsPo.expectBtnExist(dismissing, '×Close', 2);
    });
  });

  test.describe('Dynamic html', () => {
    let dynamicHtml: string;

    test.beforeEach(async ({ alertsPo }) => {
      dynamicHtml = tabSelector + alertsPo.exampleDemosArr.dynamicHtml;
      await alertsPo.scrollToMenu('Dynamic html');
    });

    test(`example contains 3 alerts with types: success, info, danger,
                   src of component code should contain DomSanitizer for sanitizing html`, async ({ alertsPo }) => {
      await alertsPo.expectAlertVisible(dynamicHtml, 'success');
      await alertsPo.expectAlertVisible(dynamicHtml, 'info');
      await alertsPo.expectAlertVisible(dynamicHtml, 'danger');
      await alertsPo.expectAlertHaveDescendants(dynamicHtml, 'success', 'span');
      await alertsPo.expectAlertHaveDescendants(dynamicHtml, 'info', 'span');
      await alertsPo.expectAlertHaveDescendants(dynamicHtml, 'danger', 'span');
      await alertsPo.expectComponentSrcContain('Dynamic html', 'DomSanitizer');
    });
  });

  test.describe('Dynamic content', () => {
    let dynamicContent: string;

    test.beforeEach(async ({ alertsPo }) => {
      dynamicContent = tabSelector + alertsPo.exampleDemosArr.dynamicContent;
      await alertsPo.scrollToMenu('Dynamic html');
    });

    test(`example contains 1 alert with type: success and "Change text" button`, async ({ alertsPo }) => {
      await alertsPo.expectAlertVisible(dynamicContent, 'success');
      await alertsPo.expectBtnTxtEqual(dynamicContent, 'Change text');
    });

    test(`when user click on this button, alert content changed, after click on it 2d, content changed again,
                   when click on it 3d, then button changed to "Reset" and after click on it - content form 1t`, async ({ alertsPo }) => {
      await alertsPo.expectAlertTextContains(dynamicContent, 'success', 'You successfully read this important alert');
      await alertsPo.clickOnBtn(dynamicContent);
      await alertsPo.expectAlertVisible(dynamicContent, 'success');
      await alertsPo.expectAlertTextContains(dynamicContent, 'success', 'Now this text is different from what it was before');
      await alertsPo.clickOnBtn(dynamicContent);
      await alertsPo.expectAlertVisible(dynamicContent, 'success');
      await alertsPo.expectAlertTextContains(dynamicContent, 'success', 'Well done! Click reset button');
      await alertsPo.expectBtnTxtEqual(dynamicContent, 'Reset');
      await alertsPo.clickOnBtn(dynamicContent);
      await alertsPo.expectAlertTextContains(dynamicContent, 'success', 'You successfully read this important alert');
    });
  });

  test.describe('Dismiss on timeout', () => {

    // There are added some timeouts in tests below, that we need to wait until alerts disappear
    // TODO remove these timeouts to speed up the tests run after this feature will be implemented
    // https://github.com/microsoft/playwright/issues/6347

    const timeout = 10000;
    let dismissTimeout: string;

    test.beforeEach(async ({ alertsPo }) => {
      dismissTimeout = tabSelector + alertsPo.exampleDemosArr.dismissTimeout;
      test.setTimeout(timeout);
    });

    test('example contains 1 success alert and "Add more" button', async ({ alertsPo }) => {
      await alertsPo.expectAlertVisible(dismissTimeout, 'success');
      await alertsPo.expectBtnTxtEqual(dismissTimeout, 'Add more');
      await alertsPo.expectAlertVisible(dismissTimeout, 'success', false, timeout);
    });

    test('when user click on "Add more" button, then info alert shown', async ({ alertsPo }) => {
      await alertsPo.expectAlertVisible(dismissTimeout, 'success', false, timeout);
      await alertsPo.clickOnBtn(dismissTimeout);
      await alertsPo.expectAlertVisible(dismissTimeout, 'info');
    });

    test('when user in a short time (up to 5 sec) click on button a few times, then a few alerts shown', async ({ alertsPo }) => {
      await alertsPo.clickOnBtn(dismissTimeout);
      await alertsPo.clickOnBtn(dismissTimeout);
      await alertsPo.clickOnBtn(dismissTimeout);
      await alertsPo.expectAlertCountEqual(dismissTimeout, 4);
      await alertsPo.expectAlertCountEqual(dismissTimeout, 0, timeout);
    });
  });

  test.describe('Global styling', () => {
    let globalStyling: string;

    test.beforeEach(async ({ alertsPo }) => {
      globalStyling = tabSelector + alertsPo.exampleDemosArr.globalStyling;
      await alertsPo.scrollToMenu('Global styling');
    });

    test(`example contains 1 alert with specific style, differs from default, template src contains this style`, async ({ alertsPo }) => {
      await alertsPo.expectAlertVisible(globalStyling, 'colored');
      await alertsPo.expectAlertHaveCss(globalStyling, 'background-color', 'rgb(123, 31, 162)');
      await alertsPo.expectAlertHaveCss(globalStyling, 'border-color', 'rgb(74, 20, 140)');
      await alertsPo.expectAlertHaveCss(globalStyling, 'color', 'rgb(255, 255, 255)');
      await alertsPo.expectTemplateSrcContain('Global styling', '<style>');
    });
  });

  test.describe('Component level styling', () => {
    let componentStyling: string;

    test.beforeEach(async ({ alertsPo }) => {
      componentStyling = tabSelector + alertsPo.exampleDemosArr.componentStyling;
      await alertsPo.scrollToMenu('Component level styling');
    });

    test(`example contains 1 alert with specific style, which differs from default,
                   src of component should contain this style`, async ({ alertsPo }) => {
      await alertsPo.expectAlertVisible(componentStyling, 'local');
      await alertsPo.expectAlertHaveCss(componentStyling, 'background-color', 'rgb(0, 150, 136)');
      await alertsPo.expectAlertHaveCss(componentStyling, 'border-color', 'rgb(0, 105, 92)');
      await alertsPo.expectAlertHaveCss(componentStyling, 'color', 'rgb(255, 255, 255)');
      await alertsPo.expectComponentSrcContain('Component level styling', 'styles: [');
    });
  });

  test.describe('Configuring defaults', () => {
    let configDefault: string;

    test.beforeEach(async ({ alertsPo, page }) => {
      configDefault = tabSelector + alertsPo.exampleDemosArr.config;
      await page.setViewportSize({ width: 1440, height: 900 });
    });

    test(`example contains 2 alerts with type: success, info,
                   info alert should have type: info in html and in template src`, async ({ alertsPo }) => {
      await alertsPo.clickOnDemoMenu('Configuring defaults');
      await alertsPo.expectAlertVisible(configDefault, 'success');
      await alertsPo.expectAlertVisible(configDefault, 'info');
      await alertsPo.expectComponentSrcContain('Configuring defaults', 'new AlertConfig()');
      await alertsPo.expectComponentSrcContain('Configuring defaults', 'type: \'success\'');
      await alertsPo.expectTemplateSrcContain('Configuring defaults', 'alert type="info"');
    });
  });
});
