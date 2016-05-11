import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {PAGINATION_DIRECTIVES} from '../../../ng2-bootstrap';

// webpack html imports
let template = require('./pagination-demo.html');

@Component({
  selector: 'pagination-demo',
  directives: [PAGINATION_DIRECTIVES, FORM_DIRECTIVES, CORE_DIRECTIVES],
  template: template
})
export class PaginationDemoComponent {
  public totalItems:number = 64;
  public currentPage:number = 4;

  public maxSize:number = 5;
  public bigTotalItems:number = 175;
  public bigCurrentPage:number = 1;

  public setPage(pageNo:number):void {
    this.currentPage = pageNo;
  };

  public pageChanged(event:any):void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  };
}
