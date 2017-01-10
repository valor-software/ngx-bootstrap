import { Component } from '@angular/core';
import { CarouselConfig } from 'ng2-bootstrap';

@Component({
  selector: 'demo-carousel-config',
  templateUrl: './config.html',
  providers: [{provide: CarouselConfig, useValue: {interval: 1500, noPause: true}}]
})
export class DemoCarouselConfigComponent {
}
