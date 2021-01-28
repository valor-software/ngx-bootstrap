import { Injectable } from '@angular/core';
import { TimeUnit } from 'ngx-bootstrap/chronos';
import { Action } from 'ngx-bootstrap/mini-ngrx';
import {
  BsDatepickerViewMode,
  BsViewNavigationEvent,
  CellHoverEvent,
  DatepickerRenderOptions,
  DatepickerDateCustomClasses,
  DatepickerDateTooltipText
} from '../models';

@Injectable()
export class BsDatepickerActions {
  static readonly CALCULATE = '[datepicker] calculate dates matrix';
  static readonly FORMAT = '[datepicker] format datepicker values';
  static readonly FLAG = '[datepicker] set flags';
  static readonly SELECT = '[datepicker] select date';
  static readonly NAVIGATE_OFFSET = '[datepicker] shift view date';
  static readonly NAVIGATE_TO = '[datepicker] change view date';
  static readonly SET_OPTIONS = '[datepicker] update render options';
  static readonly HOVER = '[datepicker] hover date';
  static readonly CHANGE_VIEWMODE = '[datepicker] switch view mode';

  static readonly SET_MIN_DATE = '[datepicker] set min date';
  static readonly SET_MAX_DATE = '[datepicker] set max date';
  static readonly SET_DAYSDISABLED = '[datepicker] set days disabled';
  static readonly SET_DATESDISABLED = '[datepicker] set dates disabled';
  static readonly SET_DATESENABLED = '[datepicker] set dates enabled';
  static readonly SET_IS_DISABLED = '[datepicker] set is disabled';
  static readonly SET_DATE_CUSTOM_CLASSES = '[datepicker] set date custom classes';
  static readonly SET_DATE_TOOLTIP_TEXTS = '[datepicker] set date tooltip texts';
  static readonly SET_LOCALE = '[datepicker] set datepicker locale';

  static readonly SELECT_RANGE = '[daterangepicker] select dates range';

  calculate(): Action {
    return { type: BsDatepickerActions.CALCULATE };
  }

  format(): Action {
    return { type: BsDatepickerActions.FORMAT };
  }

  flag(): Action {
    return { type: BsDatepickerActions.FLAG };
  }

  select(date: Date): Action {
    return {
      type: BsDatepickerActions.SELECT,
      payload: date
    };
  }

  changeViewMode(event: BsDatepickerViewMode): Action {
    return {
      type: BsDatepickerActions.CHANGE_VIEWMODE,
      payload: event
    };
  }

  navigateTo(event: BsViewNavigationEvent): Action {
    return {
      type: BsDatepickerActions.NAVIGATE_TO,
      payload: event
    };
  }

  navigateStep(step: TimeUnit): Action {
    return {
      type: BsDatepickerActions.NAVIGATE_OFFSET,
      payload: step
    };
  }

  setOptions(options: DatepickerRenderOptions): Action {
    return {
      type: BsDatepickerActions.SET_OPTIONS,
      payload: options
    };
  }

  // date range picker
  selectRange(value: Date[]): Action {
    return {
      type: BsDatepickerActions.SELECT_RANGE,
      payload: value
    };
  }

  hoverDay(event: CellHoverEvent): Action {
    return {
      type: BsDatepickerActions.HOVER,
      payload: event.isHovered ? event.cell.date : null
    };
  }

  minDate(date: Date): Action {
    return {
      type: BsDatepickerActions.SET_MIN_DATE,
      payload: date
    };
  }

  maxDate(date: Date): Action {
    return {
      type: BsDatepickerActions.SET_MAX_DATE,
      payload: date
    };
  }

  daysDisabled(days: number[]): Action {
    return {
      type: BsDatepickerActions.SET_DAYSDISABLED,
      payload: days
    };
  }

  datesDisabled(dates: Date[]): Action {
    return {
      type: BsDatepickerActions.SET_DATESDISABLED,
      payload: dates
    };
  }

  datesEnabled(dates: Date[]): Action {
    return {
      type: BsDatepickerActions.SET_DATESENABLED,
      payload: dates
    };
  }

  isDisabled(value: boolean): Action {
    return {
      type: BsDatepickerActions.SET_IS_DISABLED,
      payload: value
    };
  }

  setDateCustomClasses(value: DatepickerDateCustomClasses[]): Action {
    return {
      type: BsDatepickerActions.SET_DATE_CUSTOM_CLASSES,
      payload: value
    };
  }

  setDateTooltipTexts(value: DatepickerDateTooltipText[]): Action {
    return {
      type: BsDatepickerActions.SET_DATE_TOOLTIP_TEXTS,
      payload: value
    };
  }

  setLocale(locale: string): Action {
    return {
      type: BsDatepickerActions.SET_LOCALE,
      payload: locale
    };
  }
}
