import {
  DatepickerFormatOptions, DatepickerRenderOptions, DaysCalendarModel, MonthViewModel,
  MonthViewOptions
} from '../models/index';
import { defaultFormatOptions, defaultMonthOptions, defaultRenderOptions } from './_defaults';

export class BsDatepickerState {
  // initial date of calendar, today by default
  viewDate: Date;
  hoveredDate?: Date;
  selectedDate?: Date;

  monthsModel?: DaysCalendarModel[];
  formattedMonths?: MonthViewModel[];
  flaggedMonths?: MonthViewModel[];

  monthViewOptions: MonthViewOptions;

  formatOptions: DatepickerFormatOptions;
  renderOptions: DatepickerRenderOptions;

  // daterange picker
  selectedRange?: Date[];
}

export const initialDatepickerState: BsDatepickerState = {
  viewDate: new Date(),
  selectedRange: [],
  monthViewOptions: defaultMonthOptions,
  formatOptions: defaultFormatOptions,
  renderOptions: defaultRenderOptions
};
