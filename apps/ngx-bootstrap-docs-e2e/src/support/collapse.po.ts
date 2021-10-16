import { BaseComponent } from './base.component';

export class CollapsePo extends BaseComponent {
  pageUrl = '#/collapse';
  pageTitle = 'Collapse';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/collapse';

  collapseClass = '.collapse';
  showIndicator = 'in show';
  infoClass = '.col-md-9';

  exampleDemosArr = {
    basic: 'collapse-demo',
    events: 'collapse-demo-events',
    manualToggle: 'toggle-manual-demo',
    inlineDisplay: 'inline-display-demo',
    accessibility: 'demo-accessibility'
  };

  isCollapseExpanded(baseSelector: string, expandedAttrValue: string) {
    cy.get(`${ baseSelector } ${ this.collapseClass }`)
      .should(expandedAttrValue === 'true' ? 'to.have.class' : 'not.to.have.class', this.showIndicator);
  }

  isCollapseWithInline(baseSelector: string, inline: boolean) {
    cy.get(`${ baseSelector } ${ this.collapseClass }`)
      .should('to.have.attr', 'style', inline ? 'display: inline-block;' : 'display: none;');

  }

  isCollapseInfoEqual(baseSelector: string, expectedText: string) {
    cy.get(`${ baseSelector } ${ this.infoClass }`).invoke('text')
      .should(infoTxt => expect(infoTxt).to.equal(expectedText));
  }
}
