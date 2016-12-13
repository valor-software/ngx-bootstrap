import { Directive, HostBinding, HostListener, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// TODO: config: activeClass - Class to apply to the checked buttons

export const CHECKBOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ButtonCheckboxDirective),
  multi: true
};

@Directive({selector: '[btnCheckbox]', providers: [CHECKBOX_CONTROL_VALUE_ACCESSOR]})
export class ButtonCheckboxDirective implements ControlValueAccessor, OnInit {
  @Input() public btnCheckboxTrue: any;
  @Input() public btnCheckboxFalse: any;

  @HostBinding('class.active') public state: boolean = false;

  protected value: any;
  protected isDisabled: boolean;

  protected onChange: any = Function.prototype;
  protected onTouched: any = Function.prototype;

  // view -> model
  @HostListener('click')
  public onClick(): void {
    if (this.isDisabled) {
      return;
    }

    this.toggle(!this.state);
    this.onChange(this.value);
  }

  public ngOnInit(): any {
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

  public toggle(state: boolean): void {
    this.state = state;
    this.value = this.state ? this.trueValue : this.falseValue;
  }

  // ControlValueAccessor
  // model -> view
  public writeValue(value: any): void {
    this.state = this.trueValue === value;
    this.value = value ? this.trueValue : this.falseValue;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}
