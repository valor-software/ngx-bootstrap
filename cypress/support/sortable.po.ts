import { BaseComponent } from './base.component';

export class SortablePo extends BaseComponent {
  pageUrl = '/sortable';
  pageTitle = 'Sortable';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/blob/development/src/sortable';

  classWrapper = '.sortable-wrapper';
  classItem = '.sortable-item';

  exampleDemosArr = {
    basic: 'basic-demo'
  };
}
