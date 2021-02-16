import { Component } from '@angular/core';

@Component({
  selector: 'demo-carousel-disable-indicator',
  templateUrl: './disable-indicator.html'
})
export class DemoCarouselDisableIndicatorComponent {
  slides = [
    {image: 'assets/images/nature/5.jpg'},
    {image: 'assets/images/nature/4.jpg'},
    {image: 'assets/images/nature/3.jpg'}
  ];
  showIndicator = true;

  switchIndicator(): void {
    this.showIndicator = !this.showIndicator;
  }
}

