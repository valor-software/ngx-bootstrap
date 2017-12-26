import { browser } from 'protractor';
import { tooltipEl } from '../selectors.json';

async function tooltipIsDisplayed(): Promise<boolean> {
  return await tooltipEl.tooltipElement.isDisplayed();
}

async function getTooltipAttribute(): Promise<string> {
  return await tooltipEl.buttonComponentLevelStyling.getAttribute('tooltip');
}

describe('Tooltip page test on bootstrap 3.', () => {
  beforeAll(() => {
    browser.get('#/tooltip');
  });

  it('Check the tooltip for Simple demo button.', () => {
    browser.actions()
      .mouseMove(tooltipEl.buttonSimpleDemo)
      .perform();

    expect(tooltipIsDisplayed).toBeTruthy();
  });

  it('Four directions tooltip.', () => {
    browser.actions()
      .mouseMove(tooltipEl.buttonFourDirectionsLeft)
      .perform();
    expect(tooltipIsDisplayed).toBeTruthy();

    browser.actions()
      .mouseMove(tooltipEl.buttonFourDirectionsTop)
      .perform();
    expect(tooltipIsDisplayed).toBeTruthy();

    browser.actions()
      .mouseMove(tooltipEl.buttonFourDirectionsBottom)
      .perform();
    expect(tooltipIsDisplayed).toBeTruthy();

    browser.actions()
      .mouseMove(tooltipEl.buttonFourDirectionsRight)
      .perform();
    expect(tooltipIsDisplayed).toBeTruthy();
  });

  it('Dismissible tooltip.', () => {
    browser.actions()
      .click(tooltipEl.buttonDismissible)
      .perform();

    expect(tooltipIsDisplayed).toBeTruthy();
  });

  it('Dynamic Content tooltip.', () => {
    browser.actions()
      .mouseMove(tooltipEl.buttonSimpleBinding)
      .perform();
    expect(tooltipIsDisplayed).toBeTruthy();

    browser.actions()
      .mouseMove(tooltipEl.buttonTemplateRefBinding)
      .perform();
    expect(tooltipIsDisplayed).toBeTruthy();
  });

  it('Dynamic Html tooltip.', () => {
    browser.actions()
      .mouseMove(tooltipEl.buttonDynamicHTML)
      .perform();

    expect(tooltipIsDisplayed).toBeTruthy();
  });

  it('Append to body.', () => {
    browser.actions()
      .mouseMove(tooltipEl.buttonDefaultTooltip)
      .perform();
    expect(tooltipIsDisplayed).toBeTruthy();

    browser.actions()
      .mouseMove(tooltipEl.buttonAppendedToBody)
      .perform();
    expect(tooltipIsDisplayed).toBeTruthy();
  });

  it('Preconfigured tooltip.', () => {
    const textTemplate = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';

    browser.actions()
      .mouseMove(tooltipEl.buttonPreconfiguredTooltip)
      .perform();

    expect(getTooltipAttribute).toContain(textTemplate);
  });

  it('Custom triggers.', () => {
    browser.actions()
      .mouseMove(tooltipEl.buttonCustomTriggers)
      .perform(); // Moving over button to show tooltip.
    expect(tooltipIsDisplayed).toBeTruthy();

    browser.actions()
      .mouseMove(tooltipEl.buttonPreconfiguredTooltip)
      .perform(); // Moving to to another button to test than tooltip still showed.
    expect(tooltipIsDisplayed).toBeTruthy();

    browser.actions()
      .click(tooltipEl.buttonCustomTriggers)
      .perform(); // Clicking the button - tooltip must be hidden.
    expect(tooltipIsDisplayed).toBeFalsy();
  });

  it('Manual triggering.', () => {
    expect(tooltipIsDisplayed).toBeFalsy();

    browser.actions()
      .click(tooltipEl.buttonManualTriggeringShow)
      .perform();
    expect(tooltipIsDisplayed).toBeTruthy();

    browser.actions()
      .click(tooltipEl.buttonManualTriggeringHide)
      .perform();
    expect(tooltipIsDisplayed).toBeFalsy();
  });

  it('Component level styling.', () => {
    const textTemplate = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';

    browser.actions()
      .mouseMove(tooltipEl.buttonComponentLevelStyling)
      .perform();

    expect(getTooltipAttribute).toContain(textTemplate);
  });
});
