import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-tabs-vertical-pills',
  templateUrl: './vertical-pills.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoTabsVerticalPillsComponent {}
