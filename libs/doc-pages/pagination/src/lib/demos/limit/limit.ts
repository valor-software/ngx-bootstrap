import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-pagination-limit',
  templateUrl: './limit.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoPaginationLimitComponent {
  maxSize = 5;
  bigTotalItems = 175;
  bigCurrentPage = 1;
}
