import { Injectable } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { getFullYear, getMonth } from 'ngx-bootstrap/chronos';

import { BsDatepickerAbstractComponent } from '../base/bs-datepicker-container';
import { BsDatepickerActions } from './bs-datepicker.actions';
import { BsDatepickerConfig } from '../bs-datepicker.config';
import { BsDatepickerStore } from './bs-datepicker.store';
import { BsLocaleService } from '../bs-locale.service';

import {
  BsDatepickerViewMode,
  BsNavigationEvent,
  CalendarCellViewModel,
  CellHoverEvent,
  DatepickerRenderOptions,
  DatepickerDateCustomClasses,
  DaysCalendarViewModel,
  DayViewModel,
  MonthsCalendarViewModel,
  YearsCalendarViewModel
} from '../models';


@Injectable()
export class BsDatepickerEffects {
  viewMode: Observable<BsDatepickerViewMode>;
  daysCalendar: Observable<DaysCalendarViewModel[]>;
  monthsCalendar: Observable<MonthsCalendarViewModel[]>;
  yearsCalendar: Observable<YearsCalendarViewModel[]>;
  options: Observable<DatepickerRenderOptions>;
  disableYears: boolean;

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

  setDaysDisabled(value: number[]) {
    this._store.dispatch(this._actions.daysDisabled(value));

    return this;
  }

  setDatesDisabled(value: Date[]) {
    this._store.dispatch(this._actions.datesDisabled(value));

    return this;
  }

  setDisabled(value: boolean): BsDatepickerEffects {
    this._store.dispatch(this._actions.isDisabled(value));

    return this;
  }

  setDateCustomClasses(value: DatepickerDateCustomClasses[]): BsDatepickerEffects {
    this._store.dispatch(this._actions.setDateCustomClasses(value));

    return this;
  }

  /* Set rendering options */
  setOptions(_config: BsDatepickerConfig): BsDatepickerEffects {
    this.disableYears = _config.disableYears;
    const _options = Object.assign({locale: this._localeService.currentLocale}, _config);
    this._store.dispatch(this._actions.setOptions(_options));

    return this;
  }

  /** view to mode bindings */
  setBindings(container: BsDatepickerAbstractComponent): BsDatepickerEffects {
    container.daysCalendar = this._store
      .select(state => state.flaggedMonths)
      .pipe(
        filter(months => !!months)
      );

    // month calendar
    container.monthsCalendar = this._store
      .select(state => state.flaggedMonthsCalendar)
      .pipe(
        filter(months => !!months)
      );

    // year calendar
    container.yearsCalendar = this._store
      .select(state => state.yearsCalendarFlagged)
      .pipe(
        filter(years => !!years)
      );

    container.viewMode = this._store.select(state => state.view.mode);

    container.options = this._store
      .select(state => state.showWeekNumbers)
      .pipe(
        map(showWeekNumbers => ({showWeekNumbers}))
      );

    return this;
  }

  /** event handlers */
  setEventHandlers(container: BsDatepickerAbstractComponent): BsDatepickerEffects {
    container.setViewMode = (event: BsDatepickerViewMode): void => {
      if (event !== 'year' || !this.disableYears) {
         this._store.dispatch(this._actions.changeViewMode(event));
      }
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

    container.monthSelectHandler = (event: CalendarCellViewModel): void => {
      if (event.isDisabled) {
        return;
      }
      this._store.dispatch(
        this._actions.navigateTo({
          unit: {
            month: getMonth(event.date),
            year: getFullYear(event.date)
          },
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
          unit: {
            year: getFullYear(event.date)
          },
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
        .pipe(
          filter(monthModel => !!monthModel)
        )
        .subscribe(month => this._store.dispatch(this._actions.format()))
    );

    // flag day values
    this._subs.push(
      this._store
        .select(state => state.formattedMonths)
        .pipe(
          filter(month => !!month)
        )
        .subscribe(month => this._store.dispatch(this._actions.flag()))
    );

    // flag day values
    this._subs.push(
      this._store
        .select(state => state.selectedDate)
        .pipe(
          filter(selectedDate => !!selectedDate)
        )
        .subscribe(selectedDate => this._store.dispatch(this._actions.flag()))
    );

    // flag for date range picker
    this._subs.push(
      this._store
        .select(state => state.selectedRange)
        .pipe(
          filter(selectedRange => !!selectedRange)
        )
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
        .pipe(
          filter(state => !!state)
        )
        .subscribe(() => this._store.dispatch(this._actions.flag()))
    );

    // on hover
    this._subs.push(
      this._store
        .select(state => state.hoveredDate)
        .pipe(
          filter(hoveredDate => !!hoveredDate)
        )
        .subscribe(hoveredDate => this._store.dispatch(this._actions.flag()))
    );

    // date custom classes
    this._subs.push(
      this._store
        .select(state => state.dateCustomClasses)
        .pipe(
          filter(dateCustomClasses => !!dateCustomClasses)
        )
        .subscribe(dateCustomClasses => this._store.dispatch(this._actions.flag()))
    );

    // on locale change
    this._subs.push(
      this._localeService.localeChange
        .subscribe(locale => this._store.dispatch(this._actions.setLocale(locale)))
    );

    return this;
  }

  destroy(): void {
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
  }
}
