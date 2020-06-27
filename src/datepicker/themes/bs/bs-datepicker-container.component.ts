import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { BsDatepickerAbstractComponent } from '../../base/bs-datepicker-container';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { DayViewModel } from '../../models';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
import { PositioningService } from 'ngx-bootstrap/positioning';

import { Subscription } from 'rxjs';
import { datepickerAnimation } from '../../datepicker-animations';
import { take } from 'rxjs/operators';

@Component({
  selector: 'bs-datepicker-container',
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
export class BsDatepickerContainerComponent extends BsDatepickerAbstractComponent
  implements OnInit, OnDestroy {

  set value(value: Date) {
    this._effects.setValue(value);
  }

  valueChange: EventEmitter<Date> = new EventEmitter<Date>();
  animationState = 'void';

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

    this.isOtherMonthsActive = this._config.selectFromOtherMonth;
    this.containerClass = this._config.containerClass;
    this.showTodayBtn = this._config.showTodayButton;
    this.todayPos = this._config.todayPosition;
    this.showClearBtn = this._config.showClearButton;
    this._effects
      .init(this._store)
      // intial state options
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
        /* tslint:disable-next-line: no-any */
        .select((state: any) => state.selectedDate)
        /* tslint:disable-next-line: no-any */
        .subscribe((date: any) => this.valueChange.emit(date))
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

    this._store.dispatch(this._actions.select(day.date));
  }

  setToday(): void {
    this._store.dispatch(this._actions.select(new Date()));
  }

  clearDate():void{
    this._store.dispatch(this._actions.select(undefined));
  }

  ngOnDestroy(): void {
    for (const sub of this._subs) {
      sub.unsubscribe();
    }
    this._effects.destroy();
  }
}
