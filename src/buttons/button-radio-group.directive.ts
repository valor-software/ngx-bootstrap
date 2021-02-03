import {
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  forwardRef,
  HostBinding,
  HostListener,
  Provider,
  QueryList
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonRadioDirective } from './button-radio.directive';

export const RADIO_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable-next-line: no-use-before-declare */
  useExisting: forwardRef(() => ButtonRadioGroupDirective),
  multi: true
};

/**
 * A group of radio buttons.
 * A value of a selected button is bound to a variable specified via ngModel.
 */
@Directive({
  selector: '[btnRadioGroup]',
  providers: [RADIO_CONTROL_VALUE_ACCESSOR]
})
export class ButtonRadioGroupDirective implements ControlValueAccessor {
  onChange = Function.prototype;
  onTouched = Function.prototype;

  @HostBinding('attr.role') readonly role: string = 'radiogroup';

  @ContentChildren(forwardRef(() => ButtonRadioDirective))
  radioButtons: QueryList<ButtonRadioDirective>;

  get value() {
    return this._value;
  }
  set value(value: string | null) {
    this._value = value;
    this.onChange(value);
  }

  private _value: string | null;

  private _disabled: boolean;

  @HostBinding('attr.tabindex')
  get tabindex(): null | number {
    if (this._disabled) {
      return null;
    } else {
      return 0;
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(value: string | null): void {
    this._value = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    if (this.radioButtons) {
      this._disabled = disabled;
      this.radioButtons.forEach(buttons => {
        buttons.setDisabledState(disabled);
      });
      this.cdr.markForCheck();
    }
  }

  @HostListener('focus')
  onFocus() {
    if (this._disabled) {
      return;
    }
    const activeRadio = this.getActiveOrFocusedRadio();
    if (activeRadio) {
      activeRadio.focus();
    } else {
      const firstEnabled = this.radioButtons.find(r => !r.disabled);
      if (firstEnabled) {
        firstEnabled.focus();
      }
    }
  }

  @HostListener('blur')
  onBlur() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  @HostListener('keydown.ArrowRight', ['$event'])
  @HostListener('keydown.ArrowDown', ['$event'])
  selectNext(event: KeyboardEvent) {
    this.selectInDirection('next');
    event.preventDefault();
  }

  @HostListener('keydown.ArrowLeft', ['$event'])
  @HostListener('keydown.ArrowUp', ['$event'])
  selectPrevious(event: KeyboardEvent) {
    this.selectInDirection('previous');
    event.preventDefault();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  private selectInDirection(direction: 'next' | 'previous') {
    if (this._disabled) {
      return;
    }
    function nextIndex(currentIndex: number, buttonRadioDirectives: ButtonRadioDirective[]) {
      const step = direction === 'next' ? 1 : -1;
      let calcIndex = (currentIndex + step) % buttonRadioDirectives.length;
      if (calcIndex < 0) {
        calcIndex = buttonRadioDirectives.length - 1;
      }

      return calcIndex;
    }
    const activeRadio = this.getActiveOrFocusedRadio();

    if (activeRadio) {
      const buttonRadioDirectives = this.radioButtons.toArray();
      const currentActiveIndex = buttonRadioDirectives.indexOf(activeRadio);
      for (
        let i = nextIndex(currentActiveIndex, buttonRadioDirectives);
        i !== currentActiveIndex;
        i = nextIndex(i, buttonRadioDirectives)
      ) {
        if (buttonRadioDirectives[i].canToggle()) {
          buttonRadioDirectives[i].toggleIfAllowed();
          buttonRadioDirectives[i].focus();
          break;
        }
      }
    }
  }

  private getActiveOrFocusedRadio(): ButtonRadioDirective | undefined {
    return this.radioButtons.find(button => button.isActive) || this.radioButtons.find(button => button.hasFocus);
  }
}
