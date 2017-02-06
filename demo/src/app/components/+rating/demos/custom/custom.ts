import { Component } from '@angular/core';

@Component({
  selector: 'demo-rating-custom',
  templateUrl: './custom.html'
})
export class DemoRatingCustomComponent {
  public x: number = 5;
  public y: number = 2;

  public ratingStates: any = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];
}
