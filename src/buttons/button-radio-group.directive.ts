// tslint:disable:no-use-before-declare
import { ChangeDetectorRef, Directive, ElementRef, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  get value(): any {
    return this._value;
  }
  set value(value: any) {
    this._value = value;
  }

  private _value: any;

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  writeValue(value: any): void {
    this._value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
