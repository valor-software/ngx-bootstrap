import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef,
  Host,
  OnDestroy,
  OnInit,
  Provider,
  Renderer2
} from '@angular/core';

import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

import {
  parseDate,
  formatDate,
  getLocale,
  isAfter,
  isBefore,
  isArray,
  isDateValid,
  utcAsLocal
} from 'ngx-bootstrap/chronos';

import { BsDaterangepickerDirective } from './bs-daterangepicker.component';
import { BsLocaleService } from './bs-locale.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

const BS_DATERANGEPICKER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BsDaterangepickerInputDirective),
  multi: true
};

const BS_DATERANGEPICKER_VALIDATOR: Provider = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => BsDaterangepickerInputDirective),
  multi: true
};


@Directive({
  selector: `input[bsDaterangepicker]`,
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '(change)': 'onChange($event)',
    '(keyup.esc)': 'hide()',
    '(keydown)': 'onKeydownEvent($event)',
    '(blur)': 'onBlur()'
  },
  providers: [BS_DATERANGEPICKER_VALUE_ACCESSOR, BS_DATERANGEPICKER_VALIDATOR]
})
export class BsDaterangepickerInputDirective
  implements ControlValueAccessor, Validator, OnInit, OnDestroy {
  private _onChange = Function.prototype;
  private _onTouched = Function.prototype;
  private _validatorChange = Function.prototype;
  private _value?: (Date|undefined)[];
  private _subs = new Subscription();

  constructor(@Host() private _picker: BsDaterangepickerDirective,
              private _localeService: BsLocaleService,
              private _renderer: Renderer2,
              private _elRef: ElementRef,
              private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit() {
    const setBsValue = (value: (Date|undefined)[]) => {
      this._setInputValue(value);
      if (this._value !== value) {
        this._value = value;
        this._onChange(value);
        this._onTouched();
      }
      this.changeDetection.markForCheck();
    };

    // if value set via [bsValue] it will not get into value change
    if (this._picker._bsValue) {
      setBsValue(this._picker._bsValue);
    }

    // update input value on datepicker value update
    this._subs.add(
      this._picker.bsValueChange.subscribe((value: Date[]) => {
        this._setInputValue(value);
        if (this._value !== value) {
          this._value = value;
          this._onChange(value);
          this._onTouched();
        }
        this.changeDetection.markForCheck();
      }));

    // update input value on locale change
    this._subs.add(this._localeService.localeChange.subscribe(() => {
      this._setInputValue(this._value);
    }));

    this._subs.add(
      // update input value on format change
      this._picker.rangeInputFormat$.pipe(distinctUntilChanged()).subscribe(() => {
        this._setInputValue(this._value);
      }));
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

  onKeydownEvent(event: KeyboardEvent) {
    if (event.keyCode === 13 || event.code === 'Enter') {
      this.hide();
    }
  }

  _setInputValue(date?: (Date|undefined)[]): void {
    let range = '';
    if (date) {
      const start: string = !date[0] ? ''
        : formatDate(date[0],
          this._picker._config.rangeInputFormat,
          this._localeService.currentLocale
        );
      const end: string = !date[1] ? ''
        : formatDate(
          date[1],
          this._picker._config.rangeInputFormat,
          this._localeService.currentLocale
        );
      range = (start && end) ? start + this._picker._config.rangeSeparator + end : '';
    }
    this._renderer.setProperty(this._elRef.nativeElement, 'value', range);
  }

  onChange(event: Event) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.writeValue((event.target as any).value);
    this._onChange(this._value);
    if (this._picker._config.returnFocusToInput) {
      this._renderer.selectRootElement(this._elRef.nativeElement).focus();
    }
    this._onTouched();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    let _value: [Date, Date] = c.value;
    const errors: Record<string, unknown>[] = [];

    if (_value === null || _value === undefined || !isArray(_value)) {
      return null;
    }

    _value = _value.slice().sort((a, b) => a.getTime() - b.getTime()) as [Date, Date];

    const _isFirstDateValid = isDateValid(_value[0]);
    const _isSecondDateValid = isDateValid(_value[1]);

    if (!_isFirstDateValid) {
      return { bsDate: { invalid: _value[0] } };
    }

    if (!_isSecondDateValid) {
      return { bsDate: { invalid: _value[1] } };
    }

    if (this._picker && this._picker.minDate && isBefore(_value[0], this._picker.minDate, 'date')) {
      _value[0] = this._picker.minDate;
      errors.push({ bsDate: { minDate: this._picker.minDate } });
    }

    if (this._picker && this._picker.maxDate && isAfter(_value[1], this._picker.maxDate, 'date')) {
      _value[1] = this._picker.maxDate;
      errors.push({ bsDate: { maxDate: this._picker.maxDate } });
    }
    if (errors.length > 0) {
      this.writeValue(_value);

      return errors;
    }

    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    this._validatorChange = fn;
  }

  writeValue(value: Date[] | string) {
    if (!value) {
      this._value = void 0;
    } else {
      const _localeKey = this._localeService.currentLocale;
      const _locale = getLocale(_localeKey);
      if (!_locale) {
        throw new Error(
          `Locale "${_localeKey}" is not defined, please add it with "defineLocale(...)"`
        );
      }

      let _input: (string | Date)[] = [];
      if (typeof value === 'string') {
        const trimmedSeparator = this._picker._config.rangeSeparator.trim();
        _input = value
          .split(trimmedSeparator.length > 0 ? trimmedSeparator : this._picker._config.rangeSeparator)
          .map(_val => _val.trim());
      }

      if (Array.isArray(value)) {
        _input = value;
      }

      this._value = _input
        .map((_val: string | Date): Date => {
            if (this._picker._config.useUtc) {
              return utcAsLocal(
                parseDate(_val, this._picker._config.rangeInputFormat, this._localeService.currentLocale)
              );
            }

            return parseDate(_val, this._picker._config.rangeInputFormat, this._localeService.currentLocale);
          }
        )
        .map((date: Date) => (isNaN(date.valueOf()) ? void 0 : date));
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  onBlur() {
    this._onTouched();
  }

  hide() {
    this._picker.hide();
    this._renderer.selectRootElement(this._elRef.nativeElement).blur();

    if (this._picker._config.returnFocusToInput) {
      this._renderer.selectRootElement(this._elRef.nativeElement).focus();
    }
  }
}
