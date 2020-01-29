import { PopoverPo } from '../support/popover.po';

describe('Popover demo page test suite', () => {

  const popover = new PopoverPo();

  beforeEach(() => popover.navigateTo());

  describe('Placement popover', () => {
    const placementDemo = popover.exampleDemosArr.placement;

    it('when user click on trigger btn in the Placement exmpl - container appears on the setted placement', () => {
      cy.viewport(1440, 900);
      popover.clickOnDemoMenu('Placement');
      popover.clickOnBtn(placementDemo, 0);
// TODO need to have possibility to disable CY scrolling
//  https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Scrolling
//  https://github.com/cypress-io/cypress/issues/871
      popover.isPopoverPlacementCorrect(placementDemo, 'bottom'); // TODO should be top
      popover.clickOnBtn(placementDemo, 0);
      popover.clickOnBtn(placementDemo, 1);
      popover.isPopoverPlacementCorrect(placementDemo, 'right');
      popover.clickOnBtn(placementDemo, 1);
      popover.clickOnBtn(placementDemo, 2);
      popover.isPopoverPlacementCorrect(placementDemo, 'auto');
      popover.clickOnBtn(placementDemo, 2);
      popover.clickOnBtn(placementDemo, 3);
      popover.isPopoverPlacementCorrect(placementDemo, 'left');
      popover.clickOnBtn(placementDemo, 3);
      popover.clickOnBtn(placementDemo, 4);
      popover.isPopoverPlacementCorrect(placementDemo, 'bottom');
    });
  });

  describe('Dismiss popover', () => {

    const dismissPopover = popover.exampleDemosArr.dismiss;

    it('when user clicks on "Dismissible popover", then popover-container shown', () => {
      popover.clickOnBtn(dismissPopover);
      popover.isPopoverAppears(dismissPopover);
      popover.isPopoverVisible(dismissPopover);
    });

    it('when user clicks on "Dismissible popover" again, then nothing happens', () => {
      popover.clickOnBtn(dismissPopover);
      popover.clickOnBtn(dismissPopover);
      popover.isPopoverAppears(dismissPopover);
      popover.isPopoverVisible(dismissPopover);
    });

    it('when user click to another placement - popover container disappears ', () => {
      popover.clickOnBtn(dismissPopover);
      popover.clickToAnotherPlacement(dismissPopover);
      popover.isPopoverDismiss(dismissPopover);
    });
  });

  describe('Dynamic content', () => {

    const dynamicContentPopover = popover.exampleDemosArr.dynamic;

    it('when user clicks on "Simple binding", then popover-container shown', () => {
      popover.clickOnBtn(dynamicContentPopover);
      popover.isPopoverAppears(dynamicContentPopover);
      popover.isPopoverVisible(dynamicContentPopover);
    });

    it('when user clicks on "Simple binding" again, then popover-container disappeared', () => {
      popover.clickOnBtn(dynamicContentPopover);
      popover.clickOnBtn(dynamicContentPopover);
      popover.isPopoverDismiss(dynamicContentPopover);
    });
  });

  describe('Custom content', () => {

    const customContent = popover.exampleDemosArr.customContent;

    it('when user clicks on "TemplateRef binding", then popover-container shown', () => {
      popover.clickOnBtn(customContent);
      popover.isPopoverAppears(customContent);
      popover.isPopoverVisible(customContent);
    });

    it('when user clicks on "TemplateRef binding" again, then popover-container disappeared', () => {
      popover.clickOnBtn(customContent);
      popover.clickOnBtn(customContent);
      popover.isPopoverDismiss(customContent);
    });
  });

  describe('Dynamic HTML', () => {

    const dymanicHtml = popover.exampleDemosArr.dynamicHtml;

    it('when user clicks on "Show me popover with html", then popover-container shown', () => {
      popover.clickOnBtn(dymanicHtml);
      popover.isPopoverAppears(dymanicHtml);
      popover.isPopoverVisible(dymanicHtml);
      popover.isPopoverHaveCssItem(dymanicHtml, popover.dynamicHtmlBtn, 'background-color', 'rgb(220, 53, 69)');
    });

    it('when user clicks on "Show me popover with html" again, then popover-container disappeared', () => {
      popover.clickOnBtn(dymanicHtml);
      popover.clickOnBtn(dymanicHtml);
      popover.isPopoverDismiss(dymanicHtml);
    });
  });

  describe('Append to body', () => {

    const appendToBody = popover.exampleDemosArr.appendToBody;

    it('when user clicks on "Default popover", then popover-container shown', () => {
      popover.clickOnBtn(appendToBody, 0);
      popover.isPopoverAppears(appendToBody);
      popover.isPopoverVisible(appendToBody);
    });

    it('when user clicks on "Default popover" again, then popover-container disappeared', () => {
      popover.clickOnBtn(appendToBody, 0);
      popover.clickOnBtn(appendToBody, 0);
      popover.isPopoverDismiss(appendToBody);
    });

    it('when user clicks on "Popover appended to body", then popover-container shown', () => {
      popover.clickOnBtn(appendToBody, 1);
      popover.isPopoverAppears(popover.body);
      popover.isPopoverVisible(popover.body);
    });

    it('when user clicks on "Popover appended to body" again, then popover-container disappeared', () => {
      popover.clickOnBtn(appendToBody, 1);
      popover.clickOnBtn(appendToBody, 1);
      popover.isPopoverDismiss(popover.body);
    });
  });

  describe('Visibility events', () => {

    const visibilityEvents = popover.exampleDemosArr.visibilityEvents;

    it('when user clicks on "Live demo", then popover-container shown', () => {
      popover.clickOnBtn(visibilityEvents);
      popover.isPopoverAppears(visibilityEvents);
      popover.isPopoverVisible(visibilityEvents);
      popover.isDemoContainsTxt(visibilityEvents, 'shown');
    });

    it('when user clicks on btn again, then container disappeared and card updated with "Event: hidden" text', () => {
      popover.clickOnBtn(visibilityEvents);
      popover.clickOnBtn(visibilityEvents);
      popover.isDemoContainsTxt(visibilityEvents, 'hidden');
      popover.isPopoverDismiss(visibilityEvents);
    });
  });

  describe('Configuring defaults', () => {

    const configuringDefaults = popover.exampleDemosArr.configuringDefaults;

    it('when user clicks on "Preconfigured popover", then popover-container shown', () => {
      popover.clickOnBtn(configuringDefaults);
      popover.isPopoverAppears(popover.body);
      popover.isPopoverVisible(popover.body);
    });

    it('when user clicks on "Preconfigured popover" again, nothing happens', () => {
      popover.clickOnBtn(configuringDefaults);
      popover.clickOnBtn(configuringDefaults);
      popover.isPopoverAppears(popover.body);
      popover.isPopoverVisible(popover.body);
    });

    it('when user clicks outside of "Preconfigured popover", then popover-container disabled', () => {
      popover.clickOnBtn(configuringDefaults);
      popover.clickToAnotherPlacement(configuringDefaults);
      popover.isPopoverDismiss(configuringDefaults);
      });
  });

  describe('Outside click', () => {

    const outsideClick = popover.exampleDemosArr.outsideClick;

    it('when user click on btn "Live demo" - popover container appears', () => {
      popover.clickOnBtn(outsideClick);
      popover.isPopoverAppears(outsideClick);
      popover.isPopoverVisible(outsideClick);
    });

    it('when user click on btn "Live demo" again - popover container disappears', () => {
      popover.clickOnBtn(outsideClick);
      popover.clickOnBtn(outsideClick);
      popover.isPopoverDismiss(outsideClick);
    });

    it('when user click outside the btn - popover container disappears', () => {
      popover.clickOnBtn(outsideClick);
      popover.clickToAnotherPlacement(outsideClick);
      popover.isPopoverDismiss(outsideClick);
    });
  });

  describe('Custom triggers', () => {

    const customTriggers = popover.exampleDemosArr.customTriggers;

    it('when user move mouse to "Hover over me!", then popover-container shown', () => {
      popover.hoverOnBtn(customTriggers);
      popover.isPopoverAppears(customTriggers);
      popover.isPopoverVisible(customTriggers);
    });

    it('when user move mouse out of the "Hover over me!", then popover-container disappeared', () => {
      popover.hoverOnBtn(customTriggers);
      popover.mouseLeave(customTriggers);
      popover.isPopoverDismiss(customTriggers);
    });

    it('when user clicks once on "Double click me!", nothing happens', () => {
      popover.clickOnBtn(customTriggers, 1);
      popover.isPopoverDismiss(customTriggers);
    });

    it('when user double clicks on "Double click me!", then popover-container shown', () => {
      popover.dblClickOnBtn(customTriggers, 1);
      popover.isPopoverAppears(customTriggers);
      popover.isPopoverVisible(customTriggers);
    });

    it('when user double clicks on "Double click me!", then popover-container disappeared', () => {
      popover.dblClickOnBtn(customTriggers, 1);
      popover.dblClickOnBtn(customTriggers, 1);
      popover.isPopoverDismiss(customTriggers);
    });

    it('when user clicks inside the input, nothing happens', () => {
      popover.clickOnInput(customTriggers);
      popover.isPopoverDismiss(customTriggers);
    });

    it('when user input symbols to the input field - popover container appears', () => {
      popover.clearInputAndSendKeys(customTriggers, 'popover');
      popover.isPopoverAppears(customTriggers);
      popover.isPopoverVisible(customTriggers);
    });

    it('when user click outside of the input field, then popover-container disappeared', () => {
      popover.clearInputAndSendKeys(customTriggers, 'popover');
      popover.isPopoverAppears(customTriggers);
      popover.isPopoverVisible(customTriggers);
      popover.clickToAnotherPlacement(customTriggers);
      popover.isPopoverDismiss(customTriggers);
    });
  });

  describe('Manual triggering', () => {

    const manualTriggering = popover.exampleDemosArr.manualTriggering;

    it('when user clicks on "Show", then popover-container appear above the text', () => {
      popover.clickOnBtn(manualTriggering);
      popover.isPopoverAppears(manualTriggering);
      popover.isPopoverVisible(manualTriggering);
    });

    // TODO unskip when /cypress-io/cypress/issues/871 will be fixed
    it.skip('when user clicks on "Hide", then popover-container disappeared', () => {
      popover.clickOnBtn(manualTriggering);
      popover.clickOnBtn(manualTriggering, 1);
      popover.isPopoverDismiss(manualTriggering);
    });

    it('when user clicks on "Toggle", then popover-container appear  above the text', () => {
      popover.clickOnBtn(manualTriggering, 2);
      popover.isPopoverAppears(manualTriggering);
      popover.isPopoverVisible(manualTriggering);
    });

    // TODO unskip when /cypress-io/cypress/issues/871 will be fixed
    it.skip('when user clicks on "Toggle" again, then popover-container disappeared', () => {
      popover.clickOnBtn(manualTriggering, 2);
      popover.clickOnBtn(manualTriggering, 2);
      popover.isPopoverDismiss(manualTriggering);
    });
  });

  describe('Trigger by isOpen property', () => {

    const triggerIsOpen = popover.exampleDemosArr.triggerIsOpen;

    it('when user clicks on "Toggle", then popover-container appear  above the text', () => {
      popover.clickOnBtn(triggerIsOpen);
      popover.isPopoverAppears(triggerIsOpen);
      popover.isPopoverVisible(triggerIsOpen);
    });

    // TODO unskip when /cypress-io/cypress/issues/871 will be fixed
    it.skip('when user clicks on "Toggle" again, then popover-container disappeared', () => {
      popover.clickOnBtn(triggerIsOpen);
      popover.clickOnBtn(triggerIsOpen);
      popover.isPopoverDismiss(triggerIsOpen);
    });
  });

  describe('Component level styling', () => {

    const componentLevelStyling = popover.exampleDemosArr.componentLevelStyling;

    it('when user clicks on "I have component level styling", then popover-container appear above the button', () => {
      popover.clickOnBtn(componentLevelStyling);
      popover.isPopoverAppears(componentLevelStyling);
      popover.isPopoverVisible(componentLevelStyling);
      popover.isPopoverHaveCss(componentLevelStyling, 'background-color', 'rgb(0, 150, 136)');
    });

    it('when user clicks on "I have component level styling" again, then popover-container disappeared', () => {
      popover.clickOnBtn(componentLevelStyling);
      popover.clickOnBtn(componentLevelStyling);
      popover.isPopoverDismiss(componentLevelStyling);
    });
  });

  describe('Custom class', () => {

    const customClass = popover.exampleDemosArr.customClass;

    it('when user clicks on "Custom class demo", then popover-container appear above the button', () => {
      popover.clickOnBtn(customClass);
      popover.isPopoverAppears(customClass);
      popover.isPopoverVisible(customClass);
    });

    it('when user clicks on "Custom class demo" again, then popover-container disappeared', () => {
      popover.clickOnBtn(customClass);
      popover.clickOnBtn(customClass);
      popover.isPopoverDismiss(customClass);
    });
  });

  describe('Popover context', () => {

    const popoverContext = popover.exampleDemosArr.popoverContext;

    it('when user clicks on "Open popover with custom context", then popover-container appear above the button', () => {
      cy.viewport(1440, 900);
      popover.clickOnDemoMenu('Popover');
      popover.clickOnBtn(popoverContext);
      popover.isPopoverAppears(popoverContext);
      popover.isPopoverVisible(popoverContext);
    });

    it('when user clicks on "Open popover with custom context" again, then popover-container disappeared', () => {
      cy.viewport(1440, 900);
      popover.clickOnDemoMenu('Popover');
      popover.clickOnBtn(popoverContext);
      popover.clickOnBtn(popoverContext);
      popover.isPopoverDismiss(popoverContext);
    });
  });

  describe('Popover with delay', () => {
    const delayPopover = popover.exampleDemosArr.delayPopover;
    it('when user clicks on "Popover with 0.5sec delay", then popover-container appear', () => {
      cy.viewport(1440, 900);
      popover.clickOnDemoMenu('Popover with delay');
      popover.clickOnBtn(delayPopover);
      popover.isPopoverAppears(delayPopover);
      popover.isPopoverVisible(delayPopover);
    });

    it('when user clicks on "Popover with 0.5sec delay" again, then popover-container disappeared', () => {
      cy.viewport(1440, 900);
      popover.clickOnDemoMenu('Popover with delay');
      popover.clickOnBtn(delayPopover);
      popover.isPopoverAppears(delayPopover);
      popover.clickOnBtn(delayPopover);
      popover.isPopoverDismiss(delayPopover);
    });
  });

  describe('Hide popover after delay', () => {
    const hideAfterDelay = popover.exampleDemosArr.hidePopoverAfterDelay;
    it('when user clicks on "Popover will disappear after 3 seconds", then popover-container disappears', () => {
      cy.viewport(1440, 900);
      popover.clickOnDemoMenu('Hide popover after delay');
      popover.clickOnBtn(hideAfterDelay);
      popover.isPopoverAppears(popover.body);
      popover.isPopoverDismiss(popover.body);

    });

    it('when user clicks on "Popover will disappear after 3 seconds" again, then popover-container disappeared', () => {
      cy.viewport(1440, 900);
      popover.clickOnDemoMenu('Hide popover after delay');
      popover.clickOnBtn(hideAfterDelay);
      popover.isPopoverAppears(popover.body);
      popover.clickOnBtn(hideAfterDelay);
      popover.isPopoverDismiss(popover.body);
    });
  });
});
