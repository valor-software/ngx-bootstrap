import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnChanges,
  Optional,
  Provider,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonRadioGroupDirective } from './button-radio-group.directive';

export const RADIO_CONTROL_VALUE_ACCESSOR: Provider = {
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
export class ButtonRadioDirective implements ControlValueAccessor, OnChanges {
  onChange = Function.prototype;
  onTouched = Function.prototype;

  /** Radio button value, will be set to `ngModel` */
  @Input() btnRadio?: string;
  /** If `true` — radio button can be unchecked */
  @Input() uncheckable = false;
  /** Current value of radio component or group */
  @Input()
  get value() {
    return this.group ? this.group.value : this._value;
  }

  set value(value: string | undefined) {
    if (this.group) {
      this.group.value = value;

      return;
    }
    this._value = value;
    this._onChange(value);
  }
  /** If `true` — radio button is disabled */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(disabled: boolean) {
    this.setDisabledState(disabled);
  }

  @HostBinding('attr.aria-disabled')
  get controlOrGroupDisabled() {
    return this.disabled || (this.group && this.group.disabled) ? true : undefined;
  }

  @HostBinding('class.disabled')
  get hasDisabledClass() {
    // Although the radio is disabled the active radio should still stand out.
    // The disabled class will prevent this so don't add it on the active radio
    return this.controlOrGroupDisabled && !this.isActive;
  }

  @HostBinding('class.active')
  @HostBinding('attr.aria-checked')
  get isActive(): boolean {
    return this.btnRadio === this.value;
  }

  @HostBinding('attr.role') readonly role: string = 'radio';

  @HostBinding('attr.tabindex')
  get tabindex(): undefined | number {
    if (this.controlOrGroupDisabled) {
      // Disabled radio buttons should not receive focus
      return undefined;
    } else if (this.isActive || this.group == null) {
      return 0;
    } else {
      return -1;
    }
  }

  get hasFocus(): boolean {
    return this._hasFocus;
  }

  private _value?: string;
  private _disabled = false;
  private _hasFocus = false;

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    @Optional()
    @Inject(forwardRef(() => ButtonRadioGroupDirective))
    private group: ButtonRadioGroupDirective
  ) {}

  @HostListener('click')
  toggleIfAllowed(): void {
    if (!this.canToggle()) {
      return;
    }

    if (this.uncheckable && this.btnRadio === this.value) {
      this.value = undefined;
    } else {
      this.value = this.btnRadio;
    }
  }

  @HostListener('keydown.space', ['$event'])
  onSpacePressed(event: KeyboardEvent) {
    this.toggleIfAllowed();
    event.preventDefault();
  }

  focus() {
    this.el.nativeElement.focus();
  }

  @HostListener('focus')
  onFocus() {
    this._hasFocus = true;
  }

  @HostListener('blur')
  onBlur() {
    this._hasFocus = false;
    this.onTouched();
  }

  canToggle(): boolean {
    return !this.controlOrGroupDisabled && (this.uncheckable || this.btnRadio !== this.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('uncheckable' in changes) {
      this.uncheckable = this.uncheckable !== false && typeof this.uncheckable !== 'undefined';
    }
  }

  _onChange(value?: string): void {
    if (this.group) {
      this.group.value = value;

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

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this._disabled = disabled;
    if (disabled) {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'disabled');

      return;
    }
    this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
  }
}
