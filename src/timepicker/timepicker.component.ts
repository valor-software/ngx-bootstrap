/* tslint:disable:no-forward-ref max-file-line-count */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges, ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TimepickerActions } from './reducer/timepicker.actions';
import { TimepickerStore } from './reducer/timepicker.store';
import { getControlsValue } from './timepicker-controls.util';
import { TimepickerConfig } from './timepicker.config';
import {
  TimeChangeSource,
  TimepickerComponentState,
  TimepickerControls
} from './timepicker.models';
import {
  isValidDate,
  padNumber,
  parseTime,
  isInputValid
} from './timepicker.utils';

export const TIMEPICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line
  useExisting: forwardRef(() => TimepickerComponent),
  multi: true
};

@Component({
  selector: 'timepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TIMEPICKER_CONTROL_VALUE_ACCESSOR, TimepickerStore],
  templateUrl: './timepicker.component.html',
  styles: [`
    .bs-chevron{
      border-style: solid;
      display: block;
      width: 9px;
      height: 9px;
      position: relative;
      border-width: 3px 0px 0 3px;
    }
    .bs-chevron-up{
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      top: 2px;
    }
    .bs-chevron-down{
      -webkit-transform: rotate(-135deg);
      transform: rotate(-135deg);
      top: -2px;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class TimepickerComponent
  implements ControlValueAccessor,
    TimepickerComponentState,
    TimepickerControls,
    OnChanges {
  /** hours change step */
  @Input() hourStep: number;
  /** hours change step */
  @Input() minuteStep: number;
  /** seconds change step */
  @Input() secondsStep: number;
  /** if true hours and minutes fields will be readonly */
  @Input() readonlyInput: boolean;
  /** if true scroll inside hours and minutes inputs will change time */
  @Input() mousewheel: boolean;
  /** if true up/down arrowkeys inside hours and minutes inputs will change time */
  @Input() arrowkeys: boolean;
  /** if true spinner arrows above and below the inputs will be shown */
  @Input() showSpinners: boolean;
  @Input() showMeridian: boolean;
  @Input() showSeconds: boolean;

  /** meridian labels based on locale */
  @Input() meridians: string[];

  /** minimum time user can select */
  @Input() min: Date;
  /** maximum time user can select */
  @Input() max: Date;

  /** emits true if value is a valid date */
  @Output() isValid: EventEmitter<boolean> = new EventEmitter();

  // ui variables
  hours: string;
  minutes: string;
  seconds: string;
  meridian: string;

  get isSpinnersVisible(): boolean {
    return this.showSpinners && !this.readonlyInput;
  }

  // min\max validation for input fields
  invalidHours = false;
  invalidMinutes = false;
  invalidSeconds = false;

  // time picker controls state
  canIncrementHours: boolean;
  canIncrementMinutes: boolean;
  canIncrementSeconds: boolean;

  canDecrementHours: boolean;
  canDecrementMinutes: boolean;
  canDecrementSeconds: boolean;

  // control value accessor methods
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;

  constructor(
    _config: TimepickerConfig,
    _cd: ChangeDetectorRef,
    private _store: TimepickerStore,
    private _timepickerActions: TimepickerActions
  ) {
    Object.assign(this, _config);
    // todo: add unsubscribe
    _store.select(state => state.value).subscribe(value => {
      // update UI values if date changed
      this._renderTime(value);
      this.onChange(value);

      this._store.dispatch(
        this._timepickerActions.updateControls(getControlsValue(this))
      );
    });

    _store.select(state => state.controls).subscribe(controlsState => {
      this.isValid.emit(
        isInputValid(this.hours, this.minutes, this.seconds, this.isPM())
      );
      Object.assign(this, controlsState);
      _cd.markForCheck();
    });
  }

  isPM(): boolean {
    return this.showMeridian && this.meridian === this.meridians[1];
  }

  prevDef($event: any) {
    $event.preventDefault();
  }

  wheelSign($event: any): number {
    return Math.sign($event.deltaY as number) * -1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._store.dispatch(
      this._timepickerActions.updateControls(getControlsValue(this))
    );
  }

  changeHours(step: number, source: TimeChangeSource = ''): void {
    this._store.dispatch(this._timepickerActions.changeHours({ step, source }));
  }

  changeMinutes(step: number, source: TimeChangeSource = ''): void {
    this._store.dispatch(
      this._timepickerActions.changeMinutes({ step, source })
    );
  }

  changeSeconds(step: number, source: TimeChangeSource = ''): void {
    this._store.dispatch(
      this._timepickerActions.changeSeconds({ step, source })
    );
  }

  updateHours(hours: string): void {
    this.hours = hours;
    this._updateTime();
  }

  updateMinutes(minutes: string) {
    this.minutes = minutes;
    this._updateTime();
  }

  updateSeconds(seconds: string) {
    this.seconds = seconds;
    this._updateTime();
  }

  _updateTime() {
    if (!isInputValid(this.hours, this.minutes, this.seconds, this.isPM())) {
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
    if (!this.showMeridian || this.readonlyInput) {
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
  writeValue(obj: any): void {
    if (isValidDate(obj)) {
      this._store.dispatch(this._timepickerActions.writeValue(parseTime(obj)));
    }
  }

  /**
   * Set the function to be called when the control receives a change event.
   */
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
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   *
   * @param isDisabled
   */
  setDisabledState(isDisabled: boolean): void {
    this.readonlyInput = isDisabled;
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
