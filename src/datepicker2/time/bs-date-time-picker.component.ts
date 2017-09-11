import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { DatePickerBase } from '../common/bs-date-picker-base.class';
import { BsDatePickerState } from '../common/bs-date-picker-state.provider';
import { BsDatePickerOptions } from '../common/bs-date-picker-options.provider';

import * as moment from 'moment';
import { OnChange } from '../../utils/decorators';

@Component({
  selector: 'bs-datetimepicker',
  exportAs: 'bs-datetimepicker',
  template: `
<div class="bs-timepicker-container">
  <div class="bs-timepicker-controls">
    <button class="bs-decrease" (click)="subtract('hours')">-</button>
    <input type="text" value="{{hours}}" placeholder="00">
    <button class="bs-increase" (click)="add('hours')">+</button>
  </div>
  <div class="bs-timepicker-controls">
    <button class="bs-decrease" (click)="subtract('minutes')">-</button>
    <input type="text" value="{{minutes}}" placeholder="00">
    <button class="bs-increase" (click)="add('minutes')">+</button>
  </div>
  <button *ngIf="showAmPm" (click)="toggleMeridiem()" class="switch-time-format">{{ampm}}
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAABSElEQVQYV3XQPUvDUBQG4HNuagtVqc6KgouCv6GIuIntYBLB9hcIQpLStCAIV7DYmpTcRWcXqZio3Vwc/UCc/QEqfgyKGbr0I7nS1EiHeqYzPO/h5SD0jaxUZjmSLCB+OFb+UFINFwASAEAdpu9gaGXVyAHHFQBkHpKHc6a9dzECvADyY9sqlAMsK9W0jzxDXqeytr3mhQckxSji27TJJ5/rPmIpwJJq3HrtduriYOurv1a4i1p5HnhkG9OFymi0ReoO05cGwb+ayv4dysVygjeFmsP05f8wpZQ8fsdvfmuY9zjWSNqUtgYFVnOVReILYoBFzdQI5/GGFzNHhGbeZnopDGU29sZbscgldmC99w35VOATTycIMMcBXIfpSVGzZhA6C8hh00conln6VQ9TGgV32OEAKQC4DrBq7CJwd0ggR7Vq/rPrfgB+C3sGypY5DAAAAABJRU5ErkJggg==" alt="">
  </button>
</div>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsDateTimePickerComponent extends DatePickerBase {
  @OnChange() public date: moment.Moment;
  public dateChange: EventEmitter<moment.Moment> = new EventEmitter(true);

  public hours: string;
  public minutes: string;
  public ampm: string;
  public showAmPm: boolean = true;

  public constructor(
    datePickerService: BsDatePickerState,
    options: BsDatePickerOptions
  ) {
    super(datePickerService, options);
    this.subscriptions.push(
      this.dateChange.subscribe((date: moment.Moment) => {
        if (!this.datePickerState.viewDate.isSame(date)) {
          this.datePickerState.viewDate = date;
          this.refresh();
        }
      })
    );
  }

  public refresh(): void {
    if (!this.datePickerState.viewDate || !this.dateChange) {
      return;
    }
    this.date = this.datePickerState.viewDate;

    const mins = this.date.minutes();
    const roundMins = mins - mins % this.options.timepicker.minutesInc;
    this.date.minutes(roundMins);
    this.minutes = this.date.format('mm');
    this.hours = this.options.timepicker.showAmPm
      ? this.date.format('hh')
      : this.date.format('HH');
    this.ampm = this.date.format('a');
    this.showAmPm = this.options.timepicker.showAmPm;
  }

  public add(granularity: string): void {
    if (granularity === 'minutes') {
      this.date = this.date
        .clone()
        .add(
          this.options.timepicker.minutesInc,
          granularity as moment.unitOfTime.Base
        );
      return;
    }
    if (granularity === 'hours') {
      this.date = this.date
        .clone()
        .add(
          this.options.timepicker.hoursInc,
          granularity as moment.unitOfTime.Base
        );
    }
  }

  public subtract(granularity: string): void {
    if (granularity === 'minutes') {
      this.date = this.date
        .clone()
        .subtract(
          this.options.timepicker.minutesInc,
          granularity as moment.unitOfTime.Base
        );
      return;
    }
    if (granularity === 'hours') {
      this.date = this.date
        .clone()
        .subtract(
          this.options.timepicker.hoursInc,
          granularity as moment.unitOfTime.Base
        );
    }
  }

  public setTime(date: moment.Moment): moment.Moment {
    return date;
  }

  public toggleMeridiem(): void {
    if (moment.localeData().isPM(this.date.format('a'))) {
      this.date = this.date.clone().add(12, 'hours');
      return;
    }
    this.date = this.date.clone().subtract(12, 'hours');
  }
}
