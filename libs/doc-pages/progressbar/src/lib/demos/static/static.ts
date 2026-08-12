import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-progressbar-static',
  templateUrl: './static.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoProgressbarStaticComponent {}
