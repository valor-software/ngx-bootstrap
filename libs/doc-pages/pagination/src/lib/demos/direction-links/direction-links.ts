import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-pagination-direction-links',
  templateUrl: './direction-links.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoPaginationDirectionLinksComponent {
  showDirectionLinks = true;
}
