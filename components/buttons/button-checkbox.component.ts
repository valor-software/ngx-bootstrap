import { Directive, OnInit, Input, HostBinding, HostListener,
  Self, Renderer, ElementRef, forwardRef, Provider } from 'angular2/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from 'angular2/common';
import {CONST_EXPR} from 'angular2/src/facade/lang';

const CUSTOM_VALUE_ACCESSOR = CONST_EXPR(new Provider(NG_VALUE_ACCESSOR,
  { useExisting: forwardRef(() => ButtonCheckbox), multi: true }));


@Directive({
  selector: '[btnCheckbox]',
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class ButtonCheckbox implements ControlValueAccessor, OnInit {
  @Input() private btnCheckboxTrue:any;
  @Input() private btnCheckboxFalse:any;

  @HostBinding('class.active')
  private state:boolean = false;

  // view -> model
  @HostListener('click')
  private onClick() {
    this.toggle(!this.state);
    this.onChange(this.value);
  }

  private value:any;

  constructor() { }

  public ngOnInit() {
    this.toggle(this.trueValue === this.value);
  }

  private get trueValue() {
    return typeof this.btnCheckboxTrue !== 'undefined' ? this.btnCheckboxTrue : true;
  }

  private get falseValue() {
    return typeof this.btnCheckboxFalse !== 'undefined' ? this.btnCheckboxFalse : false;
  }

  private toggle(state:boolean) {
    this.state = state;
    this.value = this.state ? this.trueValue : this.falseValue;
  }

  // ControlValueAccessor
  // model -> view
  public writeValue(value:any) {
    this.state = this.trueValue === value;
    this.value = value;
  }

  protected onChange = (_:any) => {};
  protected onTouched = () => {};

  public registerOnChange(fn:(_:any) => {}):void {
    this.onChange = fn;
  }

  public registerOnTouched(fn:() => {}):void {
    this.onTouched = fn;
  }
}
