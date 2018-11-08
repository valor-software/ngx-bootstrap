import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Optional,
  Provider,
  Renderer2
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonRadioGroupDirective } from './button-radio-group.directive';

export const RADIO_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable-next-line: no-use-before-declare */
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
  onChange = Function.prototype;
  onTouched = Function.prototype;

  /** Radio button value, will be set to `ngModel` */
  @Input() btnRadio: string;
  /** If `true` — radio button can be unchecked */
  @Input() uncheckable: boolean;
  /** Current value of radio component or group */
  @Input() get value() {
    return this.group ? this.group.value : this._value;
  }

  set value(value: null | string) {
    if (this.group) {
      this.group.value = value;

      return;
    }
    this._value = value;
  }
  /** If `true` — radio button is disabled */
  @Input() get disabled(): boolean {
    return this._disabled;
  }

  set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.setDisabledState(disabled);
  }

  @HostBinding('class.active')
  @HostBinding('attr.aria-pressed')
  get isActive(): boolean {
    return this.btnRadio === this.value;
  }

  private _value:  null | string;
  private _disabled: boolean;

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    @Optional() private group: ButtonRadioGroupDirective,
    private renderer: Renderer2
  ) {}

  @HostListener('click')
  onClick(): void {
    if (this.el.nativeElement.attributes.disabled || !this.uncheckable && this.btnRadio === this.value) {
      return;
    }

    this.value = this.uncheckable && this.btnRadio === this.value ? undefined : this.btnRadio;
    this._onChange(this.value);
  }

  ngOnInit(): void {
    this.uncheckable = typeof this.uncheckable !== 'undefined';
  }

  onBlur(): void {
    this.onTouched();
  }

  _onChange(value: string): void {
    if (this.group) {
      this.group.onTouched();
      this.group.onChange(value);

      return;
    }
    this.onTouched();
    this.onChange(value);
  }

  // ControlValueAccessor
  // model -> view
  writeValue(value: string): void {
    this.value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    if (disabled) {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'disabled');

      return;
    }
    this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
  }
}
