/// <reference path="../../../tsd.d.ts" />
import {
  Component, View, FORM_DIRECTIVES, CORE_DIRECTIVES
} from 'angular2/angular2';
import {pagination} from '../../../components/index';

// webpack html imports
let template = require('./pagination-demo.html');

@Component({
  selector: 'pagination-demo'
})
@View({
  template: template,
  directives: [pagination, FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class PaginationDemo {
  private totalItems:number = 64;
  private currentPage:number = 4;

  private maxSize:number = 5;
  private bigTotalItems:number = 175;
  private bigCurrentPage:number = 1;

  private setPage(pageNo:number):void {
    this.currentPage = pageNo;
  };

  private pageChanged(event:any):void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  };
}
