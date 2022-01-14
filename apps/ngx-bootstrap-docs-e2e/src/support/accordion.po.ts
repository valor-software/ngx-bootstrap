import { BaseComponent } from './base.component';
import Agent = Cypress.Agent;

export class AccordionPo extends BaseComponent {
  pageUrl = '#/components/accordion';
  pageTitle = 'Accordion';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/accordion';
  additionalHtml = '.badge';

  exampleDemosArr = {
    basic: 'tab[heading="Overview"] demo-accordion-basic',
    openEvent: 'tab[heading="Overview"] demo-accordion-open-event',
    customHtml: 'tab[heading="Overview"] demo-accordion-custom-html',
    disabled: 'tab[heading="Overview"] demo-accordion-disabled',
    initiallyOpened: 'tab[heading="Overview"] demo-accordion-opened',
    dynamicAccordion: 'tab[heading="Overview"] demo-accordion-dynamic',
    dynamicBody: 'tab[heading="Overview"] demo-accordion-dynamic-body',
    manualToggle: 'tab[heading="Overview"] demo-accordion-manual-toggle',
    oneAtATime: 'tab[heading="Overview"] demo-accordion-one-time',
    styling: 'tab[heading="Overview"] demo-accordion-styling',
    config: 'tab[heading="Overview"] demo-accordion-config'
  };

  isAccordionLengthEqual(baseSelector: string, expectedLength: number) {
    cy.get(`${baseSelector}`).first().find('accordion-group').should('to.have.length', expectedLength);
  }

  isAccordionItemExpanded(baseSelector: string, itemIndex: number, expanded: boolean) {
    cy.get(`${baseSelector} accordion-group`)
      .eq(itemIndex)
      .find('.accordion-toggle')
      .should('to.have.attr', `aria-expanded`, `${expanded}`);
  }

  clickOnAccordionGroup(baseSelector: string, itemIndex: number) {
    cy.get(`${baseSelector} accordion-group button`)
      .eq(itemIndex)
      .click();
  }

  isItemContentVisible(baseSelector: string, itemIndex: number, visible: boolean) {
    cy.get(`${baseSelector} .panel-body`)
      .eq(itemIndex, {timeout: 10000})
      .should(visible ? 'be.visible' : 'not.be.visible');
  }

  createBrowserLogSpy() {
    return cy.window().then(win => {
      return cy.spy(win.console, 'log');
    });
  }

  isConsoleLogCalled(consoleSpy: Agent<sinon.SinonSpy>, isCalled: boolean, expectedLog?: string) {
    if (!isCalled) {
      cy.wrap(consoleSpy).should('not.have.been.called');
    } else {
      cy.wrap(consoleSpy).should('to.be.calledWith', expectedLog);
    }
  }

  isAccordionItemContain(baseSelector: string, additionalSelector: string, itemIndex: number, expectedContent: string, visible: boolean) {
    cy.get(`${baseSelector} accordion-group`)
      .eq(itemIndex)
      .find(additionalSelector)
      .should(visible ? 'to.be.visible' : 'not.to.be.visible')
      .invoke('text')
      .should('to.contains', expectedContent);
  }

  isAccordionItemHaveCorrectStyle(baseSelector: string, itemIndex: number, backColor: string, color: string) {
    cy.get(`${baseSelector} accordion-group`)
      .eq(itemIndex)
      .find('.card')
      .should('to.have.css', 'background-color', backColor)
      .and('to.have.css', 'color', color);
  }

  isAccordionBodyHaveCorrectStyle(baseSelector: string, itemIndex: number, backColor: string, color: string) {
    cy.get(`${baseSelector} accordion-group`)
      .eq(itemIndex)
      .find('.panel-body')
      .should('to.have.css', 'background-color', backColor)
      .and('to.have.css', 'color', color);

  }
}
