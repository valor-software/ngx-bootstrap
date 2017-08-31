import { Directive, ElementRef, forwardRef, Host, OnInit, Renderer } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BsDatepickerComponent } from './bs-datepicker.component';

const BS_DATEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BsDatepickerInputDirective),
  multi: true
};

@Directive({
  selector: `input[bsDatepicker]`,
  host: {
    '(change)': 'onChange($event)'
  },
  providers: [BS_DATEPICKER_VALUE_ACCESSOR]
})
export class BsDatepickerInputDirective
  implements OnInit, ControlValueAccessor {

  private _onChange = Function.prototype;
  private _onTouched = Function.prototype;

  constructor(@Host() private _picker: BsDatepickerComponent,
              private _renderer: Renderer,
              private _elRef: ElementRef) {
  }

  ngOnInit(): void {
    this._picker.bsValueChange.subscribe((v: Date) => this._onChange(v));
  }

  onChange(event: any) {
    this.writeValue(event.target.value);
  }

  writeValue(value: Date | string) {
    if (!value) {
      this._picker.bsValue = null;
    }

    if (typeof value === 'string') {
      const date = new Date(value);
      this._picker.bsValue = isNaN(date.valueOf()) ? null : date;
    }

    if (value instanceof Date) {
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
