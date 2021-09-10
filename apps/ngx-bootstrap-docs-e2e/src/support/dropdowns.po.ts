import { BaseComponent } from './base.component';

export class DropdownsPo extends BaseComponent {
  pageUrl = '#/dropdowns';
  pageTitle = 'Dropdowns';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/dropdown';

  dropdownMenu = '.dropdown-menu';
  showIndicator = 'show';

  exampleDemosArr = {
    basic: 'demo-dropdown-basic',
    triggerByTag: 'demo-dropdown-anchor-trigger',
    splitButton: 'demo-dropdown-split',
    manualTrigger: 'demo-dropdown-triggers-manual',
    triggerByIsOpen: 'demo-dropdown-trigger-by-isopen',
    disabledMenu: 'demo-dropdown-disabled',
    disabledItem: 'demo-dropdown-disabled-item',
    alignment: 'demo-dropdown-alignment',
    insideClick: 'demo-dropdown-inside-click',
    nestedDropdown: 'demo-nested-dropdowns',
    appendToBody: 'demo-dropdown-container',
    dropup: 'demo-dropdown-dropup',
    menuDividers: 'demo-dropdown-menu-dividers',
    customHtml: 'demo-dropdown-custom-html',
    configDefaults: 'demo-dropdown-config',
    visibilityEvents: 'demo-dropdown-visibility-events',
    stateChangeEvent: 'demo-dropdown-state-change-event',
    autoClose: 'demo-dropdown-autoclose',
    accessibility: 'demo-accessibility'
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
