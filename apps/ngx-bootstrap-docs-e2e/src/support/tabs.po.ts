import { BaseComponent } from './base.component';

export class TabsPo extends BaseComponent {
  pageUrl = '#/tabs';
  pageTitle = 'Tabs';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/tabs';

  exampleDemosArr = {
    basic: 'demo-tabs-basic',
    manualSelection: 'demo-tabs-manual-selection',
    disabled: 'demo-tabs-disabled',
    dynamic: 'demo-tabs-dynamic',
    pills: 'demo-tabs-pills',
    verticalPills: 'demo-tabs-vertical-pills',
    justified: 'demo-tabs-justified',
    customClass: 'demo-tabs-custom-class',
    selectEvent: 'demo-tabs-select-event',
    config: 'demo-tabs-config',
    customTemplate: 'demo-tabs-custom-template',
    accessibility: 'demo-accessibility'
  };

  isTabTitleTxtContain(basicSelector: string, expectedTxt: string, tabIndex?: number) {
    if (tabIndex === undefined) {
      cy.get(`${basicSelector} .nav-item`).each((tabTitle, index) => {
        expect(tabTitle.text()).to.contains(expectedTxt);
        expect(tabTitle.text()).to.contains(index === 0 ? '' : index);
      });
    } else {
      cy.get(`${basicSelector} .nav-item`).eq(tabIndex).invoke('text').should('to.contains', expectedTxt);
    }
  }

  isTabContentContain(basicSelector: string, expectedTxt: string, tabIndex?: number) {
    if (tabIndex === undefined) {
      cy.get(`${basicSelector} tab`).each((tabContent, index) => {
        expect(tabContent.text()).to.contains(expectedTxt);
        expect(tabContent.text()).to.contains(index === 0 ? '' : index);
      });
    } else {
      cy.get(`${basicSelector} tab`).eq(tabIndex).invoke('text').should('to.contains', expectedTxt);
    }
  }

  isAppropriateTabActive(basicSelector: string, tabIndex: number) {
    cy.get(`${basicSelector} tab`).eq(tabIndex).should('to.have.class', 'active');
    cy.get(`${basicSelector} .nav-item`).eq(tabIndex).should('to.have.class', 'active');
  }

  isTabsLengthEqual(basicSelector: string, expectedLength: number) {
    cy.get(`${basicSelector} tab`).should('to.have.length', expectedLength);
    cy.get(`${basicSelector} .nav-item`).should('to.have.length', expectedLength);
  }

  clickOnTab(basicSelector: string, tabIndex: number) {
    cy.get(`${basicSelector} .nav-item`).eq(tabIndex).click();
  }

  isTabDisabled(basicSelector: string, tabIndex: number, isDisabled = true) {
    cy.get(`${basicSelector} .nav-link`).should(isDisabled ? 'to.have.class' : 'not.to.have.class', 'disabled');
  }

  isRemoveIconExist(basicSelector: string, tabIndex: number) {
    cy.get(`${basicSelector} .nav-link`).eq(tabIndex).get('.bs-remove-tab').invoke('text').
      should('to.contains', ' ❌');
  }

  clickOnRemoveTabIcon(basicSelector: string, tabIndex: number) {
    cy.get(`${basicSelector} .nav-link`).eq(tabIndex).get('.bs-remove-tab').click();
  }

  isTabsetHaveType(basicSelector: string, expectedType: string) {
    cy.get(`${basicSelector} tabset`).should('to.have.attr', 'type', expectedType);
  }

  isTabsetHaveClass(basicSelector: string, expectedClass: string) {
    cy.get(`${basicSelector} tabset`).should('to.have.descendants', expectedClass);
  }

  isTemplateSrcContain(demoName: string, expectedSrc: string) {
    cy.contains(`${ demoName }`)
      .next('ng-sample-box')
      .find('tab[heading*="template"]')
      .invoke('text')
      .should('to.contains', expectedSrc);
  }

  isCompSrcContain(demoName: string, expectedSrc: string) {
    cy.contains(`${ demoName }`)
      .next('ng-sample-box')
      .find('tab[heading*="component"]')
      .invoke('text')
      .should('to.contains', expectedSrc);
  }

  isTabsJustified(basicSelector: string) {
    cy.get(`${basicSelector} .nav-item`).as('Tab').eq(0).then(firstHtmlElement => {
      cy.get('@Tab').eq(1).then(secondHtmlElement => {
        cy.get('@Tab').eq(2).then(thirdHtmlElement => {
          const comparativeWidth12 = Math.round(firstHtmlElement.width() / secondHtmlElement.width());
          const comparativeWidth23 = Math.round(secondHtmlElement.width() / thirdHtmlElement.width());
          const comparativeHeight12 = Math.round(firstHtmlElement.height() / secondHtmlElement.height());
          const comparativeHeigth23 = Math.round(secondHtmlElement.height() / thirdHtmlElement.height());
          expect(comparativeWidth12).to.equal(1);
          expect(comparativeWidth23).to.equal(1);
          expect(comparativeHeight12).to.equal(1);
          expect(comparativeHeigth23).to.equal(1);
        });
      });
    });
  }

  isTabHaveCustomCSS(basicSelector: string, tabIndex: number, property: string, expectedValue: string) {
    cy.get(`${basicSelector} .nav-item a`).as('Tab').eq(tabIndex).should('have.css', property, expectedValue);
  }
}
