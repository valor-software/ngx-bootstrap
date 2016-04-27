import {
  Directive, OnInit, Input, HostBinding, HostListener, Self, ElementRef
} from 'angular2/core';
import {ControlValueAccessor, NgModel} from 'angular2/common';

@Directive({selector: '[btnRadio][ngModel]'})
export class ButtonRadioDirective implements ControlValueAccessor, OnInit {
  public cd:NgModel;
  public el:ElementRef;

  public onChange:any = Function.prototype;
  public onTouched:any = Function.prototype;

  @Input() private btnRadio:string;
  @Input() private uncheckable:boolean;

  @HostBinding('class.active')
  public get isActive():boolean {
    return this.btnRadio === this.value;
  }

  @HostListener('click')
  public onClick():void {
    if (this.uncheckable && this.btnRadio === this.value) {
      return this.cd.viewToModelUpdate(void 0);
    }

    this.cd.viewToModelUpdate(this.btnRadio);
  }

  public constructor(@Self() cd:NgModel, el:ElementRef) {
    // hack!
    this.cd = cd;
    this.el = el;
    cd.valueAccessor = this;
  }

  public ngOnInit():void {
    this.uncheckable = typeof this.uncheckable !== 'undefined';
  }

  // hack view model!
  protected get value():any {
    return this.cd.viewModel;
  }

  protected set value(value:any) {
    this.cd.viewModel = value;
  }

  // ControlValueAccessor
  // model -> view
  public writeValue(value:any):void {
    this.value = value;
  }

  public registerOnChange(fn:(_:any) => {}):void {
    this.onChange = fn;
  }

  public registerOnTouched(fn:() => {}):void {
    this.onTouched = fn;
  }
}
