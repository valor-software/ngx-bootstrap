// tslint:disable:no-use-before-declare
import { ChangeDetectorRef, Directive, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// tslint:disable-next-line:no-any
export const RADIO_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ButtonRadioGroupDirective),
  multi: true
};

/**
 * A group of radio buttons.
 * A value of a selected button is bound to a variable specified via ngModel.
 */
@Directive({
  selector: '[btnRadioGroup]',
  providers: [RADIO_CONTROL_VALUE_ACCESSOR]
})
export class ButtonRadioGroupDirective implements ControlValueAccessor {
  onChange = Function.prototype;
  onTouched = Function.prototype;

  get value() {
    return this._value;
  }
  set value(value: string | null) {
    this._value = value;
  }

  private _value: string | null;

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(value: string | null): void {
    this._value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
