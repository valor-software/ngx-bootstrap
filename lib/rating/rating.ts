/// <reference path="../../tsd.d.ts" />

import {
  Component, View,
  OnInit, EventEmitter,
  NgClass, DefaultValueAccessor, NgFor,
  NgModel, Self, Renderer, ElementRef
} from 'angular2/angular2';

// TODO: templateUrl
@Component({
  selector: 'rating[ng-model]',
  properties: [
    'max', 'readonly', 'titles',
    'stateOn', 'stateOff',
    'ratingStates'
  ],
  events: ['onHover', 'onLeave'],
  host: {
    '(keydown)': 'onKeydown($event)'
  }
})
@View({
  template: `
    <span (mouseleave)="reset()" (keydown)="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" [attr.aria-valuemax]="range.length" [attr.aria-valuenow]="value">
      <template ngFor #r [ngForOf]="range" #index="index">
        <span class="sr-only">({{ index < value ? '*' : ' ' }})</span>
        <i (mouseenter)="enter(index + 1)" (click)="rate(index + 1)" class="glyphicon" [ngClass]="index < value ? r.stateOn : r.stateOff" [title]="r.title" ></i>
      </template>
    </span>
  `,
  directives: [NgClass, NgFor]
})
export class Rating extends DefaultValueAccessor implements OnInit {
  private max:number;
  private range:Array<any>;
  private value:number;
  private preValue:number;
  private titles:Array<string>;
  private stateOn:string;
  private stateOff:string;
  private readonly:boolean;
  private ratingStates:Array<{stateOn:string, stateOff:string}>;

  private onHover:EventEmitter = new EventEmitter();
  private onLeave:EventEmitter = new EventEmitter();

  constructor(@Self() cd:NgModel, renderer:Renderer, elementRef:ElementRef) {
    super(cd, renderer, elementRef);
  }

  ngOnInit() {
    this.max = typeof this.max !== 'undefined' ? this.max : 5;
    this.readonly = this.readonly === true;
    this.stateOn = typeof this.stateOn !== 'undefined' ? this.stateOn : 'glyphicon-star';
    this.stateOff = typeof this.stateOff !== 'undefined' ? this.stateOff : 'glyphicon-star-empty';
    this.titles = typeof this.titles !== 'undefined' && this.titles.length > 0 ? this.titles : ['one', 'two', 'three', 'four', 'five'];
    this.range = this.buildTemplateObjects(this.ratingStates, this.max);
  }

  // model -> view
  writeValue(value:number) {
    if (value % 1 !== value) {
      this.value = Math.round(value);
      this.preValue = value;
      return;
    }

    this.preValue = value;
    this.value = value;
  }

  private buildTemplateObjects(ratingStates:Array<any>, max:number) {
    ratingStates = ratingStates || [];
    let count = ratingStates.length || max;
    let result = [];
    for (let i = 0; i < count; i++) {
      result.push(Object.assign({
        index: i,
        stateOn: this.stateOn,
        stateOff: this.stateOff,
        title: this.titles[i] || i + 1
      }, ratingStates[i] || {}));
    }
    return result;
  }

  private rate(value:number) {
    if (!this.readonly && value >= 0 && value <= this.range.length) {
      this.writeValue(value);
      this.cd.viewToModelUpdate(value);
    }
  }

  private enter(value:number) {
    if (!this.readonly) {
      this.value = value;
      this.onHover.next(value);
    }
  }

  private reset() {
    this.value = this.preValue;
    this.onLeave.next(this.value);
  }

  private onKeydown(event:KeyboardEvent) {
    if ([37, 38, 39, 40].indexOf(event.which) === -1) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    let sign = event.which === 38 || event.which === 39 ? 1 : -1;
    this.rate(this.value + sign);
  }
}
