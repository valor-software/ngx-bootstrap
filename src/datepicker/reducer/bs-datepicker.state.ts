import {
  BsDatepickerViewMode,
  DatepickerFormatOptions, DatepickerRenderOptions, DaysCalendarModel,
  DaysCalendarViewModel, MonthsCalendarViewModel,
  MonthViewOptions, YearsCalendarViewModel
} from '../models/index';
import { defaultFormatOptions, defaultMonthOptions, defaultRenderOptions } from './_defaults';

export class BsDatepickerState {
  // initial date of calendar, today by default
  viewDate: Date;
  viewMode: BsDatepickerViewMode;
  hoveredDate?: Date;
  hoveredMonth?: Date;
  hoveredYear?: Date;

  // days calendar
  monthsModel?: DaysCalendarModel[];
  formattedMonths?: DaysCalendarViewModel[];
  flaggedMonths?: DaysCalendarViewModel[];

  // months calendar
  monthsCalendar?: MonthsCalendarViewModel[];
  flaggedMonthsCalendar?: MonthsCalendarViewModel[];

  // years calendar
  yearsCalendarModel?: YearsCalendarViewModel[];
  yearsCalendarFlagged?: YearsCalendarViewModel[];

  // options
  monthViewOptions: MonthViewOptions;
  formatOptions: DatepickerFormatOptions;
  renderOptions: DatepickerRenderOptions;

  // date picker
  selectedDate?: Date;
  // daterange picker
  selectedRange?: Date[];
}

export const initialDatepickerState: BsDatepickerState = {
  viewDate: new Date(),
  viewMode: 'day',
  selectedRange: [],
  monthViewOptions: defaultMonthOptions,
  formatOptions: defaultFormatOptions,
  renderOptions: defaultRenderOptions
};
