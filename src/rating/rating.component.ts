import { Component, EventEmitter, HostListener, Input, OnInit, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/* tslint:disable-next-line */
const KeyboardEvent = (global as any).KeyboardEvent as KeyboardEvent;

export const RATING_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RatingComponent),
  multi: true
};

@Component({
  selector: 'rating',
  template: `
    <span (mouseleave)="reset()" (keydown)="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" [attr.aria-valuemax]="range.length" [attr.aria-valuenow]="value">
      <template ngFor let-r [ngForOf]="range" let-index="index">
        <span class="sr-only">({{ index < value ? '*' : ' ' }})</span>
        <i (mouseenter)="enter(index + 1)" (click)="rate(index + 1)" class="glyphicon" [ngClass]="index < value ? r.stateOn : r.stateOff" [title]="r.title" ></i>
      </template>
    </span>
  `,
  providers: [RATING_CONTROL_VALUE_ACCESSOR]
})
export class RatingComponent implements ControlValueAccessor, OnInit {
  @Input() public max: number;
  @Input() public stateOn: string;
  @Input() public stateOff: string;
  @Input() public readonly: boolean;
  @Input() public titles: string[];
  @Input() public ratingStates: {stateOn: string, stateOff: string}[];

  @Output() public onHover: EventEmitter<number> = new EventEmitter<number>(false);
  @Output() public onLeave: EventEmitter<number> = new EventEmitter<number>(false);

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  public range: any[];
  public value: number;
  protected preValue: number;

  @HostListener('keydown', ['$event'])
  public onKeydown(event: KeyboardEvent): void {
    if ([37, 38, 39, 40].indexOf(event.which) === -1) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    let sign = event.which === 38 || event.which === 39 ? 1 : -1;
    this.rate(this.value + sign);
  }

  public ngOnInit(): void {
    this.max = typeof this.max !== 'undefined' ? this.max : 5;
    this.readonly = this.readonly === true;
    this.stateOn = typeof this.stateOn !== 'undefined'
      ? this.stateOn
      : 'glyphicon-star';
    this.stateOff = typeof this.stateOff !== 'undefined'
      ? this.stateOff
      : 'glyphicon-star-empty';
    this.titles = typeof this.titles !== 'undefined' && this.titles.length > 0
      ? this.titles
      : ['one', 'two', 'three', 'four', 'five'];
    this.range = this.buildTemplateObjects(this.ratingStates, this.max);
  }

  // model -> view
  public writeValue(value: number): void {
    if (value % 1 !== value) {
      this.value = Math.round(value);
      this.preValue = value;
      return;
    }

    this.preValue = value;
    this.value = value;
  }

  public enter(value: number): void {
    if (!this.readonly) {
      this.value = value;
      this.onHover.emit(value);
    }
  }

  public reset(): void {
    this.value = this.preValue;
    this.onLeave.emit(this.value);
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  public rate(value: number): void {
    if (!this.readonly && value >= 0 && value <= this.range.length) {
      this.writeValue(value);
      this.onChange(value);
    }
  }

  protected buildTemplateObjects(ratingStates: any[], max: number): any[] {
    ratingStates = ratingStates || [];
    let count = ratingStates.length || max;
    let result: any[] = [];
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
}
