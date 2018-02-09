import { BaseComponent } from './base.component';

export class TypeaheadPo extends BaseComponent {
  pageUrl = '/typeahead';
  pageTitle = 'Typeahead';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/typeahead';

  exampleDemosArr = {
    staticArr: 'demo-typeahead-static',
    itemTemplate: 'demo-typeahead-item-template',
    optionField: 'demo-typeahead-field',
    asyncData: 'demo-typeahead-async',
    reactiveForms: 'demo-typeahead-forms',
    groupResults: 'demo-typeahead-grouping',
    dropup: 'demo-typeahead-dropup',
    scrollable: 'demo-typeahead-scrollable'
  };
}
