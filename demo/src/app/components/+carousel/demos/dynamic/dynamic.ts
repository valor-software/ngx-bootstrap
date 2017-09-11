import { Component } from '@angular/core';

@Component({
  selector: 'demo-carousel-dynamic',
  templateUrl: './dynamic.html'
})
export class DemoCarouselDynamicComponent {
  public myInterval: number = 1500;
  public slides: any[] = [];
  public activeSlideIndex: number = 0;
  public noWrapSlides: boolean = false;

  public constructor() {
    for (let i = 0; i < 4; i++) {
      this.addSlide();
    }
  }

  public addSlide(): void {
    this.slides.push({
      image: `assets/images/nature/${this.slides.length % 8 + 1}.jpg`
    });
  }

  public removeSlide(index?: number): void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
  }
}
