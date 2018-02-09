import { BaseComponent } from './base.component';

export class SortablePo extends BaseComponent {
  pageUrl = '/sortable';
  pageTitle = 'Sortable';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/blob/development/src/sortable';

  exampleDemosArr = {
    stringItems: 'simple-items-demo',
    complexModel: 'complex-datamodel-demo',
    customTemplate: 'custom-item-template-demo'
  };
}
