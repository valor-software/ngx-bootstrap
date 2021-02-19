import { Component } from '@angular/core';

@Component({
  selector: 'demo-carousel-interval',
  templateUrl: './interval.html'
})
export class DemoCarouselIntervalComponent {
  myInterval = 1500;
  activeSlideIndex = 0;

  slides = [
    {image: 'assets/images/nature/3.jpg'},
    {image: 'assets/images/nature/2.jpg'},
    {image: 'assets/images/nature/1.jpg'}
  ];
}
