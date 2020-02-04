/* tslint:disable:no-forward-ref max-file-line-count */
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
  SimpleChanges, ViewEncapsulation
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TimepickerActions } from './reducer/timepicker.actions';
import { TimepickerStore } from './reducer/timepicker.store';
import { getControlsValue } from './timepicker-controls.util';
import { TimepickerConfig, TimepickerOffsetTarget } from './timepicker.config';
import {
  TimeChangeSource,
  TimepickerComponentState,
  TimepickerControls
} from './timepicker.models';

import {
  isValidDate,
  padNumber,
  parseTime,
  applyOffset,
  isInputValid,
  isHourInputValid,
  isMinuteInputValid,
  isSecondInputValid,
  isInputLimitValid
} from './timepicker.utils';

import { Subscription } from 'rxjs';

import { ControlValueAccessorModel } from './models';

export const TIMEPICKER_CONTROL_VALUE_ACCESSOR: ControlValueAccessorModel = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable-next-line: no-use-before-declare */
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
  @Input() hourStep: number;
  /** hours change step */
  @Input() minuteStep: number;
  /** seconds change step */
  @Input() secondsStep: number;
  /** if true hours and minutes fields will be readonly */
  @Input() readonlyInput: boolean;
  /** if true hours and minutes fields will be disabled */
  @Input() disabled: boolean;
  /** if true scroll inside hours and minutes inputs will change time */
  @Input() mousewheel: boolean;
  /** if true the values of hours and minutes can be changed using the up/down arrow keys on the keyboard */
  @Input() arrowkeys: boolean;
  /** if true spinner arrows above and below the inputs will be shown */
  @Input() showSpinners: boolean;
  /** if true meridian button will be shown */
  @Input() showMeridian: boolean;
  /** show minutes in timepicker */
  @Input() showMinutes: boolean;
  /** show seconds in timepicker */
  @Input() showSeconds: boolean;
  /** meridian labels based on locale */
  @Input() meridians: string[];
  /** minimum time user can select */
  @Input() min: Date;
  /** maximum time user can select */
  @Input() max: Date;
  /** apply offset in minutes to apply to the displayed time (the date object itself is not modified) */
  @Input() offset: number;
  /** defines the target the offset should be applied to: Client applies given offset to the timezone the user is in,
   * Utc applies to the utc time.
   */
  @Input() offsetTarget: TimepickerOffsetTarget = TimepickerOffsetTarget.Client;
  /** placeholder for hours field in timepicker */
  @Input() hoursPlaceholder: string;
  /** placeholder for minutes field in timepicker */
  @Input() minutesPlaceholder: string;
  /** placeholder for seconds field in timepicker */
  @Input() secondsPlaceholder: string;

  /** emits true if value is a valid date */
  @Output() isValid = new EventEmitter<boolean>();

  // ui variables
  hours: string;
  minutes: string;
  seconds: string;
  meridian: string;

  /** @deprecated - please use `isEditable` instead */
  get isSpinnersVisible(): boolean {
    return this.showSpinners && !this.readonlyInput;
  }

  get isEditable(): boolean {
    return !(this.readonlyInput || this.disabled);
  }

  // min\max validation for input fields
  invalidHours = false;
  invalidMinutes = false;
  invalidSeconds = false;

  // aria-label variables
  labelHours: string;
  labelMinutes: string;
  labelSeconds: string;

  // time picker controls state
  canIncrementHours: boolean;
  canIncrementMinutes: boolean;
  canIncrementSeconds: boolean;

  canDecrementHours: boolean;
  canDecrementMinutes: boolean;
  canDecrementSeconds: boolean;

  canToggleMeridian: boolean;

  // control value accessor methods
  // tslint:disable-next-line:no-any
  onChange = Function.prototype;
  // tslint:disable-next-line:no-any
  onTouched = Function.prototype;

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
      .subscribe((value: Date) => {
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
        this.isValid.emit(isInputValid(this.hours, this.minutes, this.seconds, this.isPM()));
        Object.assign(this, controlsState);
        _cd.markForCheck();
      });
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
    return Math.sign($event.deltaY) * -1;
  }

  ngOnChanges(changes: SimpleChanges): void {
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

  updateHours(hours: string): void {
    this.resetValidation();
    this.hours = hours;

    const isValid = isHourInputValid(this.hours, this.isPM()) && this.isValidLimit();

    if (!isValid) {
      this.invalidHours = true;
      this.isValid.emit(false);
      this.onChange(null);

      return;
    }

    this._updateTime();
  }

  updateMinutes(minutes: string) {
    this.resetValidation();
    this.minutes = minutes;

    const isValid = isMinuteInputValid(this.minutes) && this.isValidLimit();

    if (!isValid) {
      this.invalidMinutes = true;
      this.isValid.emit(false);
      this.onChange(null);

      return;
    }

    this._updateTime();
  }

  updateSeconds(seconds: string) {
    this.resetValidation();
    this.seconds = seconds;

    const isValid = isSecondInputValid(this.seconds) && this.isValidLimit();

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

  _updateTime() {
    const _seconds = this.showSeconds ? this.seconds : void 0;
    const _minutes = this.showMinutes ? this.minutes : void 0;
    if (!isInputValid(this.hours, _minutes, _seconds, this.isPM())) {
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
  writeValue(obj: string | null | undefined | Date): void {
    if (isValidDate(obj)) {
      this._store.dispatch(this._timepickerActions.writeValue(parseTime(obj)));
    } else if (obj == null) {
      this._store.dispatch(this._timepickerActions.writeValue(null));
    }
  }

  /**
   * Set the function to be called when the control receives a change event.
   */
  // tslint:disable-next-line:no-any
  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  /**
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn: () => {}): void {
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

  private _renderTime(value: string | Date): void {
    if (!isValidDate(value)) {
      this.hours = '';
      this.minutes = '';
      this.seconds = '';
      this.meridian = this.meridians[0];

      return;
    }

    const _value = parseTime(value);
    const _hoursPerDayHalf = 12;
    let _hours = _value.getHours();
    let _minutes = _value.getMinutes();

    if (this.offset) {
      if (this.offsetTarget === TimepickerOffsetTarget.UTC) {
        _hours = _value.getUTCHours();
        _minutes = _value.getUTCMinutes();
      }
      const { hours, minutes } = applyOffset(this.offset, _hours, _minutes);
      _hours = hours;
      _minutes = minutes;
    }

    if (this.showMeridian) {
      this.meridian = this.meridians[_hours >= _hoursPerDayHalf ? 1 : 0];
      _hours = _hours % _hoursPerDayHalf;
      // should be 12 PM, not 00 PM
      if (_hours === 0) {
        _hours = _hoursPerDayHalf;
      }
    }

    this.hours = padNumber(_hours);
    this.minutes = padNumber(_minutes);
    this.seconds = padNumber(_value.getUTCSeconds());
  }
}
