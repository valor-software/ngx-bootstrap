import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { getFullYear, getMonth } from 'ngx-bootstrap/chronos';
import { PositioningService } from 'ngx-bootstrap/positioning';

import { BsDatepickerAbstractComponent } from '../../base/bs-datepicker-container';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { CalendarCellViewModel, DayViewModel } from '../../models';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
import { datepickerAnimation } from '../../datepicker-animations';
import { BsCustomDates } from './bs-custom-dates-view.component';

@Component({
  selector: 'bs-daterangepicker-container',
  providers: [BsDatepickerStore, BsDatepickerEffects],
  templateUrl: './bs-datepicker-view.html',
  host: {
    class: 'bottom',
    '(click)': '_stopPropagation($event)',
    role: 'dialog',
    'aria-label': 'calendar'
  },
  animations: [datepickerAnimation]
})
export class BsDaterangepickerContainerComponent extends BsDatepickerAbstractComponent
  implements OnInit, OnDestroy {
  set value(value: Date[]) {
    this._effects.setRangeValue(value);
  }

  valueChange = new EventEmitter<Date[]>();
  animationState = 'void';

  _rangeStack: Date[] = [];
  chosenRange: Date[] = [];
  _subs: Subscription[] = [];

  constructor(
    _renderer: Renderer2,
    private _config: BsDatepickerConfig,
    private _store: BsDatepickerStore,
    private _element: ElementRef,
    private _actions: BsDatepickerActions,
    _effects: BsDatepickerEffects,
    private _positionService: PositioningService
  ) {
    super();
    this._effects = _effects;

    this.customRanges = this._config.ranges;
    this.customRangeBtnLbl = this._config.customRangeButtonLabel;

    _renderer.setStyle(_element.nativeElement, 'display', 'block');
    _renderer.setStyle(_element.nativeElement, 'position', 'absolute');
  }

  ngOnInit(): void {
    this._positionService.setOptions({
      modifiers: { flip: { enabled: this._config.adaptivePosition } },
      allowedPositions: ['top', 'bottom']
    });

    this._positionService.event$
      .pipe(
        take(1)
      )
      .subscribe(() => {
        this._positionService.disable();

        if (this._config.isAnimated) {
          this.animationState = this.isTopPosition ? 'animated-up' : 'animated-down';

          return;
        }

        this.animationState = 'unanimated';
      });
    this.containerClass = this._config.containerClass;
    this.isOtherMonthsActive = this._config.selectFromOtherMonth;
    this._effects
      .init(this._store)
      // intial state options
      // todo: fix this, split configs
      .setOptions(this._config)
      // data binding view --> model
      .setBindings(this)
      // set event handlers
      .setEventHandlers(this)
      .registerDatepickerSideEffects();

    // todo: move it somewhere else
    // on selected date change
    this._subs.push(
      this._store
        .select(state => state.selectedRange)
        .subscribe(date => {
          this.valueChange.emit(date);
          this.chosenRange = date;
        })
    );
  }

  get isTopPosition(): boolean {
    return this._element.nativeElement.classList.contains('top');
  }

  positionServiceEnable(): void {
    this._positionService.enable();
  }

  daySelectHandler(day: DayViewModel): void {
    if (!day) {
      return;
    }
    const isDisabled = this.isOtherMonthsActive ? day.isDisabled : (day.isOtherMonth || day.isDisabled);

    if (isDisabled) {
      return;
    }
    this.rangesProcessing(day);
  }

  monthSelectHandler(day: CalendarCellViewModel): void {
    if (!day) {
      return;
    }

    day.isSelected = true;

    if (this._config.minMode !== 'month') {
      if (day.isDisabled) {
        return;
      }
      this._store.dispatch(
        this._actions.navigateTo({
          unit: {
            month: getMonth(day.date),
            year: getFullYear(day.date)
          },
          viewMode: 'day'
        })
      );

      return;
    }
    this.rangesProcessing(day);
  }

  yearSelectHandler(day: CalendarCellViewModel): void {
    if (!day) {
      return;
    }

    day.isSelected = true;

    if (this._config.minMode !== 'year') {
      if (day.isDisabled) {
        return;
      }
      this._store.dispatch(
        this._actions.navigateTo({
          unit: {
            year: getFullYear(day.date)
          },
          viewMode: 'month'
        })
      );

      return;
    }
    this.rangesProcessing(day);
  }

  rangesProcessing(day: CalendarCellViewModel): void {
    // if only one date is already selected
    // and user clicks on previous date
    // start selection from new date
    // but if new date is after initial one
    // than finish selection

    if (this._rangeStack.length === 1) {
      this._rangeStack =
        day.date >= this._rangeStack[0]
          ? [this._rangeStack[0], day.date]
          :  [day.date];
    }

    if (this._rangeStack.length === 0) {
      this._rangeStack = [day.date];

      if (this._config.maxDateRange) {
        this.setMaxDateRangeOnCalendar(day.date);
      }
    }

    this._store.dispatch(this._actions.selectRange(this._rangeStack));

    if (this._rangeStack.length === 2) {
      this._rangeStack = [];
    }
  }

  ngOnDestroy(): void {
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
    this._effects.destroy();
  }

  setRangeOnCalendar(dates: BsCustomDates): void {
    this._rangeStack = (dates === null) ? [] : (dates.value instanceof Date ? [dates.value] : dates.value);
    this._store.dispatch(this._actions.selectRange(this._rangeStack));
  }

  setMaxDateRangeOnCalendar(currentSelection: Date): void {
    const maxDateRange = new Date(currentSelection);
    maxDateRange.setDate(currentSelection.getDate() + this._config.maxDateRange);
    this._effects.setMaxDate(maxDateRange);
  }

}
