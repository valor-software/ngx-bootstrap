import { BaseComponent } from './base.component';

export class PaginationPo extends BaseComponent {
  pageUrl = '/pagination';
  pageTitle = 'Pagination';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/pagination';

  exampleDemosArr = {
    basic: 'demo-pagination-basic',
    statesLimits: 'demo-pagination-limit',
    pager: 'demo-pagination-pager'
  };
}
