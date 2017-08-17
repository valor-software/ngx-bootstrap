import { DatepickerFormatOptions, DatepickerRenderOptions, MonthViewOptions } from '../models/index';

export const defaultMonthOptions: MonthViewOptions = {
  width: 7,
  height: 6,
  firstDayOfWeek: 1
};

export const defaultFormatOptions: DatepickerFormatOptions = {
  locale: 'en',
  monthTitle: 'MMMM',
  yearTitle: 'YYYY',
  dayLabel: 'D',
  weekNumbers: 'w'
};

export const defaultRenderOptions: DatepickerRenderOptions = {
  displayMonths: 1,
  showWeekNumbers: true
};
