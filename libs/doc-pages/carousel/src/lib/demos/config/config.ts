import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-carousel-config',
  templateUrl: './config.html',
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } }
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoCarouselConfigComponent {}
