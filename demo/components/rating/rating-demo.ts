/// <reference path="../../../tsd.d.ts" />
import {
  Component, View, NgClass, NgStyle,
  CORE_DIRECTIVES, FORM_DIRECTIVES
} from 'angular2/angular2';

import {Rating} from '../../../components/index';

// webpack html imports
let template = require('./rating-demo.html');

@Component({
  selector: 'rating-demo'
})
@View({
  template: template,
  directives: [Rating, NgClass, NgStyle, FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class RatingDemo {
  private x:number = 5;
  private y:number = 2;
  private max:number = 10;
  private rate:number = 7;
  private isReadonly:boolean = false;

  private overStar:number;
  private percent:number;

  private ratingStates:any = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];

  private hoveringOver(value:number):void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };

  private resetStar() {
    this.overStar = null;
  }
}
