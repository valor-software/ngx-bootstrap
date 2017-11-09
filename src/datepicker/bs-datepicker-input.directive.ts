import {
  ChangeDetectorRef,
  Directive, ElementRef, forwardRef, Host, OnInit, Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BsDatepickerComponent } from './bs-datepicker.component';
import { formatDate } from '../bs-moment/format';
import { getLocale } from '../bs-moment/locale/locales.service';
import { BsDatepickerConfig } from './bs-datepicker.config';

const BS_DATEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line
  useExisting: forwardRef(() => BsDatepickerInputDirective),
  multi: true
};

@Directive({
  selector: `input[bsDatepicker]`,
  host: {
    '(change)': 'onChange($event)',
    '(keyup.esc)': 'hide()',
    '(blur)': 'onBlur()'
  },
  providers: [BS_DATEPICKER_VALUE_ACCESSOR]
})
export class BsDatepickerInputDirective
  implements ControlValueAccessor {
  private _onChange = Function.prototype;
  private _onTouched = Function.prototype;

  constructor(@Host() private _picker: BsDatepickerComponent,
              private _renderer: Renderer2,

              private _elRef: ElementRef,
              private changeDetection: ChangeDetectorRef) {
    this._picker.bsValueChange.subscribe((value: Date) => {
      this._setInputValue(value, this._picker._config);
    });
    this._picker.bsConfigChange.subscribe((config: BsDatepickerConfig) => {
      this._setInputValue(this._picker._bsValue, config);
    });
  }

  _setInputValue(value: Date, config: BsDatepickerConfig): void {
    const initialDate = formatDate(
      value,
      config.dateInputFormat,
      config.locale
    ) || '';
    this._renderer.setProperty(this._elRef.nativeElement, 'value', initialDate);
    this._onChange(value);
    this.changeDetection.markForCheck();
  }

  onChange(event: any) {
    this.writeValue(event.target.value);
    this._onTouched();
  }

  writeValue(value: Date | string) {
    if (!value) {
      this._picker.bsValue = null;
    }
    const _locale = getLocale(this._picker._config.locale);
    if (!_locale) {
      throw new Error(
        `Locale "${this._picker._config
          .locale}" is not defined, please add it with "defineLocale(...)"`
      );
    }
    if (typeof value === 'string') {
      const date = new Date(_locale.preparse(value));
      this._picker.bsValue = isNaN(date.valueOf()) ? null : date;
    }

    if (value instanceof Date) {
      this._picker.bsValue = value;
    }
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
