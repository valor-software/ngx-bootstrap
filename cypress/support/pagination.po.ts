import { BaseComponent } from './base.component';

export class PaginationPo extends BaseComponent {
  pageUrl = '/pagination';
  pageTitle = 'Pagination';
  ghLinkToComponent = 'https://github.com/valor-software/ngx-bootstrap/tree/development/src/pagination';

  classActive = '.active';
  btnPrev = 'Previous';
  btnNext = 'Next';

  exampleDemosArr = {
    pager: 'demo-pagination-pager'
  };
}
