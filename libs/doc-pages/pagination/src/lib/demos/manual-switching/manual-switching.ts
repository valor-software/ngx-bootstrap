import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-pagination-manual-switching',
  templateUrl: './manual-switching.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoPaginationManualSwitchingComponent {
  totalItems = 64;
  currentPage = 4;

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }
}
