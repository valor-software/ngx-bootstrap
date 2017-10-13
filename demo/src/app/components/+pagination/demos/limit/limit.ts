import { Component } from '@angular/core';

@Component({
  selector: 'demo-pagination-limit',
  templateUrl: './limit.html'
})
export class DemoPaginationLimitComponent {
  maxSize: number = 5;
  bigTotalItems: number = 175;
  bigCurrentPage: number = 1;
  numPages: number = 0;

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
