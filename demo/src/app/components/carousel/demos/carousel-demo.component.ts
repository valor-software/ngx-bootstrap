import { Component } from '@angular/core';

@Component({
  selector: 'carousel-demo',
  templateUrl: './carousel-demo.component.html'
})
export class CarouselDemoComponent {
  public myInterval:number = 5000;
  public noWrapSlides:boolean = false;
  public slides:any[] = [];
  public currentSlideIndex: number;

  public constructor() {
    for (let i = 0; i < 4; i++) {
      this.addSlide();
    }
  }

  public addSlide():void {
    let newWidth = 600 + this.slides.length + 1;
    this.slides.push({
      image: `//placekitten.com/${newWidth}/300`,
      text: `${['More', 'Extra', 'Lots of', 'Surplus'][this.slides.length % 4]}
      ${['Cats', 'Kittys', 'Felines', 'Cutes'][this.slides.length % 4]}`
    });
  }

  public activeSlideChanged(index: number): void {
    this.currentSlideIndex = index;
  }

  public removeSlide(index?: number):void {
    const toRemove = index ? index : this.currentSlideIndex;
    this.slides.splice(toRemove, 1);
  }
}
