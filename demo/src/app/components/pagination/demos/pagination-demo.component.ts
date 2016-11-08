import { Component } from '@angular/core';

@Component({
  selector: 'pagination-demo',
  templateUrl: './pagination-demo.component.html'
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
