import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  forwardRef, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const RATING_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line
  useExisting: forwardRef(() => RatingComponent),
  multi: true
};

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  providers: [RATING_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingComponent implements ControlValueAccessor, OnInit {
  /** number of icons */
  @Input() max = 5;
  /** if true will not react on any user events */
  @Input() readonly: boolean;
  /** array of icons titles, default: (["one", "two", "three", "four", "five"]) */
  @Input() titles: string[];
  /** custom template for icons */
  @Input() customTemplate: TemplateRef<any>;
  /** fired when icon selected, $event:number equals to selected rating */
  @Output() onHover: EventEmitter<number> = new EventEmitter();
  /** fired when icon selected, $event:number equals to previous rating value */
  @Output() onLeave: EventEmitter<number> = new EventEmitter();

  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  range: any[];
  value: number;
  protected preValue: number;

  constructor(private changeDetection: ChangeDetectorRef) {}

  @HostListener('keydown', ['$event'])
  onKeydown(event: any): void {
    if ([37, 38, 39, 40].indexOf(event.which) === -1) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    const sign = event.which === 38 || event.which === 39 ? 1 : -1;
    this.rate(this.value + sign);
  }

  ngOnInit(): void {
    this.max = typeof this.max !== 'undefined' ? this.max : 5;
    this.titles =
      typeof this.titles !== 'undefined' && this.titles.length > 0
        ? this.titles
        : ['one', 'two', 'three', 'four', 'five'];
    this.range = this.buildTemplateObjects(this.max);
  }

  // model -> view
  writeValue(value: number): void {
    if (value % 1 !== value) {
      this.value = Math.round(value);
      this.preValue = value;
      this.changeDetection.markForCheck();

      return;
    }

    this.preValue = value;
    this.value = value;
    this.changeDetection.markForCheck();
  }

  enter(value: number): void {
    if (!this.readonly) {
      this.value = value;
      this.changeDetection.markForCheck();
      this.onHover.emit(value);
    }
  }

  reset(): void {
    this.value = this.preValue;
    this.changeDetection.markForCheck();
    this.onLeave.emit(this.value);
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  rate(value: number): void {
    if (!this.readonly && value >= 0 && value <= this.range.length) {
      this.writeValue(value);
      this.onChange(value);
    }
  }

  protected buildTemplateObjects(max: number): any[] {
    const result: any[] = [];
    for (let i = 0; i < max; i++) {
      result.push({
          index: i,
          title: this.titles[i] || i + 1
        });
    }

    return result;
  }
}
