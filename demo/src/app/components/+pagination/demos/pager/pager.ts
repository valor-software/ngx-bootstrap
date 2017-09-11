import { Component } from '@angular/core';

@Component({
  selector: 'demo-pagination-pager',
  templateUrl: './pager.html'
})
export class DemoPaginationPagerComponent {
  public totalItems: number = 64;
  public currentPage: number = 4;
  public smallnumPages: number = 0;

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
