import { Component } from '@angular/core';

@Component({
  selector: 'demo-pagination-basic',
  templateUrl: './basic.html'
})
export class DemoPaginationBasicComponent {
  public totalItems: number = 64;
  public currentPage: number = 4;

  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
