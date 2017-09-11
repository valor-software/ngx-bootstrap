import { Injectable, EventEmitter } from '@angular/core';
import { OnChange } from '../../utils/decorators';
import * as moment from 'moment';

// todo: should I add view end date?
@Injectable()
export class BsDatePickerState {
  @OnChange() public selectedDate: moment.Moment;
  public selectedDateChange: EventEmitter<moment.Moment> = new EventEmitter<
    moment.Moment
  >();

  @OnChange() public selectedEndDate: moment.Moment;
  public selectedEndDateChange: EventEmitter<moment.Moment> = new EventEmitter<
    moment.Moment
  >();

  @OnChange() public activeDate: moment.Moment;
  public activeDateChange: EventEmitter<moment.Moment> = new EventEmitter<
    moment.Moment
  >();

  @OnChange() public viewDate: moment.Moment;
  public viewDateChange: EventEmitter<moment.Moment> = new EventEmitter<
    moment.Moment
  >();

  @OnChange() public showCalendars: boolean;
  public showCalendarsChange: EventEmitter<moment.Moment> = new EventEmitter<
    moment.Moment
  >();
}
