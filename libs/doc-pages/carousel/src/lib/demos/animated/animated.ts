import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-carousel-animated',
  templateUrl: './animated.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoCarouseAnimatedComponent {}
