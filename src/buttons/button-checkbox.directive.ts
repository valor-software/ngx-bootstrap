import {
  Directive,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Provider
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// TODO: config: activeClass - Class to apply to the checked buttons
export const CHECKBOX_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ButtonCheckboxDirective),
  multi: true
};

type AvailableValues = boolean | string | number;

/**
 * Add checkbox functionality to any element
 */
@Directive({
  selector: '[btnCheckbox]',
  providers: [CHECKBOX_CONTROL_VALUE_ACCESSOR]
})
export class ButtonCheckboxDirective implements ControlValueAccessor, OnInit {
  /** Truthy value, will be set to ngModel */
  @Input() btnCheckboxTrue:AvailableValues = true;
  /** Falsy value, will be set to ngModel */
  @Input() btnCheckboxFalse:AvailableValues = false;

  @HostBinding('class.active')
  @HostBinding('attr.aria-pressed')
  state = false;

  protected value?: AvailableValues;
  protected isDisabled = false;

  protected onChange = Function.prototype;
  protected onTouched = Function.prototype;

  // view -> model
  @HostListener('click')
  onClick(): void {
    if (this.isDisabled) {
      return;
    }

    this.toggle(!this.state);
    this.onChange(this.value);
  }

  ngOnInit(): void {
    this.toggle(this.trueValue === this.value);
  }

  protected get trueValue(): AvailableValues {
    return typeof this.btnCheckboxTrue !== 'undefined'
      ? this.btnCheckboxTrue
      : true;
  }

  protected get falseValue(): AvailableValues {
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
  writeValue(value: boolean | string | null): void {
    this.state = this.trueValue === value;
    this.value = value ? this.trueValue : this.falseValue;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
