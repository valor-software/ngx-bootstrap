import { Injectable } from '@angular/core';

import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BsDatepickerAbstractComponent } from '../base/bs-datepicker-container';
import { BsDatepickerConfig } from '../bs-datepicker.config';
import { BsLocaleService } from '../bs-locale.service';

import {
  BsDatepickerViewMode,
  BsNavigationEvent,
  CellHoverEvent,
  DatepickerDateCustomClasses,
  DatepickerDateTooltipText,
  DatepickerRenderOptions,
  DaysCalendarViewModel,
  DayViewModel,
  MonthsCalendarViewModel,
  YearsCalendarViewModel
} from '../models';
import { BsDatepickerActions } from './bs-datepicker.actions';
import { BsDatepickerStore } from './bs-datepicker.store';


@Injectable()
export class BsDatepickerEffects {
  viewMode?: Observable<BsDatepickerViewMode>;
  daysCalendar?: Observable<DaysCalendarViewModel[]>;
  monthsCalendar?: Observable<MonthsCalendarViewModel[]>;
  yearsCalendar?: Observable<YearsCalendarViewModel[]>;
  options?: Observable<DatepickerRenderOptions>;

  private _store?: BsDatepickerStore;
  private _subs: Subscription[] = [];

  constructor(private _actions: BsDatepickerActions,
              private _localeService: BsLocaleService) {
  }

  init(_bsDatepickerStore: BsDatepickerStore): BsDatepickerEffects {
    this._store = _bsDatepickerStore;

    return this;
  }

  /** setters */

  setValue(value?: Date): void {
    this._store?.dispatch(this._actions.select(value));
  }

  setRangeValue(value?: Date[]): void {
    this._store?.dispatch(this._actions.selectRange(value));
  }

  setMinDate(value?: Date): BsDatepickerEffects {
    this._store?.dispatch(this._actions.minDate(value));

    return this;
  }

  setMaxDate(value?: Date): BsDatepickerEffects {
    this._store?.dispatch(this._actions.maxDate(value));

    return this;
  }

  setDaysDisabled(value?: number[]): BsDatepickerEffects {
    this._store?.dispatch(this._actions.daysDisabled(value));

    return this;
  }

  setDatesDisabled(value?: Date[]): BsDatepickerEffects {
    this._store?.dispatch(this._actions.datesDisabled(value));

    return this;
  }

  setDatesEnabled(value?: Date[]): BsDatepickerEffects {
    this._store?.dispatch(this._actions.datesEnabled(value));

    return this;
  }

  setDisabled(value?: boolean): BsDatepickerEffects {
    this._store?.dispatch(this._actions.isDisabled(value));

    return this;
  }

  setDateCustomClasses(value?: DatepickerDateCustomClasses[]): BsDatepickerEffects {
    this._store?.dispatch(this._actions.setDateCustomClasses(value));

    return this;
  }

  setDateTooltipTexts(value?: DatepickerDateTooltipText[]): BsDatepickerEffects {
    this._store?.dispatch(this._actions.setDateTooltipTexts(value));

    return this;
  }

  /* Set rendering options */
  setOptions(_config: BsDatepickerConfig): BsDatepickerEffects {
    const _options = Object.assign({ locale: this._localeService.currentLocale }, _config);
    this._store?.dispatch(this._actions.setOptions(_options));

    return this;
  }

  /** view to mode bindings */
  setBindings(container: BsDatepickerAbstractComponent): BsDatepickerEffects {
    if (!this._store) {
      return this;
    }

    container.daysCalendar$ = this._store.select(state => state.flaggedMonths)
      .pipe(filter(months => !!months));

    // month calendar
    container.monthsCalendar = this._store.select(state => state.flaggedMonthsCalendar)
      .pipe(filter(months => !!months));

    // year calendar
    container.yearsCalendar = this._store.select(state => state.yearsCalendarFlagged)
      .pipe(filter(years => !!years));

    container.viewMode = this._store.select(state => state.view?.mode);

    container.options$ = combineLatest([
      this._store.select(state => state.showWeekNumbers),
      this._store.select(state => state.displayMonths)
    ])
      .pipe(map((latest) => ({
          showWeekNumbers: latest[0],
          displayMonths: latest[1]
        })
      ));

    return this;
  }

  /** event handlers */
  setEventHandlers(container: BsDatepickerAbstractComponent): BsDatepickerEffects {
    container.setViewMode = (event: BsDatepickerViewMode): void => {
      this._store?.dispatch(this._actions.changeViewMode(event));
    };

    container.navigateTo = (event: BsNavigationEvent): void => {
      this._store?.dispatch(this._actions.navigateStep(event.step));
    };

    container.dayHoverHandler = (event: CellHoverEvent): void => {
      const _cell = event.cell as DayViewModel;
      if (_cell.isOtherMonth || _cell.isDisabled) {
        return;
      }

      this._store?.dispatch(this._actions.hoverDay(event));
      _cell.isHovered = event.isHovered;
    };

    container.monthHoverHandler = (event: CellHoverEvent): void => {
      event.cell.isHovered = event.isHovered;
    };

    container.yearHoverHandler = (event: CellHoverEvent): void => {
      event.cell.isHovered = event.isHovered;
    };

    return this;
  }

  registerDatepickerSideEffects(): BsDatepickerEffects {
    if (!this._store) {
      return this;
    }

    this._subs.push(
      this._store.select(state => state.view).subscribe(() => {
        this._store?.dispatch(this._actions.calculate());
      })
    );

    // format calendar values on month model change
    this._subs.push(
      this._store
        .select(state => state.monthsModel)
        .pipe(
          filter(monthModel => !!monthModel)
        )
        .subscribe(() => this._store?.dispatch(this._actions.format()))
    );

    // flag day values
    this._subs.push(
      this._store
        .select(state => state.formattedMonths)
        .pipe(
          filter(month => !!month)
        )
        .subscribe(() => this._store?.dispatch(this._actions.flag()))
    );

    // flag day values
    this._subs.push(
      this._store
        .select(state => state.selectedDate)
        .pipe(
          filter(selectedDate => !!selectedDate)
        )
        .subscribe(() => this._store?.dispatch(this._actions.flag()))
    );

    // flag for date range picker
    this._subs.push(
      this._store
        .select(state => state.selectedRange)
        .pipe(
          filter(selectedRange => !!selectedRange)
        )
        .subscribe(() => this._store?.dispatch(this._actions.flag()))
    );

    // monthsCalendar
    this._subs.push(
      this._store
        .select(state => state.monthsCalendar)
        .subscribe(() => this._store?.dispatch(this._actions.flag()))
    );

    // years calendar
    this._subs.push(
      this._store
        .select(state => state.yearsCalendarModel)
        .pipe(
          filter(state => !!state)
        )
        .subscribe(() => this._store?.dispatch(this._actions.flag()))
    );

    // on hover
    this._subs.push(
      this._store
        .select(state => state.hoveredDate)
        .pipe(
          filter(hoveredDate => !!hoveredDate)
        )
        .subscribe(() => this._store?.dispatch(this._actions.flag()))
    );

    // date custom classes
    this._subs.push(
      this._store
        .select(state => state.dateCustomClasses)
        .pipe(
          filter(dateCustomClasses => !!dateCustomClasses)
        )
        .subscribe(() => this._store?.dispatch(this._actions.flag()))
    );

    // date tooltip texts
    this._subs.push(
      this._store
        .select(state => state.dateTooltipTexts)
        .pipe(
          filter(dateTooltipTexts => !!dateTooltipTexts)
        )
        .subscribe(() => this._store?.dispatch(this._actions.flag()))
    );

    // on locale change
    this._subs.push(
      this._localeService.localeChange
        .subscribe(locale => this._store?.dispatch(this._actions.setLocale(locale)))
    );

    return this;
  }

  destroy(): void {
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
  }
}
