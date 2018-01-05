import { Component, Input } from '@angular/core';

@Component({
  selector: 'demo-pagination-basic',
  templateUrl: './basic.html'
})
export class DemoPaginationBasicComponent {
  totalItems = 64;
  currentPage = 4;
  smallnumPages = 0;

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
