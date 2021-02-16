import { Component } from '@angular/core';

@Component({
  selector: 'demo-carousel-slide-changed-event',
  templateUrl: './slide-changed-event.html'
})
export class DemoCarouselSlideChangedEventComponent {
  slideChangeMessage = '';

  slides = [
    {image: 'assets/images/nature/7.jpg'},
    {image: 'assets/images/nature/5.jpg'},
    {image: 'assets/images/nature/3.jpg'}
  ];

  log(event: number) {
    this.slideChangeMessage = `Slide has been switched: ${event}`;
  }
}
