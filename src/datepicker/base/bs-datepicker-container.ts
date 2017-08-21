// datepicker container component
/* tslint:disable no-empty */
import { BsCustomDates } from '../themes/bs/bs-custom-dates-view.component';
import { BsDatepickerEffects } from '../reducer/bs-datepicker.effects';
import { Observable } from 'rxjs/Observable';
import {
  BsDatepickerViewMode, BsNavigationEvent, CalendarCellViewModel, CellHoverEvent, DatepickerRenderOptions,
  DaysCalendarViewModel, DayViewModel,
  MonthsCalendarViewModel,
  YearsCalendarViewModel
} from '../models/index';

export abstract class BsDatepickerContainer {
  /** @deperecated */
  _customRangesFish: BsCustomDates[] = [
    {label: 'today', value: new Date()},
    {label: 'today1', value: new Date()},
    {label: 'today2', value: new Date()},
    {label: 'today3', value: new Date()}
  ];

  _effects: BsDatepickerEffects;

  set minDate(value: Date) {
    this._effects.setMinDate(value);
  }

  set maxDate(value: Date) {
    this._effects.setMaxDate(value);
  }


  viewMode: Observable<BsDatepickerViewMode>;
  daysCalendar: Observable<DaysCalendarViewModel[]>;
  monthsCalendar: Observable<MonthsCalendarViewModel[]>;
  yearsCalendar: Observable<YearsCalendarViewModel[]>;
  options: Observable<DatepickerRenderOptions>;

  setViewMode(event: BsDatepickerViewMode): void {}

  navigateTo(event: BsNavigationEvent): void {}

  dayHoverHandler(event: CellHoverEvent): void {}

  monthHoverHandler(event: CellHoverEvent): void {}

  yearHoverHandler(event: CellHoverEvent): void {}

  daySelectHandler(day: DayViewModel): void {};

  monthSelectHandler(event: CalendarCellViewModel): void {}

  yearSelectHandler(event: CalendarCellViewModel): void {}

  _stopPropagation(event: any): void {
    event.stopPropagation();
  }
}
