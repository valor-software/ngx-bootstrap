import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'demo-pagination-pager',
  templateUrl: './pager.html',
  styles: ['.pager li.btn:active { box-shadow: none; }'],
  encapsulation: ViewEncapsulation.None
})
export class DemoPaginationPagerComponent {
  totalItems: number = 64;
  currentPage: number = 4;
  smallnumPages: number = 0;

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
