import { BaseComponent } from './base.component';

export class PopoverPo extends BaseComponent {
  pageUrl = '/popover';
  pageTitle = 'Popover';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/popover';

  togglerPopover = 'button';
  containerPopover = 'popover-container';
  body = 'body';

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
    popoverContext: 'demo-popover-context'
  };

  popoverPlacements = {
    top: { popoverClass: 'popover in popover-top bs-popover-top top show', name: 'Popover on top' },
    right: {
      popoverClass: 'popover in popover-right bs-popover-right right show',
      name: 'Popover on right'
    },
    auto: {
      popoverClass: 'popover in popover-auto bs-popover-auto auto show bottom',
      name: 'Popover auto'
    },
    left: {
      popoverClass: 'popover in popover-left bs-popover-left left show',
      name: 'Popover on left'
    },
    bottom: {
      popoverClass: 'popover in popover-bottom bs-popover-bottom bottom show',
      name: 'Popover on bottom'
    }
  };

  isPopoverPlacementCorrect(baseSelector: string, placement: string, buttonName: string) {
    cy.get(`${baseSelector} ${this.togglerPopover}`).contains(buttonName).click();

    cy.get(`${baseSelector} ${this.containerPopover}`).should('be.visible').should('have.attr', 'class', placement);

    cy.get(`${baseSelector} ${this.togglerPopover}`).contains(buttonName).click();
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
}
