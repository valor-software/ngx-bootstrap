import { Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { getFullYear, getMonth } from '../../chronos/utils/date-getters';
import { BsDatepickerAbstractComponent } from '../base/bs-datepicker-container';
import { BsDatepickerConfig } from '../bs-datepicker.config';
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
} from '../models/index';
import { BsDatepickerActions } from './bs-datepicker.actions';
import { BsDatepickerStore } from './bs-datepicker.store';
import { Subscription } from 'rxjs/Subscription';
import { BsLocaleService } from '../bs-locale.service';

@Injectable()
export class BsDatepickerEffects {
  viewMode: Observable<BsDatepickerViewMode>;
  daysCalendar: Observable<DaysCalendarViewModel[]>;
  monthsCalendar: Observable<MonthsCalendarViewModel[]>;
  yearsCalendar: Observable<YearsCalendarViewModel[]>;
  options: Observable<DatepickerRenderOptions>;

  private _store: BsDatepickerStore;
  private _subs: Subscription[] = [];

  constructor(private _actions: BsDatepickerActions,
              private _localeService: BsLocaleService) {}

  init(_bsDatepickerStore: BsDatepickerStore): BsDatepickerEffects {
    this._store = _bsDatepickerStore;

    return this;
  }

  /** setters */

  setValue(value: Date): void {
    this._store.dispatch(this._actions.select(value));
  }

  setRangeValue(value: Date[]): void {
    this._store.dispatch(this._actions.selectRange(value));
  }

  setMinDate(value: Date): BsDatepickerEffects {
    this._store.dispatch(this._actions.minDate(value));

    return this;
  }

  setMaxDate(value: Date): BsDatepickerEffects {
    this._store.dispatch(this._actions.maxDate(value));

    return this;
  }

  setDisabled(value: boolean): BsDatepickerEffects {
    this._store.dispatch(this._actions.isDisabled(value));

    return this;
  }

  /* Set rendering options */
  setOptions(_config: BsDatepickerConfig): BsDatepickerEffects {
    const _options = Object.assign({locale: this._localeService.currentLocale}, _config);
    this._store.dispatch(this._actions.setOptions(_options));

    return this;
  }

  /** view to mode bindings */
  setBindings(container: BsDatepickerAbstractComponent): BsDatepickerEffects {
    container.daysCalendar = this._store
      .select(state => state.flaggedMonths)
      .filter(months => !!months);

    // month calendar
    container.monthsCalendar = this._store
      .select(state => state.flaggedMonthsCalendar)
      .filter(months => !!months);

    // year calendar
    container.yearsCalendar = this._store
      .select(state => state.yearsCalendarFlagged)
      .filter(years => !!years);

    container.viewMode = this._store.select(state => state.view.mode);

    container.options = this._store
      .select(state => state.showWeekNumbers)
      .map(showWeekNumbers => ({showWeekNumbers}));

    return this;
  }

  /** event handlers */
  setEventHandlers(container: BsDatepickerAbstractComponent): BsDatepickerEffects {
    container.setViewMode = (event: BsDatepickerViewMode): void => {
      this._store.dispatch(this._actions.changeViewMode(event));
    };

    container.navigateTo = (event: BsNavigationEvent): void => {
      this._store.dispatch(this._actions.navigateStep(event.step));
    };

    container.dayHoverHandler = (event: CellHoverEvent): void => {
      const _cell = event.cell as DayViewModel;
      if (_cell.isOtherMonth || _cell.isDisabled) {
        return;
      }

      this._store.dispatch(this._actions.hoverDay(event));
      _cell.isHovered = event.isHovered;
    };

    container.monthHoverHandler = (event: CellHoverEvent): void => {
      event.cell.isHovered = event.isHovered;
    };

    container.yearHoverHandler = (event: CellHoverEvent): void => {
      event.cell.isHovered = event.isHovered;
    };

    /** select handlers */
    // container.daySelectHandler = (day: DayViewModel): void => {
    //   if (day.isOtherMonth || day.isDisabled) {
    //     return;
    //   }
    //   this._store.dispatch(this._actions.select(day.date));
    // };

    container.monthSelectHandler = (event: CalendarCellViewModel): void => {
      if (event.isDisabled) {
        return;
      }
      this._store.dispatch(
        this._actions.navigateTo({
          unit: {month: getMonth(event.date)},
          viewMode: 'day'
        })
      );
    };

    container.yearSelectHandler = (event: CalendarCellViewModel): void => {
      if (event.isDisabled) {
        return;
      }
      this._store.dispatch(
        this._actions.navigateTo({
          unit: {year: getFullYear(event.date)},
          viewMode: 'month'
        })
      );
    };

    return this;
  }

  registerDatepickerSideEffects(): BsDatepickerEffects {
    this._subs.push(
      this._store.select(state => state.view).subscribe(view => {
        this._store.dispatch(this._actions.calculate());
      })
    );

    // format calendar values on month model change
    this._subs.push(
      this._store
        .select(state => state.monthsModel)
        .filter(monthModel => !!monthModel)
        .subscribe(month => this._store.dispatch(this._actions.format()))
    );

    // flag day values
    this._subs.push(
      this._store
        .select(state => state.formattedMonths)
        .filter(month => !!month)
        .subscribe(month => this._store.dispatch(this._actions.flag()))
    );

    // flag day values
    this._subs.push(
      this._store
        .select(state => state.selectedDate)
        .filter(selectedDate => !!selectedDate)
        .subscribe(selectedDate => this._store.dispatch(this._actions.flag()))
    );

    // flag for date range picker
    this._subs.push(
      this._store
        .select(state => state.selectedRange)
        .filter(selectedRange => !!selectedRange)
        .subscribe(selectedRange => this._store.dispatch(this._actions.flag()))
    );

    // monthsCalendar
    this._subs.push(
      this._store
        .select(state => state.monthsCalendar)
        .subscribe(() => this._store.dispatch(this._actions.flag()))
    );

    // years calendar
    this._subs.push(
      this._store
        .select(state => state.yearsCalendarModel)
        .filter(state => !!state)
        .subscribe(() => this._store.dispatch(this._actions.flag()))
    );

    // on hover
    this._subs.push(
      this._store
        .select(state => state.hoveredDate)
        .filter(hoveredDate => !!hoveredDate)
        .subscribe(hoveredDate => this._store.dispatch(this._actions.flag()))
    );

    // on locale change
    this._subs.push(
      this._localeService.localeChange
        .subscribe(locale => this._store.dispatch(this._actions.setLocale(locale)))
    )

    return this;
  }

  destroy(): void {
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
  }
}
