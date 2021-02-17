import { Component } from '@angular/core';

@Component({
  selector: 'demo-rating-basic',
  templateUrl: './basic.html'
})
export class DemoRatingBasicComponent {
  max = 10;
  rate = 7;
  isReadonly = true;
}
