import { Component } from '@angular/core';

@Component({
  selector: 'demo-pagination-limit',
  templateUrl: './limit.html'
})
export class DemoPaginationLimitComponent {
  public maxSize: number = 5;
  public bigTotalItems: number = 175;
  public bigCurrentPage: number = 1;
  public numPages: number = 0;

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
