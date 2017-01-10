import { Component } from '@angular/core';

@Component({
  selector: 'demo-rating-basic',
  templateUrl: './basic.html'
})
export class DemoRatingBasicComponent {
  public max: number = 10;
  public rate: number = 7;
  public isReadonly: boolean = true;
}
