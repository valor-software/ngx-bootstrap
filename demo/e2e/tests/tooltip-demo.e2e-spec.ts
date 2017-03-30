import {browser} from 'protractor';
import {tooltipEl} from '../selectors.json';

describe('Tooltip page test on bootstrap 3.', () => {
  beforeAll(() => {
    browser.get('#/tooltip');
  });


  it('Check the tooltip for Simple demo button.', () => {
    browser.actions()
      .mouseMove(tooltipEl.buttonSimpleDemo)
      .perform();
    expect(tooltipEl.tooltipElement.isDisplayed()).toBe(true);
  });

  it('Four directions tooltip.', () => {
    browser.actions()
      .mouseMove(tooltipEl.buttonFourDirectionsLeft)
      .perform();
    expect(tooltipEl.tooltipElement.isPresent()).toBe(true);

    browser.actions()
      .mouseMove(tooltipEl.buttonFourDirectionsTop)
      .perform();
    expect(tooltipEl.tooltipElement.isPresent()).toBe(true);

    browser.actions()
      .mouseMove(tooltipEl.buttonFourDirectionsBottom)
      .perform();
    expect(tooltipEl.tooltipElement.isPresent()).toBe(true);

    browser.actions()
      .mouseMove(tooltipEl.buttonFourDirectionsRight)
      .perform();
    expect(tooltipEl.tooltipElement.isPresent()).toBe(true);
  });

  it('Dismissible tooltip.', () => {
    browser.actions()
      .click(tooltipEl.buttonDismissible)
      .perform();
    expect(tooltipEl.tooltipElement.isPresent()).toBe(true);
  });

  it('Dynamic Content tooltip.', () => {
    browser.actions()
      .mouseMove(tooltipEl.buttonSimpleBinding)
      .perform();
    expect(tooltipEl.tooltipElement.isPresent()).toBe(true);

    browser.actions()
      .mouseMove(tooltipEl.buttonTemplateRefBinding)
      .perform();
    expect(tooltipEl.tooltipElement.isPresent()).toBe(true);
  });

  it('Dynamic Html tooltip.', () => {
    browser.actions()
      .mouseMove(tooltipEl.buttonDynamicHTML)
      .perform();
    expect(tooltipEl.tooltipElement.isPresent()).toBe(true);
  });

  it('Append to body.', () => {
    browser.actions()
      .mouseMove(tooltipEl.buttonDefaultTooltip)
      .perform();
    expect(tooltipEl.tooltipElement.isPresent()).toBe(true);

    browser.actions()
      .mouseMove(tooltipEl.buttonAppendedToBody)
      .perform();
    expect(tooltipEl.tooltipElement.isPresent()).toBe(true);
  });

  it('Preconfigured tooltip.', () => {
    browser.actions()
      .mouseMove(tooltipEl.buttonPreconfiguredTooltip)
      .perform();
    expect(tooltipEl.buttonPreconfiguredTooltip.getAttribute('tooltip')).toContain("Vivamus sagittis lacus vel augue laoreet rutrum faucibus.");
  });

  it('Custom triggers.', () => {
    browser.actions()
      .mouseMove(tooltipEl.buttonCustomTriggers)
      .perform();//Moving over button to show tooltip.
    expect(tooltipEl.tooltipElement.isPresent()).toBe(true);

    browser.actions()
      .mouseMove(tooltipEl.buttonPreconfiguredTooltip)
      .perform();//Moving to to another button to test than tooltip still showed.
    expect(tooltipEl.tooltipElement.isPresent()).toBe(true);

    browser.actions()
      .click(tooltipEl.buttonCustomTriggers)
      .perform();//Clicking the button - tooltip must be hidden.
    expect(tooltipEl.tooltipElement.isPresent()).toBe(false);
  });

  it('Manual triggering.', () => {
    expect(tooltipEl.tooltipElement.isPresent()).toBe(false);

    browser.actions()
      .click(tooltipEl.buttonManualTriggeringShow)
      .perform();
    expect(tooltipEl.tooltipElement.isPresent()).toBe(true);

    browser.actions()
      .click(tooltipEl.buttonManualTriggeringHide)
      .perform();
    expect(tooltipEl.tooltipElement.isPresent()).toBe(false);

  });

  it('Component level styling.', () => {
    browser.actions()
      .mouseMove(tooltipEl.buttonComponentLevelStyling)
      .perform();
    expect(tooltipEl.buttonComponentLevelStyling.getAttribute('tooltip')).toContain("Vivamus sagittis lacus vel augue laoreet rutrum faucibus.");
  });
});
