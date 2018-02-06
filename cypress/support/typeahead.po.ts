import { BaseComponent } from './base.component';

export class TypeaheadPo extends BaseComponent {
  pageUrl = '/typeahead';
  pageTitle = 'Typeahead';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/typeahead';

  exampleTitlesArr = [
    'Static array',
    'Item template',
    'Option field',
    'Async data',
    'Reactive forms',
    'Grouping results',
    'Dropup',
    'Scrollable'
  ];

  exampleDemosArr = [
    'demo-typeahead-static',
    'demo-typeahead-item-template',
    'demo-typeahead-field',
    'demo-typeahead-async',
    'demo-typeahead-forms',
    'demo-typeahead-grouping',
    'demo-typeahead-dropup',
    'demo-typeahead-scrollable'
  ];
}
