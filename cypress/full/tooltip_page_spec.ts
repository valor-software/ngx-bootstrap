import { TooltipPo } from '../support/tooltip.po';

describe('Tooltip demo page test suite', () => {
  const tooltip = new TooltipPo();

  beforeEach(() => tooltip.navigateTo());

  describe('Placement tooltip', () => {
    const placementDemo = tooltip.exampleDemosArr.placement;

    it('when user hover on Trigger btn in the Placement exmpl - tooltip appears on the setted placement', () => {
      cy.viewport(1440, 900);
      tooltip.focusOnBtn(placementDemo, 0);
      tooltip.isTooltipPlacementCorrect(placementDemo, 'top');
      tooltip.focusOnBtn(placementDemo, 1);
      tooltip.isTooltipPlacementCorrect(placementDemo, 'right');
      tooltip.focusOnBtn(placementDemo, 2);
      tooltip.isTooltipPlacementCorrect(placementDemo, 'right');
      tooltip.focusOnBtn(placementDemo, 3);
      tooltip.isTooltipPlacementCorrect(placementDemo, 'left');
      tooltip.focusOnBtn(placementDemo, 4);
      tooltip.isTooltipPlacementCorrect(placementDemo, 'bottom');
    });
  });

  describe('Dismiss tooltip', () => {
    const dismissDemo = tooltip.exampleDemosArr.dismiss;

    it('when user clicks on "Dismissible tooltip", then tooltip-container shown', () => {
      tooltip.clickOnBtn(dismissDemo);
      tooltip.isTooltipAppears(dismissDemo);
      tooltip.isTooltipVisible(dismissDemo);
    });

    it('when user clicks on "Dismissible tooltip" again, then nothing happens', () => {
      tooltip.clickOnBtn(dismissDemo);
      tooltip.clickOnBtn(dismissDemo);
      tooltip.isTooltipAppears(dismissDemo);
      tooltip.isTooltipVisible(dismissDemo);
    });

    it('when user clicks the another placement, then tooltip-container disappeared', () => {
      tooltip.clickOnBtn(dismissDemo);
      tooltip.clickToAnotherPlacement(dismissDemo);
      tooltip.isTooltipDismiss(dismissDemo);
    });
  });

  describe('Dynamic Content', () => {
    const dynamicContent = tooltip.exampleDemosArr.dynamicTooltip;

    it('when user hover on "Simple binding", then tooltip-container shown', () => {
      tooltip.focusOnBtn(dynamicContent);
      tooltip.isTooltipAppears(dynamicContent);
      tooltip.isTooltipVisible(dynamicContent);
    });

    it('when user moves the mouse cursor away of tooltip-button, then tooltip-container disappeared', () => {
      tooltip.focusOnBtn(dynamicContent);
      tooltip.focusToAnotherPlacement('Dynamic Content');
      tooltip.isTooltipDismiss(dynamicContent);
    });
  });

  describe('Custom content template', () => {
    const customContentTemplate = tooltip.exampleDemosArr.customContentTemplate;

    it('when user clicks on the Custom content template tooltip btn, Tooltip appears', () => {
      tooltip.focusOnBtn(customContentTemplate);
      tooltip.isTooltipAppears(customContentTemplate);
    });

    it('when user moves the mouse cursor away, then tooltip-container disappeared', () => {
      tooltip.focusOnBtn(customContentTemplate);
      tooltip.focusToAnotherPlacement('Custom content template');
      tooltip.isTooltipDismiss(customContentTemplate);
    });
  });

  describe('Dynamic Html', () => {
    const dynamicHtmlTooltip = tooltip.exampleDemosArr.dynamicHtml;

    it('when user hover on "Show me tooltip with html", then tootip-container shown', () => {
      tooltip.focusOnBtn(dynamicHtmlTooltip);
      tooltip.isTooltipAppears(dynamicHtmlTooltip);
      tooltip.isTooltipVisible(dynamicHtmlTooltip);
    });

    it('when user moves the mouse cursor away, then tooltip-container disappeared', () => {
      tooltip.focusOnBtn(dynamicHtmlTooltip);
      tooltip.focusToAnotherPlacement('Dynamic Html');
      tooltip.isTooltipDismiss(dynamicHtmlTooltip);
    });
  });

  describe('Append to body', () => {
    const appendToBody = tooltip.exampleDemosArr.appendToBody;

    it('when user hover on "Default tooltip", then tooltip-container shown on the top of button', () => {
      tooltip.focusOnBtn(appendToBody);
      tooltip.isTooltipAppears(tooltip.body);
      tooltip.isTooltipVisible(tooltip.body);
    });

    it('when user moves the mouse cursor away of tooltip-button, then tooltip-container disappeared', () => {
      tooltip.focusOnBtn(appendToBody);
      tooltip.focusToAnotherPlacement('Append to body');
      tooltip.isTooltipDismiss(tooltip.body);
    });
  });

  describe('Configuring defaults', () => {
    const configuringDefaults = tooltip.exampleDemosArr.configuringDefaults;

    it('when user hover on "Preconfigured tooltip", then tooltip-container shown', () => {
      tooltip.focusOnBtn(configuringDefaults);
      tooltip.isTooltipAppears(tooltip.body);
      tooltip.isTooltipVisible(tooltip.body);
    });

    it('when user moves the mouse cursor away, then tooltip-container disappeared', () => {
      tooltip.focusOnBtn(configuringDefaults);
      tooltip.focusToAnotherPlacement('Configuring defaults');
      tooltip.isTooltipDismiss(configuringDefaults);
    });
  });

  describe('Custom triggers', () => {
    const customTriggersTooltip = tooltip.exampleDemosArr.customTriggersTooltip;

    it('when user move mouse to "Hover over me!", then tooltip-container shown', () => {
      tooltip.hoverOnBtn(customTriggersTooltip);
      tooltip.isTooltipAppears(customTriggersTooltip);
      tooltip.isTooltipVisible(customTriggersTooltip);
    });

    it('when user move mouse out of the "Hover over me!", nothing happens', () => {
      tooltip.hoverOnBtn(customTriggersTooltip);
      tooltip.mouseLeave(customTriggersTooltip);
      tooltip.isTooltipAppears(customTriggersTooltip);
      tooltip.isTooltipVisible(customTriggersTooltip);
    });

    it('when user clicks on "Hover over me!", then tooltip-container disappeared', () => {
      tooltip.hoverOnBtn(customTriggersTooltip);
      tooltip.clickOnBtn(customTriggersTooltip);
      tooltip.isTooltipDismiss(customTriggersTooltip);
    });

    it('when user hover on "Click on me!", nothing happens', () => {
      tooltip.hoverOnBtn(customTriggersTooltip, 1);
      tooltip.isTooltipDismiss(customTriggersTooltip);
    });

    it('when user clicks on "Click on me!", then tooltip-container shown', () => {
      tooltip.clickOnBtn(customTriggersTooltip, 1);
      tooltip.isTooltipAppears(customTriggersTooltip);
      tooltip.isTooltipVisible(customTriggersTooltip);
    });

    it('when user move mouse out of the "Click on me!", nothing happens', () => {
      tooltip.clickOnBtn(customTriggersTooltip, 1);
      tooltip.focusToAnotherPlacement('Custom triggers');
      tooltip.isTooltipAppears(customTriggersTooltip);
      tooltip.isTooltipVisible(customTriggersTooltip);
    });

    it('when user clicks on "Click on me!", then tooltip-container disappeared', () => {
      tooltip.clickOnBtn(customTriggersTooltip, 1);
      tooltip.clickOnBtn(customTriggersTooltip, 1);
      tooltip.isTooltipDismiss(customTriggersTooltip);
    });
  });

  describe('Manual triggering', () => {
    const manualTriggeringTooltip = tooltip.exampleDemosArr.manualTriggeringTooltip;

    it('when user clicks on "Show", then tooltip-container appear  above the text', () => {
      tooltip.clickOnBtn(manualTriggeringTooltip, 0);
      tooltip.isTooltipAppears(manualTriggeringTooltip);
      tooltip.isTooltipVisible(manualTriggeringTooltip);
    });

    it('when user clicks on "Hide", then tooltip-container disappeared', () => {
      tooltip.clickOnBtn(manualTriggeringTooltip, 0);
      tooltip.clickOnBtn(manualTriggeringTooltip, 1);
      tooltip.isTooltipDismiss(manualTriggeringTooltip);
    });

    it('when user clicks on "Toggle", then tooltip-container appear', () => {
      tooltip.clickOnBtn(manualTriggeringTooltip, 2);
      tooltip.isTooltipAppears(manualTriggeringTooltip);
      tooltip.isTooltipVisible(manualTriggeringTooltip);
    });

    it('when user clicks on "Toggle" again, then tooltip-container disappeared', () => {
      tooltip.clickOnBtn(manualTriggeringTooltip, 2);
      tooltip.clickOnBtn(manualTriggeringTooltip, 2);
      tooltip.isTooltipDismiss(manualTriggeringTooltip);
    });
  });

  describe('Component level styling', () => {
    const componentLevelStyling = tooltip.exampleDemosArr.componentLevelStyling;

    it('when user hover on "I have component level styling", then tooltip-container appear', () => {
      tooltip.focusOnBtn(componentLevelStyling);
      tooltip.isTooltipAppears(componentLevelStyling);
      tooltip.isTooltipVisible(componentLevelStyling);
    });

    it('when user move mouse out of the "I have component level styling", then tooltip-container disappeared', () => {
      tooltip.focusOnBtn(componentLevelStyling);
      tooltip.focusToAnotherPlacement('Component level styling');
      tooltip.isTooltipDismiss(componentLevelStyling);
    });
  });

  describe('Custom class', () => {
    const customClass = tooltip.exampleDemosArr.customClass;

    it('when user hover on the "IDemo with custom class" btn, tooltip appears', () => {
      tooltip.focusOnBtn(customClass);
      tooltip.isTooltipAppears(customClass);
    });

    it('when user moves the mouse cursor away, then tooltip-container disappeared', () => {
      tooltip.focusOnBtn(customClass);
      tooltip.focusToAnotherPlacement('Custom class');
      tooltip.isTooltipDismiss(customClass);
    });
  });

  describe('Tooltip with delay', () => {
    const delayTooltip = tooltip.exampleDemosArr.delayTooltip;
    it('when user hover on "Tooltip with 0.5sec delay", then tooltip-container appear', () => {
      cy.viewport(1440, 900);
      tooltip.clickOnDemoMenu('Tooltip with delay');
      tooltip.focusOnBtn(delayTooltip);
      tooltip.isTooltipAppears(delayTooltip);
      tooltip.isTooltipVisible(delayTooltip);
    });

    it('when user move mouse out of the "Tooltip with 0.5sec delay", then tooltip-container disappeared', () => {
      cy.viewport(1440, 900);
      tooltip.clickOnDemoMenu('Tooltip with delay');
      tooltip.focusOnBtn(delayTooltip);
      tooltip.isTooltipAppears(delayTooltip);
      tooltip.focusToAnotherPlacement('Tooltip with delay');
      tooltip.isTooltipDismiss(delayTooltip);
    });
  });

  describe('Hide tooltip after delay', () => {
    const hideAfterDelay = tooltip.exampleDemosArr.hideTooltipAfterDelay;
    it('when user hover on "Tooltip will disappear after 3 seconds", then tooltip-container disappears', () => {
      cy.viewport(1440, 900);
      tooltip.clickOnDemoMenu('Hide tooltip after delay');
      tooltip.focusOnBtn(hideAfterDelay);
      tooltip.isTooltipAppears(hideAfterDelay);
      tooltip.isTooltipDismiss(hideAfterDelay);
    });

    it('when user moves mouse out of the "Tooltip will disappear after 3 seconds", then tooltip-container disappeared', () => {
      cy.viewport(1440, 900);
      tooltip.clickOnDemoMenu('Hide tooltip after delay');
      tooltip.focusOnBtn(hideAfterDelay);
      tooltip.isTooltipAppears(hideAfterDelay);
      tooltip.focusToAnotherPlacement('Hide tooltip after delay');
      tooltip.isTooltipDismiss(hideAfterDelay);
    });
  });
});
