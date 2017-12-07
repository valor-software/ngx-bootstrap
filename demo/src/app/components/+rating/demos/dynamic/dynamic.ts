import { Component } from '@angular/core';

@Component({
  selector: 'demo-rating-dynamic',
  templateUrl: './dynamic.html'
})
export class DemoRatingDynamicComponent {
  max = 10;
  rate = 7;
  isReadonly = false;

  overStar: number;
  percent: number;

  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = (value / this.max) * 100;
  }

  resetStar(): void {
    this.overStar = void 0;
  }
}
