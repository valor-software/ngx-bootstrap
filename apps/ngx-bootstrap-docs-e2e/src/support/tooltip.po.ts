import { BaseComponent } from './base.component';

export class TooltipPo extends BaseComponent {
  pageUrl = '/ngx-bootstrap/components/tooltip';
  pageTitle = 'Tooltip';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/tooltip';

  containerTooltip = 'bs-tooltip-container';
  body = 'body';

  exampleDemosArr = {
    basic: 'tab[heading="Overview"] demo-tooltip-basic',
    placement: 'tab[heading="Overview"] demo-tooltip-placement',
    dismiss: 'tab[heading="Overview"] demo-tooltip-dismiss',
    dynamicTooltip: 'tab[heading="Overview"] demo-tooltip-dynamic',
    customContentTemplate: 'tab[heading="Overview"] demo-tooltip-custom-content',
    dynamicHtml: 'tab[heading="Overview"] demo-tooltip-dynamic-html',
    appendToBody: 'tab[heading="Overview"] demo-tooltip-container',
    configuringDefaults: 'tab[heading="Overview"] demo-tooltip-config',
    customTriggersTooltip: 'tab[heading="Overview"] demo-tooltip-triggers-custom',
    manualTriggeringTooltip: 'tab[heading="Overview"] demo-tooltip-triggers-manual',
    componentLevelStyling: 'tab[heading="Overview"] demo-tooltip-styling-local',
    customClass: 'tab[heading="Overview"] demo-tooltip-class',
    delayTooltip: 'tab[heading="Overview"] demo-tooltip-delay'
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
