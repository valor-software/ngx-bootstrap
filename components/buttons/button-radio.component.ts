import { Directive,  OnInit, Input, HostBinding, HostListener,
  Self, ElementRef, forwardRef, Provider } from 'angular2/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from 'angular2/common';
import {CONST_EXPR} from 'angular2/src/facade/lang';

const CUSTOM_VALUE_ACCESSOR = CONST_EXPR(new Provider(NG_VALUE_ACCESSOR,
  { useExisting: forwardRef(() => ButtonRadio), multi: true }));

@Directive({ selector: '[btnRadio]', providers:[CUSTOM_VALUE_ACCESSOR] })
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
      return this.onChange(null);
    }

    this.onChange(this.btnRadio);
  }

  constructor(public el:ElementRef) {
  }

  public ngOnInit() {
    this.uncheckable = typeof this.uncheckable !== 'undefined';
  }

  private value:any;


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
