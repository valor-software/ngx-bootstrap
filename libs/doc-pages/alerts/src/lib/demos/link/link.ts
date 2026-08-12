import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-alert-link',
  templateUrl: './link.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoAlertLinkComponent {}
