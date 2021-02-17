import { Component } from '@angular/core';

@Component({
  selector: 'demo-pagination-styling',
  templateUrl: './styling-global.html',
  styles: [
    `
    .btn-custom a {
       background: #31b0d5;
    }
  `
  ]
})
export class DemoPaginationStylingComponent {
  totalItems = 64;
  currentPage = 4;
  smallnumPages = 0;

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
