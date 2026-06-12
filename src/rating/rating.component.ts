import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostListener,
  OnInit,
  Provider,
  TemplateRef,
  input,
  output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RatingResults } from './models';
import { RatingConfig } from './rating.config';
import { NgTemplateOutlet } from '@angular/common';

export const RATING_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RatingComponent),
  multi: true
};

@Component({
    selector: 'rating',
    templateUrl: './rating.component.html',
    providers: [RATING_CONTROL_VALUE_ACCESSOR],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgTemplateOutlet]
})
export class RatingComponent implements ControlValueAccessor, OnInit {
  /** number of icons */
  max = input<number>(5);
  /** if true will not react on any user events */
  readonly = input<boolean>(false);
  /** array of icons titles, default: (["one", "two", "three", "four", "five"]) */
  titles = input<string[]>([]);
  /** custom template for icons */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customTemplate = input<TemplateRef<any> | undefined>();
  /** fired when icon selected, $event:number equals to selected rating */
  onHover = output<number>();
  /** fired when icon selected, $event:number equals to previous rating value */
  onLeave = output<number>();

  onChange = Function.prototype;
  onTouched = Function.prototype;
  /** aria label for rating */
  ariaLabel = 'rating';
  range: RatingResults[] = [];
  value = 0;
  protected preValue?: number;

  constructor(private changeDetection: ChangeDetectorRef, config: RatingConfig) {
    Object.assign(this, config);
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if ([37, 38, 39, 40].indexOf(event.which) === -1) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    const sign = event.which === 38 || event.which === 39 ? 1 : -1;
    this.rate(this.value + sign);
  }

  ngOnInit(): void {
    const maxValue = this.max() || 5;
    const titlesValue = this.titles();
    const titlesArray =
      typeof titlesValue !== 'undefined' && titlesValue.length > 0
        ? titlesValue
        : [];
    this.range = this.buildTemplateObjects(maxValue, titlesArray);
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
    if (!this.readonly()) {
      this.value = value;
      this.changeDetection.markForCheck();
      this.onHover.emit(value);
    }
  }

  reset(): void {
    if (typeof this.preValue === 'number') {
      this.value = Math.round(this.preValue);
      this.changeDetection.markForCheck();
      this.onLeave.emit(this.value);
    }
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  rate(value: number): void {
    if (!this.readonly() && this.range
      && value >= 0 && value <= this.range.length) {
      this.writeValue(value);
      this.onChange(value);
    }
  }

  protected buildTemplateObjects(max: number, titles: string[]): RatingResults[] {
    const result: RatingResults[] = [];

    for (let i = 0; i < max; i++) {
      result.push({
        index: i,
        title: titles[i] || i + 1
      });
    }

    return result;
  }
}
