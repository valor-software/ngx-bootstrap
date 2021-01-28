import { BaseComponent } from './base.component';

export class TypeaheadPo extends BaseComponent {
  pageUrl = '/typeahead';
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
    basic: 'demo-typeahead-basic',
    itemTemplate: 'demo-typeahead-item-template',
    optionField: 'demo-typeahead-field',
    asyncData: 'demo-typeahead-async',
    withDelay: 'demo-typeahead-delay',
    templateDriven: 'demo-typeahead-form',
    reactiveForms: 'demo-typeahead-reactive-form',
    groupingResults: 'demo-typeahead-grouping',
    ignoreSpaceAndOrder: 'demo-typeahead-single-world',
    delimiters: 'demo-typeahead-phrase-delimiters',
    multipleSearch: 'demo-typeahead-multiple-search',
    dropUp: 'demo-typeahead-dropup',
    onBlur: 'demo-typeahead-on-blur',
    appendToBody: 'demo-typeahead-container',
    noResult: 'demo-typeahead-no-result',
    scrollable: 'demo-typeahead-scrollable',
    latinize: 'demo-typeahead-latinize',
    onSelect: 'demo-typeahead-on-select',
    resultOnBlur: 'demo-typeahead-show-on-blur',
    configDefaults: 'demo-typeahead-config',
    selectFirstItem: 'demo-selected-first-item'
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
}
