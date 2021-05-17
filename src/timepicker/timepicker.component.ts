import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ControlValueAccessorModel } from './models';
import { TimepickerActions } from './reducer/timepicker.actions';
import { TimepickerStore } from './reducer/timepicker.store';
import { getControlsValue } from './timepicker-controls.util';
import { TimepickerConfig } from './timepicker.config';
import { TimeChangeSource, TimepickerComponentState, TimepickerControls } from './timepicker.models';
import {
  isHourInputValid, isInputLimitValid,
  isInputValid,
  isMinuteInputValid, isOneOfDatesEmpty, isSecondInputValid,
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
      width: 50px;
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
  /** if true emptyDate is not marked as invalid */
  @Input() allowEmptyDate = false;
  /** emits true if value is a valid date */
  @Output() isValid = new EventEmitter<boolean>();

  // ui variables
  hours = '';
  minutes = '';
  seconds = '';
  meridian = '';
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
    private _timepickerActions: TimepickerActions
  ) {
    Object.assign(this, _config);

    this.timepickerSub = _store
      .select(state => state.value)
      .subscribe((value: Date | undefined) => {
        // update UI values if date changed
        this._renderTime(value);
        this.onChange(value);

        this._store.dispatch(
          this._timepickerActions.updateControls(getControlsValue(this))
        );
      });

    _store
      .select(state => state.controls)
      .subscribe((controlsState: TimepickerControls) => {
        const isTimepickerInputValid = isInputValid(this.hours, this.minutes, this.seconds, this.isPM())
        const isValid = this.allowEmptyDate ?
          this.isOneOfDatesIsEmpty() || isTimepickerInputValid
          : isTimepickerInputValid;
        this.isValid.emit(isValid);
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

  changeHours(step: number, source: TimeChangeSource = ''): void {
    this.resetValidation();
    this._store.dispatch(this._timepickerActions.changeHours({ step, source }));
  }

  changeMinutes(step: number, source: TimeChangeSource = ''): void {
    this.resetValidation();
    this._store.dispatch(
      this._timepickerActions.changeMinutes({ step, source })
    );
  }

  changeSeconds(step: number, source: TimeChangeSource = ''): void {
    this.resetValidation();
    this._store.dispatch(
      this._timepickerActions.changeSeconds({ step, source })
    );
  }

  updateHours(target?: Partial<EventTarget> | null): void {
    this.resetValidation();
    this.hours = (target as HTMLInputElement).value;
    const isTimepickerInputValid = isHourInputValid(this.hours, this.isPM()) && this.isValidLimit();
    const isValid = this.allowEmptyDate ?
      this.isOneOfDatesIsEmpty() || isTimepickerInputValid
      : isTimepickerInputValid;
    if (!isValid) {
      this.invalidHours = true;
      this.isValid.emit(false);
      this.onChange(null);

      return;
    }

    this._updateTime();
  }

  updateMinutes(target: Partial<EventTarget> | null) {
    this.resetValidation();
    this.minutes = (target as HTMLInputElement).value;

    const isTimepickerInputValid = isMinuteInputValid(this.minutes) && this.isValidLimit();
    const isValid = this.allowEmptyDate ?
      this.isOneOfDatesIsEmpty() || isTimepickerInputValid
      : isTimepickerInputValid;
    if (!isValid) {
      this.invalidMinutes = true;
      this.isValid.emit(false);
      this.onChange(null);

      return;
    }

    this._updateTime();
  }

  updateSeconds(target: Partial<EventTarget> | null) {
    this.resetValidation();
    this.seconds = (target as HTMLInputElement).value;
    const isTimepickerInputValid = isSecondInputValid(this.seconds) && this.isValidLimit();
    const isValid = this.allowEmptyDate ?
      this.isOneOfDatesIsEmpty() || isTimepickerInputValid
      : isTimepickerInputValid;
    if (!isValid) {
      this.invalidSeconds = true;
      this.isValid.emit(false);
      this.onChange(null);

      return;
    }

    this._updateTime();
  }

  isValidLimit(): boolean {
    return isInputLimitValid({
      hour: this.hours,
      minute: this.minutes,
      seconds: this.seconds,
      isPM: this.isPM()
    }, this.max, this.min);
  }

  isOneOfDatesIsEmpty(): boolean {
    return isOneOfDatesEmpty(
      this.hours,
      this.minutes,
      this.seconds);
  }

  _updateTime() {
    const _seconds = this.showSeconds ? this.seconds : void 0;
    const _minutes = this.showMinutes ? this.minutes : void 0;
    const isTimepickerInputValid = isInputValid(this.hours, _minutes, _seconds, this.isPM());
    const isValid = this.allowEmptyDate ?
      this.isOneOfDatesIsEmpty() || isTimepickerInputValid
      : isTimepickerInputValid;
    if (!isValid) {
      this.isValid.emit(false);
      this.onChange(null);
      return;
    }

    this._store.dispatch(
      this._timepickerActions.setTime({
        hour: this.hours,
        minute: this.minutes,
        seconds: this.seconds,
        isPM: this.isPM()
      })
    );
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
    if (!value || !isValidDate(value)) {
      this.hours = '';
      this.minutes = '';
      this.seconds = '';
      this.meridian = this.meridians[0];

      return;
    }

    const _value = parseTime(value);
    if (!_value) {
      return;
    }

    const _hoursPerDayHalf = 12;
    let _hours = _value.getHours();

    if (this.showMeridian) {
      this.meridian = this.meridians[_hours >= _hoursPerDayHalf ? 1 : 0];
      _hours = _hours % _hoursPerDayHalf;
      // should be 12 PM, not 00 PM
      if (_hours === 0) {
        _hours = _hoursPerDayHalf;
      }
    }

    this.hours = padNumber(_hours);
    this.minutes = padNumber(_value.getMinutes());
    this.seconds = padNumber(_value.getUTCSeconds());
  }
}
