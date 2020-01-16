import { BaseComponent } from './base.component';

export class TooltipPo extends BaseComponent {
  pageUrl = '/tooltip';
  pageTitle = 'Tooltip';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/tooltip';

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
    delayTooltip: 'demo-tooltip-delay',
    hideTooltipAfterDelay: 'demo-tooltip-hide-after-delay'
  };

  isTooltipPlacementCorrect(baseSelector: string, placement: string) {
    cy.get(`${baseSelector} ${this.containerTooltip}`).then(tooltip => {
      expect(tooltip).to.be.visible;
      expect(tooltip.attr('class')).to.contains(placement);
    });
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
