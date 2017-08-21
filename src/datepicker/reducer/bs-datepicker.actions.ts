import { Injectable } from '@angular/core';
import {
  BsDatepickerViewMode, DatepickerRenderOptions, DayHoverEvent
} from '../models/index';
import { Action } from '../../mini-ngrx/index';
import { TimeUnit } from '../../bs-moment/types';

@Injectable()
export class BsDatepickerActions {
  static readonly CALCULATE = '[datepicker] calculate dates matrix';
  static readonly FORMAT = '[datepicker] format datepicker values';
  static readonly FLAG = '[datepicker] set flags';
  static readonly SELECT = '[datepicker] select date';
  static readonly NAVIGATE_OFFSET = '[datepicker] shift view date';
  static readonly NAVIGATE_TO = '[datepicker] change view date';
  static readonly RENDER_OPTIONS = '[datepicker] update render options';
  static readonly HOVER = '[datepicker] hover date';
  static readonly CHANGE_VIEWMODE = '[datepicker] switch view mode';

  static readonly SELECT_RANGE = '[daterangepicker] select dates range';

  calculate(): Action {return {type: BsDatepickerActions.CALCULATE}; }

  format(): Action {return {type: BsDatepickerActions.FORMAT}; }

  flag(): Action { return {type: BsDatepickerActions.FLAG}; }

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

  navigateTo(dateChange: TimeUnit): Action {
    return {
      type: BsDatepickerActions.NAVIGATE_OFFSET,
      payload: dateChange
    };
  }

  navigateStep(step: TimeUnit): Action {
    return {
      type: BsDatepickerActions.NAVIGATE_OFFSET,
      payload: step
    };
  }

  renderOptions(options: DatepickerRenderOptions): Action {
    return {
      type: BsDatepickerActions.RENDER_OPTIONS,
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

  hoverDay(event: DayHoverEvent): Action {
    return {
      type: BsDatepickerActions.HOVER,
      payload: event.isHovered ? event.day.date : null
    };
  }
}
