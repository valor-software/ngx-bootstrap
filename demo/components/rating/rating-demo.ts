import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Rating} from '../../../ng2-bootstrap';

// webpack html imports
let template = require('./rating-demo.html');

@Component({
  selector: 'rating-demo',
  directives: [Rating, FORM_DIRECTIVES, CORE_DIRECTIVES],
  template: template
})
export class RatingDemo {
  public x:number = 5;
  public y:number = 2;
  public max:number = 10;
  public rate:number = 7;
  public isReadonly:boolean = false;

  public overStar:number;
  public percent:number;

  public ratingStates:any = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];

  public hoveringOver(value:number):void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };

  public resetStar():void {
    this.overStar = void 0;
  }
}
