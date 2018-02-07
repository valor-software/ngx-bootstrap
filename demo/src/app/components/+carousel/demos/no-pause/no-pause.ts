import { Component } from '@angular/core';

@Component({
  selector: 'demo-carousel-no-pause',
  templateUrl: './no-pause.html'
})
export class DemoCarouselNoPauseComponent {
  myInterval = 2500;
  noWrapSlides = false;
  showIndicator = true;
  noPauseSlides = true;

  noPauseSlide() {
    this.noPauseSlides = !this.noPauseSlides;
  }
}
