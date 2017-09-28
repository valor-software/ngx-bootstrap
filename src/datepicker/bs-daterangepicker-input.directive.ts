import { Directive, ElementRef, forwardRef, Host, OnInit, Renderer2 } from '@angular/core';
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
  implements OnInit, ControlValueAccessor {
  private _onChange = Function.prototype;
  private _onTouched = Function.prototype;

  constructor(@Host() private _picker: BsDaterangepickerComponent,
              private _renderer: Renderer2,
              private _elRef: ElementRef) {}

  ngOnInit(): void {
    this._picker.bsValueChange.subscribe((v: Date[]) => {
      let range = '';
      if (v) {
        const start = formatDate(
          v[0],
          this._picker._config.rangeInputFormat,
          this._picker._config.locale
        ) || '';
        const end = formatDate(
          v[1],
          this._picker._config.rangeInputFormat,
          this._picker._config.locale
        ) || '';
        range = (start && end) ? start + this._picker._config.rangeSeparator + end : '';
      }
      this._renderer.setProperty(this._elRef.nativeElement, 'value', range);
      this._onChange(v);
    });
  }

  onChange(event: any) {
    this.writeValue(event.target.value);
    this._onTouched();
  }

  writeValue(value: Date[] | string) {
    if (!value) {
      this._picker.bsValue = null;
      return;
    }

    const _locale = getLocale(this._picker._config.locale);
    if (!_locale) {
      throw new Error(
        `Locale "${this._picker._config
          .locale}" is not defined, please add it with "defineLocale(...)"`
      );
    }
    if (typeof value === 'string') {
      this._picker.bsValue = value
        .split(this._picker._config.rangeSeparator)
        .map(date => new Date(_locale.preparse(date)))
        .map(date => (isNaN(date.valueOf()) ? null : date));
    }

    if (Array.isArray(value)) {
      this._picker.bsValue = value;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this._picker.isDisabled = isDisabled;
    this._renderer.setAttribute(this._elRef.nativeElement, 'disabled', 'disabled');
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
