// datepicker container component
/* tslint:disable:no-empty */
import { BsCustomDates } from '../themes/bs/bs-custom-dates-view.component';
import { BsDatepickerEffects } from '../reducer/bs-datepicker.effects';
import { Observable } from 'rxjs';
import {
  BsDatepickerViewMode,
  BsNavigationEvent,
  CalendarCellViewModel,
  CellHoverEvent,
  DatepickerRenderOptions,
  DaysCalendarViewModel,
  DayViewModel,
  MonthsCalendarViewModel,
  YearsCalendarViewModel
} from '../models';

export abstract class BsDatepickerAbstractComponent {
  containerClass: string;
  isOtherMonthsActive: boolean;

  _effects: BsDatepickerEffects;
  _customRangesFish: BsCustomDates[] = [];

  set minDate(value: Date) {
    this._effects.setMinDate(value);
  }

  set maxDate(value: Date) {
    this._effects.setMaxDate(value);
  }
  set daysDisabled(value: number[]) {
    this._effects.setDaysDisabled(value);
  }

  set isDisabled(value: boolean) {
    this._effects.setDisabled(value);
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

  daySelectHandler(day: DayViewModel): void {}

  monthSelectHandler(event: CalendarCellViewModel): void {}

  yearSelectHandler(event: CalendarCellViewModel): void {}

  /* tslint:disable-next-line: no-any */
  _stopPropagation(event: any): void {
    event.stopPropagation();
  }
}
