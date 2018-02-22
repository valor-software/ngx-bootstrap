import { BaseComponent } from './base.component';

export class TypeaheadPo extends BaseComponent {
  pageUrl = '/typeahead';
  pageTitle = 'Typeahead';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/typeahead';

  tagInput = 'input';
  containerTypeahead = 'typeahead-container';

  exampleDemosArr = {
    reactiveForms: 'demo-typeahead-reactive-form'
  };
}
