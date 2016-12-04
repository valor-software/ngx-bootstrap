import {
  Directive, HostBinding, HostListener, Input, OnInit, Self, ElementRef
} from '@angular/core';
import { ControlValueAccessor, NgModel } from '@angular/forms';

// TODO: config: activeClass - Class to apply to the checked buttons.

@Directive({selector: '[btnCheckbox][ngModel]'})
export class ButtonCheckboxDirective implements ControlValueAccessor, OnInit {
  public cd:NgModel;
  public el: ElementRef;
  @Input() public btnCheckboxTrue:any;

  @Input() public btnCheckboxFalse:any;
  @HostBinding('class.active')
  public state:boolean = false;

  protected onChange:any = Function.prototype;
  protected onTouched:any = Function.prototype;

  protected value:any;

  // view -> model
  @HostListener('click')
  public onClick():void {
    if (this.el.nativeElement.attributes.disabled) {
      return;
    }
    this.toggle(!this.state);
    this.cd.viewToModelUpdate(this.value);
  }

  public constructor(@Self() cd:NgModel, el: ElementRef) {
    this.el = el;
    this.cd = cd;
    // hack !
    cd.valueAccessor = this;
  }

  public ngOnInit():any {
    this.toggle(this.trueValue === this.value);
  }

  protected get trueValue():boolean {
    return typeof this.btnCheckboxTrue !== 'undefined'
      ? this.btnCheckboxTrue
      : true;
  }

  protected get falseValue():boolean {
    return typeof this.btnCheckboxFalse !== 'undefined'
      ? this.btnCheckboxFalse
      : false;
  }

  public toggle(state:boolean):void {
    this.state = state;
    this.value = this.state ? this.trueValue : this.falseValue;
  }

  // ControlValueAccessor
  // model -> view
  public writeValue(value:any):void {
    this.state = this.trueValue === value;
    this.value = value;
  }

  public registerOnChange(fn:(_:any) => {}):void {
    this.onChange = fn;
  }

  public registerOnTouched(fn:() => {}):void {
    this.onTouched = fn;
  }
}
