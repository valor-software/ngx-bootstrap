// todo: split
import { Injectable } from '@angular/core';

/** Provides default values for Pagination and pager components */
@Injectable()
export class PaginationConfig {
  main: any = {
    maxSize: void 0,
    itemsPerPage: 10,
    boundaryLinks: false,
    accessibleParameters: false,
    accessibleLinks: false,
    boundaryAccessibleLinks: false,
    directionLinks: true,
    firstText: 'First',
    previousText: 'Previous',
    nextText: 'Next',
    lastText: 'Last',
    previousAccessibleText: 'Previous',
    nextAccessibleText: 'Next',
    lastAccessibleText: 'Last',
    firstAccessibleText: 'First',
    previousLabelText: 'Previous page',
    nextLabelText: 'Next page',
    firstLabelText: 'First page',
    lastLabelText: 'Last page',
    navText: 'Page navigation',
    pageBtnClass: '',
    currentPageLabelText: 'Current page',
    pageLabelText: 'Go to page',
    rotate: true
  };
  pager: any = {
    itemsPerPage: 15,
    accessibleLinks: false,
    previousText: '« Previous',
    nextText: 'Next »',
    previousAccessibleText: '« Previous',
    nextAccessibleText: 'Next »',
    previousLabelText: 'Previous page',
    nextLabelText: 'Next page',
    navText: 'Pager',
    pageBtnClass: '',
    align: true
  };
}
