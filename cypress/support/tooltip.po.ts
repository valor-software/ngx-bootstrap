import { BaseComponent } from './base.component';

export class TooltipPo extends BaseComponent {
  pageUrl = '/tooltip';
  pageTitle = 'Tooltip';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/tooltip';

  togglerTooltip = 'button';
  containerTooltip = 'bs-tooltip-container';
  body = 'body';

  exampleDemosArr = {
    basic: 'demo-tooltip-basic',
    placement: 'demo-tooltip-placement',
    dismiss: 'demo-tooltip-dismiss',
    dynamicTooltip: 'demo-tooltip-dynamic',
    customContentTemplate: 'demo-tooltip-custom-content',
    dynamicHtml: 'demo-tooltip-dynamic-html',
    appendToBody: 'demo-tooltip-container',
    configuringDefaults: 'demo-tooltip-config',
    customTriggersTooltip: 'demo-tooltip-triggers-custom',
    manualTriggeringTooltip: 'demo-tooltip-triggers-manual',
    componentLevelStyling: 'demo-tooltip-styling-local',
    customClass: 'demo-tooltip-class',
    delayTooltip: 'demo-tooltip-delay'
  };

  tooltipPlacements = {
    top: { tooltipClass: 'tooltip in tooltip-top bs-tooltip-top top show', name: 'Tooltip on top' },
    right: {
      tooltipClass: 'tooltip in tooltip-right bs-tooltip-right right show',
      name: 'Tooltip on right'
    },
    auto: {
      tooltipClass: 'tooltip in tooltip-auto bs-tooltip-auto auto show bottom',
      name: 'Tooltip auto'
    },
    left: {
      tooltipClass: 'tooltip in tooltip-left bs-tooltip-left left show',
      name: 'Tooltip on left'
    },
    bottom: {
      tooltipClass: 'tooltip in tooltip-bottom bs-tooltip-bottom bottom show',
      name: 'Tooltip on bottom'
    }
  };

  isTooltipPlacementCorrect(baseSelector: string, placement: string, buttonName: string) {
    cy.get(`${baseSelector} ${this.togglerTooltip}`).contains(buttonName).focus();
    cy.get(`${baseSelector} ${this.containerTooltip}`).should('be.visible').should('have.attr', 'class', placement);
  }

  focusOnBtn(baseSelector: string, buttonIndex?: number) {
    cy.get(`${ baseSelector } button`).eq(buttonIndex ? buttonIndex : 0).focus();
  }

  isTooltipAppears(baseSelector: string) {
    cy.get(`${baseSelector}`).should('to.have.descendants', this.containerTooltip);
  }

  isTooltipVisible(baseSelector: string) {
    cy.get(`${baseSelector} ${this.containerTooltip}`).should('be.visible');
  }

  isTooltipDismiss(baseSelector: string) {
    cy.get(`${baseSelector}`).should('not.to.have.descendants', this.containerTooltip);
  }

  clickToAnotherPlacement(baseSelector: string) {
    cy.get(`${baseSelector}`).parent().click('topRight');
  }

  focusToAnotherPlacement(demoName: string) {
    cy.get('examples h3').contains(demoName).find('a.anchor-link').focus();
  }
}
