import { BaseComponent } from './base.component';

export class TypeaheadPo extends BaseComponent {
  pageUrl = '/ngx-bootstrap/components/typeahead';
  pageTitle = 'Typeahead';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/typeahead';

  inputSelector = 'input';
  cardHeader = '.card-header';
  activeDropdown = '.dropdown';
  dropdownBtn = '.dropdown button';
  dropdownItem = '.dropdown-item';
  formGroup = 'label';
  dropdownHeader = '.dropdown-header';
  btnSelector = '.btn';
  noResultAlert = '.alert-danger';

  exampleDemosArr = {
    basic: 'tab[heading="Overview"] demo-typeahead-basic',
    itemTemplate: 'tab[heading="Overview"] demo-typeahead-item-template',
    optionField: 'tab[heading="Overview"] demo-typeahead-field',
    asyncData: 'tab[heading="Overview"] demo-typeahead-async',
    withDelay: 'tab[heading="Overview"] demo-typeahead-delay',
    templateDriven: 'tab[heading="Overview"] demo-typeahead-form',
    reactiveForms: 'tab[heading="Overview"] demo-typeahead-reactive-form',
    groupingResults: 'tab[heading="Overview"] demo-typeahead-grouping',
    ignoreSpaceAndOrder: 'tab[heading="Overview"] demo-typeahead-single-world',
    delimiters: 'tab[heading="Overview"] demo-typeahead-phrase-delimiters',
    multipleSearch: 'tab[heading="Overview"] demo-typeahead-multiple-search',
    dropUp: 'tab[heading="Overview"] demo-typeahead-dropup',
    onBlur: 'tab[heading="Overview"] demo-typeahead-on-blur',
    appendToBody: 'tab[heading="Overview"] demo-typeahead-container',
    noResult: 'tab[heading="Overview"] demo-typeahead-no-result',
    scrollable: 'tab[heading="Overview"] demo-typeahead-scrollable',
    latinize: 'tab[heading="Overview"] demo-typeahead-latinize',
    onSelect: 'tab[heading="Overview"] demo-typeahead-on-select',
    resultOnBlur: 'tab[heading="Overview"] demo-typeahead-show-on-blur',
    configDefaults: 'tab[heading="Overview"] demo-typeahead-config',
    selectFirstItem: 'tab[heading="Overview"] demo-selected-first-item'
  };

  isDropdownNotEnabled(baseSelector: string) {
    cy.get(`${baseSelector} ${this.activeDropdown}`)
      .should('not.be.enabled');
  }

  isDropdownHasNItems(itemsSelector: string, expectedQuantity: number) {
    cy.get(itemsSelector).should('have.length', expectedQuantity);
  }

  isDropdownScrollable(stateMatch: string) {
    cy.get(this.activeDropdown).contains(stateMatch).scrollIntoView()
      .should('be.visible');
  }

  isDropdownNotExist(baseSelector: string) {
    cy.get(`${baseSelector} ${this.activeDropdown}`)
      .should('not.exist');
  }
}
