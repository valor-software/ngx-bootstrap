import {
  Component,
  OnInit, Input, Output, HostListener,
  Self, EventEmitter
} from 'angular2/core';
import { NgFor, ControlValueAccessor, NgModel } from 'angular2/common';

// TODO: templateUrl
@Component({
  selector: 'rating[ngModel]',
  directives: [NgFor],
  template: `
    <span (mouseleave)="reset()" (keydown)="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" [attr.aria-valuemax]="range.length" [attr.aria-valuenow]="value">
      <template ngFor #r [ngForOf]="range" #index="index">
        <span class="sr-only">({{ index < value ? '*' : ' ' }})</span>
        <i (mouseenter)="enter(index + 1)" (click)="rate(index + 1)" class="glyphicon" [ngClass]="index < value ? r.stateOn : r.stateOff" [title]="r.title" ></i>
      </template>
    </span>
  `
})
export class Rating implements ControlValueAccessor, OnInit {
  @Input() private max:number;
  @Input() private stateOn:string;
  @Input() private stateOff:string;
  @Input() private readonly:boolean;
  @Input() private titles:Array<string>;
  @Input() private ratingStates:Array<{stateOn:string, stateOff:string}>;

  @Output() private onHover:EventEmitter<number> = new EventEmitter();
  @Output() private onLeave:EventEmitter<number> = new EventEmitter();

  private range:Array<any>;
  private value:number;
  private preValue:number;

  @HostListener('keydown', ['$event'])
  private onKeydown(event:KeyboardEvent) {
    if ([37, 38, 39, 40].indexOf(event.which) === -1) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    let sign = event.which === 38 || event.which === 39 ? 1 : -1;
    this.rate(this.value + sign);
  }

  constructor(@Self() public cd:NgModel) {
    cd.valueAccessor = this;
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
    let result:any[] = [];
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

  onChange = (_:any) => {
  };
  onTouched = () => {
  };

  registerOnChange(fn:(_:any) => {}):void {
    this.onChange = fn;
  }

  registerOnTouched(fn:() => {}):void {
    this.onTouched = fn;
  }
}
