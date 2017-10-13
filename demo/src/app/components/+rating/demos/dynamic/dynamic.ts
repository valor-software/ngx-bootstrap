import { Component } from '@angular/core';

@Component({
  selector: 'demo-rating-dynamic',
  templateUrl: './dynamic.html'
})
export class DemoRatingDynamicComponent {
  max: number = 10;
  rate: number = 7;
  isReadonly: boolean = false;

  overStar: number;
  percent: number;

  hoveringOver(value: number): void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  }

  resetStar(): void {
    this.overStar = void 0;
  }
}
