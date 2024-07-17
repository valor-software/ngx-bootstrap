import {Component, ElementRef, HostBinding, OnDestroy, OnInit, Renderer2} from '@angular/core';
import { BsDatepickerContainerComponent } from './bs-datepicker-container.component';

import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';

import { PositioningService } from 'ngx-bootstrap/positioning';
import { datepickerAnimation } from '../../datepicker-animations';
import { BsCustomDatesViewComponent } from './bs-custom-dates-view.component';
import { BsYearsCalendarViewComponent } from './bs-years-calendar-view.component';
import { BsMonthCalendarViewComponent } from './bs-months-calendar-view.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDaysCalendarViewComponent } from './bs-days-calendar-view.component';
import { NgIf, NgClass, NgSwitch, NgSwitchCase, NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'bs-datepicker-inline-container',
    providers: [BsDatepickerStore, BsDatepickerEffects, PositioningService],
    templateUrl: './bs-datepicker-view.html',
    host: {
        '(click)': '_stopPropagation($event)'
    },
    animations: [datepickerAnimation],
    standalone: true,
    imports: [NgIf, NgClass, NgSwitch, NgSwitchCase, NgFor, BsDaysCalendarViewComponent, TimepickerModule, BsMonthCalendarViewComponent, BsYearsCalendarViewComponent, BsCustomDatesViewComponent, AsyncPipe]
})
export class BsDatepickerInlineContainerComponent extends BsDatepickerContainerComponent
  implements OnInit, OnDestroy {

  @HostBinding ('attr.disabled') get disabledValue () {
    return this.isDatePickerDisabled ? '' : null;
  }

  @HostBinding ('attr.readonly') get readonlyValue () {
    return this.isDatePickerDisabled ? '' : null;
  }
  constructor(
    _renderer: Renderer2,
    _config: BsDatepickerConfig,
    _store: BsDatepickerStore,
    _element: ElementRef,
    _actions: BsDatepickerActions,
    _effects: BsDatepickerEffects,
    _positioningService: PositioningService
  ) {
    super(_renderer, _config, _store, _element, _actions, _effects, _positioningService);

    _renderer.setStyle(_element.nativeElement, 'display', 'inline-block');
    _renderer.setStyle(_element.nativeElement, 'position', 'static');
  }
}
