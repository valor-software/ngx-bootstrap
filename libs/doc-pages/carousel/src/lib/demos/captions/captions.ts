import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-carousel-captions',
  templateUrl: './captions.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoCarouselCaptionsComponent {}
