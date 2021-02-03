// todo: split
import { Injectable } from '@angular/core';

import { ConfigModel, PagerModel } from './models';

/** Provides default values for Pagination and pager components */
@Injectable({
  providedIn: 'root'
})
export class PaginationConfig {
  main: ConfigModel = {
    maxSize: void 0,
    itemsPerPage: 10,
    boundaryLinks: false,
    directionLinks: true,
    firstText: 'First',
    previousText: 'Previous',
    nextText: 'Next',
    lastText: 'Last',
    pageBtnClass: '',
    rotate: true
  };
  pager: PagerModel = {
    itemsPerPage: 15,
    previousText: '« Previous',
    nextText: 'Next »',
    pageBtnClass: '',
    align: true
  };
}
