import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-carousel-disable-looping',
  templateUrl: './disable-looping.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class DemoCarouselDisableLoopingComponent {
  slides: {image: string; text?: string}[] = [
    {image: 'assets/images/nature/8.jpg'},
    {image: 'assets/images/nature/7.jpg'},
    {image: 'assets/images/nature/6.jpg'}
  ];
  noWrapSlides = false;
}

