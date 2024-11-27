import { BaseComponent } from './base.component';

export class PopoverPo extends BaseComponent {
  pageUrl = '/ngx-bootstrap/components/popover';
  pageTitle = 'Popover';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/popover';

  containerPopover = 'popover-container';
  body = 'body';
  dynamicHtmlBtn = 'span.btn.btn-danger';

  exampleDemosArr = {
    basic: 'tab[heading="Overview"] demo-popover-basic',
    placement: 'tab[heading="Overview"] demo-popover-placement',
    dismiss: 'tab[heading="Overview"] demo-popover-dismiss',
    dynamic: 'tab[heading="Overview"] demo-popover-dynamic',
    customContent: 'tab[heading="Overview"] demo-popover-custom-content',
    dynamicHtml: 'tab[heading="Overview"] demo-popover-dynamic-html',
    appendToBody: 'tab[heading="Overview"] demo-popover-container',
    visibilityEvents: 'tab[heading="Overview"] demo-popover-events',
    configuringDefaults: 'tab[heading="Overview"] demo-popover-config',
    outsideClick: 'tab[heading="Overview"] demo-popover-outside-click',
    customTriggers: 'tab[heading="Overview"] demo-popover-triggers-custom',
    manualTriggering: 'tab[heading="Overview"] demo-popover-triggers-manual',
    triggerIsOpen: 'tab[heading="Overview"] demo-popover-trigger-by-isopen',
    componentLevelStyling: 'tab[heading="Overview"] demo-popover-styling-local',
    customClass: 'tab[heading="Overview"] demo-popover-class',
    popoverContext: 'tab[heading="Overview"] demo-popover-context',
    delayPopover: 'tab[heading="Overview"] demo-popover-delay'
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
