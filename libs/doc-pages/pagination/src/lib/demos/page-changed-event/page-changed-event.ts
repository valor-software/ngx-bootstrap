import { Component } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-pagination-page-changed-event',
  templateUrl: './page-changed-event.html',
  standalone: false
})
export class DemoPaginationPageChangedComponent {
  currentPage = 4;
  page?: number;

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
  }
}
