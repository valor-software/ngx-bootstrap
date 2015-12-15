import {
  Directive,
  OnInit, Input, HostBinding, HostListener,
  Self, ElementRef
} from 'angular2/core';
import { ControlValueAccessor, NgModel } from 'angular2/common';

@Directive({ selector: '[btnRadio][ngModel]' })
export class ButtonRadio implements ControlValueAccessor, OnInit {
  @Input() private btnRadio:string;
  @Input() private uncheckable:boolean;

  @HostBinding('class.active')
  private get isActive() {
    return this.btnRadio === this.value;
  }

  @HostListener('click')
  private onClick() {
    if (this.uncheckable && this.btnRadio === this.value) {
      return this.cd.viewToModelUpdate(null);
    }

    this.cd.viewToModelUpdate(this.btnRadio);
  }

  constructor(@Self() public cd:NgModel, public el:ElementRef) {
    // hack!
    cd.valueAccessor = this;
  }

  public ngOnInit() {
    this.uncheckable = typeof this.uncheckable !== 'undefined';
  }

  // hack view model!
  protected get value() {
    return this.cd.viewModel;
  }

  protected set value(value) {
    this.cd.viewModel = value;
  }

  // ControlValueAccessor
  // model -> view
  public writeValue(value:any) {
    this.value = value;
  }

  public onChange = (_:any) => {};
  public onTouched = () => {};

  public registerOnChange(fn:(_:any) => {}):void {
    this.onChange = fn;
  }

  public registerOnTouched(fn:() => {}):void {
    this.onTouched = fn;
  }
}
