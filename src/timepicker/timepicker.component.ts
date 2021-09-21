import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  Output, Renderer2, ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ControlValueAccessorModel } from './models';

import { TimepickerActions } from './reducer/timepicker.actions';
import { TimepickerStore } from './reducer/timepicker.store';
import { getControlsValue } from './timepicker-controls.util';
import { TimepickerConfig } from './timepicker.config';

import { TimeChangeSource, TimepickerComponentState, TimepickerControls } from './timepicker.models';

import {
  compose,
  getlimitsValidator,
  hoursValidator,
  minutesValidator,
  secondsValidator
} from './input.validator';

import {
  isHourInputValid,
  isInputLimitValid,
  isInputValid,
  isMinuteInputValid,
  isSecondInputValid,
  isValidDate,
  padNumber,
  parseTime
} from './timepicker.utils';

export const TIMEPICKER_CONTROL_VALUE_ACCESSOR: ControlValueAccessorModel = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimepickerComponent),
  multi: true
};

@Component({
  selector: 'timepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TIMEPICKER_CONTROL_VALUE_ACCESSOR, TimepickerStore],
  templateUrl: './timepicker.component.html',
  styles: [`
    .bs-chevron {
      border-style: solid;
      display: block;
      width: 9px;
      height: 9px;
      position: relative;
      border-width: 3px 0px 0 3px;
    }

    .bs-chevron-up {
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      top: 2px;
    }

    .bs-chevron-down {
      -webkit-transform: rotate(-135deg);
      transform: rotate(-135deg);
      top: -2px;
    }

    .bs-timepicker-field {
      width: 65px;
      padding: .375rem .55rem;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class TimepickerComponent
  implements ControlValueAccessor,
    TimepickerComponentState,
    TimepickerControls,
    OnChanges,
    OnDestroy {

  @ViewChild('hoursRef') hoursRef: ElementRef | undefined;
  @ViewChild('minutesRef') minutesRef: ElementRef | undefined;
  @ViewChild('secondsRef') secondsRef: ElementRef | undefined;

  /** hours change step */
  @Input() hourStep = 1;
  /** minutes change step */
  @Input() minuteStep = 5;
  /** seconds change step */
  @Input() secondsStep = 10;
  /** if true hours and minutes fields will be readonly */
  @Input() readonlyInput = false;
  /** if true hours and minutes fields will be disabled */
  @Input() disabled = false;
  /** if true scroll inside hours and minutes inputs will change time */
  @Input() mousewheel = true;
  /** if true the values of hours and minutes can be changed using the up/down arrow keys on the keyboard */
  @Input() arrowkeys = true;
  /** if true spinner arrows above and below the inputs will be shown */
  @Input() showSpinners = true;
  /** if true meridian button will be shown */
  @Input() showMeridian = true;
  /** show minutes in timepicker */
  @Input() showMinutes = true;
  /** show seconds in timepicker */
  @Input() showSeconds = false;
  /** meridian labels based on locale */
  @Input() meridians: string[] = ['AM', 'PM'];
  /** minimum time user can select */
  @Input() min?: Date;
  /** maximum time user can select */
  @Input() max?: Date;
  /** placeholder for hours field in timepicker */
  @Input() hoursPlaceholder = 'HH';
  /** placeholder for minutes field in timepicker */
  @Input() minutesPlaceholder = 'MM';
  /** placeholder for seconds field in timepicker */
  @Input() secondsPlaceholder = 'SS';

  /** emits true if value is a valid date */
  @Output() isValid = new EventEmitter<boolean>();
  /** emits value of meridian*/
  @Output() meridianChange = new EventEmitter<string>();
  // ui variables
  hours = '';
  minutes = '';
  seconds = '';
  meridian = '';
  errors: ValidationErrors | null = {};
  // min\max validation for input fields
  invalidHours = false;
  invalidMinutes = false;
  invalidSeconds = false;
  // aria-label variables
  labelHours = 'hours';
  labelMinutes = 'minutes';
  labelSeconds = 'seconds';
  // time picker controls state
  canIncrementHours = true;
  canIncrementMinutes = true;
  canIncrementSeconds = true;
  canDecrementHours = true;
  canDecrementMinutes = true;
  canDecrementSeconds = true;
  canToggleMeridian = true;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange = Function.prototype;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onTouched = Function.prototype;

  // control value accessor methods
  timepickerSub: Subscription;
  constructor(
    _config: TimepickerConfig,
    private _cd: ChangeDetectorRef,
    private _store: TimepickerStore,
    private _renderer: Renderer2,
    private _timepickerActions: TimepickerActions
  ) {
    Object.assign(this, _config);

    this.timepickerSub = _store
      .select(state => state.value)
      .subscribe((value: Date | undefined) => {
        // update UI values if date changed
        this._renderTime(value);
        this.onChange(value);
        this.errors = null;
        this._store.dispatch(
          this._timepickerActions.updateControls(getControlsValue(this))
        );
      });

    _store
      .select(state => state.controls)
      .subscribe((controlsState: TimepickerControls) => {
        this.isValid.emit(isInputValid(this.hours, this.minutes, this.seconds));
        Object.assign(this, controlsState);
        _cd.markForCheck();
      });
  }

  /** @deprecated - please use `isEditable` instead */
  get isSpinnersVisible(): boolean {
    return this.showSpinners && !this.readonlyInput;
  }

  get isEditable(): boolean {
    return !(this.readonlyInput || this.disabled);
  }

  resetValidation(): void {
    this.invalidHours = false;
    this.invalidMinutes = false;
    this.invalidSeconds = false;
  }

  isPM(): boolean {
    return this.showMeridian && this.meridian === this.meridians[1];
  }

  prevDef($event: Event) {
    $event.preventDefault();
  }

  wheelSign($event: WheelEventInit): number {
    return Math.sign($event.deltaY || 0) * -1;
  }

  ngOnChanges(): void {
    this._store.dispatch(
      this._timepickerActions.updateControls(getControlsValue(this))
    );
  }

  changeTimeOption(option: string, step: number, source: TimeChangeSource = ''): void {
    const action: { [key: string]: string } = {
      hours: 'changeHours',
      minutes: 'changeMinutes',
      seconds: 'changeSeconds'
    };

    this._store.dispatch(
      (this as any)._timepickerActions[action[option]]({ step, source })
   );
  }

  // old api methods
  changeHours(step: number, source: TimeChangeSource = ''): void {
    this.changeTimeOption('hours', step, source);
  }

  changeMinutes(step: number, source: TimeChangeSource = ''): void {
    this.changeTimeOption('minutes', step, source);
  }

  changeSeconds(step: number, source: TimeChangeSource = ''): void {
    this.changeTimeOption('seconds', step, source);
  }

  updateTimeOption(option: string, value: string): void {
    (this as any)[option] = value;

    this._updateTime();
  }

  updateHours(target?: Partial<EventTarget> | null): void {
    const hours = (target as HTMLInputElement).value;

    this.updateTimeOption('hours', hours);
  }

  updateMinutes(target?: Partial<EventTarget> | null): void {
    const minutes = (target as HTMLInputElement).value;

    this.updateTimeOption('minutes', minutes);
  }

  updateSeconds(target?: Partial<EventTarget> | null): void {
    const seconds = (target as HTMLInputElement).value;

    this.updateTimeOption('seconds', seconds);
  }

  // isValidLimit(): boolean {
  //   return isInputLimitValid({
  //     hour: this.hours,
  //     minute: this.minutes,
  //     seconds: this.seconds,
  //     isPM: this.isPM()
  //   }, this.max, this.min);
  // }

  _updateTime() {
    this._store.dispatch(
      this._timepickerActions.setTime({
        hour: this.hours,
        minute: this.minutes,
        seconds: this.seconds,
        isPM: this.isPM()
      })
    );
  }

  onTimeChanged(hoursValue: Partial<EventTarget> | null | string,
                minutesValue: Partial<EventTarget> | null | string,
                secondsValue: Partial<EventTarget> | null | string) {


    const hours = (hoursValue as HTMLInputElement).value;
    const seconds = (secondsValue as HTMLInputElement).value;
    const minutes = (minutesValue as HTMLInputElement).value;

    this.errors = this.validateAndReturnErrors({ hours, minutes, seconds });

    if (!this.errors) {
        [this.hours, this.minutes, this.seconds] = [hours, minutes, seconds];

      this._updateTime();

      return;
    }

    this.onChange(null);
    this.isValid.emit(false);
    this.meridian = this.meridians[0];
    this.meridianChange.emit(this.meridian);
  }

  validateAndReturnErrors(timeValue: { hours: string; seconds: string | undefined; minutes: string }): ValidationErrors {
    return compose([
      hoursValidator,
      minutesValidator,
      secondsValidator,
      getlimitsValidator(this.min, this.max, this.isPM())
    ])(timeValue);
  }


  toggleMeridian(): void {
    if (!this.showMeridian || !this.isEditable) {
      return;
    }

    const _hoursPerDayHalf = 12;
    this._store.dispatch(
      this._timepickerActions.changeHours({
        step: _hoursPerDayHalf,
        source: ''
      })
    );
  }

  /**
   * Write a new value to the element.
   */
  writeValue(obj?: string | Date): void {
    if (isValidDate(obj)) {
      this.resetValidation();
      this._store.dispatch(this._timepickerActions.writeValue(parseTime(obj)));
    } else if (obj == null) {
      this._store.dispatch(this._timepickerActions.writeValue());
    }
  }

  /**
   * Set the function to be called when the control receives a change event.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  /**
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * This function is called when the control status changes to or from "disabled".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
   * @param isDisabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._cd.markForCheck();
  }

  ngOnDestroy(): void {
    this.timepickerSub.unsubscribe();
  }

  private _renderTime(value?: string | Date): void {

    const _value = parseTime(value);
    if (!_value) {
      return;
    }

    const _hoursPerDayHalf = 12;
    let _hours = _value.getHours();

    if (this.showMeridian) {
      this.meridian = this.meridians[_hours >= _hoursPerDayHalf ? 1 : 0];
      this.meridianChange.emit(this.meridian);
      _hours = _hours % _hoursPerDayHalf;
      // should be 12 PM, not 00 PM
      if (_hours === 0) {
        _hours = _hoursPerDayHalf;
      }
    }

    this.hours = padNumber(_hours);
    if (this.hoursRef && this.hoursRef.nativeElement.value !== this.hours) {
      this._renderer.setProperty(this.hoursRef.nativeElement, 'value', this.hours);
    }
    this.minutes = padNumber(_value.getMinutes());
    if (this.minutesRef && this.minutesRef.nativeElement.value !== this.minutes) {
      this._renderer.setProperty(this.minutesRef.nativeElement, 'value', this.minutes);
    }
    this.seconds = padNumber(_value.getUTCSeconds());
    if (this.secondsRef && this.secondsRef.nativeElement.value !== this.hours) {
      this._renderer.setProperty(this.secondsRef.nativeElement, 'value', this.seconds);
    }
  }
}
