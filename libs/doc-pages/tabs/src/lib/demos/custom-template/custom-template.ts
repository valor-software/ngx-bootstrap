import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-tabs-custom-template',
  templateUrl: './custom-template.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoTabsCustomComponent {}
