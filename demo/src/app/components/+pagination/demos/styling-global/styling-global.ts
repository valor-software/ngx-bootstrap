import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'demo-pagination-styling',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './styling-global.html',
  /* tslint:disable no-unused-css*/
  styles: [
    `
    .btn-custom a {
       background: #31b0d5;
    }
  `
  ]
})
export class DemoPaginationStylingComponent {
  public totalItems: number = 64;
  public currentPage: number = 4;
  public smallnumPages: number = 0;

  public pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
