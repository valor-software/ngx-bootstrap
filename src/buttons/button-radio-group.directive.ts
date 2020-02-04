import {
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  forwardRef,
  Provider,
  QueryList
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ButtonRadioDirective } from './button-radio.directive';

export const RADIO_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable-next-line: no-use-before-declare */
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

  @ContentChildren(forwardRef(() => ButtonRadioDirective)) radioButtons: QueryList<ButtonRadioDirective>;

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

  setDisabledState(disabled: boolean): void {
    if (this.radioButtons) {
      this.radioButtons.forEach(buttons => {
        buttons.setDisabledState(disabled);
      });
    }
  }
}
