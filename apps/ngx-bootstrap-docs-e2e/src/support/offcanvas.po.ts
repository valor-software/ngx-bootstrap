import { BaseComponent } from './base.component';
import Agent = Cypress.Agent;

export class OffcanvasPo extends BaseComponent {
  pageUrl = '#/components/offcanvas';
  pageTitle = 'Offcanvas';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/offcanvas';

  exampleDemosArr = {
    basic: 'tab[heading="Overview"] basic',
    backdrop: 'tab[heading="Overview"] backdrop',
    backdropScrolling: 'tab[heading="Overview"] backdrop-scrolling',
    differentPosition: 'tab[heading="Overview"] different-position',
    headerTitle: 'tab[heading="Overview"] header-title',
    triggerEvent: 'tab[heading="Overview"] trigger-event',
    waysToUse: 'tab[heading="Overview"] use-ways',
    offcanvasElement: '.offcanvas',
    backdropElement: '.offcanvas-backdrop',
    headerElement: '.offcanvas-header'
  };

  checkClass(baseSelector: string, classValue: string, not = false) {
    if (!not) {
      cy.get(`${baseSelector}`).should('to.have.class', classValue);
      return;
    }

    cy.get(`${baseSelector}`).should('not.have.class', classValue);
  }

  checkTextContent(baseSelector: string, expectedContent: string) {
    cy.get(`${baseSelector}`)
      .invoke('text')
      .should('to.contains', expectedContent);
  }

  checkBackdropInDom(baseSelector: string) {
    cy.get(`${baseSelector}`).should('not.exist');
  }

  clickOnBackdrop(baseSelector: string) {
    cy.get(`${ baseSelector }`).click();
  }
}
