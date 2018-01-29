import { ChangeDetectorRef, Directive, ElementRef, forwardRef, Host, Renderer2 } from '@angular/core';
import {
  AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors,
  Validator
} from '@angular/forms';
import { parseDate } from '../chronos/create/local';
import { formatDate } from '../chronos/format';
import { getLocale } from '../chronos/locale/locales';
import { isAfter, isBefore } from '../chronos/utils/date-compare';
import { isDate, isDateValid } from '../chronos/utils/type-checks';
import { BsDatepickerDirective } from './bs-datepicker.component';
import { BsDatepickerConfig } from './bs-datepicker.config';
import { BsLocaleService } from './bs-locale.service';

const BS_DATEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line
  useExisting: forwardRef(() => BsDatepickerInputDirective),
  multi: true
};

const BS_DATEPICKER_VALIDATOR = {
  provide: NG_VALIDATORS,
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
  providers: [BS_DATEPICKER_VALUE_ACCESSOR, BS_DATEPICKER_VALIDATOR]
})
export class BsDatepickerInputDirective
  implements ControlValueAccessor, Validator {
  private _onChange = Function.prototype;
  private _onTouched = Function.prototype;
  private _validatorChange = Function.prototype;
  private _value: Date;

  constructor(@Host() private _picker: BsDatepickerDirective,
              private _localeService: BsLocaleService,
              private _renderer: Renderer2,
              private _elRef: ElementRef,
              private changeDetection: ChangeDetectorRef) {
    // update input value on datepicker value update
    this._picker.bsValueChange.subscribe((value: Date) => {
      this._setInputValue(value);
      if (this._value !== value) {
        this._value = value;
        this._onChange(value);
        this._onTouched();
      }
      this.changeDetection.markForCheck();
    });

    // update input value on locale change
    this._localeService.localeChange.subscribe(() => {
      this._setInputValue(this._value);
    });
  }

  _setInputValue(value: Date): void {
    const initialDate = !value ? ''
      : formatDate(value, this._picker._config.dateInputFormat, this._localeService.currentLocale);

    this._renderer.setProperty(this._elRef.nativeElement, 'value', initialDate);
  }

  onChange(event: any) {
    this.writeValue(event.target.value);
    this._onChange(this._value);
    this._onTouched();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    const _value: Date | string = c.value;

    if (_value === null || _value === undefined || _value === '') {
      return null;
    }

    if (isDate(_value)) {
      const _isDateValid = isDateValid(_value);
      if (!_isDateValid) {
        return { bsDate: { invalid: _value } };
      }

      if (this._picker && this._picker.minDate && isBefore(_value, this._picker.minDate, 'date')) {
        return { bsDate: { minDate: this._picker.minDate } };
      }

      if (this._picker && this._picker.maxDate && isAfter(_value, this._picker.maxDate, 'date')) {
        return { bsDate: { maxDate: this._picker.maxDate } };
      }
    }
  }

  registerOnValidatorChange(fn: () => void): void {
    this._validatorChange = fn;
  }

  writeValue(value: Date | string) {
    if (!value) {
      this._value = null;
    } else {
      const _localeKey = this._localeService.currentLocale;
      const _locale = getLocale(_localeKey);
      if (!_locale) {
        throw new Error(
          `Locale "${_localeKey}" is not defined, please add it with "defineLocale(...)"`
        );
      }
      this._value = parseDate(value, this._picker._config.dateInputFormat, this._localeService.currentLocale);
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
