import { Component } from '@angular/core';

@Component({
  selector: 'demo-rating-basic',
  templateUrl: './basic.html'
})
export class DemoRatingBasicComponent {
  max: number = 10;
  rate: number = 7;
  isReadonly: boolean = true;
}
