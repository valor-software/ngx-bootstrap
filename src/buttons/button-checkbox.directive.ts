// tslint:disable:no-use-before-declare
import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// TODO: config: activeClass - Class to apply to the checked buttons

export const CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ButtonCheckboxDirective),
  multi: true
};

/**
 * Add checkbox functionality to any element
 */
@Directive({
  selector: '[btnCheckbox]',
  providers: [CHECKBOX_CONTROL_VALUE_ACCESSOR]
})
export class ButtonCheckboxDirective implements ControlValueAccessor, OnInit {
  /** Truthy value, will be set to ngModel */
  @Input() btnCheckboxTrue: any = true;
  /** Falsy value, will be set to ngModel */
  @Input() btnCheckboxFalse: any = false;

  @HostBinding('class.active')
  @HostBinding('attr.aria-pressed')
  state = false;

  protected value: any;
  protected isDisabled: boolean;

  protected onChange: any = Function.prototype;
  protected onTouched: any = Function.prototype;

  // view -> model
  @HostListener('click')
  onClick(): void {
    if (this.isDisabled) {
      return;
    }

    this.toggle(!this.state);
    this.onChange(this.value);
  }

  ngOnInit(): any {
    this.toggle(this.trueValue === this.value);
  }

  protected get trueValue(): boolean {
    return typeof this.btnCheckboxTrue !== 'undefined'
      ? this.btnCheckboxTrue
      : true;
  }

  protected get falseValue(): boolean {
    return typeof this.btnCheckboxFalse !== 'undefined'
      ? this.btnCheckboxFalse
      : false;
  }

  toggle(state: boolean): void {
    this.state = state;
    this.value = this.state ? this.trueValue : this.falseValue;
  }

  // ControlValueAccessor
  // model -> view
  writeValue(value: any): void {
    this.state = this.trueValue === value;
    this.value = value ? this.trueValue : this.falseValue;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
