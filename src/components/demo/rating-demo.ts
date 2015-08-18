/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, bootstrap,
  CSSClass, NgStyle,
  coreDirectives, formDirectives} from 'angular2/angular2';

import {Rating} from 'src/components/rating/rating';

@Component({
  selector: 'rating-demo'
})
@View({
  template: `
    <br><hr/>
    <h2>Rating demo</h2>
    <div>
      <h4>Default</h4>
      <rating [(ng-model)]="rate" [max]="max" [readonly]="isReadonly" (on-hover)="hoveringOver($event)" (on-leave)="test($event)" [titles]="['one','two','three']" ></rating>
      <span class="label" [class]="{'label-warning': percent<30, 'label-info': percent>=30 && percent<70, 'label-success': percent>=70}" [ng-style]="{display: (overStar && !isReadonly) ? 'inline' : 'none'}">{{percent}}%</span>

      <pre style="margin:15px 0;">Rate: <b>{{rate}}</b> - Readonly is: <i>{{isReadonly}}</i> - Hovering over: <b>{{overStar || "none"}}</b></pre>

      <button type="button" class="btn btn-sm btn-danger" (click)="rate = 0"  [disabled]="isReadonly">Clear</button>
      <button type="button" class="btn btn-sm btn-default" (click)="isReadonly = ! isReadonly">Toggle Readonly</button>
      <hr />

      <h4>Custom icons</h4>
      <div>
        <rating [(ng-model)]="x" max="15" state-on="glyphicon-ok-sign" state-off="glyphicon-ok-circle"></rating> <b>(<i>Rate:</i> {{x}})</b>
      </div>
      <div>
        <rating [(ng-model)]="y" [rating-states]="ratingStates"></rating> <b>(<i>Rate:</i> {{y}})</b></div>
    </div>
  `,
  directives: [Rating, CSSClass, NgStyle formDirectives, coreDirectives]
})
export class RatingDemo {
  private x = 5;
  private y = 2;
  private max = 10;
  private rate = 7;
  private isReadonly = false;

  private overStar:number;
  private percent:number;

  private ratingStates = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];

  private hoveringOver(value:number) {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };

  private test() {
    console.log(arguments);
    this.overStar = null;
  }
}
