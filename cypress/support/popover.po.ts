import { BaseComponent } from './base.component';

export class PopoverPo extends BaseComponent {
  pageUrl = '/popover';
  pageTitle = 'Popover';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/popover';

  containerPopover = 'popover-container';
  body = 'body';
  dynamicHtmlBtn = 'span.btn.btn-danger';

  exampleDemosArr = {
    basic: 'demo-popover-basic',
    placement: 'demo-popover-placement',
    dismiss: 'demo-popover-dismiss',
    dynamic: 'demo-popover-dynamic',
    customContent: 'demo-popover-custom-content',
    dynamicHtml: 'demo-popover-dynamic-html',
    appendToBody: 'demo-popover-container',
    visibilityEvents: 'demo-popover-events',
    configuringDefaults: 'demo-popover-config',
    outsideClick: 'demo-popover-outside-click',
    customTriggers: 'demo-popover-triggers-custom',
    manualTriggering: 'demo-popover-triggers-manual',
    triggerIsOpen: 'demo-popover-trigger-by-isopen',
    componentLevelStyling: 'demo-popover-styling-local',
    customClass: 'demo-popover-class',
    popoverContext: 'demo-popover-context',
    delayPopover: 'demo-popover-delay',
    hidePopoverAfterDelay: 'demo-popover-hide-after-delay'
  };

  isPopoverPlacementCorrect(baseSelector: string, placement: string) {
    cy.get(`${baseSelector} ${this.containerPopover}`).then(popover => {
      expect(popover).to.be.visible;
      expect(popover.attr('class')).to.contains(placement);
    });
  }

  isPopoverAppears(baseSelector: string) {
    cy.get(`${baseSelector}`).should('to.have.descendants', this.containerPopover);
  }

  isPopoverVisible(baseSelector: string) {
    cy.get(`${baseSelector} ${this.containerPopover}`).should('be.visible');
  }

  clickToAnotherPlacement(baseSelector: string) {
    cy.get(`${baseSelector}`).closest('.section.bd-example').click('topRight');
  }

  isPopoverDismiss(baseSelector: string) {
    cy.get(`${baseSelector}`).should('not.to.have.descendants', this.containerPopover);
  }

  isPopoverHaveCssItem(baseSelector: string, item: string, cssProperty: string, expectedCssValue: string) {
    cy.get(`${baseSelector} ${this.containerPopover} ${item}`).should('have.css', cssProperty, expectedCssValue);
  }

  isPopoverHaveCss(baseSelector: string, cssProperty: string, expectedCssValue: string) {
    cy.get(`${baseSelector} ${this.containerPopover}`).should('have.css', cssProperty, expectedCssValue);
  }
}
