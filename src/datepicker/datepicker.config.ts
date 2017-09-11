import { Injectable } from '@angular/core';

@Injectable()
export class DatepickerConfig {
  locale = 'en';
  public datepickerMode = 'day';
  public startingDay = 0;
  public yearRange = 20;
  public minMode = 'day';
  public maxMode = 'year';
  public showWeeks = true;
  public formatDay = 'DD';
  public formatMonth = 'MMMM';
  public formatYear = 'YYYY';
  public formatDayHeader = 'dd';
  public formatDayTitle = 'MMMM YYYY';
  public formatMonthTitle = 'YYYY';
  public onlyCurrentMonth = false;
  public monthColLimit = 3;
  public yearColLimit = 5;
  public shortcutPropagation = false;
}
