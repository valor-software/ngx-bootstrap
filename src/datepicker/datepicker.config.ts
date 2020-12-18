import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatepickerConfig {
  locale = 'en';
  datepickerMode = 'day';
  startingDay = 0;
  yearRange = 20;
  minMode = 'day';
  maxMode = 'year';
  showWeeks = true;
  formatDay = 'DD';
  formatMonth = 'MMMM';
  formatYear = 'YYYY';
  formatDayHeader = 'dd';
  formatDayTitle = 'MMMM YYYY';
  formatMonthTitle = 'YYYY';
  onlyCurrentMonth = false;
  monthColLimit = 3;
  yearColLimit = 5;
  shortcutPropagation = false;
}
