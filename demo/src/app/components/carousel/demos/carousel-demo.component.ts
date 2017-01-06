import { Component } from '@angular/core';

@Component({
  selector: 'carousel-demo',
  templateUrl: './carousel-demo.component.html'
})
export class CarouselDemoComponent {
  public myInterval:number = 1500;
  public slides:any[] = [];
  public activeSlideIndex: number;

  public constructor() {
    for (let i = 0; i < 4; i++) {
      this.addSlide();
    }
  }

  public addSlide():void {
    this.slides.push({
      image: `http://lorempixel.com/900/500/nature/${this.slides.length}`
    });
  }

  public selectSlide(index: number): void {
    this.activeSlideIndex = index;
  }

  public removeSlide(index?: number):void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
  }
}
