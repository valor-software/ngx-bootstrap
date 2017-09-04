import { Directive, ElementRef, forwardRef, Host, OnInit, Renderer } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BsDatepickerConfig } from './bs-datepicker.config';
import { BsDaterangepickerComponent } from './bs-daterangepicker.component';

const BS_DATERANGEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BsDaterangepickerInputDirective),
  multi: true
};

@Directive({
  selector: `input[bsDaterangepicker]`,
  host: {
    '(change)': 'onChange($event)'
  },
  providers: [BS_DATERANGEPICKER_VALUE_ACCESSOR]
})
export class BsDaterangepickerInputDirective
  implements OnInit, ControlValueAccessor {

  private _onChange = Function.prototype;
  private _onTouched = Function.prototype;

  constructor(@Host() private _picker: BsDaterangepickerComponent,
              private _config: BsDatepickerConfig,
              private _renderer: Renderer,
              private _elRef: ElementRef) {
  }

  ngOnInit(): void {
    this._picker.bsValueChange.subscribe((v: Date) => this._onChange(v));
  }

  onChange(event: any) {
    this.writeValue(event.target.value);
  }

  writeValue(value: Date[] | string) {
    if (!value) {
      this._picker.bsValue = null;
    }

    if (typeof value === 'string') {
      this._picker.bsValue = value
        .split(this._config.rangeSeparator)
        .map(date => new Date(date))
        .map(date => isNaN(date.valueOf()) ? null : date);
    }

    if (Array.isArray(value)) {
      this._picker.bsValue = value;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this._picker.isDisabled = isDisabled;
    this._renderer.setElementAttribute(this._elRef.nativeElement, 'disabled', 'disabled');
  }

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }

  registerOnTouched(fn: () => any): void { this._onTouched = fn; }
}
