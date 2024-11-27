import { BaseComponent } from './base.component';

export class DropdownsPo extends BaseComponent {
  pageUrl = '/ngx-bootstrap/components/dropdowns';
  pageTitle = 'Dropdowns';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/dropdown';

  dropdownMenu = '.dropdown-menu';
  showIndicator = 'show';

  exampleDemosArr = {
    basic: 'tab[heading="Overview"] demo-dropdown-basic',
    triggerByTag: 'tab[heading="Overview"] demo-dropdown-anchor-trigger',
    splitButton: 'tab[heading="Overview"] demo-dropdown-split',
    manualTrigger: 'tab[heading="Overview"] demo-dropdown-triggers-manual',
    triggerByIsOpen: 'tab[heading="Overview"] demo-dropdown-trigger-by-isopen',
    disabledMenu: 'tab[heading="Overview"] demo-dropdown-disabled',
    disabledItem: 'tab[heading="Overview"] demo-dropdown-disabled-item',
    alignment: 'tab[heading="Overview"] demo-dropdown-alignment',
    insideClick: 'tab[heading="Overview"] demo-dropdown-inside-click',
    nestedDropdown: 'tab[heading="Overview"] demo-nested-dropdowns',
    appendToBody: 'tab[heading="Overview"] demo-dropdown-container',
    dropup: 'tab[heading="Overview"] demo-dropdown-dropup',
    menuDividers: 'tab[heading="Overview"] demo-dropdown-menu-dividers',
    customHtml: 'tab[heading="Overview"] demo-dropdown-custom-html',
    configDefaults: 'tab[heading="Overview"] demo-dropdown-config',
    visibilityEvents: 'tab[heading="Overview"] demo-dropdown-visibility-events',
    stateChangeEvent: 'tab[heading="Overview"] demo-dropdown-state-change-event',
    autoClose: 'tab[heading="Overview"] demo-dropdown-autoclose',
    accessibility: 'tab[heading="Overview"] demo-accessibility'
  };

  isDropdownExpanded(baseSelector: string, dropdownType: string, expanded: boolean, dropdownIndex = 0) {
    cy.get(`${baseSelector}`)
      .find(dropdownType)
      .eq(dropdownIndex)
      .parent()
      .should(expanded ? 'to.have.class' : 'not.to.have.class', 'show');
  }

  isDropdownDisabled(baseSelector: string, disabled: boolean) {
    cy.get(`${baseSelector} button`)
      .should(disabled ? 'to.be.disabled' : 'to.be.enabled');
  }

  isDropdownItemDisabled(baseSelector: string, itemIndex: number, disabled: boolean, dropdownIndex = 0) {
    cy.get(baseSelector)
      .find('.show')
      .eq(dropdownIndex)
      .find('li')
      .not('.divider')
      .eq(itemIndex)
      .should(disabled ? 'to.have.class' : 'not.to.have.class', 'disabled');
  }

  isDropdownItemsLengthEqual(baseSelector: string, expectedLength: number, dropdownIndex = 0, nested?: boolean) {
    cy.get(baseSelector)
      .find(nested ? '.dropdown' : '.show')
      .eq(dropdownIndex)
      .find('li')
      .not('.divider')
      .should('to.have.length', expectedLength);
  }

  isSeparatorExist(baseSelector: string, exist: boolean, dropdownIndex = 0) {
    cy.get(baseSelector)
      .find('.show')
      .eq(dropdownIndex)
      .find('.divider')
      .should(exist ? 'to.exist' : 'not.to.exist');
  }

  clickOnDropdownItem(baseSelector: string, itemIndex = 0, dropdownIndex = 0) {
    cy.get(baseSelector)
      .find('.show')
      .eq(dropdownIndex)
      .find('*[role*="menuitem"]')
      .eq(itemIndex)
      .click();
  }

  isItemHave(baseSelector: string, itemIndex = 0, expectedClass: string) {
    cy.get(baseSelector)
      .find('.show')
      .find('*[role*="menuitem"]')
      .eq(itemIndex)
      .should('to.have.descendants', expectedClass);
  }

  isDropdownContentAligned(baseSelector: string, position: string) {
    cy.get(`${baseSelector} button`).as('DropdownButton');
    cy.get(`${baseSelector} .dropdown-menu`).as('DropdownMenu');

    switch (position) {
      case 'top':
        cy.get('@DropdownButton').then(button => {
          cy.get('@DropdownMenu').then(content => {
            expect(content.offset().top).to.lessThan(button.offset().top);
            expect(content.offset().left).to.equal(button.offset().left);
          });
        });
        break;

      case 'right':
        cy.get('@DropdownButton').then(button => {
          cy.get('@DropdownMenu').then(content => {
            expect(content.offset().left).to.greaterThan(button.offset().left);
            expect(content.offset().top).to.greaterThan(button.offset().top);
          });
        });
        break;

      default:
        throw new Error('Available positions for dropdown aligning: top, right');
    }
  }
}
