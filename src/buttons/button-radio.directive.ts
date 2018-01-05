// tslint:disable:no-use-before-declare
import {
  ChangeDetectorRef, Directive, ElementRef, forwardRef, HostBinding,
  HostListener, Input, OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const RADIO_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ButtonRadioDirective),
  multi: true
};

/**
 * Create radio buttons or groups of buttons.
 * A value of a selected button is bound to a variable specified via ngModel.
 */
@Directive({
  selector: '[btnRadio]',
  providers: [RADIO_CONTROL_VALUE_ACCESSOR]
})
export class ButtonRadioDirective implements ControlValueAccessor, OnInit {
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  /** Radio button value, will be set to `ngModel` */
  @Input() btnRadio: any;
  /** If `true` — radio button can be unchecked */
  @Input() uncheckable: boolean;
  /** Current value of radio component or group */
  @Input() value: any;

  @HostBinding('class.active')
  get isActive(): boolean {
    return this.btnRadio === this.value;
  }

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {
  }

  @HostListener('click')
  onClick(): void {
    if (this.el.nativeElement.attributes.disabled) {
      return;
    }

    if (this.uncheckable && this.btnRadio === this.value) {
      this.value = undefined;
      this.onTouched();
      this.onChange(this.value);

      return;
    }

    if (this.btnRadio !== this.value) {
      this.value = this.btnRadio;
      this.onTouched();
      this.onChange(this.value);
    }
  }

  ngOnInit(): void {
    this.uncheckable = typeof this.uncheckable !== 'undefined';
  }

  onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor
  // model -> view
  writeValue(value: any): void {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
