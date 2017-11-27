import { ChangeDetectorRef, Directive, ElementRef, forwardRef, Host, OnInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { formatDate } from '../bs-moment/format';
import { getLocale } from '../bs-moment/locale/locales.service';
import { BsDaterangepickerComponent } from './bs-daterangepicker.component';

const BS_DATERANGEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line
  useExisting: forwardRef(() => BsDaterangepickerInputDirective),
  multi: true
};

@Directive({
  selector: `input[bsDaterangepicker]`,
  host: {
    '(change)': 'onChange($event)',
    '(keyup.esc)': 'hide()',
    '(blur)': 'onBlur()'
  },
  providers: [BS_DATERANGEPICKER_VALUE_ACCESSOR]
})
export class BsDaterangepickerInputDirective
  implements ControlValueAccessor {
  private _onChange = Function.prototype;
  private _onTouched = Function.prototype;
  private _value: Date[];

  constructor(@Host() private _picker: BsDaterangepickerComponent,
              private _renderer: Renderer2,
              private _elRef: ElementRef,
              private changeDetection: ChangeDetectorRef)  {
    this._picker.bsValueChange.subscribe((value: Date[]) => {
      this._setInputValue(value);
      if (this._value !== value) {
        this._value = value;
        this._onChange(value);
        this._onTouched();
      }
      this.changeDetection.markForCheck();
    });
  }

  _setInputValue(date: Date[]): void {
    let range = '';
    if (date) {
      const start = formatDate(
        date[0],
        this._picker._config.rangeInputFormat,
        this._picker._config.locale
      ) || '';
      const end = formatDate(
        date[1],
        this._picker._config.rangeInputFormat,
        this._picker._config.locale
      ) || '';
      range = (start && end) ? start + this._picker._config.rangeSeparator + end : '';
    }
    this._renderer.setProperty(this._elRef.nativeElement, 'value', range);
  }

  onChange(event: any) {
    this.writeValue(event.target.value);
    this._onChange(this._value);
    this._onTouched();
  }

  writeValue(value: Date[] | string) {
    if (!value) {
      this._value = null;
    }

    const _locale = getLocale(this._picker._config.locale);
    if (!_locale) {
      throw new Error(
        `Locale "${this._picker._config
          .locale}" is not defined, please add it with "defineLocale(...)"`
      );
    }

    if (typeof value === 'string') {
      this._value = value
        .split(this._picker._config.rangeSeparator)
        .map(date => new Date(_locale.preparse(date)))
        .map(date => (isNaN(date.valueOf()) ? null : date));
    }

    if (Array.isArray(value)) {
      this._value = value;
    }

    this._picker.bsValue = this._value;
  }

  setDisabledState(isDisabled: boolean): void {
    this._picker.isDisabled = isDisabled;
    if (isDisabled) {
      this._renderer.setAttribute(this._elRef.nativeElement, 'disabled', 'disabled');

      return;
    }
    this._renderer.removeAttribute(this._elRef.nativeElement, 'disabled');
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
  }

  onBlur() {
    this._onTouched();
  }

  hide() {
    this._picker.hide();
  }
}
